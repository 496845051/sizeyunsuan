<template>
  <Row>
    <Col :span="20" :offset="2">
      <Row style="margin-top: 30px">

        <Card>
          <p slot="title">创建作业</p>
          <Button type="text" style="margin-bottom: 20px" @click="routerBack">< 返回</Button>
          <Form :model="quesInfors" :label-width="80">
            <Row style="margin-top: 30px">
              <Col :span="16" :offset="4">
                <FormItem label="创建者：">
                  <Input v-model="quesInfors.userName" disabled></Input>
                </FormItem>
                <FormItem label="作业名：">
                  <Input v-model="quesInfors.workName"></Input>
                </FormItem>
                <FormItem label="发布班级：">
                  <Select v-model="quesInfors.className">
                    <Option v-for="item in classList" :value="item.className">{{item.className}}</Option>
                  </Select>
                </FormItem>
                <FormItem label="截止时间：">
                  <DatePicker type="date" v-model="quesInfors.date"></DatePicker>
                  <TimePicker type="time" v-model="quesInfors.time"></TimePicker>
                </FormItem>
                <FormItem v-for="item in quesList" :label="'题目'+(item.index+1)+'：'">
                  <Input v-model="item.question"></Input>
                </FormItem>
                <Row style="text-align: right">
                  <Button type="primary" icon="plus-round" @click="questionAdd"></Button>
                  <Button type="primary" icon="minus-round" @click="questionDec"></Button>
                </Row>
                <FormItem>
                  <Button type="primary" @click="submit">提交</Button>
                </FormItem>
              </Col>
            </Row>

          </Form>
        </Card>
      </Row>
    </Col>
  </Row>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        quesInfors: {
          userName: "",
          workName: "作业1",
          className: "集美大学",
          limitTime: "",
          date: "2018-06-13",
          time: "00:03:00"
        },
        classList: [],
        quesList:[
          {
            question:"1+2*3=",
            index:0
          }
          ]
      }
    },
    created: function () {
      this.quesInfors.userName = window.localStorage.userName
      this.getClass()
    },
    methods: {
      routerBack: function () {
        this.$router.back()
      },
      getClass: function () {
        var userName = window.localStorage.userName
        var root = this
        root.$ajax.get('/api/Class', {
          params: {
            userName: userName
          }
        }).then((data) => {
          root.classList = data.data.detail
        })
      },
      submit:function () {
        var date=new Date(this.quesInfors.date)
        var dateStr=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+this.quesInfors.time
        this.quesInfors.limitTime=dateStr
        var root=this
        var params = new URLSearchParams()
        for(var key in root.quesInfors)
          params.append(key,root.quesInfors[key])
        root.$ajax.post('api/HomeWork',params).then((data)=>{
          if(data.data.data){
            var array={"array":root.quesList}
            var params = new URLSearchParams()
            params.append("userName",root.quesInfors.userName)
            params.append("workName",root.quesInfors.workName)
            params.append("data",JSON.stringify(root.quesList))
            root.$ajax.post('api/Question',params).then((data)=>{
              root.$Message.success(data.data.message)
              root.$router.push('AddWork')
            })
          }else {
            root.$Message.error(data.data.message)
          }
        })
      },
      questionDec:function () {
        var root=this
        root.quesList=root.quesList.slice(0,root.quesList.length-1)
      },
      questionAdd:function () {
        var root=this
        root.quesList.push({
          question:"",
          index:root.quesList.length
        })
      }
    }
  }
</script>

<style scoped>

</style>
