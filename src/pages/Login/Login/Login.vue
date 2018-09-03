<template>
  <Card style="margin-top: 30px">
    <p slot="title" style="text-align: center" class="nav-title">登陆界面</p>
    <Row>
      <router-link :to="{path:'/',query:{navIndex:'1'}}">
        <Button type="text" icon="chevron-left">返回</Button>
      </router-link>
    </Row>

    <Row style="margin-top: 20px">

      <Col :offset="2" span="20">
        <Form :model="userInofrs" ref="userInofrs" :rules="ruleValidate" :label-width="80">

          <FormItem label="用户名：" prop="userName">
            <Input v-model="userInofrs.userName" placeholder="请输入您的用户名"></Input>
          </FormItem>

          <FormItem label="密码：" prop="password">
            <Input v-model="userInofrs.password" type="password" placeholder="请输入您的密码"></Input>
          </FormItem>

          <FormItem label="身份：" prop="identity">
            <Select v-model="userInofrs.identity">
              <Option value="0">学生</Option>
              <Option value="2">家长</Option>
              <Option value="1">老师</Option>
            </Select>
          </FormItem>


          <FormItem label="验证码：" prop="verifyCode">
            <Input v-model="userInofrs.verifyCode" placeholder="请输入验证码" @on-blur="checkVerifyCode"></Input>
            <img :src="'data:image/png;base64,'+verifyCodeImg" @click="getVerifyCodeImg" style="margin-top: 10px">
          </FormItem>

          <FormItem style="text-align: center">
            <Button type="primary" long @click="handleSubmit('userInofrs')">登陆</Button>
          </FormItem>


          <FormItem style="text-align: right">
            <router-link to="/Login/Register">
              <Button type="text">注册</Button>
            </router-link>

            <Button type="text" style="margin-left: 8px">忘记密码</Button>
          </FormItem>

        </Form>
      </Col>

    </Row>
  </Card>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        userInofrs: {
          userName: "lianjiaming",
          password: "123456",
          verifyCode: "123",
          identity: "0",
          imgUrl:""
        },
        ruleValidate: {
          userName: {required: true, message: '用户名不能为空！', trigger: 'blur'},
          password: {required: true, message: '密码不能为空！', trigger: 'blur'},
          verifyCode: {required: true, message: '验证码不能为空', trigger: 'blur'},
          identity: {required: true, message: '身份不能为空', trigger: 'blur'},
        },
        submitLoading: false,
        verifyCodeImg:"",
        verifyCheck:false
      }
    },
    created: function () {
      this.getVerifyCodeImg()
    },
    methods: {
      handleSubmit(name) {
        var root = this
        this.$refs[name].validate((valid) => {
          if (valid) {
            root.sendMessage()
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      sendMessage: function () {
        var root = this
        if(root.verifyCheck){
          root.$ajax.get('/api/User', {
            params: {
              userName: root.userInofrs.userName,
              password: root.userInofrs.password,
              identity: root.userInofrs.identity
            }
          }).then(function (data) {
            var data = data.data
            if(data.data==1){
              var infors=data.detail
              for(var key in infors){
                window.localStorage.setItem(key,infors[key])
              }
              root.$Message.success("登陆成功！")
              root.$router.push('/')
              // console.log(root.localStorage)
            }else {
              root.$Message.error(data.message)
            }
          })
        }else {
          root.checkVerifyCode()

          if(root.verifyCheck) {
            root.$ajax.get('/api/User', {
              params: {
                userName: root.userInofrs.userName,
                password: root.userInofrs.password,
                identity: root.userInofrs.identity
              }
            }).then(function (data) {
              var data = data.data
              if (data.data == 1) {
                window.localStorage.setItem("userName", root.userInofrs.userName)
                window.localStorage.setItem("identity", root.userInofrs.identity)
                window.localStorage.setItem("realName", data.realName)
                root.$Message.success("登陆成功！")
                root.$router.push('/')
                // console.log(root.localStorage)
              } else {
                root.$Message.error(data.message)
              }
            })
          }
        }

      },
      getVerifyCodeImg:function () {
        var root=this
        root.verifyCheck=false
        root.$ajax.get('api/VerifyCode').then((data)=>{
          root.verifyCodeImg=data.data
        })
      },
      checkVerifyCode:function () {
        var root=this
        var params = new URLSearchParams()
        params.append('VerifyCode',this.userInofrs.verifyCode)
        root.$ajax.post('api/VerifyCode',params).then((data)=>{
          if(data.data.data){
            root.verifyCheck=true
          }else {
            root.$Message.error(data.data.message)
            root.verifyCheck=false
          }
        })
      }
    }
  }
</script>

<style scoped>
  .nav-title {
    font-size: 18px;
    margin-top: 10px;
    margin-bottom: 10px;
    font-weight: 500;
  }
</style>
