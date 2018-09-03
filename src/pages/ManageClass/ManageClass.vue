<template>
  <Row style="margin-top: 30px">
    <!--新建班级模态框-->

    <Col :offset="1" :span="22">
      <Row style="margin-bottom: 10px">
        <Button type="text" style="color: white" @click="routerBack">< 返回</Button>
        <Button type="primary" @click="modelShow=!modelShow" style="margin-left: 30px">+ 添加</Button>

        <Modal
          v-model="modelShow"
          title="新建班级"
          @on-ok="addClass">
          <Form :model="formInfors" :label-width="80">
            <FormItem label="学校名：">
              <Input v-model="formInfors.schoolName"></Input>
            </FormItem>

            <FormItem label="班级名：">
              <Input v-model="formInfors.className"></Input>
            </FormItem>
          </Form>
        </Modal>
      </Row>
      <Row :gutter="20">
        <Col :span="5" v-for="item,value in classList" style="margin-bottom: 30px">
          <Row class="card">
            <Row class="card-caption primary">
              {{item.className}}
            </Row>
            <Row class="ivu-card-body">
              <p>学校：{{item.schoolName}}</p>
              <p>人数：30</p>
              <p>邀请码：{{item.inviteCode}}</p>

              <Row style="margin-top: 10px">

                <Button type="primary" @click="showStudent(item.classId)">管理</Button>
                <Modal
                  v-model="modelShow1"
                  :title="item.className"
                  >
                  <Table :columns="columns1" :data="stuList"></Table>
                </Modal>
                <Button type="error">删除</Button>
              </Row>

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
        classList: [],
        modelShow: false,
        modelShow1:false,
        formInfors: {
          userName: "",
          className: "",
          schoolName: ""
        },
        stuList:[],
        columns1: [
          {
            title: '姓名',
            key: 'realName'
          },
          {
            title: '用户名',
            key: 'userName'
          },
          {
            title: '邮箱',
            key: 'email'
          }
        ],
      }
    },
    created: function () {
      this.formInfors.userName = window.localStorage.userName
      this.getClass()
    },
    methods: {

      routerBack: function () {
        this.$router.back()

      },
      addClass: function () {
        var root = this
        var params = new URLSearchParams()
        for (var key in root.formInfors)
          params.append(key, root.formInfors[key])
        root.$ajax.post('/api/Class', params).then((data) => {
          // console.log(data)
          this.$Message.success(data.data.message)
          root.getClass()
        })

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
      showStudent: function (id) {
        var root=this
        root.modelShow1=!root.modelShow1
        root.$ajax.get('/api/Class', {
          params: {
            classId: id
          }
        }).then((data) => {
          root.stuList=data.data.detail
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
