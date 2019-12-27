<template>
    <div class="TeacherManagementList">

        <div class="addBtn">
            <Button type="dashed" to="/about/TeacherManagement">添加教师信息</Button>
        </div>

        <Divider>教师列表</Divider>
        <div class="TeacherManagementListDiv">

            <Table :columns="columns" :data="data">


                <template slot-scope="{ row, index }" slot="ano">
                    <Input type="text" v-model="Edit_Teacher_ano" v-if="editIndex === index" />
                    <span v-else>{{ row.tno }}</span>
                </template>


                <template slot-scope="{ row, index }" slot="sname">
                <Input type="text" v-model="Edit_Teacher_name" v-if="editIndex === index" />
                <span v-else>{{ row.tname }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="phone">
                <Input type="text" v-model="Edit_Teacher_phone" v-if="editIndex === index" />
                <span v-else>{{ row.phone }}</span>
                </template>




                <template slot-scope="{ row, index }" slot="birthday">
                    <Input type="text" v-model="Edit_Teacher_birthday" v-if="editIndex === index" />
                    <span v-else>{{ getBirthday(row.hiredate) }}</span>
                </template>


                <template slot-scope="{ row, index }" slot="email">
                    <Input type="text" v-model="Edit_Teacher_email" v-if="editIndex === index" />
                    <span v-else>{{ row.email }}</span>
                </template>

                <template slot-scope="{ row, index }" slot="remark">
                    <Input type="text" v-model="Edit_Teacher_remark" v-if="editIndex === index" />
                    <span v-else>{{ row.remark }}</span>
                </template>




                <template slot-scope="{ row, index }" slot="action">
                    <div v-if="editIndex === index">
                        <Button @click="handleSave(index)">保存</Button>
                        <Button @click="editIndex = -1">取消</Button>
                    </div>
                    <div v-else>
                        <Button @click="handleEdit(row, index)">操作</Button>
                    </div>
               </template>


            </Table>

        </div>



        <div class="TeacherManagementListPage">
            <Page :total="100"  size="small" show-elevator show-sizer />
        </div>
    </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "TeacherManagementList",
    data () {
      return {
        columns: [
          {
            title: '编号',
            slot: 'ano'
          },
          {
            title: '姓名',
            slot: 'sname'
          },
          {
            title: '联系方式',
            slot: 'phone'
          },
          {
            title: '入职日期',
            slot: 'birthday'
          },
          {
            title: '邮箱',
            slot: 'email'
          },
          {
            title: '备注',
            slot: 'remark'
          },
          {
            title: '操作',
            slot: 'action'
          }
        ],
        data: [
        ],
        editIndex: -1,  // 当前聚焦的输入框的行数

        Edit_Teacher_ano: '',
        Edit_Teacher_name: '',
        Edit_Teacher_phone:'',
        Edit_Teacher_email:'',
        Edit_Teacher_birthday: '',
        Edit_Teacher_remark:''
      }
    },
    mounted(){
      this.getHomeInfo()
    },
    methods: {

      getHomeInfo() {
        axios.get("/api/teacherdata")
          .then((res) => this.getHomeInfoSucc(res));
      },
      getHomeInfoSucc(res) {
        console.log(res.data)

        if (res.data) {
          this.data = res.data.result

        }
      },

      show (index) {
        console.log(index)

        this.$Modal.info({
          title: 'User Info',
          content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
        })
      },
      remove (index) {
        this.data6.splice(index, 1);
      },


      handleEdit (row, index) {
        this.Edit_Teacher_ano = row.tno;
        this.Edit_Teacher_name = row.tname;
        this.Edit_Teacher_phone = row.phone;

        this.Edit_Teacher_birthday = row.hiredate;
        this.Edit_Teacher_email = row.email;

        this.Edit_Teacher_remark = row.remark;

        this.editIndex = index;
      },

      handleSave (index) {

        this.data[index].tno=this.Edit_Teacher_ano;
        this.data[index].tname = this.Edit_Teacher_name;
        this.data[index].phone = this.Edit_Teacher_phone;
        this.data[index].hiredate = this.Edit_Teacher_birthday;
        this.data[index].email = this.Edit_Teacher_email;
        this.data[index].remark = this.Edit_Teacher_remark;

        this.editIndex = -1;
      },

      getBirthday (birthday) {
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

    .TeacherManagementListDiv{
        text-align: center;
        padding: 0 15px;
    }

    .TeacherManagementListPage{
        text-align: right;
        padding: 15px;
    }
    .addBtn{
        padding-left: 15px;

    }

</style>
