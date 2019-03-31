<template>
  <div class="endpoints">
      <el-row>
      </el-row>
  </div>
</template>
<script>
import Server from '@/mixins/Server'

export default {
  name: 'Endpoints',
  mixins: [Server],
  data: function() {
      return {
          groupKey: undefined
      }
  },
  methods: {
  },
  created: function() {
      this.groupKey = this.$route.params.group_key
      if (!this.groupKey) {
          this.$router.push({ name: 'CreateGroup' })
      }
  }
}
</script>