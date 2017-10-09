<template>
  <div id="login">
    <div class="login-form">
      <h6 class="page-title">UChat!</h6>
      <div class="logo">
        <img src="~assets/img/1.jpg" class="logo-img">
      </div>
      <input class="username" type="text" placeholder="请输入昵称" />
      <button class="login-btn" @click="login">Join</button>
      <p class="welcome">welcome to UChat~</p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'login',
    data () {
      return {
        nickname: ''
      }
    },
    methods: {
      login () {
        this.$router.push({path: '/'})
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
