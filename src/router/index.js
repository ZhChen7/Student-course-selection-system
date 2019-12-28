import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import TeacherManagement from "../components/about/aboutsonfile/TeacherManagement.vue";
import StudentManagement from "../components/about/aboutsonfile/TeacherManagementList.vue";
import ModifyingPersonalInformation from "../components/about/aboutsonfile/ModifyingPersonalInformation.vue";
import ShowTable from "../components/about/aboutsonfile/showtable.vue";
import Addthecourse from "../components/about/aboutsonfile/Addthecourse.vue";
import CourseList from "../components/about/aboutsonfile/CourseList.vue";

import AddStudent from "../components/about/aboutsonfile/AddStudent.vue";
import StudentList from "../components/about/aboutsonfile/StudentList.vue";

import EditInfoTeacher from "../components/about/aboutsonfile/EditInfoTeacher.vue";
import TeacherTeaches from "../components/about/aboutsonfile/TeacherTeaches.vue";

import EditInfostudent from "../components/about/aboutsonfile/EditInfostudent.vue";
import studentscourseselection from "../components/about/aboutsonfile/studentscourseselection.vue";
import StudentTheselectedcourse from "../components/about/aboutsonfile/StudentTheselectedcourse.vue";



Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    children: [
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: 'TeacherManagement',
        component: TeacherManagement
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 会被渲染在 User 的 <router-view> 中
        path: 'TeacherManagementList',
        component: StudentManagement
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 会被渲染在 User 的 <router-view> 中
        path: 'ModifyingPersonalInformation',
        component: ModifyingPersonalInformation
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 会被渲染在 User 的 <router-view> 中
        path: 'showtable',
        component: ShowTable
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 会被渲染在 User 的 <router-view> 中
        path: 'Addthecourse',
        component: Addthecourse
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 会被渲染在 User 的 <router-view> 中
        path: 'CourseList',
        component: CourseList
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 会被渲染在 User 的 <router-view> 中
        path: 'AddStudent',
        component: AddStudent
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 会被渲染在 User 的 <router-view> 中
        path: 'StudentList',
        component: StudentList
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 会被渲染在 User 的 <router-view> 中
        path: 'EditInfoTeacher',
        component: EditInfoTeacher
      },

      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 会被渲染在 User 的 <router-view> 中
        path: 'TeacherTeaches',
        component: TeacherTeaches
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 会被渲染在 User 的 <router-view> 中
        path: 'EditInfostudent',
        component: EditInfostudent
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 会被渲染在 User 的 <router-view> 中
        path: 'studentscourseselection',
        component: studentscourseselection
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 会被渲染在 User 的 <router-view> 中
        path: 'StudentTheselectedcourse',
        component: StudentTheselectedcourse
      }

    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
