<template>
  <div class="showtable">
    <Table border stripe :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "showtable",
  data() {
    return {
      msg: "123",
      data1: [],
      columns1: [
        {
          title: "编号",
          key: "ano"
        },
        {
          title: "姓名",
          key: "loginname"
        },
        {
          title: "密码",
          key: "pwd"
        },
        {
          title: "邮箱",
          key: "email"
        }
      ]
    };
  },
  watch: {
    $route() {
      this.getHomeInfo();
    }
  },
  mounted() {
    this.getHomeInfo();
  },
  methods: {
    getHomeInfo() {
      axios.get("/api/showtable").then(res => this.getHomeInfoSucc(res));
    },
    getHomeInfoSucc(res) {
      if (res.data) {
        this.data1 = res.data.result;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.showtable {
  padding: 15px 35px;
}
</style>
