<template>
  <Row>
    <Row style="margin-top: 50px">
      <Col :span="16" :offset="4">
        <Card style="height: 600px;">
          <p slot="title">查看作业详情</p>
          <Button type="text" @click="$router.back()" style="margin-left: 10px"><Icon type="chevron-left"></Icon> 返回</Button>
          <Table :columns="titleColums" :data="quesArray" style="margin: 10px" height="470"></Table>
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
        quesCount:30,
        quesArray:[],
        titleColums: [
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
          }
        ],
      }
    },
    created: function () {
      var root = this
      var userName=window.localStorage.userName
      var workid=window.localStorage.workid
      root.$ajax.get('/api/Score',{params:{
        userName:userName,
          workid:workid
        }}).then((data)=>{
          root.quesArray=data.data.detail
      })
    },
    methods: {}
  }
</script>

<style scoped>
  .ivu-table .demo-table-info-row td{
    background-color: #2db7f5;
    color: #fff;
  }
  .ivu-table .demo-table-error-row td{
    background-color: #ff6600;
    color: #fff;
  }
  .ivu-table td.demo-table-info-column{
    background-color: #2db7f5;
    color: #fff;
  }
  .ivu-table .demo-table-info-cell-name {
    background-color: #2db7f5;
    color: #fff;
  }
  .ivu-table .demo-table-info-cell-age {
    background-color: #ff6600;
    color: #fff;
  }
  .ivu-table .demo-table-info-cell-address {
    background-color: #187;
    color: #fff;
  }
</style>
