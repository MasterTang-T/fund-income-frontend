<template>
<div class="login-container">
    <a-form :model="formState" ref='formRef' :rules="rules" class="login-form" :wrapper-col='wrapperCol' :label-col='labelCol' :size='large'>
        <a-form-item label="用户名:" name="username">
            <a-input v-model:value="formState.username" placeholder="用户名" />
        </a-form-item>
        <a-form-item label="密码:" name="password">
            <a-input v-model:value="formState.password" placeholder="密码" visibilityToggle type="pas" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 5 }">
            <a-button type="primary" class="submitBtn" @click="handleLogin" :loading='btnLoading'>登录/注册</a-button>
        </a-form-item>
    </a-form>
</div>
<a-spin :spinning="spinning" :tip='tip' />
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
        const formState = reactive({
            username: "",
            password: "",
        });
        let btnLoading = ref(false)
        let spinning = ref(false)
        let tip = ref('正在校验用户信息...')
        const rules = {
            username:
        }
        const handleLogin = () => {
            btnLoading.value = true;
            spinning.value = true;
            service
                .post("/user/isExistByUsername", {
                    name: formState.username
                })
                .then(() => {
                    const {
                        data: {
                            code,
                            isExist
                        }
                    } = res;
                }).catch((err) => {
                    btnLoading.value = false;
                    spinning.value = false;
                    console.log(err, "err");
                })
        };
        return {
            formState,
            wrapperCol: {
                span: 19
            },
            labelCol: {
                span: 5
            },
            handleLogin,
            btnLoading,
            spinning,
            tip,
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
