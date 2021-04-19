<template>
  <div class="CourseList">
    <div class="addBtn">
      <Button type="dashed" to="/about/TeacherManagement">添加课程信息</Button>
    </div>

    <Divider>课程列表</Divider>
    <div class="CourseListDiv">
      <Table :columns="columns" :data="data" border>
        <template slot-scope="{ row, index }" slot="coursenumber">
          <Input
            type="text"
            v-model="Edit_Course_ano"
            v-if="editIndex === index"
          />
          <span v-else>00{{ row.cno }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="courseName">
          <Input
            type="text"
            v-model="Edit_course_name"
            v-if="editIndex === index"
          />
          <span v-else>{{ row.cname }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="credit">
          <Input
            type="text"
            v-model="Edit_course_credit"
            v-if="editIndex === index"
          />
          <span v-else>{{ row.credit }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="startDate">
          <Input
            type="text"
            v-model="Edit_course_startDate"
            v-if="editIndex === index"
          />
          <span v-else>{{ getBirthday(row.startDate) }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="endDate">
          <Input
            type="text"
            v-model="Edit_course_endDate"
            v-if="editIndex === index"
          />
          <span v-else>{{ getBirthday(row.endDate) }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="courseTeacherName">
          <Input
            type="text"
            v-model="Edit_course_tname"
            v-if="editIndex === index"
          />
          <span v-else>{{ row.tname }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="courseTeacherphone">
          <Input
            type="text"
            v-model="Edit_course_tphone"
            v-if="editIndex === index"
          />
          <span v-else>{{ row.phone }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="action">
          <div>
            <div v-if="editIndex === index" class="templateBtn">
              <Button
                type="primary"
                ghost
                size="small"
                @click="handleSave(index)"
                >保存</Button
              >
              <Button type="error" ghost size="small" @click="editIndex = -1"
                >取消</Button
              >
            </div>
            <div v-else class="templateBtn">
              <Button
                type="primary"
                size="small"
                @click="handleEdit(row, index)"
                >操作</Button
              >
              <Button type="error" size="small" @click="DeleteEdit(row, index)"
                >删除</Button
              >
            </div>
          </div>
        </template>
      </Table>
    </div>

    <div class="CourseListPage">
      <Page
        :total="total"
        :page-size="pageSize"
        :current="pageCurrent"
        size="small"
        :page-size-opts="[5, 10, 15]"
        show-elevator
        show-sizer
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CourseList",
  data() {
    return {
      columns: [
        {
          title: "课程编号",
          slot: "coursenumber"
        },
        {
          title: "课程名",
          slot: "courseName"
        },
        {
          title: "学分",
          slot: "credit"
        },
        {
          title: "开课时间",
          slot: "startDate"
        },
        {
          title: "结课时间",
          slot: "endDate"
        },
        {
          title: "任课老师",
          slot: "courseTeacherName"
        },
        {
          title: "教师联系方式",
          slot: "courseTeacherphone"
        },
        {
          title: "操作",
          slot: "action"
        }
      ],
      data: [
        {
          cno: 1,
          cname: "JAVA",
          credit: 8,
          startDate: "2020-1-1",
          endDate: "2011-1-1",
          tname: "拉尔啥",
          phone: "213213213"
        },
        {
          cno: 2,
          cname: "JAVA",
          credit: 8,
          startDate: "2020-1-1",
          endDate: "2011-1-1",
          tname: "拉尔啥",
          phone: "213213213"
        }
      ],
      editIndex: -1, // 当前聚焦的输入框的行数
      Edit_Course_ano: "",
      Edit_course_name: "",
      Edit_course_credit: "",
      Edit_course_startDate: "",
      Edit_course_endDate: "",
      Edit_course_tname: "",
      Edit_course_tphone: "",

      total: 50,
      pageSize: 5,
      pageCurrent: 1
    };
  },
  mounted() {
    this.getHomeInfo();
  },
  methods: {
    getHomeInfo() {
      axios.get("/api/teacherAndCourse").then(res => this.getHomeInfoSucc(res));
    },
    getHomeInfoSucc(res) {
      if (res.data) {
        this.data = res.data.result;
      }
    },

    remove(index) {
      this.data6.splice(index, 1);
    },

    handleEdit(row, index) {
      this.Edit_Course_ano = row.cno;
      this.Edit_course_name = row.cname;

      this.Edit_course_credit = row.credit;
      this.Edit_course_startDate = row.startDate;
      this.Edit_course_endDate = row.endDate;
      this.Edit_course_tname = row.tname;
      this.Edit_course_tphone = row.phone;

      this.editIndex = index;
    },

    handleSave(index) {
      this.data[index].tno = this.Edit_Course_ano;
      this.data[index].cname = this.Edit_course_name;

      this.data[index].credit = this.Edit_course_credit;
      this.data[index].startDate = this.Edit_course_startDate;
      this.data[index].endDate = this.Edit_course_endDate;
      this.data[index].tname = this.Edit_course_tname;
      this.data[index].phone = this.Edit_course_tphone;

      axios.post("/api/fixteacherAndCoursedata", this.data[index]).then(res => {
        if (res.data.message === "OK") {
          this.$Message.success("修改成功!");
        }
      });

      this.editIndex = -1;
    },

    DeleteEdit(row, index) {
      let obj = {
        cno: this.data[index].cno
      };
      this.data.splice(index, 1);
      axios.post("/api/teacherAndCoursedataDelete", obj).then(res => {
        if (res.data.message === "OK") {
          this.$Message.success("删除成功!嘿嘿！");
        }
      });
    },

    getBirthday(birthday) {
      const date = new Date(birthday);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}-${month}-${day}`;
    }
  }
};
</script>

<style scoped lang="scss">
.CourseList {
  margin-top: -50px;
  padding: 0 15px;
}

.CourseListDiv {
  text-align: center;
  padding: 0 15px;
}

.CourseListPage {
  text-align: right;
  padding: 15px;
}

.addBtn {
  padding-left: 15px;
}

.templateBtn {
  display: flex;
  justify-content: space-around;
}
</style>
