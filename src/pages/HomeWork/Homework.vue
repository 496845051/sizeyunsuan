<template>
  <Row style="margin-top: 30px">
    <Col :offset="1" :span="22">
      <Row :gutter="20">
        <Col :span="5" v-for="item,value in homeworkList">
          <Row class="card">
            <Row :class="{ 'card-caption primary': true, 'primary': item.status, 'warning': !item.status }">
              <span>{{item.workName}}</span>
              <span style="float: right;padding-right: 10px" v-if="item.status"><Icon
                type="checkmark"></Icon> 已完成</span>
              <span style="float: right;padding-right: 10px" v-else><Icon type="close"></Icon> 未完成</span>
            </Row>
            <Row class="ivu-card-body">
              <p>题目数：{{item.number}}</p>
              <p>截止时间：{{item.limitTime}}</p>
              <p>布置者：{{item.teacher}} 老师</p>
              <Button type="error" v-if="!item.status" style="float: right"
                      @click="doHomeWork(item.scoreid,item.workName,item.workid)">开始答题
              </Button>
              <Button type="primary" v-else style="float: right" @click="checkWorkDetail(item.workid)">答题情况</Button>
            </Row>
          </Row>
        </Col>
      </Row>
    </Col>
  </Row>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        date: "",
        time: "",
        homeworkList: [

        ],
        userName: "",
        identity: ""
      }
    },
    created: function () {
      this.userName = window.localStorage.userName
      this.identity = window.localStorage.identity
      this.getHomeWork()
    },
    methods: {
      doHomeWork: function (scoreId, workName ,workid) {
        var root = this
        window.localStorage.setItem("scoreId", scoreId)
        window.localStorage.setItem("workid", workid)
        root.$ajax.get("/api/HomeWork", {
          params: {
            workName: workName
          }
        }).then((data) => {
          for(var index in data.data.data){
            data.data.data[index]['myanswer']=""
          }
          window.localStorage.setItem("quesList",JSON.stringify(data.data.data))
          window.localStorage.setItem("quesIndex",0)
          this.$router.push('/DoWork')
        })

      },
      checkWorkDetail: function (workId) {
        window.localStorage.setItem("workid",workId)

        this.$router.push('/WorkDetail')
      },
      getHomeWork: function () {
        var root = this
        root.$ajax.get('/api/HomeWork', {
          params: {
            userName: root.userName,
            identity: root.identity
          }
        }).then((data) => {
          root.homeworkList = data.data.detail
        })
      }
    }
  }
</script>

<style scoped>
  .card {
    background: white;
    border-radius: 5px;
    overflow: hidden;
  }

  .card .card-caption {
    padding: 12px;
    color: white;
  }

  .primary {
    background-color: #2d8cf0;
  }

  .warning {
    background-color: #ed3f14;
  }

  .card .ivu-card-body p {
    margin-bottom: 5px;
  }
</style>
