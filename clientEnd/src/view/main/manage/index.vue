<template>
  <section class="manage">
    <header class="header">
      <!--个人资料-->
      <div class="profile">
        <img class="portrait" :src="userInfo.avatar">
        <div class="desc">
          <p class="nick-name">{{ userInfo.userName }}</p>
        </div>
      </div>
      <!--搜索框-->
      <div class="search">
        <i class="iconfont icon-search">搜索</i>
        <input type="text" class="search-input">
      </div>
      <!--菜单-->
      <div class="menu">
        <ul class="menu-ul clearfix">
          <router-link tag="li" active-class="active" class="menu-li"
                       :to="{path: `/chatting${currentChat ? '/' + currentChat : ''}`}">
            <i class="iconfont icon-chat"><span class="total">[{{ total }}]</span></i>
          </router-link>
          <router-link tag="li" active-class="active" class="menu-li"
                       :to="{path: `/contacts${currentContact ? '/' + currentContact : ''}`}">
            <i class="iconfont icon-list"><span class="total">[{{ contacts.length }}]</span></i>
          </router-link>
          <router-link tag="li" active-class="active" class="menu-li" to="/foo">
            <i class="iconfont icon-publicnumber"></i>
          </router-link>
        </ul>
      </div>
    </header>
    <keep-alive>
      <router-view name="manage"></router-view>
    </keep-alive>
  </section>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    name: 'manage',
    computed: {
      ...mapState(['userInfo']),
      ...mapState('chatting', ['total', 'chattings', 'currentChat']),
      ...mapState('contacts', ['contacts', 'currentContact'])
    }
  }
</script>
<style lang="less">
  .blank() {
    height: 40px;
    padding: 12.5px;
    color: #fff;
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
  }

  .manage {
    width: 300px;
    overflow: hidden;
    background-color: #2e3238;
    border-right: 1px solid #e0e0e0;
    header {
      height: 150px;
    }
    .profile {
      .blank();
      .portrait {
        float: left;
        width: 40px;
        height: 40px;
        border-radius: 3px;
      }
      .desc {
        margin-left: 50px;
        .nick-name {
          font-size: 20px;
          line-height: 40px;
          font-weight: 100;
          color: #fff;
        }
      }
    }
    .search {
      .blank();
      padding: 0 12.5px;
      position: relative;
      .icon-search {
        font-size: 15px;
        color: #a9a9a9;
        position: absolute;
        left: 20px;
        top: 12px;
        &:before {
          color: #a9a9a9;
          font-size: 15px;
          margin-right: 5px;
        }
      }
      .search-input {
        width: 100%;
        height: 30px;
        margin-top: 5px;
        border: none;
        outline: none;
        background-color: #26292e;
      }
    }

    .menu {
      .blank();
      padding: 0 12.5px;
      margin: 0 -3px;
      .menu-li {
        float: left;
        width: 33.33%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        box-sizing: border-box;
        &:not(:last-child) {
          border-right: 1px solid #24272c;
        }
        &.active {
          i {
            color: #3caf36;
          }
        }
        i {
          font-size: 30px;
          color: #fff;
          .total {
            font-weight: 200;
            margin-left: 5px;
            font-size: 16px;
            color: #fff;
          }
        }
      }
    }
  }
</style>
