/**
 * created by honor
 */
//  全局连接变量
var uchat = null;
window.onload = function () {
	uchat = new UChat();
	uchat.init();
}

function UChat () {
	this.socket = null;
}

UChat.prototype = {
	init: function () {
		// 链接到服务器
		this.socket = io.connect();
		// 建立连接
		this.socket.on('connect', function () {
			// 此处需要展示登陆界面
		})
	}
}