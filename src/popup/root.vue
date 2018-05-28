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
          div(v-if="!error_message")
            span.mensagem {{message}}
            i(class="el-icon-success" style="margin: 10px 0 0 0")
              span(style="margin: 0 0 0 10px") {{good_value}}
            hr
            i(class="el-icon-warning") 
              span(style="margin: 0 0 0 10px") {{bad_value}}
          div(v-if="error_message")
            h3(style="color:#c20707") Error: {{error_message}}
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
      let vm = this // Inside callback functions 'this' is for the function context, so we got to get the vue instance here
      chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var url = new URL(tabs[0].url)
        let videoId = url.search.toString().split('=')[1]
        console.log(videoId)
        axios.get(`http://127.0.0.1:5000/video?id=` + videoId).then(response => {
          // JSON responses are automatically parsed.
          if (response.status === 200) {
            vm.value = response.data
            console.log(vm.value)
            vm.good_value = vm.value.good
            vm.bad_value = vm.value.bad
            vm.loading = false
            if (!vm.good_value || !vm.bad_value) {
              vm.error_message = 'Problemas ao processar dados do servidor!'
            }
          } else if (response.status === 202) {
            vm.loading = false
            vm.error_message = 'Os comentários deste vídeo ainda não foram avaliados. Tente novamente mais tarde.'
          } else {
            vm.loading = false
            vm.error_message = 'Problemas ao processar dados do servidor! ' + response.status
            console.log(response)
          }
        })
          .catch(e => {
            console.log(e)
            vm.error_message = e.message
            vm.loading = false
          })
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
  span .mensagem{
    color: pink;
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