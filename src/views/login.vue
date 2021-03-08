<template>
  <div class="login-container">
    <a-form
    :layout="formState.layout"
    :model="formState"
    v-bind="formItemLayout"
    class="login-form"
  >
    <a-form-item label="用户名">
      <a-input v-model:value="formState.username" placeholder="用户名" />
    </a-form-item>
    <a-form-item label="密码">
      <a-input v-model:value="formState.password" placeholder="密码" />
    </a-form-item>
    <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
      <a-button type="primary" class="submitBtn">登录/注册</a-button>
    </a-form-item>
  </a-form>
  </div>
</template>
<script>
import { computed, defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const formState = reactive({
      layout: "horizontal",
      username: "",
      password: "",
    });
    const formItemLayout = computed(() => {
      const { layout } = formState;
      return layout === "horizontal"
        ? {
            labelCol: {
              span: 4,
            },
            wrapperCol: {
              span: 14,
            },
          }
        : {};
    });
    const buttonItemLayout = computed(() => {
      const { layout } = formState;
      return layout === "horizontal"
        ? {
            wrapperCol: {
              span: 14,
              offset: 4,
            },
          }
        : {};
    });
    return {
      formState,
      formItemLayout,
      buttonItemLayout,
    };
  },
});
</script>

<style lang="less" scoped>
.login-container {
  height: 100vh;
  position: relative;
  background: url("../assets/background.jpg") center center fixed no-repeat;
  background-size: cover;
  .login-form {
    position: absolute;
    right: 10vw;
    top: 40vh;
    .submitBtn {
    }
  }
}
</style>