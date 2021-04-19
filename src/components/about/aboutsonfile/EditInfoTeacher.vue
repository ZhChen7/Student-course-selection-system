<template>
  <div>
    <about-form @my-event="getMyEvent" :user="user"></about-form>
  </div>
</template>

<script>
import axios from "axios";

import AboutForm from "@/components/about/aboutsonfile/AboutForm.vue";
export default {
  name: "EditInfoTeacher",
  data() {
    return {
      user: null
    };
  },
  mounted() {
    this.getHomeInfo();
  },
  components: {
    AboutForm
  },
  methods: {
    getHomeInfo() {
      axios.get("/api").then(res => this.getHomeInfoSucc(res));
    },
    getHomeInfoSucc(res) {
      if (res.data) {
        this.user = res.data.user;
      }
    },
    getMyEvent(msg) {
      console.log("xxxx" + msg); //接收的数据--------->我是子组件中的数据
    }
  }
};
</script>

<style scoped></style>
