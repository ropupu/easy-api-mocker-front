<script>
import axios from 'axios'
export default {
    name: 'Server',
    methods: {
        _getBaseUrl() {
            return 'https://afternoon-spire-63041.herokuapp.com/api/'
        },
        async _createGroup() {
          const url = this._getBaseUrl()
          let response
          try {
              response = await axios.post(url)
          } catch (e) {
              throw new Error('failed to create Group')
          }
          return response.data.group_key
      }
    }
}
</script>