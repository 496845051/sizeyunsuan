<template>
  <Row>
    <Col :span="20" :offset="2">
      <Row style="margin-top: 60px" :gutter="20">

        <!--<Col class="caption" :span="8">-->
        <!--<p>{{realName}}老师</p>-->
        <!--<p style="text-indent: 100px">欢迎您</p>-->
        <!--</Col>-->

        <Col :span="14">
          <Row class="card">
            <Row class="card-title primary">
              作业情况
            </Row>
            <Row class="card-body">
              <Form :model="formInline" inline>
                <FormItem>
                  <Select v-model="formInline.homework" style="width:200px">
                    <Option v-for="item in homeworkList" :value="item.workId" :key="item.workId">{{ item.workName }}
                    </Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <Select v-model="formInline.className" style="width:200px">
                    <Option v-for="item in classList" :value="item.classId" :key="item.classId">{{ item.className }}
                    </Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <Button type="primary" @click="handleSubmit('formInline')">查询</Button>
                </FormItem>
              </Form>
              <Row style="text-align: center;margin-bottom: 20px" :gutter="20">
                <Col :span="6">
                  <Card>
                    <p class="circle-title">作业完成率</p>
                    <i-circle :percent="80">
                      <span class="demo-Circle-inner" style="font-size:24px">80%</span>
                    </i-circle>
                  </Card>
                </Col>

                <Col :span="6">
                  <Card>
                    <p class="circle-title">作业迟交率</p>
                    <i-circle :percent="15" stroke-color="#ff9900">
                      <span class="demo-Circle-inner" style="font-size:24px">15%</span>
                    </i-circle>
                  </Card>
                </Col>

                <Col :span="6">
                  <Card>
                    <p class="circle-title">作业未交率</p>
                    <i-circle :percent="5" stroke-color="#ed3f14">
                      <span class="demo-Circle-inner" style="font-size:24px">5%</span>
                    </i-circle>
                  </Card>
                </Col>

                <Col :span="6">
                  <Card>
                    <p class="circle-title">平均得分</p>
                    <i-circle :percent="85" stroke-color="#19be6b">
                      <span class="demo-Circle-inner" style="font-size:24px">85%</span>
                    </i-circle>
                  </Card>
                </Col>
              </Row>
            </Row>
          </Row>

        </Col>
        <Col :span="10">
          <Row class="card">
            <Row class="card-title primary">信息榜</Row>
            <Row style="padding: 10px">
              <Row v-for="item in informations" class="infor">
                <p>{{item}}</p>
              </Row>
            </Row>
          </Row>
        </Col>
      </Row>

      <Row style="margin-top: 50px" :gutter="20">
        <Col :span="4">
          <div class="card primary">
            <div class="card-body">
              <p style="text-align: center;font-size: 16px;color: white;letter-spacing: 5px">
                <Icon type="person"></Icon>
                个人信息
              </p>
            </div>
          </div>
        </Col>


        <Col :span="4">
          <router-link to="ManageClass">
            <div class="card warning">
              <div class="card-body">
                <p style="text-align: center;font-size: 16px;color: white;letter-spacing: 5px">
                  <Icon type="person-stalker"></Icon>
                  班级
                </p>
              </div>
            </div>
          </router-link>
        </Col>


        <Col :span="4">
          <router-link to="AddWork">
            <div class="card error">
              <div class="card-body">
                <p style="text-align: center;font-size: 16px;color: white;letter-spacing: 5px">
                  <Icon type="ios-book"></Icon>
                  作业
                </p>
              </div>
            </div>
          </router-link>
        </Col>


        <Col :span="4">
          <div class="card success">
            <div class="card-body">
              <p style="text-align: center;font-size: 16px;color: white;letter-spacing: 5px">
                <Icon type="chatbubbles"></Icon>
                发送私信
              </p>
            </div>
          </div>
        </Col>


        <Col :span="4">
          <div class="card" style="background-color: #CC6699">
            <div class="card-body">
              <p style="text-align: center;font-size: 16px;color: white;letter-spacing: 5px">
                <Icon type="shuffle"></Icon>
                切换用户
              </p>
            </div>
          </div>
        </Col>

        <Col :span="4">
          <div class="card" style="background-color: #1c2438">
            <div class="card-body">
              <p style="text-align: center;font-size: 16px;color: white;letter-spacing: 5px">
                <Icon type="close"></Icon>
                注销
              </p>
            </div>
          </div>
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
        realName: "",
        formInline: {
          homework: "1",
          className: "1"
        },
        homeworkList: [
          {
            workId: "1",
            workName: "作业1"
          },
          {
            workId: "2",
            workName: "作业2"
          }, {
            workId: "3",
            workName: "作业2"
          }
        ],
        classList: [
          {
            classId: "1",
            className: "班级1"
          },
          {
            classId: "2",
            className: "班级2"
          }, {
            classId: "3",
            className: "班级3"
          }
        ],
        informations: [
          "张三于2018年6月13日完成了作业1，得分为80分。",
          "张三于2018年6月13日完成了作业1，得分为80分。",
          "张三于2018年6月13日完成了作业1，得分为80分。",
          "张三于2018年6月13日完成了作业1，得分为80分。",
          "张三于2018年6月13日完成了作业1，得分为80分。"
        ]
      }
    },
    created: function () {
      this.realName = window.localStorage.realName
    },
    methods: {}
  }
</script>

<style scoped>
  .caption {
    font-size: 50px;
    color: white;
    text-align: center;
    font-family: 腾祥婀娜体简;
    margin-top: 60px;
  }

  .card {
    background-color: white;
    border-radius: 5px;
    overflow: hidden;
    transition: box-shadow 0.5s;
  }

  .card:hover {
    box-shadow: #fff7ff 0px 0px 10px;
  }

  .card-title {
    color: white;
    padding: 10px;
    padding-left: 20px;
    font-size: 14px;
    letter-spacing: 2px;
  }

  .primary {
    background: #2d8cf0;
  }

  .success {
    background: #19be6b;
  }

  .warning {
    background: #ff9900;
  }

  .error {
    background: #ed3f14;
  }

  .card-body {
    padding: 30px;
  }

  .circle-title {
    font-size: 15px;
    margin-bottom: 20px;
  }

  .infor {
    padding: 7px;
    font-size: 13px;
    border-bottom: 1px solid;
  }
</style>
