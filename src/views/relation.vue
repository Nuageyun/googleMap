<template>
  <a-layout class="layout-default">
    <a-layout-header class="layout-default__header">
      <div class="layout-default__logo">欢迎登陆！</div>
      <div class="layout-default__header-actions">
        <a-dropdown placement="bottomRight">
          <a class="user-name"
            >{{ user_info.emailAddress }} <a-icon type="down"></a-icon
          ></a>
          <a-menu slot="overlay">
            <a-menu-item @click="onLogout"> 退出登录 </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div class="layout-default__content">
        <a-table
          rowKey="gameId"
          :columns="tableOptions.columns"
          :data-source="data"
          :loading="getlistLoading"
          bordered
        >
          <span slot="gameId" slot-scope="record"> {{user_info.isAdmin ? record.gameId :'-'}}</span>
          <a-tag
            slot="ageRestriction"
            slot-scope="record"
            color='#f50'
            v-if="record.ageRestriction < 16"
          >{{ record.ageRestriction }}</a-tag>
          <span v-else>{{ record.ageRestriction }}</span>
          <img class="game-img" slot="thumbnail" slot-scope="record" :src="record.thumbnail" alt="">
        </a-table>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      ©2021 Created by Nuage
    </a-layout-footer>
  </a-layout>
</template>
<script>
import { tableOptions } from './relation#config'
import { getOwnership, getGameList } from '../api/user'
export default {
  data () {
    return {
      data: [],
      getlistLoading: false
    }
  },
  created () {
    this.getOwnershipAndGameList()
  },
  computed: {
    tableOptions,
    user_info () {
      return this.$store.state.user_info
    }
  },
  methods: {
    getOwnershipAndGameList () {
      getGameList().then(gameRes => {
        this.getlistLoading = true
        // 管理员
        if (this.user_info.isAdmin) {
          this.data = gameRes.data
          this.getlistLoading = false
          return
        }
        // 普通用户
        getOwnership().then(res => {
          this.data = []
          this.getlistLoading = false
          res.data.filter(item => {
            // 账号有效并且是用户自己的游戏列表
            if (item.state && item.userAccountId === this.user_info.userAccountId) {
              gameRes.data.forEach(gameItem => {
                if (item.gameId === gameItem.gameId) {
                  this.data.push(gameItem)
                }
              })
            }
          })
        })
      })
    },
    onLogout () {
      this.$store.commit('SET_USER_INFO', {})
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>
<style lang="less" scoped>
.ant-layout {
  min-height: 100vh;
}
.ant-layout-header {
  background: linear-gradient(90deg, #3c98fc, #1c88fd);
  display: flex;
  justify-content: space-between;
}
.layout-default {
  &__logo {
    font-size: 32px;
    color: #fff;
  }
  .user-name {
    font-size: 16px;
    color: #fff;
  }
  &__content {
    height: 100%;
    background: #fff;
    padding: 24px;
  }
  .game-img {
    width: 60px;
  }
}
</style>
