<template>
  <div>
    <div class="TeacherTeachestable">
      <Divider>我的任教课程</Divider>
      <Table :columns="columns1" :data="data1"></Table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TeacherTeaches",
  data() {
    return {
      columns1: [
        {
          title: "课程编号",
          key: "cno"
        },
        {
          title: "课程名",
          key: "cname"
        },
        {
          title: "学分",
          key: "credit"
        },
        {
          title: "开课时间",
          key: "startDate"
        },
        {
          title: "结课时间",
          key: "endDate"
        }
      ],
      data1: []
    };
  },
  mounted() {
    this.getHomeInfo();
  },
  methods: {
    getHomeInfo() {
      axios
        .get("/api/TeacherFindCourse")
        .then(res => this.getHomeInfoSucc(res));
    },
    getHomeInfoSucc(res) {
      if (res.data) {
        this.data1 = res.data.result;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.TeacherTeachestable {
  padding: 0 15px;
}
</style>
