<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-row :gutter="20">
            <el-col :span="12" :offset="6">
              <span style="font-size: 20px;">EASY API MOCKER</span>
            </el-col>
        </el-row>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
