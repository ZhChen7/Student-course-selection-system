<template>
    <div>
        <div class="StudentTheselectedcourse">
            <Divider>已选课程</Divider>

            <Table border  :columns="columns4" :data="data1"></Table>


        </div>
    </div>
</template>

<script>
  import axios from "axios";
  export default {
    name: "StudentTheselectedcourse",
    data () {
      return {
        columns4: [
          {
            title: '课程编号',
            key: 'cno'
          },
          {
            title: '课程名称',
            key: 'cname'
          },
          {
            title: '学分',
            key: 'credit'
          },
          {
            title: '开课时间',
            key: 'startDate'
          },
          {
            title: '结课时间',
            key: 'endDate'
          },
          {
            title: '任课老师',
            key: 'tname'
          },
          {
            title: '联系电话',
            key: 'phone'
          }
        ],
        data1: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          }
        ]
      }
    },
    mounted() {
      this.getHomeInfo();
    },
    methods: {
      getHomeInfo() {
        axios.get("/api/Studentalreadyoptionalcourses")
          .then((res) => this.getHomeInfoSucc(res));
      },
      getHomeInfoSucc(res) {
        console.log(res.data);
        if (res.data) {
          this.data1 = res.data.result;
        }
      }

    }
  };
</script>

<style scoped lang="scss">
    .StudentTheselectedcourse{
        padding: 0px 15px;
    }

    .StudentTheselectedcourseBtn{
        text-align: right;
        padding: 18px 15px;
    }
    .StudentTheselectedcourseBtn1{
        margin-right: 15px;
    }
</style>
