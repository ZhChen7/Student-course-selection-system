<template>
  <div id="AboutForm">
    <div class="LoginForm">
      <Divider>修改个人信息</Divider>
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="160"
        hide-required-mark
        label-colon="："
      >
        <FormItem label="编号" prop="number">
          <Input
            v-model="formValidate.number"
            placeholder="Enter your number"
            autocomplete
            maxlength="10"
            disabled
          />
        </FormItem>

        <FormItem label="账号（登录名）" prop="name">
          <Input
            v-model="formValidate.name"
            placeholder="Enter your name"
            autocomplete
            maxlength="5"
            show-word-limit
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

        <FormItem>
          <Button type="info" @click="handleSubmit('formValidate')"
            >修改</Button
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
import axios from "axios";

export default {
  name: "AboutForm",
  props: ["user"],
  inject: ["reload"],
  data() {
    return {
      formValidate: {
        number: 1,
        name: "",
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

        password: [
          {
            required: true,
            message: "password cannot be empty",
            trigger: "blur"
          }
        ]
      },
      name: ""
    };
  },
  watch: {
    user: function(val) {
      //监听props中的属性
      if (val.identity === "老师") {
        this.formValidate.number = val.tno;
        this.formValidate.name = val.loginname;
      } else if (val.identity === "管理员") {
        this.formValidate.number = val.ano;
        this.formValidate.name = val.loginname;
      } else {
        this.formValidate.number = val.sno;
        this.formValidate.name = val.sname;
      }

      this.formValidate.password = val.pwd;

      this.formValidate.identity = val.identity;
    }
  },
  mounted() {
    // this.formValidate.number = this.user.ano
    // this.formValidate.name = this.user.loginname
    // this.formValidate.password = this.user.pwd
    console.log("xxx");
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.getHomeInfo(
            this.formValidate.number,
            this.formValidate.name,
            this.formValidate.password,
            this.formValidate.identity
          );
        } else {
          this.$Message.error("Fail!");
        }
      });
    },

    handleReset(name) {
      this.$refs[name].resetFields();
    },

    getHomeInfo(ano, name, pwd, identity) {
      let obj = {
        ano: ano,
        name: name,
        password: pwd,
        identity: identity
      };

      console.log(obj);

      axios.post("/api/fix", obj).then(res => this.getHomeInfoSucc(res));
    },
    getHomeInfoSucc(res) {
      if (res.data.message === "OK") {
        this.$Message.success("修改成功!");
        this.$emit("my-event", this.formValidate.name);
        this.reload();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.LoginForm {
  padding: 11px;
  max-width: 400px;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  top: 41%;
  transform: translate(-50%, -50%);
}

.center {
  text-align: center;
}

.ivu-input[disabled],
fieldset[disabled] .ivu-input {
  text-align: center !important;
}
</style>
