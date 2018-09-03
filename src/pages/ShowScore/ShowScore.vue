<template>
  <Row style="margin-top: 30px">
    <Col :offset="2" :span="20">
      <Card>
        <p slot="title">成绩展示</p>
        <Row>
          <router-link to="HomeWork">
            <Button type="text" style="margin-bottom: 20px">< 返回</Button>
          </router-link>
        </Row>
        <Row class="score">您的成绩为：{{score}}分</Row>
        <Row :gutter="50" style="margin-top: 20px;margin-bottom: 20px">
          <Col :span="8" style="text-align: center">
            <p style="margin: 10px">答对数</p>
            <i-circle :percent="current*100/quesLength">
              <span class="demo-Circle-inner" style="font-size:24px">{{current}}</span>
            </i-circle>
          </Col>
          <Col :span="8" style="text-align: center">
            <p style="margin-top: 10px;margin-bottom: 10px">打错数</p>
            <i-circle :percent="error*100/quesLength"  stroke-color="#5cb85c">
              <span class="demo-Circle-inner" style="font-size:24px">{{error}}</span>
            </i-circle>
          </Col>
          <Col :span="8" style="text-align: center">
            <p style="margin-top: 10px;margin-bottom: 10px">漏答</p>
            <i-circle :percent="blank*100/quesLength"  stroke-color="#ff5500">
              <span class="demo-Circle-inner" style="font-size:24px">{{blank}}</span>
            </i-circle>
          </Col>
        </Row>

        <Table :columns="columns1" :data="quesList"></Table>
      </Card>
    </Col>
  </Row>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        quesList:[],
        columns1: [
          {
            title: '题目',
            key: 'question'
          },
          {
            title: '答案',
            key: 'answer'
          },
          {
            title: '您的回答',
            key: 'myanswer'
          },
          {
            title: ' ',
            key: 'status'
          }
        ],
        score:0,
        quesLength:0,
        current:0,
        error:0,
        blank:0
      }
    },
    created: function () {
      this.quesList=JSON.parse(window.localStorage.quesList)
      this.quesLength=this.quesList.length
      for(var index in this.quesList){
        this.quesList[index].status=(this.quesList[index].answer==this.quesList[index].myanswer)?'√':'✖'
        if(this.quesList[index].myanswer==""){
          this.blank++
        }
        else if(this.quesList[index].myanswer==this.quesList[index].answer){
          this.current++
        }else {
          this.error++
        }
      }
      this.score=parseInt(this.current*100/(this.quesLength))
    },
    methods: {

    }
  }
</script>

<style scoped>
  .score{
    margin-bottom: 10px;
    font-size: 15px;
  }
</style>
