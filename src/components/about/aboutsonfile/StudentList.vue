<template>
  <div class="StudentList">
    <div class="addBtn">
      <Button to="/about/AddStudent" type="dashed">添加学生信息</Button>
    </div>

    <Divider>学生列表</Divider>
    <div class="StudentListDiv">
      <Table :columns="columns" :data="data" border>
        <template slot="sno" slot-scope="{ row, index }">
          <Input
            type="text"
            v-if="editIndex === index"
            v-model="Edit_Student_sno"
          />
          <span v-else>{{ row.sno }}</span>
        </template>

        <template slot="sname" slot-scope="{ row, index }">
          <Input
            type="text"
            v-if="editIndex === index"
            v-model="Edit_Student_sname"
          />
          <span v-else>{{ row.sname }}</span>
        </template>

        <template slot="gender" slot-scope="{ row, index }">
          <Input
            type="text"
            v-if="editIndex === index"
            v-model="Edit_Student_gender"
          />
          <span v-else>{{ row.gender }}</span>
        </template>

        <template slot="birth" slot-scope="{ row, index }">
          <Input
            type="text"
            v-if="editIndex === index"
            v-model="Edit_Student_birth"
          />
          <span v-else>{{ getBirthday(row.birth) }}</span>
        </template>

        <template slot="phone" slot-scope="{ row, index }">
          <Input
            type="text"
            v-if="editIndex === index"
            v-model="Edit_Student_phone"
          />
          <span v-else>{{ row.phone }}</span>
        </template>

        <template slot="cname" slot-scope="{ row, index }">
          <Input
            type="text"
            v-if="editIndex === index"
            v-model="Edit_Student_cname"
          />
          <span v-else>{{ row.cname }}</span>
        </template>

        <template slot="classroom" slot-scope="{ row, index }">
          <Input
            type="text"
            v-if="editIndex === index"
            v-model="Edit_Student_classroom"
          />
          <span v-else>{{ row.classroom }}</span>
        </template>

        <template slot="action" slot-scope="{ row, index }">
          <div>
            <div class="templateBtn" v-if="editIndex === index">
              <Button
                @click="handleSave(index)"
                ghost
                size="small"
                type="primary"
                >保存</Button
              >
              <Button @click="editIndex = -1" ghost size="small" type="error"
                >取消</Button
              >
            </div>
            <div class="templateBtn" v-else>
              <Button
                @click="handleEdit(row, index)"
                size="small"
                type="primary"
                >操作</Button
              >
              <Button @click="DeleteEdit(row, index)" size="small" type="error"
                >删除</Button
              >
            </div>
          </div>
        </template>
      </Table>
    </div>

    <div class="StudentListPage">
      <Page
        :current="pageCurrent"
        :page-size="pageSize"
        :page-size-opts="[5, 10, 15]"
        :total="total"
        show-elevator
        show-sizer
        size="small"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "StudentList",
  data() {
    return {
      columns: [
        {
          title: "学生编号",
          slot: "sno"
        },
        {
          title: "姓名",
          slot: "sname"
        },
        {
          title: "性别",
          slot: "gender"
        },
        {
          title: "出生年月",
          slot: "birth"
        },
        {
          title: "联系电话",
          slot: "phone"
        },
        {
          title: "班级名",
          slot: "cname"
        },
        {
          title: "教室",
          slot: "classroom"
        },
        {
          title: "操作",
          slot: "action"
        }
      ],
      data: [],
      editIndex: -1, // 当前聚焦的输入框的行数
      Edit_Student_sno: "",
      Edit_Student_sname: "",
      Edit_Student_gender: "",
      Edit_Student_phone: "",
      Edit_Student_birth: "",
      Edit_Student_cname: "",
      Edit_Student_classroom: "",

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
      axios.get("/api/StudentAndClass").then(res => this.getHomeInfoSucc(res));
    },
    getHomeInfoSucc(res) {
      if (res.data) {
        this.data = res.data.result;
      }
    },
    show(index) {
      this.$Modal.info({
        title: "User Info",
        content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
      });
    },
    remove(index) {
      this.data6.splice(index, 1);
    },

    handleEdit(row, index) {
      this.Edit_Student_sno = row.sno;
      this.Edit_Student_sname = row.sname;
      this.Edit_Student_gender = row.gender;
      this.Edit_Student_phone = row.phone;
      this.Edit_Student_birth = row.birth;
      this.Edit_Student_cname = row.cname;
      this.Edit_Student_classroom = row.classroom;

      this.editIndex = index;
    },

    handleSave(index) {
      this.data[index].sno = this.Edit_Student_sno;
      this.data[index].sname = this.Edit_Student_sname;
      this.data[index].gender = this.Edit_Student_gender;
      this.data[index].phone = this.Edit_Student_phone;
      this.data[index].birth = this.Edit_Student_birth;
      this.data[index].cname = this.Edit_Student_cname;
      this.data[index].classroom = this.Edit_Student_classroom;

      axios.post("/api/fixstudentAndclassdata", this.data[index]).then(res => {
        if (res.data.message === "OK") {
          this.$Message.success("修改成功!你很棒~嘻嘻");
        }
      });

      this.editIndex = -1;
    },

    DeleteEdit(row, index) {
      let obj = {
        sno: this.data[index].sno
      };
      this.data.splice(index, 1);
      axios.post("/api/studentAndclassdataDelete", obj).then(res => {
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
.StudentList {
  margin-top: -50px;
  padding: 0 15px;
}

.StudentListDiv {
  text-align: center;
  padding: 0 15px;
}

.StudentListPage {
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
