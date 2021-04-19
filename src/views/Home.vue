<template>
  <div class="home">
    <div class="LoginForm">
      <Divider>登录</Divider>
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="100"
      >
        <FormItem label="Name" prop="name">
          <Input
            v-model="formValidate.name"
            placeholder="Enter your name"
            autocomplete
            maxlength="5"
            show-word-limit
          />
        </FormItem>

        <FormItem label="E-mail" prop="mail">
          <Input
            v-model="formValidate.mail"
            placeholder="Enter your e-mail"
            autocomplete="on"
            icon="ios-recording-outline"
          />
        </FormItem>

        <FormItem label="password" prop="password">
          <Input
            v-model="formValidate.password"
            placeholder="Enter your password"
            autocomplete="on"
            icon="md-key"
          />
        </FormItem>

        <FormItem label="identity" prop="identity">
          <RadioGroup v-model="formValidate.identity">
            <Radio label="Administrator">管理员</Radio>
            <Radio label="teacher">教师</Radio>
            <Radio label="student">学生</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')"
            >Submit</Button
          >
          <Button @click="handleReset('formValidate')" style="margin-left: 8px"
            >Reset</Button
          >
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from "axios";

export default {
  name: "home",
  inject: ["showsome"],
  data() {
    return {
      formValidate: {
        name: "",
        mail: "",
        password: "",
        identity: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        mail: [
          { required: true, message: "email cannot be empty", trigger: "blur" },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        password: [
          {
            required: true,
            message: "password cannot be empty",
            trigger: "blur"
          }
        ],

        identity: [
          {
            required: true,
            message: "Please select identity",
            trigger: "change"
          }
        ]
      },
      name: ""
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

    getHomeInfo() {
      let obj = {
        name: this.formValidate.name,
        email: this.formValidate.mail,
        password: this.formValidate.password,
        identity: this.formValidate.identity
      };

      axios.post("/api/Getlogin", obj).then(res => this.getHomeInfoSucc(res));
    },

    getHomeInfoSucc(res) {
      if (res.data) {
        if (res.data.result === "error") {
          this.$Message.error("账号或密码错误!");
        } else if (res.data.result === "NotAdministrator") {
          this.$Message.error("you不是管理员，go out！");
        } else {
          this.$Message.success("Success!");
          this.showsome();

          if (res.data.data1.identity === "老师") {
            this.$router.push({ path: "/about/EditInfoTeacher" });
          } else if (res.data.data1.identity === "管理员") {
            this.$router.push({ path: "/about/TeacherManagementList" });
          } else {
            this.$router.push({ path: "/about/EditInfostudent" });
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.LoginForm {
  padding: 11px;
  border-left: 1px solid #eee;
  max-width: 400px;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
}
</style>
