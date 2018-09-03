<template>
  <Row>
    <Row style="margin-top: 100px">
      <Col :offset="6" :span="12">
        <Card>
          <p slot="title">第{{(quesIndex+1)}}题</p>
          <Row>
            <Button type="text" v-show="quesIndex!=0" style="float: left" @click="backQues"><Icon type="chevron-left"></Icon> 上一题</Button>
            <Button type="text"  v-show="quesIndex!=quesLength-1" style="float: right" @click="nextQues">下一题 <Icon type="chevron-right"></Icon></Button>
          </Row>
          <p class="card-body ivu-card-body">{{question}}</p>
          <Row>
            答案：<Input v-model="myanswer" style="margin-top: 10px"></Input>
          </Row>
          <Row style="margin-top: 10px" >
            <Button @click="addText('1')" type="info">1</Button>
            <Button @click="addText('2')" type="success">2</Button>
            <Button @click="addText('3')" type="warning">3</Button>
            <Button @click="addText('4')" type="error">4</Button>
            <Button @click="addText('5')" type="info">5</Button>
            <Button @click="addText('6')" type="success">6</Button>
            <Button @click="addText('7')" type="warning">7</Button>
            <Button @click="addText('8')" type="error">8</Button>
            <Button @click="addText('9')" type="info">9</Button>
            <Button @click="addText('0')" type="success">0</Button>
            <Button @click="addText('+')" type="warning">+</Button>
            <Button @click="addText('-')" type="error">-</Button>
            <Button @click="addText('*')" type="info">*</Button>
            <Button @click="addText('/')" type="success">/</Button>

          </Row>
          <Row style="margin-top: 10px">
            <!--<Button type="primary" style="float: right;margin-left: 10px">选择题目</Button>-->
            <router-link :to="{path:'/ChooseWork',query:{quesIndex:quesIndex}}">
              <Button type="primary" icon="ios-search">选择题目</Button>
            </router-link>
            <Button type="default" style="float: right;margin-left: 10px" @click="myanswer=''">重置</Button>
            <Button type="primary" style="float: right" @click="submit">提交</Button>
          </Row>
        </Card>
      </Col>
    </Row>
  </Row>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        question:"",
        myanswer:"",
        quesIndex:0,
        quesList:[],
        quesLength:0
      }
    },
    created: function () {
      this.getInfors()
    },
    methods: {
      getInfors:function(){
        this.quesList=JSON.parse(window.localStorage.quesList)
        this.quesIndex=parseInt(window.localStorage.quesIndex)
        this.question=this.quesList[this.quesIndex].question
        this.quesLength=this.quesList.length
        this.myanswer=this.quesList[this.quesIndex].myanswer
      },
      addText:function (char) {
        this.myanswer+=char
      },
      submit:function () {
        var ans=this.myanswer
        var charArray=['0','1','2','3','4','5','6','7','8','9','0','+','-','*','/']
        var flag=true
        for(var index in ans){
          if(!(ans[index] in charArray)){
            flag=false
          }
        }
        if(flag){
          this.postQuesList()
        }else {
          this.$Message.error("您输入的答案有误！")
        }
      },
      postQuesList:function(){
        var root=this
        var params = new URLSearchParams()
        params.append("userName", window.localStorage.userName)
        params.append("workid", window.localStorage.workid)
        params.append("scoreid", window.localStorage.scoreId)
        params.append("data",window.localStorage.quesList)
        root.$ajax.post('/api/Score',params).then((data)=>{

        })
        root.$router.push('/ShowScore')
      },
      backQues:function () {
        window.localStorage.setItem("quesIndex",this.quesIndex-1)
        this.getInfors()
      },
      nextQues:function () {
        window.localStorage.setItem("quesIndex",this.quesIndex+1)
        this.getInfors()
      }
    },
    watch:{
      myanswer(curVal,oldVal){
        this.quesList[this.quesIndex].myanswer=curVal
        window.localStorage.setItem("quesList",JSON.stringify(this.quesList))
      },
    }
  }
</script>

<style scoped>
  .card-body{
    text-align: center;
    font-family: "Curlz MT";
    font-size: 30px;
    letter-spacing: 10px;
    font-weight: 700;
  }
</style>
