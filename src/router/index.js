import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import StudentManagement from "../components/about/aboutsonfile/TeacherManagementList.vue";
import ModifyingPersonalInformation from "../components/about/aboutsonfile/ModifyingPersonalInformation.vue";
import ShowTable from "../components/about/aboutsonfile/showtable.vue";
import Addthecourse from "../components/about/aboutsonfile/Addthecourse.vue";
import CourseList from "../components/about/aboutsonfile/CourseList.vue";
import CourseListforStudent from "../components/about/aboutsonfile/CourseListforStudent.vue";
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
        path: "TeacherManagement",
        component: () =>
          import("../components/about/aboutsonfile/TeacherManagement.vue")
      },
      {
        path: "TeacherManagementList",
        component: StudentManagement
      },
      {
        path: "ModifyingPersonalInformation",
        component: ModifyingPersonalInformation
      },
      {
        path: "showtable",
        component: ShowTable
      },
      {
        path: "Addthecourse",
        component: Addthecourse
      },
      {
        path: "CourseList",
        component: CourseList
      },
      {
        path: "CourseListforStudent",
        component: CourseListforStudent
      },
      {
        path: "AddStudent",
        component: AddStudent
      },
      {
        path: "StudentList",
        component: StudentList
      },
      {
        path: "EditInfoTeacher",
        component: EditInfoTeacher
      },
      {
        path: "TeacherTeaches",
        component: TeacherTeaches
      },
      {
        path: "EditInfostudent",
        component: EditInfostudent
      },
      {
        path: "studentscourseselection",
        component: studentscourseselection
      },
      {
        path: "StudentTheselectedcourse",
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
