/**
 * created by honor
 */
//  全局连接变量
var num = 0;
window.onload = function () {
	uchat = new UChat();
	uchat.init();
}

function UChat () {
	this.socket = null;
}

UChat.prototype = {
	init: function () {
    var self = this;
		// 链接到服务器
		this.socket = io.connect();
		// 建立连接
		this.socket.on('connect', function () {
			// 此处需要展示登陆界面
      self.socket.emit('login', 'user' + Math.random());
		});
    this.socket.on('message', function (msg) {
      self.addDialogItem(msg);
    });
    this.socket.on('discontect', function () {
      
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
    var sendBtn = document.querySelector('#typing .btn-send');
    sendBtn.addEventListener('click', function () {
      var speakArea = document.querySelector('#typing #typeContent');
      var speaking = speakArea.value;
      if (speaking.trim().length) {
        self.socket.send(speaking);
        // 把信息显示在对话区域
        self.addDialogItem({type: 'self', data: speaking});

        // 清空输入区
        speakArea.value = '';
      }
    })
  }
}