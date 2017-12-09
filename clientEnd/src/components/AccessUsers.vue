<template>
  <div class="access-users">
    <el-table
      ref="multipleTable"
      :data="userData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="头像"
        prop="avatar"
        width="150">
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
    <div class="option">
      <el-button type="primary" @click="confirmUsers">确定</el-button>
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
      this.$socket.emit('getAvailableUsers', this.chatId, res => {
        if (res.code === 1) {
          this.userData = res.data
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  .access-users {
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin: 20px;
    }
  }
</style>
