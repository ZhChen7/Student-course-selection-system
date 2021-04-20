<template>
  <div>
    <div class="StudentTheselectedcourse">
      <Divider>已选课程</Divider>

      <Table border :columns="columns4" :data="data1">
        <template slot-scope="{ row, index }" slot="action">
          <Button
            type="primary"
            size="small"
            style="margin-right: 5px"
            @click="show(index)"
            >View</Button
          >
          <Button type="error" size="small" @click="remove(index)"
            >Delete</Button
          >
        </template>
      </Table>

      <Modal v-model="modal1" title="确认框" @on-ok="ok" @on-cancel="cancel">
        <p style="text-align: center;font-size:22px;color:red;">
          确认取消该课程的选课吗？
        </p>
      </Modal>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "StudentTheselectedcourse",
  data() {
    return {
      columns4: [
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
        },
        {
          title: "Action",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      data1: [],
      modal1: false,
      index: 0
    };
  },
  mounted() {
    this.getHomeInfo();
  },
  methods: {
    getHomeInfo() {
      axios
        .get("/api/Studentalreadyoptionalcourses")
        .then(res => this.getHomeInfoSucc(res));
    },
    getHomeInfoSucc(res) {
      if (res.data) {
        this.data1 = res.data.result;
      }
    },
    show(index) {
      this.$Modal.info({
        title: "学生信息展示",
        content: `
        课程编号：${this.data1[index].cno}<br>
        课程名称: ${this.data1[index].cname}<br>
        任课老师：${this.data1[index].tname}<br>
        学分：${this.data1[index].credit}<br>
        邮箱：${this.data1[index].email}<br>
        联系电话：${this.data1[index].phone}<br>
        开课时间：${this.data1[index].startDate}<br>
        结课时间：${this.data1[index].endDate}<br>
        备注：${this.data1[index].remark}<br>
        昵称：${this.data1[index].loginname}<br>
        密码：${this.data1[index].pwd}<br>
        `
      });
    },
    remove(index) {
      // this.data1.splice(index, 1);
      this.index = index;
      this.modal1 = true;
    },
    removeFun(res) {
      if (res.data) {
        this.renderFunc();
      }
    },
    ok() {
      const obj = {
        sno: this.data1[this.index].sno,
        cno: this.data1[this.index].cno
      };
      this.data1.splice(this.index, 1);
      axios
        .post("/api/selectCourseDelete", obj)
        .then(res => this.removeFun(res));
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    renderFunc() {
      this.$Notice.success({
        title: "成功取消该课程的选课",
        desc: "请同学再看一下其他的内容吧！",
        render: h => {
          return h("span", ["", h("a", "请同学再看一下其他的内容吧！"), ""]);
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.StudentTheselectedcourse {
  padding: 0px 15px;
}

.StudentTheselectedcourseBtn {
  text-align: right;
  padding: 18px 15px;
}
.StudentTheselectedcourseBtn1 {
  margin-right: 15px;
}
</style>
