<template>
  <div class="create-group">
      <el-row>
          <el-button type="primary" @click="createGroup">Start!!</el-button>
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
          groupKey: undefined
      }
  },
  methods: {
      async createGroup() {
          try {
                this.groupKey = await this._createGroup()
                this.$router.push({ name: 'Endpoints', params: { group_key: this.groupKey } })
          } catch (e) {
                alert('failed to create a group')
          }
      }
  }
}
</script>