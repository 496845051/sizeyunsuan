<template>
  <Row>
    <Row style="margin-top: 30px">
      <Col :span="20" :offset="2">
        <Card style="height: 600px;">
          <p slot="title">查看作业详情</p>
          <Button type="text" @click="$router.back()" style="margin-left: 10px">
            <Icon type="chevron-left"></Icon>
            返回
          </Button>
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
        workId: "",
        workName: "",
        quesCount: 30,
        quesArray: [],
        titleColums: [
          {
            title: '题目',
            key: 'question'
          },
          {
            title: '您的回答',
            key: 'answer'
          }
        ],
      }
    },
    created: function () {
      this.workId = this.$route.query.workId
      this.workName = this.$route.query.workName
      this.getWorkDetail()
    },
    methods: {
      getWorkDetail: function () {
        var root = this
        root.$ajax.get('/api/HomeWork', {
          params: {
            workName: root.workName
          }
        }).then((data) => {
          root.quesArray=data.data.data
        })
      }
    }
  }
</script>

<style scoped>
  .ivu-table .demo-table-info-row td {
    background-color: #2db7f5;
    color: #fff;
  }

  .ivu-table .demo-table-error-row td {
    background-color: #ff6600;
    color: #fff;
  }

  .ivu-table td.demo-table-info-column {
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
