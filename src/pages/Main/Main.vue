<template>
  <Row class="mainBody">
    <Row class="caption">Let's Arithmetic</Row>
    <Row class="unLogin" :gutter="20" v-if="!loginFlag">
      <Row class="unLoginText">
        您还未登陆，请先登陆！
      </Row>
      <router-link :to="{path:'/Login',query: {navIndex: '2'}}">
        <Col :offset="10" :span="2">
          <Button type="primary" size="large" long>登 陆</Button>
        </Col>
        <Col :span="2">
          <Button type="primary" size="large" long>注 册</Button>
        </Col>
      </router-link>
    </Row>
    <Row class="Logined" v-else>
      <router-link :to="{path:'/Student',query: {navIndex: '4-1'}}" v-show="identity=='0'">
        <Col :offset="10" :span="4">
          <Button type="primary" size="large" long style="margin-top: 20px">进入个人主页</Button>
        </Col>
      </router-link>

      <router-link :to="{path:'/Teacher',query: {navIndex: '4-1'}}" v-show="identity=='1'">
        <Col :offset="10" :span="4">
          <Button type="primary" size="large" long style="margin-top: 20px">进入个人主页</Button>
        </Col>
      </router-link>
    </Row>
  </Row>
</template>

<script>
  export default {
    name: "Main",
    data() {
      return {
        loginFlag: true,
        identity:""
      }
    },
    created: function () {
      this.checkLogin()
    },
    methods: {
      checkLogin: function () {
        var infor = window.localStorage
        this.identity=""
        if (infor.userName != undefined) {
          this.loginFlag = true
          this.identity=infor.identity
        } else {
          this.loginFlag = false
        }
      },
    }
  }
</script>

<style scoped>
  .mainBody {
    font-family: "Consolas";
  }

  .caption {
    color: white;
    text-align: center;
    margin-top: 200px;
    font-size: 70px;
    letter-spacing: 6px;
  }

  .unLoginText, .LoginedText {
    text-align: center;
    margin-top: 10px;
    color: white;
    font-size: 14px;
    letter-spacing: 5px;
    margin-bottom: 30px;
  }
</style>
