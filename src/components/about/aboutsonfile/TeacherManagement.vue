<template>
  <div class="TeacherManagement">
    <div class="main">
      <div class="TeacherManagementForm">
        <Form
          ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="80"
        >
          <Divider>教师信息录入</Divider>
          <FormItem label="用户名" prop="username">
            <Input
              v-model="formValidate.username"
              placeholder="Enter your username"
              show-word-limit
              maxlength="8"
            />
          </FormItem>

          <FormItem label="姓名" prop="name">
            <Input
              v-model="formValidate.name"
              placeholder="Enter your name "
              show-word-limit
              maxlength="4"
            />
          </FormItem>

          <FormItem label="密码" prop="password">
            <Input
              v-model="formValidate.password"
              placeholder="Enter your password"
              autocomplete
              icon="md-key"
            />
          </FormItem>

          <FormItem label="联系方式" prop="contactway">
            <Input
              v-model="formValidate.contactway"
              placeholder="Enter your contact way "
            />
          </FormItem>

          <FormItem label="邮箱" prop="mail">
            <Input
              v-model="formValidate.mail"
              placeholder="Enter your e-mail"
            />
          </FormItem>

          <FormItem label="入职时间">
            <div class="TeacherManagementDate">
              <FormItem prop="date">
                <DatePicker
                  type="date"
                  placeholder="Select date"
                  v-model="formValidate.date"
                ></DatePicker>
              </FormItem>
              -
              <FormItem prop="time">
                <TimePicker
                  type="time"
                  placeholder="Select time"
                  v-model="formValidate.time"
                ></TimePicker>
              </FormItem>
            </div>
          </FormItem>

          <FormItem label="描述" prop="desc">
            <Input
              v-model="formValidate.desc"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 5 }"
              placeholder="Enter something..."
            />
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
  name: "TeacherManagement",
  data() {
    return {
      formValidate: {
        username: "",
        name: "",
        password: "",
        contactway: "",
        mail: "",
        date: "",
        time: "",
        desc: ""
      },
      ruleValidate: {
        username: [
          {
            required: true,
            message: "The username cannot be empty",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "The password cannot be empty",
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "Please select time",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.getHomeInfo();
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    //
    getHomeInfo() {
      let obj = {
        username: this.formValidate.username,
        name: this.formValidate.name,
        password: this.formValidate.password,
        contactway: this.formValidate.contactway,
        mail: this.formValidate.mail,
        data: this.formValidate.date,
        desc: this.formValidate.desc
      };
      axios
        .post("/api/Addteacherdata", obj)
        .then(res => this.getHomeInfoSucc(res));
    },
    getHomeInfoSucc(res) {
      if (res.data) {
        this.$Message.success("Success!");
        this.$router.push({ path: "/about/TeacherManagementList" });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.TeacherManagement {
  /*border: 1px solid red;*/
}

.main {
  margin-top: -30px;
}

.TeacherManagementForm {
  max-width: 600px;
  margin: 0 auto;
  border-right: 1px solid #eee;
  padding: 0 15px;
}

.TeacherManagementDate {
  display: flex;
  justify-content: space-evenly;
}
</style>
