/**
 * created by honor
 */
//  全局连接变量
var uchat = null;
window.onload = function () {
  uchat = new UChat();
  uchat.login();  
}

function UChat () {
	this.socket = null;
  this.emojiLoaded = false;
}

UChat.prototype = {
  login: function () {
    var self = this;
    var loginPage = document.querySelector('#login');
    var userInput = loginPage.querySelector('.username');
    var loginBtn = loginPage.querySelector('.btn-login');
    loginBtn.addEventListener('click', join);
    userInput.addEventListener('keydown', function (e) {
      if (e.keyCode === 13 || e.code.toLowerCase() === 'enter') {
        join();
      }
    });
    function join () {
      var username = userInput.value;
      if (!username.trim().length) {
        alert('请输入昵称');
        return;
      }      
      userInput.value = '';
      loginPage.style.display = 'none';
      self.name = username;
      self.init();
    }
  },
  init: function () {
    var self = this;
    // 显示左侧用户资料
    this.displayProgile();
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
  displayProgile: function () {
    var self = this;
    var profile = document.querySelector('#members .profile');
    profile.querySelector('.nick-name').innerText = self.name;
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
    // 过滤，将表情代码换成图片
    html = this.codeToImg(html);
    var dialogArea = document.querySelector('#chatting .dialogs');
    dialogArea.innerHTML += html;
    // 消息更新后滚动条滚到底
    dialogArea.scrollTop = dialogArea.scrollHeight;
  },
  /**
   * [upDateMemItem 更新在线人员列表]
   * @param  {[type]} memberArr [description]
   * @return {[type]}           [description]
   */
  upDateMemItem: function(memberArr){
    var memHtml = template('memTpl', {memberArr: memberArr});
    var memList = document.querySelector('.mems-list');
    memList.innerHTML = memHtml;
    document.querySelector('#dialog .count').innerText = memberArr.length;
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
        sendMsg(e);
      }
    });
    function sendMsg (e) {
      var speaking = speakArea.innerHTML;
      speaking = self.imgToCode(speaking);
      if (speaking.trim().length) {
        self.socket.send({msgType: 'text', data: speaking, username: self.name});
        // 把信息显示在对话区域
        self.addDialogItem({type: 'self', data: speaking, username: self.name});
        // 清空输入区
        speakArea.innerHTML = '';
        e.preventDefault();//这句话可以阻止回车事件冒泡;如果注释掉这句话,那么会有空格残余;
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
      if (!imgReg.test(fileName.toLowerCase())) {
        alert('请选择一张图片');
        imgInput.value = '';
        return;
      }
      reader = new FileReader();
      // 图片读取完毕之后马上显示
      reader.onload = function (e) {
        debugger;
        self.addDialogItem({type: 'self', data: e.target.result, msgType: 'img', username: self.name});
        self.socket.send({type: 'dialog', msgType: 'img', data: e.target.result, username: self.name});
        imgInput.value = '';
      }
      reader.readAsDataURL(file);
    })
  },
  
  bindSendEmoji: function () {
    var self = this;
    var emojiTool = document.querySelector('#typing .tools .emoji');
    var container = emojiTool.querySelector('.emoji-container');
    var emojiSelector = container.querySelector('.selector');
    var emojiTab = container.querySelector('.tab');
    var img, qqFragment, tsjFragment;
    emojiTool.addEventListener('click', function (e) {
      var qqSection = container.querySelector('section[data-type=qq]');
      var tsjSection = container.querySelector('section[data-type=tsj]');
      if (container.clientHeight > 10) {
        container.style.display = 'none';
      } else {
        container.style.display = 'block';
      }
      // 下载表情
      if (!self.emojiLoaded) {
        qqFragment = document.createDocumentFragment();
        tsjFragment = document.createDocumentFragment();
        // qq表情75个
        for (var i = 1; i <= 75; i++) {
          img = document.createElement('img');
          img.setAttribute('data-type', 'qq');
          img.setAttribute('data-num', i);
          img.src = 'assets/imgs/qq/' + i + '.gif';
          qqFragment.appendChild(img);
        }
        qqSection.appendChild(qqFragment);
        // 兔斯基表情18个
        for (var j = 1; j <= 69; j++) {
          img = document.createElement('img');
          img.setAttribute('data-type', 'tsj');
          img.setAttribute('data-num', j);
          img.src = 'assets/imgs/tsj/' + j + '.gif';
          tsjFragment.appendChild(img);
        }
        tsjSection.appendChild(tsjFragment);
        self.emojiLoaded = true;
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
      speakArea.innerHTML += target.outerHTML;
      container.style.display = 'none';
      e.stopPropagation();
    })
    // 点击空白处隐藏表情面板
    document.addEventListener('click', function () {
      container.style.display = 'none';
    });
  },
  imgToCode: function (str) {
    var emojiReg = /<img.+?data-type="(\w+)".+?data-num="(\d+)".*?>/g;
    return str.replace(emojiReg, '[emoji:$1_$2]');
  },
  codeToImg: function (str) {
    var codeReg = /\[emoji:(\w+?)_(\d+?)\]/g;
    return str.replace(codeReg, '<img src="assets/imgs/$1/$2.gif">');
  }
}