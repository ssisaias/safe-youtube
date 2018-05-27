<template lang="pug">
    div
      // el-button(type="primary" @click="tab") New tab 
      // div(v-loading="loading")
      <el-container>
        <el-header style="height: 30px;padding-bottom: 40px;">
          h3 Safe Youtube
        </el-header>
        <el-main>
          div(v-if="loading" v-loading="loading" element-loading-text="Carregando..." style="margin-top: 25px")
          div
            span {{message}}
            i(class="el-icon-success" style="margin: 10px 0 0 0")
              span(style="margin: 0 0 0 10px") {{good_value}}
            hr
            i(class="el-icon-warning") 
              span(style="margin: 0 0 0 10px") {{bad_value}}
        </el-main>
      </el-container>
      
</template>
<script>
  import axios from 'axios'
  export default {
    data: () => ({
      value: '',
      loading: true,
      bad_value: 0,
      good_value: 0,
      error_message: null,
      message: '% de comentários inofensivos e ofensivos'
    }),
    computed: { },
    created () {},
    mounted () {
      axios.get(`http://127.0.0.1:5000/`).then(response => {
        // JSON responses are automatically parsed.
        this.value = response.data
        console.log(this.value)
        this.good_value = this.value.good
        this.bad_value = this.value.bad
        this.loading = false
      })
        .catch(e => {
          this.value = e
        })
    },
    methods: {
      tab () {
        chrome.tabs.create({ url: 'pages/app.html' })
      }
    }
  }
</script>
<style lang="scss">
  body{
    width: 150px;
    height: 170px;
    margin: 0;
    overflow:hidden;
  }
  
  .el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center; 
    height: 130px;
    overflow: hidden;
    padding: 5px;
  }
  .el-icon-success {
    color: rgb(1, 212, 82);
    font-size: 20px
  }
  .el-icon-warning {
    color: #c20707;
    font-size: 20px
  }
</style>