<template>
  <Row>
    <Row style="margin-top: 100px">
      <Col :offset="6" :span="12">
        <Card>
          <p slot="title">选题页面</p>
          <Button type="text" @click="$router.back()" style="margin-left: 10px"><Icon type="chevron-left"></Icon> 返回</Button>
          <Row style="text-align: center">
            <Tooltip :content="item.question"   v-for="item,index in quesList">
              <Button class="button" :type="(index==quesIndex)?'primary':'default'" @click="toQuestion(index)">
                {{index+1}}
              </Button>
            </Tooltip>
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
        quesIndex: 0,
        quesLength: 30,
        quesList: []
      }
    },
    created: function () {
      this.quesList=JSON.parse(window.localStorage.quesList)
      this.quesIndex=window.localStorage.quesIndex
    },
    methods: {
      toQuestion:function (index) {
        window.localStorage.quesIndex=index
        this.$router.push('/DoWork')
      }
    }
  }
</script>

<style scoped>
  .button {
    margin: 10px;
    width: 50px;
  }
</style>
