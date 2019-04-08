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
        },
        async _getEndpoints(groupKey) {
            const url = this._getBaseUrl() + groupKey
            let response
            try {
                response = await axios.get(url)
            } catch (e) {
                throw e
            }
            return response.data
        },
        async _createEndpoint(groupKey, method, path, headers, parameters, statusCode, responseHeaders, responseBody) {
            const url = this._getBaseUrl() + groupKey
            const data = {
                method: method,
                path: path,
                headers: headers,
                parameters: parameters,
                status_code: statusCode,
                response_headers: responseHeaders,
                response_body: responseBody
            }
            let response
            try {
                response = await axios.post(url, data)
            } catch (e) {
                throw e
            }
            return response.data
        }
    }
}
</script>