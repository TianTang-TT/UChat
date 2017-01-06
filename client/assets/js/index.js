/**
 * created by honor
 */
//  全局连接变量
var uchat = null;
window.onload = function () {
	uchat = new UChat();
  uchat.login();
  // test
  
}

function UChat () {
	this.socket = null;
}

UChat.prototype = {
  login: function () {
    var self = this;
    var loginPage = document.querySelector('#login');
    var userInput = loginPage.querySelector('.username');
    var loginBtn = loginPage.querySelector('.btn-login');
    loginBtn.addEventListener('click', function (e) {
      var username = userInput.value;
      if (!username.trim().length) {
        alert('请输入昵称');
        return;
      }
      
      loginPage.style.display = 'none';
      self.name = 'username';
      self.init();
    });

    loginPage.style.display = 'none';
    self.name = 'username';
    self.init();
  },
	init: function () {
    var self = this;
		// 链接到服务器
		this.socket = io.connect();
		// 建立连接
		this.socket.on('connect', function () {
			// 此处需要展示登陆界面
      self.socket.emit('login', self.name);
		});
    this.socket.on('message', function (msg) {
      self.addDialogItem(msg);
    });
    // 当前群聊人员变动
    this.socket.on('membersChange', function (memberArr) {
      // 更新在线人员列表
      self.upDateMemItem(memberArr);
    });
    this.bindEvent();
	},
  /**
   * [bindEvent 绑定事件入口]
   * @return {[undefined]} 
   */
  bindEvent: function () {
    // 发送消息
    this.bindSendMsg();
    // 发送表情
    this.bindSendEmoji();
    // 发送图片
    this.bindSendImg();

  },
  /**
   * [bindSendMsg 发送信息]
   * @return {[type]} [description]
   */
  addDialogItem: function (data) {
    // 接收到后台发来的信息然后在对话区展现出来
    // {type: 信息类型, data: 具体的信息}
    var html = template('msgTpl', data);
    var dialogArea = document.querySelector('#chatting .dialogs');
    dialogArea.innerHTML += html;
    // 消息更新后滚动条滚到底
    dialogArea.scrollTop = dialogArea.scrollHeight;
  },
  bindSendMsg: function () {
    var self = this;
    var speakArea = document.querySelector('#typing #typeContent');
    var sendBtn = document.querySelector('#typing .btn-send');
    // 点击按钮发送
    sendBtn.addEventListener('click', sendMsg);
    // 回车发送
    speakArea.addEventListener('keydown', function (e) {
      if (e.keyCode === 13 || e.code.toLowerCase() === 'enter') {
        sendMsg();
      }
    });
    function sendMsg () {     
      var speaking = speakArea.value;
      if (speaking.trim().length) {
        self.socket.send({msgType: 'text', data: speaking});
        // 把信息显示在对话区域
        self.addDialogItem({type: 'self', data: speaking});

        // 清空输入区
        speakArea.value = '';
      }
    }
  },
  bindSendImg: function () {
    var self = this;
    var file = null;
    var reader = null;
    var fileName = '';
    var imgReg = /\.(jpg|jpeg|png|gif)$/;
    var imgInput = document.querySelector('#typing .uploadImg');
    imgInput.addEventListener('change', function () {
      if (!this.files.length) {
        return;
      }
      file = this.files[0];
      fileName = file.name;
      if (!imgReg.test(fileName)) {
        alert('请选择一张图片');
        imgInput.value = '';
        return;
      }
      reader = new FileReader();
      // 图片读取完毕之后马上显示
      reader.onload = function (e) {
        self.addDialogItem({type: 'self', data: e.target.result, msgType: 'img'});
        self.socket.send({type: 'dialog', msgType: 'img', data: e.target.result});
        imgInput.value = '';
      }
      reader.readAsDataURL(file);
    })
  },
  upDateMemItem: function(memberArr){
    debugger;
    var memHtml = template('memTpl', memberArr);
    var memList = document.querySelector('.mems-list');
    memList.innerHTML += memHtml;
  },
  bindSendEmoji: function () {
    var self = this;
    var emojiTool = document.querySelector('#typing .tools .emoji');
    var container = emojiTool.querySelector('.emoji-container');
    var emojiSelector = container.querySelector('.selector');
    var emojiTab = container.querySelector('.tab');
    emojiTool.addEventListener('click', function (e) {
      if (container.clientHeight > 10) {
        container.style.display = 'none';
      } else {
        container.style.display = 'block';
      }
      e.stopPropagation();
    });
    // 选择表情类型
    emojiSelector.addEventListener('click', function (e) { 
      var target = e.target.parentNode;
      var type = target.getAttribute('data-type');
      if (!type) {
        return;
      }
      var sections = container.querySelectorAll('.emoji-list');
      [].slice.call(sections).forEach(function (item) {
        var itemType = item.getAttribute('data-type');
        if (itemType === type) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
      e.stopPropagation();

    });
    // 选择表情
    emojiTab.addEventListener('click', function (e) {
      var target = e.target;
      var type = target.parentNode.getAttribute('data-type');
      var num = target.getAttribute('data-num');
      if (!type || !num) return;
      var speakArea = document.querySelector('#typing #typeContent');
      speakArea.value += ('[emoji:' + type + '_' + num + ']');
      e.stopPropagation();
    })
    // 点击空白处隐藏表情面板
    document.addEventListener('click', function () {
      container.style.display = 'none';
    });
  }
}