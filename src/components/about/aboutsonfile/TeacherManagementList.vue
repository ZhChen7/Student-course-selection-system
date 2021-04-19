<template>
  <div class="TeacherManagementList">
    <div class="addBtn">
      <Button type="dashed" to="/about/TeacherManagement">添加教师信息</Button>

      <div class="Selectsearch">
        <Select
          v-model="model1"
          filterable
          prefix="ios-home"
          clearable
          style="width:200px"
          @on-change="Selectsearchchange"
        >
          <Option
            v-for="item in cityList"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
      </div>
    </div>

    <Divider>教师列表</Divider>
    <div class="TeacherManagementListDiv">
      <Table :columns="columns" :data="data" border>
        <template slot-scope="{ row, index }" slot="ano">
          <Input
            type="text"
            v-model="Edit_Teacher_ano"
            v-if="editIndex === index"
          />
          <span v-else>{{ row.tno }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="sname">
          <Input
            type="text"
            v-model="Edit_Teacher_name"
            v-if="editIndex === index"
          />
          <span v-else>{{ row.tname }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="phone">
          <Input
            type="text"
            v-model="Edit_Teacher_phone"
            v-if="editIndex === index"
          />
          <span v-else>{{ row.phone }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="birthday">
          <Input
            type="text"
            v-model="Edit_Teacher_birthday"
            v-if="editIndex === index"
          />
          <span v-else>{{ getBirthday(row.hiredate) }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="email">
          <Input
            type="text"
            v-model="Edit_Teacher_email"
            v-if="editIndex === index"
          />
          <span v-else>{{ row.email }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="remark">
          <Input
            type="text"
            v-model="Edit_Teacher_remark"
            v-if="editIndex === index"
          />
          <span v-else>{{ row.remark }}</span>
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

    <div class="TeacherManagementListPage">
      <Page
        :total="total"
        :page-size="pageSize"
        :current="pageCurrent"
        size="small"
        :page-size-opts="[5, 10, 15]"
        show-elevator
        show-sizer
        @on-change="onChangetable"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TeacherManagementList",
  data() {
    return {
      columns: [
        {
          title: "编号",
          slot: "ano",
          sortable: true
        },
        {
          title: "姓名",
          slot: "sname"
        },
        {
          title: "联系方式",
          slot: "phone"
        },
        {
          title: "入职日期",
          slot: "birthday"
        },
        {
          title: "邮箱",
          slot: "email"
        },
        {
          title: "备注",
          slot: "remark"
        },
        {
          title: "操作",
          slot: "action"
        }
      ],
      data: [],
      editIndex: -1, // 当前聚焦的输入框的行数
      Edit_Teacher_ano: "",
      Edit_Teacher_name: "",
      Edit_Teacher_phone: "",
      Edit_Teacher_email: "",
      Edit_Teacher_birthday: "",
      Edit_Teacher_remark: "",

      total: 50,
      pageSize: 5,
      pageCurrent: 1,
      cityList: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        },
        {
          value: "Sydney",
          label: "Sydney"
        },
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ],
      model1: ""
    };
  },
  mounted() {
    this.getHomeInfo();
  },
  methods: {
    getHomeInfo() {
      axios
        .get(
          "/api/teacherdata?pageSize=" +
            this.pageSize +
            "&offset=" +
            this.pageSize * (this.pageCurrent - 1)
        )
        .then(res => this.getHomeInfoSucc(res));
    },
    getHomeInfoSucc(res) {
      let newarr = [];
      res.data.result.forEach(value => {
        newarr.push({ value: value.tname, label: value.tname });
      });
      this.cityList = newarr;

      if (res.data) {
        this.data = res.data.result;
        this.total = res.data.total;
      }
    },

    Selectsearchchange() {
      if (this.model1) {
        let newarr = this.data.filter(value => {
          return value.tname === this.model1;
        });
        this.data = newarr;
      } else {
        this.getHomeInfo();
      }
    },

    onChangetable(e) {
      axios
        .get(
          "/api/teacherdata?pageSize=" +
            this.pageSize +
            "&offset=" +
            this.pageSize * (e - 1)
        )
        .then(res => {
          if (res.data) {
            this.data = res.data.result;
          }
        });
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
      this.Edit_Teacher_ano = row.tno;
      this.Edit_Teacher_name = row.tname;
      this.Edit_Teacher_phone = row.phone;

      this.Edit_Teacher_birthday = row.hiredate;
      this.Edit_Teacher_email = row.email;

      this.Edit_Teacher_remark = row.remark;

      this.editIndex = index;
    },

    handleSave(index) {
      this.data[index].tno = this.Edit_Teacher_ano;
      this.data[index].tname = this.Edit_Teacher_name;
      this.data[index].phone = this.Edit_Teacher_phone;
      this.data[index].hiredate = this.Edit_Teacher_birthday;
      this.data[index].email = this.Edit_Teacher_email;
      this.data[index].remark = this.Edit_Teacher_remark;

      axios.post("/api/fixteacherdata", this.data[index]).then(res => {
        if (res.data.message === "OK") {
          this.$Message.success("修改成功!你很棒~嘻嘻");
        }
      });

      this.editIndex = -1;
    },

    DeleteEdit(row, index) {
      let obj = {
        tno: this.data[index].tno
      };
      this.data.splice(index, 1);
      axios.post("/api/TeacherDelete", obj).then(res => {
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
.TeacherManagementList {
  margin-top: -50px;
  padding: 0 15px;
}

.TeacherManagementListDiv {
  text-align: center;
  padding: 0 15px;
  min-height: 276px;
}

.TeacherManagementListPage {
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

.addBtn {
  /*border: 1px solid red;*/
  display: flex;
  justify-content: space-around;
}
.Selectsearch {
  /*border: 1px solid black;*/
}
</style>
