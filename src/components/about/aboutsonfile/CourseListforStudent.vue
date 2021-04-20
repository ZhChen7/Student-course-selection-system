<template>
  <div class="CourseListforStudent">
    <div class="top">
      <div class="alert">
        <Alert show-icon>
          查询课程学生列表
          <template slot="desc">
            这个栏目主要用于查询某一课程对应的学生列表
          </template>
        </Alert>
      </div>
      <div class="rate">
        <Rate allow-half v-model="valueHalf"></Rate>
      </div>

      <div class="searchBox">
        <p class="searchText">搜索框：</p>
        <Row>
          <i-col span="12" style="padding-right:10px;width:200px">
            <Select
              v-model="model11"
              size="large"
              filterable
              clearable
              placeholder="课程选择搜索框"
              :label-in-value="true"
              @on-change="dataChangeFun"
            >
              <Option
                v-for="item in columnsSearch"
                :value="item.cno"
                :key="item.phone"
                >{{ item.cname }}</Option
              >
            </Select>
          </i-col>
        </Row>
      </div>
    </div>

    <Divider> {{ label }} - 课程 -- 学生信息展示</Divider>
    <h3 class="tips" style="color:#000">
      选了 <span style="color:red">{{ label }}</span> 的的学生共
      <span style="color:red">【 {{ data.length }} 】</span>人：如下图:
    </h3>

    <div class="CourseListDiv">
      <Table stripe border :columns="columns1" :data="data"></Table>
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
      columnsSearch: [],
      columns1: [
        {
          title: "课程编号",
          key: "classno"
        },
        {
          title: "课程班级",
          key: "cname"
        },
        {
          title: "学生名称",
          key: "sname"
        },
        {
          title: "学生学号",
          key: "sno"
        },
        {
          title: "性别",
          key: "gender"
        },
        {
          title: "手机号",
          key: "phone"
        },
        {
          title: "邮箱",
          key: "email"
        }
      ],
      data: [],

      total: 50,
      pageSize: 5,
      pageCurrent: 1,
      model11: 1,
      label: "JAVA编程基础",
      valueHalf: 3
    };
  },
  methods: {
    getHomeInfo(model11) {
      let obj = {
        cno: model11
      };
      axios
        .post("/api/searchStudentformClass", obj)
        .then(res => this.getHomeInfoSucc(res));
    },
    getHomeInfoSucc(res) {
      if (res.data) {
        this.data = res.data.result;
      }
    },
    dataChangeFun(data) {
      if (data) {
        this.model11 = data.value;
        this.label = data.label;
      }
      this.getHomeInfo(this.model11);
    },
    renderFun(res) {
      if (res.data) {
        this.columnsSearch = res.data.result;
        this.getHomeInfo(1);
      }
    }
  },
  mounted() {
    axios.get("/api/teacherAndCourse").then(res => this.renderFun(res));
  }
};
</script>

<style scoped lang="scss">
.CourseListforStudent {
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

.templateBtn {
  display: flex;
  justify-content: space-around;
}

.alert {
  width: 300px;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.searchBox {
  display: flex;
  align-items: center;
  padding-right: 100px;
}
.tips {
  padding: 0px 0px 30px 25px;
}

.searchText {
  font-size: 20px;
  color: red;
}
</style>
