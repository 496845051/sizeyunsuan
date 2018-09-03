<template>
  <Row style="margin-top: 30px;overflow-y: scroll;height: 600px">
    <Col :offset="1" :span="22">
      <Row style="margin-bottom: 10px">
        <Button type="text" style="color: white" @click="routerBack">< 返回</Button>
        <Button type="primary" @click="addWork" style="margin-left: 30px">+ 添加</Button>
      </Row>
      <Row :gutter="20">
        <Col :span="5" v-for="item,value in homeworkList" style="margin-bottom: 20px">
          <Row class="card">
            <Row :class="{ 'card-caption primary': true, 'primary': item.status, 'warning': !item.status }">
              <span>{{item.workName}}</span>
              <span style="float: right;padding-right: 10px" v-if="item.status"> 未截止</span>
              <span style="float: right;padding-right: 10px" v-else> 已截止</span>
            </Row>
            <Row class="ivu-card-body">
              <p>题目数：{{item.qnum}}</p>
              <p>截止时间：{{item.limitTime}}</p>
              <p>布置者：{{item.createfrom}} 老师</p>
              <Button :type="item.status?'primary':'error'" style="float: right" @click="WorkDetail(item.workId,item.workName)">查看题目
              </Button>
            </Row>
          </Row>
        </Col>
      </Row>
    </Col>
  </Row>
</template>

<script>
  export default {
    workName: "",
    data() {
      return {
        date: "",
        time: "",
        homeworkList: [],
        modelShow: false,
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
      routerBack: function () {
        this.$router.back()
      },
      WorkDetail: function (workId,workName) {
        this.$router.push({
          path: 'TeaWorkDetail',
          name: 'TeaWorkDetail',
          query: {
              workId: workId,
              workName:workName
          }
        })
      },
      addWork: function () {
        this.$router.push('AddDetailWork')
      },
      getHomeWork: function () {
        var root = this
        root.$ajax.get('/api/HomeWork', {
          params: {
            userName:root.userName,
            // userName: "teacher",
            identity: root.identity
          }
        }).then((data) => {
          root.homeworkList = data.data.detail
          if (data.data.data) {
            for (var index in root.homeworkList) {
              root.homeworkList[index].limitTime = root.transTime(root.homeworkList[index].limitTime)
              root.homeworkList[index].createTime = root.transTime(root.homeworkList[index].createTime)
              var time = root.homeworkList[index].limitTime
              var time1 = new Date(time[0], parseInt(time[1]) - 1, time[2], time[3], time[4], time[5])
              root.homeworkList[index].limitTime = time1.getFullYear() + "年" + (time1.getMonth() + 1) + "月" + time1.getDate() + "日   " + time1.getHours() + "时" + time1.getMinutes() + "分" + time1.getSeconds() + "秒"
              var now = new Date()
              if (time1 > now) {
                root.homeworkList[index].status = true
              } else {
                root.homeworkList[index].status = false
              }

            }

          } else {

          }
        })
      },
      transTime: function (time) {
        var data = time.split('T')[0].split('-')
        var time = time.split('T')[1]
        time = time.substring(0, time.length - 1).split(':')
        data = data.concat(time)
        return data
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
