<template>
  <div class="Addthecourse">
    <div class="main">
      <div class="AddthecourseForm">
        <Form
          ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="80"
        >
          <Divider>课程信息录入</Divider>
          <FormItem label="课程名称" prop="coursetitle">
            <Input
              v-model="formValidate.coursetitle"
              placeholder="Enter your coursetitle"
              show-word-limit
              maxlength="12"
            />
          </FormItem>

          <FormItem label="学分" prop="credit">
            <Input
              v-model="formValidate.credit"
              placeholder="Enter your credit "
              show-word-limit
              maxlength="4"
            />
          </FormItem>

          <FormItem label="开课日期">
            <div class="AddthecourseDate">
              <FormItem prop="date">
                <DatePicker
                  type="date"
                  placeholder="Select date"
                  v-model="formValidate.beginsdate"
                ></DatePicker>
              </FormItem>
              -
              <FormItem prop="time">
                <TimePicker
                  type="time"
                  placeholder="Select time"
                  v-model="formValidate.beginstime"
                ></TimePicker>
              </FormItem>
            </div>
          </FormItem>

          <FormItem label="结课日期">
            <div class="AddthecourseDate">
              <FormItem prop="date">
                <DatePicker
                  type="date"
                  placeholder="Select date"
                  v-model="formValidate.endsdate"
                ></DatePicker>
              </FormItem>
              -
              <FormItem prop="time">
                <TimePicker
                  type="time"
                  placeholder="Select time"
                  v-model="formValidate.endstime"
                ></TimePicker>
              </FormItem>
            </div>
          </FormItem>

          <FormItem label="授课教师" prop="GiveLessonsTeacher">
            <Select
              v-model="formValidate.GiveLessonsTeacher"
              placeholder="Select your GiveLessonsTeacher"
            >
              <Option
                v-for="item in teacherList"
                :value="item.tname"
                :key="item.tname"
                >{{ item.tname }}</Option
              >
            </Select>
          </FormItem>

          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')"
              >Submit</Button
            >
            <Button
              @click="handleReset('formValidate')"
              style="margin-left: 8px"
              >Reset</Button
            >
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Addthecourse",
  data() {
    return {
      formValidate: {
        coursetitle: "",
        credit: "",
        beginsdate: "",
        beginstime: "",
        endsdate: "",
        endstime: "",
        time: "",
        GiveLessonsTeacher: ""
      },
      ruleValidate: {
        coursetitle: [
          {
            required: true,
            message: "The coursetitle cannot be empty",
            trigger: "blur"
          }
        ],
        credit: [
          {
            required: true,
            message: "The credit cannot be empty",
            trigger: "blur"
          }
        ],

        beginsdate: [
          {
            required: true,
            type: "date",
            message: "Please select the beginstime",
            trigger: "change"
          }
        ],
        beginstime: [
          {
            required: true,
            type: "string",
            message: "Please select time",
            trigger: "change"
          }
        ],

        endsdate: [
          {
            required: true,
            type: "date",
            message: "Please select the endsdate",
            trigger: "change"
          }
        ],
        endstime: [
          {
            required: true,
            type: "string",
            message: "Please select endstime",
            trigger: "change"
          }
        ],
        GiveLessonsTeacher: [
          {
            required: true,
            message: "The GiveLessonsTeacher cannot be empty",
            trigger: "blur"
          }
        ]
      },
      teacherList: []
    };
  },
  methods: {
    handleSubmit(credit) {
      this.$refs[credit].validate(valid => {
        if (valid) {
          this.getHomeInfo();
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(credit) {
      this.$refs[credit].resetFields();
    },

    getHomeInfo() {
      let obj = {
        coursetitle: this.formValidate.coursetitle,
        credit: this.formValidate.credit,
        beginsdate: this.formValidate.beginsdate,
        endsdate: this.formValidate.endsdate,
        GiveLessonsTeacher: this.formValidate.GiveLessonsTeacher
      };

      axios
        .post("/api/AddteacherAndCourse", obj)
        .then(res => this.getHomeInfoSucc(res));
    },

    getHomeInfoSucc(res) {
      if (res.data) {
        this.$Message.success("增加课程成功!");
        this.$router.push({ path: "/about/CourseList" });
      }
    },

    getTeacherList(res) {
      this.teacherList = res.data.result;
    }
  },
  mounted() {
    axios
      .get("/api/teacherdataforcourse")
      .then(res => this.getTeacherList(res));
  }
};
</script>

<style scoped lang="scss">
.Addthecourse {
  /*border: 1px solid red;*/
}

.main {
  margin-top: -30px;
}

.AddthecourseForm {
  max-width: 600px;
  margin: 0 auto;
  border-right: 1px solid #eee;
  padding: 0 15px;
}

.AddthecourseDate {
  display: flex;
  justify-content: space-evenly;
}
</style>
