<template>
  <Card>
    <p slot="title" style="text-align: center" class="nav-title">注册页面</p>
    <Row>
      <Button type="text" icon="chevron-left" @click="$router.back()">返回</Button>
    </Row>

    <Row style="margin-top: 20px">

      <Col :offset="2" span="20">
        <Form :model="userInofrs" ref="userInofrs" :rules="ruleValidate" :label-width="120">

          <FormItem label="手机：" prop="userName">
            <Input v-model="userInofrs.userName" placeholder="请输入您的用户名"></Input>
          </FormItem>

          <FormItem label="密码：" prop="password">
            <Input v-model="userInofrs.password" placeholder="请输入您的密码" type="password"></Input>
          </FormItem>

          <FormItem label="重复密码：" prop="repeatPwd">
            <Input v-model="userInofrs.repeatPwd" placeholder="请输入您的密码" type="password"></Input>
          </FormItem>

          <FormItem label="真实姓名：" prop="realName">
            <Input v-model="userInofrs.realName" placeholder="请输入您的密码"></Input>
          </FormItem>

          <FormItem label="邮箱：" prop="email">
            <Input v-model="userInofrs.email" placeholder="请输入您的邮箱"></Input>
          </FormItem>

          <FormItem label="身份："  prop="identity">
            <Select v-model="userInofrs.identity">
              <Option value="0">学生</Option>
              <Option value="1">老师</Option>
              <Option value="2">家长</Option>
            </Select>
          </FormItem>

          <FormItem v-show="userInofrs.identity=='0'" label="学生证号：" prop="idNumber">
            <Input v-model="userInofrs.idNumber" placeholder="请输入学生证号"></Input>
          </FormItem>

          <FormItem v-show="userInofrs.identity=='1'" label="教工号：" prop="idNumber">
            <Input v-model="userInofrs.idNumber" placeholder="请输入教工号" ></Input>
          </FormItem>

          <FormItem v-show="userInofrs.identity=='0'" label="班级邀请码：" prop="inviteCode">
            <Input v-model="userInofrs.inviteCode" placeholder="若需要可输入班级号"></Input>
          </FormItem>

          <FormItem label="验证码：" prop="verifyCode">
            <Input v-model="userInofrs.verifyCode" placeholder="请输入验证码" @on-blur="checkVerifyCode"></Input>
            <img :src="'data:image/png;base64,'+verifyCodeImg" @click="getVerifyCodeImg" style="margin-top: 10px">
          </FormItem>

          <FormItem style="text-align: center">
            <Button type="primary" long @click="handleSubmit('userInofrs')">注册</Button>
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
      const validateUserName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('用户名不能为空！'));
          root.userNamePrimary=false
        } else {
          var userName=this.userInofrs.userName
          var root=this
          root.$ajax.get('/api/User',{params:{
              userName:userName
            }}).then(function (data) {
            if(data.data.data){
              root.userNamePrimary=true
              callback();
            }else {
              root.userNamePrimary=false
              callback(new Error('该用户名已存在!'));
            }
          })
        }
      };
      const validateRepeatPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('重复密码不能为空！'));
          root.repeatPwdChk=false
        } else {
          var password=this.userInofrs.password
          var repeatPwd=this.userInofrs.repeatPwd
          if(password!=repeatPwd){
            this.repeatPwdChk=false
            callback(new Error('两处密码不一致！'));
          }else {
            this.repeatPwdChk=true
            callback()
          }
        }
      };
      return {
        userInofrs:{
          userName:"123",
          password:"456",
          repeatPwd:"456",
          email:"496845051@qq.com",
          realName:"123",
          idNumber:"123456789",
          verifyCode:"",
          identity:"1",
          inviteCode:""
        },
        ruleValidate:{
          userName:[{ required: true,validator:validateUserName, trigger: 'blur' }],
          password:[{ required: true, message: '密码不能为空！', trigger: 'blur' }],
          repeatPwd:[{ required: true, validator:validateRepeatPwd, trigger: 'blur' }],
          email:[{ required: true, message: '邮箱不能为空', trigger: 'blur' },
            { type: 'email', message: '输入的字符串不符合邮箱格式', trigger: 'blur' }],
          realName:[{ required: true, message: '真实姓名不能为空！', trigger: 'blur' }],
          idNumber:[{ required: true, message: '号码不能为空！', trigger: 'blur' }],
          verifyCode:[{ required: true, message: '验证码不能为空！', trigger: 'blur' }],
          identity:[{ required: true, message: '身份不能为空！', trigger: 'blur' }],
          // inviteCode:[{ required: true, message: '班级邀请码不能为空！', trigger: 'blur' }],
          inviteCode:[],
        },
        userNamePrimary:false,
        repeatPwdChk:false,
        verifyCodeImg:"",
        verifyCheck:false
      }
    },
    created: function () {
      this.getVerifyCodeImg()
    },
    methods: {
      handleSubmit (name) {
        var root=this
        this.$refs[name].validate((valid) => {
          if (valid && root.userNamePrimary && root.repeatPwdChk && root.verifyCheck) {

            var params = new URLSearchParams()
            for(var key in root.userInofrs)
              params.append(key,root.userInofrs[key])

            root.$ajax.post('/api/User',params).then((data)=>{
              if(data.data.data){
                root.$Message.success("注册成功！")
                root.$router.push('/Login')
              }else {
                root.$Message.success("注册失败！")
              }
            })
          } else {
            this.$Message.error('您输入的信息有误，请重新输入！');
          }
        })
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
  .nav-title{
    font-size: 18px;
    margin-top: 10px;
    margin-bottom: 10px;
    font-weight: 500;
  }
</style>
