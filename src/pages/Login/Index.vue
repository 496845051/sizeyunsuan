<template>
  <Row style="margin-top: 20px;">
    <Col :offset="8" :span="8">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </Col>
  </Row>
</template>

<script>
  export default {
    name: "LoginIndex",
    data() {
      return {
      }
    },
    created: function () {
    },
    methods: {

    }
  }
</script>

<style scoped>
  .ivu-layout{
    background: transparent;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
