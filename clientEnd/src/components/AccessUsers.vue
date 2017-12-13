<template>
  <div class="access-users">
    <el-table
      border
      :data="userData"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="头像"
        align="center"
        prop="avatar"
        width="100">
        <template slot-scope="scope">
          <img class="avatar" :src="scope.row.avatar" :alt="scope.row.name">
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="name"
        label="昵称">
      </el-table-column>
    </el-table>
    <div class="option-container">
      <el-button type="primary" @click="confirmUsers">邀請</el-button>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    name: 'access-users',
    props: {
      chatId: [Number, String],
      confirm: {
        type: Function,
        required: true
      }
    },
    data () {
      return {
        selection: [],
        userData: []
      }
    },
    computed: {
      ...mapState(['socket'])
    },
    methods: {
      handleSelectionChange (selection) {
        this.selection = selection
      },
      confirmUsers () {
        if (!this.selection.length) {
          return this.$message.warning('请选择用户')
        }
        this.confirm(this.selection)
      }
    },
    mounted () {
      this.socket.emit('getAvailableUsers', this.chatId, res => {
        console.log(res)
        if (res.code === 1) {
          this.userData = res.data
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  .access-users {
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .option-container {
      margin-top: 10px;
      text-align: right;
    }
  }
</style>
