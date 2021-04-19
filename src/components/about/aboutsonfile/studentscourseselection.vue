<template>
  <div>
    <div class="studentscourseselection">
      <Divider>以下课程可选</Divider>

      <Table
        border
        ref="selection"
        :columns="columns4"
        :data="data1"
        @on-selection-change="selectTable"
      ></Table>
      <div class="studentscourseselectionBtn">
        <Button
          class="studentscourseselectionBtn1"
          type="info"
          @click="handleSelectAll(true)"
          >全选</Button
        >
        <Button
          class="studentscourseselectionBtn1"
          type="success"
          @click="selectsubmit"
          >提交</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "studentscourseselection",
  data() {
    return {
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "课程编号",
          key: "cno"
        },
        {
          title: "课程名称",
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
        },
        {
          title: "任课老师",
          key: "tname"
        },
        {
          title: "联系电话",
          key: "phone"
        }
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ],
      selectarr: []
    };
  },
  mounted() {
    this.getHomeInfo();
  },
  methods: {
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    getHomeInfo() {
      axios
        .get("/api/Studentoptionalcourses")
        .then(res => this.getHomeInfoSucc(res));
    },
    getHomeInfoSucc(res) {
      if (res.data) {
        this.data1 = res.data.result;
      }
    },
    selectTable(e) {
      this.selectarr = e;
    },

    selectsubmit() {
      let obj = {
        selectarr: this.selectarr
      };

      axios.post("/api/StudentAddCourse", obj).then(res => {
        if (res.data.message === "OK") {
          this.$Message.success("选课成功!");
          this.$router.push({ path: "/about/StudentTheselectedcourse" });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.studentscourseselection {
  padding: 0px 15px;
}

.studentscourseselectionBtn {
  text-align: right;
  padding: 18px 15px;
}
.studentscourseselectionBtn1 {
  margin-right: 15px;
}
</style>
