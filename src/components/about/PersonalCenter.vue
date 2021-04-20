<template>
  <div class="PersonalCenter { active: isActive }">
    <div class="user">
      <List size="small"
        >欢迎
        <Badge :text="user.identity" type="success">
          <ListItem
            ><span>{{ user.loginname }}</span>
          </ListItem>
        </Badge>
        <ListItem>
          <Button type="error" @click="exit">退出</Button>
        </ListItem>
      </List>

      <Button type="success" ghost to="/about/showtable"
        >展示所有管理员信息</Button
      >
    </div>
    <!--active-name="4-1" :open-names="['4']"-->
    <div class="PersonalCenterMenu">
      <Menu :theme="theme2" accordion width="320px">
        <Submenu name="1" v-if="Isidentity">
          <template slot="title">
            <Icon type="ios-paper" />
            教师管理
          </template>
          <MenuItem name="1-1" to="/about/TeacherManagement">添加教师</MenuItem>
          <MenuItem name="1-2" to="/about/TeacherManagementList"
            >教师列表</MenuItem
          >
        </Submenu>

        <Submenu name="2" v-if="Isidentity">
          <template slot="title">
            <Icon type="ios-people" />
            课程管理
          </template>
          <MenuItem name="2-1" to="/about/Addthecourse">添加课程</MenuItem>
          <MenuItem name="2-2" to="/about/CourseList">课程列表</MenuItem>
          <MenuItem name="2-3" to="/about/CourseListforStudent"
            >查询课程学生列表</MenuItem
          >
        </Submenu>

        <Submenu name="3" v-if="identityAndteacher">
          <template slot="title">
            <Icon type="ios-stats" />
            学生管理
          </template>
          <MenuItem name="3-1" to="/about/AddStudent">添加学生</MenuItem>
          <MenuItem name="3-2" to="/about/StudentList">学生列表</MenuItem>
        </Submenu>

        <Submenu name="4" v-if="Isidentity">
          <template slot="title">
            <Icon type="ios-man" />
            管理员个人信息维护
          </template>
          <MenuGroup title="WOW ！">
            <MenuItem name="4-1" to="/about/ModifyingPersonalInformation" exact
              >编辑我的信息</MenuItem
            >
            <MenuItem name="4-2" to="/about/showtable" exact
              >show t_table</MenuItem
            >
          </MenuGroup>
        </Submenu>

        <Submenu name="5" v-if="Isteacher">
          <template slot="title">
            <Icon type="md-people" />
            教师个人信息维护
          </template>
          <MenuItem name="5-1" to="/about/EditInfoTeacher"
            >编辑我的信息</MenuItem
          >
          <MenuItem name="5-2" to="/about/TeacherTeaches"
            >我的任课教程</MenuItem
          >
        </Submenu>

        <Submenu name="6" v-if="Isstudent">
          <template slot="title">
            <Icon type="logo-designernews" />
            学生个人信息维护
          </template>
          <MenuItem name="6-1" to="/about/EditInfostudent"
            >编辑我的信息</MenuItem
          >
          <MenuItem name="6-2" to="/about/studentscourseselection"
            >选课</MenuItem
          >
          <MenuItem name="6-3" to="/about/StudentTheselectedcourse"
            >已选课程列表</MenuItem
          >
        </Submenu>
      </Menu>

      <div class="sonrouter">
        <transition mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PersonalCenter",
  provide() {
    return {
      reload: this.reload
    };
  },
  inject: ["hidesome", "showsome"],
  data() {
    return {
      theme2: "light",
      isActive: true,
      user: "",
      Isidentity: false,
      Isteacher: false,
      Isstudent: false,
      identityAndteacher: false
    };
  },
  watch: {
    $route() {
      this.getHomeInfo();
    }
  },
  mounted() {
    this.getHomeInfo();
    this.showsome();
  },
  methods: {
    getHomeInfo() {
      axios.get("/api").then(res => this.getHomeInfoSucc(res));
    },
    getHomeInfoSucc(res) {
      if (res.data) {
        if (res.data.user.identity === "管理员") {
          this.Isidentity = true;
          this.identityAndteacher = true;
          this.user = res.data.user;
        } else if (res.data.user.identity === "老师") {
          this.identityAndteacher = true;
          this.Isteacher = true;
          this.user = res.data.user;
        } else {
          this.Isstudent = true;
          this.user = res.data.user;
          this.user.loginname = res.data.user.sname;
        }
      }
    },
    exit() {
      axios.get("/api/out").then(res => {
        if (res.data.result === "ok") {
          this.$router.push({ path: "/" });
          this.hidesome();
        }
      });
    },
    reload() {
      this.getHomeInfo();
    }
  }
};
</script>

<style scoped lang="scss">
.PersonalCenter {
  max-width: 1280px;
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
  /*text-align: center;*/
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

.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translate(0, -340px);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.2s;
}
</style>
