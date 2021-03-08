<template>
<div class="login-container">
    <a-form :model="formState" class="login-form" :wrapper-col='wrapperCol' :label-col='labelCol' :size='large'>
        <a-form-item label="用户名:">
            <a-input v-model="formState.username" placeholder="用户名" />
        </a-form-item>
        <a-form-item label="密码:">
            <a-input v-model="formState.password" placeholder="密码" visibilityToggle type="pas" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 5 }">
            <a-button type="primary" class="submitBtn" @click="handleLogin" :loading='btnLoading'>登录/注册</a-button>
        </a-form-item>
    </a-form>
    
</div>
</template>

<script>
import {
    defineComponent,
    reactive,
    ref
} from "vue";
import service from "@/utils/axios/http";
export default defineComponent({
    setup() {
        let btnLoading = ref(false)
        const formState = reactive({
            username: "",
            password: "",
        });
        const handleLogin = () => {
            btnLoading.value = true;
            service
                .post("/user/isExistByUsername", {
                    name: formState.username
                })
                .then((res) => {
                    console.log(res, "res");
                    btnLoading.value = false;
                });
        };
        return {
            wrapperCol: {
                span: 19
            },
            labelCol: {
                span: 5
            },
            formState,
            handleLogin,
            btnLoading
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
        width: 16vw;
        height: 18vh;
    }
}
</style>
