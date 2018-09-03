<template>
  <Row style="margin-top: 20px">
    <Col :offset="1" :span="22">
      <Row :gutter="20">
        <Col :span="6">
          <p class="caption">您好！{{realName}}</p>
        </Col>
        <Col :span="10">
          <Card>
            <p slot="title">
              作业完成情况
            </p>
            <Row style="text-align: center">
              <i-circle :percent="80">
                <span class="demo-Circle-inner" style="font-size:24px">80%</span>
              </i-circle>
            </Row>

          </Card>
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
        realName:""
      }
    },
    created: function () {
      this.realName=window.localStorage.realName
    },
    methods: {}
  }
</script>

<style scoped>
  .caption{
    font-size: 50px;
    color: white;
    letter-spacing: 5px;
    font-family: 腾祥婀娜体简;
  }
</style>
