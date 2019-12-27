<template>
    <div class="PersonalCenter { active: isActive }">
        <div class="user">
            <List size="small">欢迎
                <Badge :text="user.identity" type="success">
                    <ListItem><span> {{user.loginname}}</span> </ListItem>
                </Badge>
                <ListItem>
                    <Button type="error" @click="exit">退出</Button>
                </ListItem>
            </List>

            <Button type="success" ghost to="/about/showtable">展示 t_admin 表</Button>

        </div>
        <div class="PersonalCenterMenu">
            <Menu :theme="theme2" active-name="4-1" :open-names="['4']" accordion width="320px">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-paper"/>
                        教师管理
                    </template>
                    <MenuItem name="1-1" to="/about/TeacherManagement">添加教师</MenuItem>
                    <MenuItem name="1-2" to="/about/StudentManagement">教师列表</MenuItem>
                </Submenu>


                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-people"/>
                        课程管理
                    </template>
                    <MenuItem name="2-1" to="/about/ModifyingPersonalInformation">添加课程</MenuItem>
                    <MenuItem name="2-2" to="/about/ModifyingPersonalInformation">添加列表</MenuItem>
                </Submenu>


                <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-stats"/>
                        学生管理
                    </template>
                    <MenuItem name="3-1">添加学生</MenuItem>
                    <MenuItem name="3-2">学生列表</MenuItem>
                </Submenu>

                <Submenu name="4">
                    <template slot="title">
                        <Icon type="ios-stats"/>
                        管理员个人信息维护
                    </template>
                    <MenuGroup title="我们小组的任务！">
                        <MenuItem name="4-1" to="/about/ModifyingPersonalInformation" exact>修改信息</MenuItem>
                        <MenuItem name="4-2" to="/about/showtable" exact>show t_table</MenuItem>
                    </MenuGroup>

                </Submenu>


                <Submenu name="5">
                    <template slot="title">
                        <Icon type="ios-stats"/>
                        教师个人信息维护
                    </template>
                    <MenuItem name="5-1">编辑我的信息</MenuItem>
                    <MenuItem name="5-2">我的任课教程</MenuItem>
                </Submenu>

                <Submenu name="6">
                    <template slot="title">
                        <Icon type="ios-stats"/>
                        学生个人信息维护
                    </template>
                    <MenuItem name="6-1">编辑我的信息</MenuItem>
                    <MenuItem name="6-1">选课</MenuItem>
                    <MenuItem name="6-1">已选课程列表</MenuItem>
                </Submenu>
            </Menu>

            <div class="sonrouter">
                <transition mode="out-in">
                    <router-view/>
                </transition>
            </div>

        </div>
    </div>
</template>

<script>

  import axios from "axios";
  export default {
    name: "PersonalCenter",
    provide(){
      return{
        reload:this.reload
      }
    },
    data() {
      return {
        theme2: "light",
        isActive: true,
        user:''
      }
    },
    watch: {
      $route() {
        this.getHomeInfo()
      }
    },
    mounted(){
      this.getHomeInfo()
    },
    methods:{
      getHomeInfo() {
        axios.get("/api")
          .then((res) => this.getHomeInfoSucc(res));
      },
      getHomeInfoSucc(res) {
        if (res.data) {
           this.user =  res.data.user

           console.log(res.data)
        }
      },
      exit(){
        axios.get("/api/out")
          .then((res) => {
             if(res.data.result === 'ok'){
               this.$router.push({ path: "/" });
             }
          })
      },
      reload(){
        this.getHomeInfo()
        console.log('1111')
      }
    }
  };
</script>

<style scoped lang="scss">

    .PersonalCenter {
        max-width: 1250px;
        margin: 0 auto;
    }

    .RadioGroup1 {
        text-align: left;
        padding: 0 0 25px 25px;
    }

    .PersonalCenterMenu {
        display: flex;
    }

    .sonrouter {
        width: 100%;
        height: 100%;
        text-align: center;
    }


    .router-link-active {
        color: #57a3f3;

        &:hover {
            color: #57a3f3;
        }
    }


    a {
        color: #515a6e;
    }

    .user {
        padding: 5px 35px;
        display: flex;
        justify-content: space-between;
    }

    .isActive {
        /*background: #515a6e;*/
    }

    .v-enter, .v-leave-to {
        opacity: 0;
        transform: translate(0, -340px);
    }

    .v-enter-active, .v-leave-active {
        transition: all 0.2s;
    }
</style>
