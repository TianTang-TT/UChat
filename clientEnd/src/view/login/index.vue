<template>
  <div id="login">
    <div class="login-form">
      <h6 class="page-title">UChat!</h6>
      <div class="logo">
        <img
          title="双击更换头像"
          :src="avatar"
          @dblclick="changeAvatar"
          class="logo-img">
      </div>
      <input
        class="username"
        type="text"
        v-model="nickname"
        @keyup.enter="login"
        placeholder="请输入昵称" />
      <button class="login-btn" @click="login">Join</button>
      <p class="welcome">welcome to UChat~</p>
    </div>
  </div>
</template>
<script>
  import io from 'socket.io-client'
  import { getRandomImg } from 'api/login'
  import { mapActions } from 'vuex'
  export default {
    name: 'login',
    data () {
      return {
        nickname: '',
        avatar: 'http://localhost:3000/static/images/avatars/v.jpg'
      }
    },
    methods: {
      ...mapActions(['initUserInfo', 'initSocket']),
      ...mapActions('contacts', ['initContacts', 'addContact', 'removeContact']),
      changeAvatar () {
        getRandomImg().then(res => {
          if (res.code === 1) {
            this.avatar = res.data
          }
        })
      },
      login () {
        if (!this.nickname.length) {
          this.$message.warning('请取一个帅气的昵称')
          return
        }
        let socket = io.connect('localhost:3000')
        socket.on('connect', () => {
          // 登录时发送用户信息
          socket.emit('login', {
            id: socket.id,
            name: this.nickname,
            avatar: this.avatar
          }, result => {
            if (result.code === 0) {
              this.$message.warning('登录失败，请稍后重试')
            } else if (result.code === 1) {
              sessionStorage.setItem('u_token', Date.now())
              this.initUserInfo(result.data.user)
              // 登录成功之后获得回执的在线人员列表
              this.initContacts(result.data.users)
              // 将socket加入vuex的状态中方便后续的调用
              this.initSocket(socket)
              this.$router.push({path: '/'})
            }
          })
        })
        socket.on('online', contact => {
          this.addContact(contact)
        })
        socket.on('offline', contact => {
          this.removeContact(contact.id)
        })
        socket.on('logout', () => {
          this.$message.warning('登录失效')
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  #login {
    height: 100%;
    position: relative;
    background: url('~assets/img/loginbg.jpg') 50% 50% / cover no-repeat;
    .login-form {
      width: 280px;
      height: 400px;
      padding: 20px;
      box-sizing: border-box;
      border-radius: 2px;
      background-color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .page-title {
        text-align: left;
      }
      .logo {
        margin: 45px 0;
        text-align: center;
        .logo-img {
          width: 90px;
          height: 90px;
        }
      }
      .username {
        width: 210px;
        height: 40px;
        font-size: 16px;
        box-sizing: border-box;
        display: block;
        padding-left: 8px;
        margin: 0 auto;
        border: 1px solid #dfdfdf;
        border-radius: 2px;
      }
      .login-btn {
        display: block;
        width: 210px;
        height: 40px;
        font-size: 14px;
        color: #fff;
        background: #3dce3d;
        border: none;
        border-radius: 1px;
        margin: 20px auto;
        outline: none;
      }
      .welcome {
        text-align: center;
        font-size: 14px;
        color: #436895;
        margin-top: 40px;
      }
    }
  }
</style>
