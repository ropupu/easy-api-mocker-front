<template>
  <div class="create-group">
      <el-row :gutter="20">
          <el-col :span="12" :offset="6">
            <el-button type="primary" @click="createGroup" :loading="loading">Start!!</el-button>
          </el-col>
      </el-row>
  </div>
</template>
<script>
import Server from '@/mixins/Server'

export default {
  name: 'CreateGroup',
  mixins: [Server],
  data: function() {
      return {
          loading: false,
          groupKey: undefined
      }
  },
  methods: {
      async createGroup() {
          this.loading = true
          try {
                this.groupKey = await this._createGroup()
                this.$router.push({ name: 'Endpoints', params: { group_key: this.groupKey } })
          } catch (e) {
                alert('failed to create a group')
          }
          this.loading = false
      }
  }
}
</script>