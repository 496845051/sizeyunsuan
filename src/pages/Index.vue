<template>
  <div class="layout">
    <Layout>
      <Header>
        <span style="color: white;float: left;font-family: 腾祥婀娜体简;font-size: 18px"><Icon type="calendar"></Icon> {{date}} {{time}}</span>
        <Menu mode="horizontal" theme="dark" :active-name="navIndex">
          <div class="layout-nav">
            <router-link to="/">
              <MenuItem name="1" id="nav1">
                <Icon type="home"></Icon>
                首页
              </MenuItem>
            </router-link>

            <router-link to="/Login" v-show="!loginFlag">
              <MenuItem name="2" id="nav2">
                <Icon type="log-in"></Icon>
                登陆
              </MenuItem>
            </router-link>

            <router-link to="/Homework" v-show="loginFlag&&(identity=='0')">
              <MenuItem name="3" >
                <Icon type="ios-book"></Icon>
                查看作业
              </MenuItem>
            </router-link>
            <Submenu name="4" v-show="loginFlag">
              <template slot="title">
                <Icon type="person"></Icon>
                用户
              </template>

              <router-link to="Student"  v-show="identity=='0'">
                <MenuItem name="4-1">主页</MenuItem>
              </router-link>

              <router-link to="Teacher"  v-show="identity=='1'">
                <MenuItem name="4-1">主页</MenuItem>
              </router-link>

              <MenuItem name="4-2">修改个人资料</MenuItem>
              <MenuItem name="4-3"><div @click="loginOut">注销</div></MenuItem>

            </Submenu>

          </div>
        </Menu>

      </Header>

      <Content style="margin: 20px;background: transparent;">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </Content>
      <Row style="position: absolute;width: 100%;height: 100%;z-index: -1">
        <Carousel loop :autoplay="true" :autoplay-speed="10000">
          <CarouselItem>
            <img src="../assets/img/bg1.jpg" class="carImg"/>
          </CarouselItem>
          <CarouselItem>
            <img src="../assets/img/bg2.jpg" class="carImg"/>
          </CarouselItem>
          <CarouselItem>
            <img src="../assets/img/bg3.jpg" class="carImg"/>
          </CarouselItem>
        </Carousel>
      </Row>
      <!--<Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>-->
    </Layout>
  </div>
</template>

<script>
  export default {
    name: "Index",
    data() {
      return {
        date: "",
        time: "",
        navIndex: "1",
        loginFlag: false,
        identity:""
      }
    },
    created: function () {
      this.checkDataTime()
      this.checkLogin()
    },
    methods: {
      checkDataTime: function () {
        var root = this
        setInterval(function () {
          var myDate = new Date()
          root.date = myDate.getFullYear() + "年" + (myDate.getMonth()+1 + "月") + myDate.getDate() + "日";
          root.time = myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();
        }, 1000)
      },
      loginOut: function () {
        window.localStorage.clear()
        this.$Message.success("成功注销！")
        this.checkLogin()
        this.$router.push('/Login')
      },
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

    },
    watch: {
      $route(to, from) {

        var root = this
        root.checkLogin()
      }
    }
  }
</script>

<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    /*background: #e4e6e8;*/
    /*background-image: url("../assets/img/bg3.jpg");*/
    background-size: 100%;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
  }

  .layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    text-align: center;
  }

  .layout-logo span {
    color: white;
    position: relative;
    bottom: 14px;
    font-family: 腾祥婀娜体简;
  }

  .layout-nav {
    float: right;
    margin: 0 auto;
    margin-right: 20px;
  }

  .layout-footer-center {
    text-align: center;
    border-top: 1px solid #d7dde4;
    position: absolute;
    bottom: 0px;
    width: 100%;
  }

  .ivu-layout {
    background: transparent;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  .ivu-layout-header, .ivu-menu-dark {
    background: transparent;
  }
  .carImg{
    width: 100%;
  }
</style>
