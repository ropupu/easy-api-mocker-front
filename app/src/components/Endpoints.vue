<template>
    <div class="endpoints">
        <el-row :gutter="20">
            <el-col :span="16" :offset="4">
                <el-alert
                  v-if="error"
                  :title="error"
                  type="error"
                  center
                  show-icon>
                </el-alert>
                <el-form label-width="180px" :model="form" ref="form" :rules="formRules">
                    <el-form-item label="METHOD" prop="method">
                        <el-radio-group v-model="form.method" >
                            <el-radio label="GET">GET</el-radio>
                            <el-radio label="POST">POST</el-radio>
                            <el-radio label="PUT">PUT</el-radio>
                            <el-radio label="DELETE">DELETE</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="PATH" prop="path">
                        <el-input placeholder="foo/bar" v-model="form.path">
                            <template slot="prepend">https://afternoon-spire-63041.herokuapp.com/api/{{ this.groupKey }}/</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="STATUS CODE" prop="statusCode">
                        <el-input-number v-model="form.statusCode" controls-position="right" :min="200" :max="511"></el-input-number>
                    </el-form-item>
                    <el-form-item label="RESPONSE BODY" prop="responseBody">
                        <el-input type="textarea" :rows="4" v-model="form.responseBody"></el-input>
                    </el-form-item>
                    <el-form-item label="Advanced">
                        <el-switch v-model="isAdvancedFormUsed"></el-switch>
                    </el-form-item>
                    <div v-if="isAdvancedFormUsed" class="advanced">
                    <el-form-item
                      label="REQUEST HEADER"
                      v-for="header in form.headers" :key="('header' + header.index)">
                      <el-col :span="8" style="padding-left: 0px;">
                          <el-input placeholder="Authorization" v-model="header.key"></el-input>
                      </el-col>
                      <el-col :span="8">
                          <el-input placeholder="Bearer foobar" v-model="header.value"></el-input>
                      </el-col>
                      <el-col :span="2">
                          <el-button @click.prevent="removeRow('headers', header)">Delete</el-button>
                      </el-col>
                      <el-col :span="2" :offset="1">
                      <el-button v-if="form.headers[form.headers.length-1].index === header.index"  @click="addRow('headers')">Add</el-button>
                      </el-col>
                    </el-form-item>
                    <el-form-item
                      label="REQUEST PARAMETER"
                      v-for="parameter in form.parameters" :key="('parameter' + parameter.index)">
                      <el-col :span="8" style="padding-left: 0px;">
                          <el-input placeholder="foo" v-model="parameter.key"></el-input>
                      </el-col>
                      <el-col :span="8">
                          <el-input placeholder="bar" v-model="parameter.value"></el-input>
                      </el-col>
                      <el-col :span="2">
                          <el-button @click.prevent="removeRow('parameters', parameter)">Delete</el-button>
                      </el-col>
                      <el-col :span="2" :offset="1">
                          <el-button v-if="form.parameters[form.parameters.length-1].index === parameter.index"  @click="addRow('parameters')">Add</el-button>
                      </el-col>
                    </el-form-item>
                    <el-form-item
                      label="RESPONSE HEADER"
                      v-for="responseHeader in form.responseHeaders" :key="('response_header' + responseHeader.index)">
                      <el-col :span="8" style="padding-left: 0px;">
                          <el-input placeholder="X-Foo" v-model="responseHeader.key"></el-input>
                      </el-col>
                      <el-col :span="8">
                          <el-input placeholder="bar" v-model="responseHeader.value"></el-input>
                      </el-col>
                      <el-col :span="2">
                          <el-button @click.prevent="removeRow('responseHeaders', responseHeader)">Delete</el-button>
                      </el-col>
                      <el-col :span="2" :offset="1">
                          <el-button v-if="form.responseHeaders[form.responseHeaders.length-1].index === responseHeader.index"  @click="addRow('responseHeaders')">Add</el-button>
                      </el-col>
                    </el-form-item>

                    </div>
                    <el-form-item style="padding-top: 10px;">
                        <el-button type="primary" @click="createEndpoint">Create</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-collapse>
            <div v-for="endpoint in endpoints" :key="endpoint.index">
                <el-collapse-item>
                    <template slot="title">
                        <div class="method">{{ endpoint.method }}</div>{{ endpoint.path }}
                    </template>
                    <div>status code: {{ endpoint.status_code }}</div>
                </el-collapse-item>
            </div>
        </el-collapse>
    </div>
</template>
<style>
.endpoints {
    text-align: left;
    margin-left: 10px;
}
.advanced {
    border-radius: 4px;
    padding-top: 10px;
    padding-bottom: 10px;
    background: #c6e0e0;
}
</style>
<script>
import Server from '@/mixins/Server'

export default {
  name: 'Endpoints',
  mixins: [Server],
  data: function() {
      return {
          form: {
              method: "GET",
              statusCode: 200,
              path: undefined,
              headers: [
                  {
                      index: 0,
                      key: undefined,
                      value: undefined
                  }
              ],
              parameters: [
                  {
                      index: 0,
                      key: undefined,
                      value: undefined
                  }
              ],
              responseHeaders: [
                  {
                      index: 0,
                      key: undefined,
                      value: undefined
                  }
              ],
              responseBody: undefined
          },
          formRules: {
              method: {type: "enum", enum: ['GET', 'POST', 'PUT', 'DELETE'], required: true, trigger: 'blur'},
              path: {type: "string", pattern: /[\w\-.~#$&+/:=?%]+/, required: true, trigger: 'blur'},
              statusCode: {type: "number", min: 200, max: 511, required: true, trigger: 'blur'},
              responseBody: {type: "string", trigger: 'blur'}
          },
          isAdvancedFormUsed: false,
          error: undefined,
          groupKey: undefined,
          endpoints: []
      }
  },
  methods: {
        removeRow(propertyName, removeItem) {
            const index = this.form[propertyName].indexOf(removeItem);
            if (index !== -1) {
              this.form[propertyName].splice(index, 1)
            }
        },
        addRow(propertyName) {
            this.form[propertyName].push({
                index: this.form[propertyName].length,
                key: undefined,
                value: undefined
            })
        },
        async createEndpoint() {
            this.error = undefined
            let postHeaders = {}
            let postParameters = {}
            let postResponseHeaders = {}
            this.form.headers.forEach((header) => {
                if (header.key && header.value) {
                    postHeaders[key] = value
                }
            })
            this.form.parameters.forEach((parameter) => {
                if (parameter.key && parameter.value) {
                    postParameters[key] = value
                }
            })
            this.form.responseHeaders.forEach((responseHeader) => {
                if (responseHeader.key && responseHeader.value) {
                    postResponseHeaders[key] = value
                }
            })
            try {
                await this.$refs['form'].validate()
            } catch (e) {
                this.error = e.message
                return
            }
            try {
                await this._createEndpoint(
                    this.groupKey,
                    this.form.method,
                    this.form.path,
                    postHeaders,
                    postParameters,
                    this.form.statusCode,
                    postResponseHeaders,
                    this.form.responseBody
                )
                this.endpoints = await this._getEndpoints(this.groupKey)
            } catch (e) {
                this.error = e.message
            }
        },
        async getEndpoints() {
            try {
                this.endpoints = await this._getEndpoints(this.groupKey)
                this.endpoints.forEach((endpoint, index) => {
                    endpoint.index = index
                })
            } catch (e) {
                this.$router.push({ name: 'CreateGroup' })
            }
        }
  },
  created: async function() {
      this.groupKey = this.$route.params.group_key
      if (!this.groupKey) {
          this.$router.push({ name: 'CreateGroup' })
      }
      await this.getEndpoints()
  }
}
</script>