<template>
<div class="login-container">
    <a-form :model="formState" ref='formRef' :rules="rules" class="login-form" :wrapper-col='wrapperCol' :label-col='labelCol' :size='large'>
        <a-form-item label="用户名:" name="username">
            <a-input v-model:value="formState.username" placeholder="用户名" />
        </a-form-item>
        <a-form-item label="密码:" name="password">
            <a-input v-model:value="formState.password" placeholder="密码" visibilityToggle type="password" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 5 }">
            <a-button type="primary" class="submitBtn" @click="handleLogin" :loading='btnLoading'>登录/注册</a-button>
        </a-form-item>
    </a-form>
    <a-spin :spinning="spinning" :tip='tip' />
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
        const formState = reactive({
            username: "",
            password: "",
        });
        const formRef = ref();
        let btnLoading = ref(false)
        let spinning = ref(false)
        let tip = ref('正在校验用户信息...')
        const rules = {
            username: [{
                required: true,
                message: 'Please enter your username',
                trigger: 'blur',
            }],
            password: [{
                    required: true,
                    message: 'Please enter your password',
                    trigger: 'blur',
                },
                {
                    min: 6,
                    max: 16,
                    message: 'Length should be 6 to 16',
                    trigger: 'blur',
                },
            ]
        }
        const handleLogin = () => {
            btnLoading.value = true;
            spinning.value = true;
            formRef.value
                .validate()
                .then(() => {
                    service
                        .post("/user/isExistByUsername", {
                            name: formState.username
                        })
                        .then((res) => {
                            const {
                                data: {
                                    code,
                                    isExist
                                }
                            } = res;
                            if (code === 200) {
                                isExist ? loginEvent() : registerEvent();
                            } else {
                                message.error('登录失败！');
                                btnLoading.value = true;
                                spinning.value = true;
                                return
                            }
                        }).catch((err) => {
                            btnLoading.value = false;
                            spinning.value = false;
                            console.log(err, "err");
                        })
                })
                .catch(error => {
                    btnLoading.value = false;
                    spinning.value = false;
                    console.log('error', error);
                });

        };
        // 已存在则登录
        const loginEvent = () => {
            tip.value = '正在登录，请稍后...'
            
        }
        // 未存在则注册
        const registerEvent = () => {
            tip.value = '正在注册，请稍后...'
            service
                .post("/user/register", {
                    name: formState.username,
                    password: formState.password
                })
                .then((res) => {
                    
                    const {
                        data: {
                            code
                        }
                    } = res;
                    if (code === 200) {
                        loginEvent()
                    } else {
                        btnLoading.value = false;
                        spinning.value = false;
                        message.error('注册账号失败!');
                        return
                    }
                }).catch((err) => {
                    btnLoading.value = false;
                    spinning.value = false;
                    console.log(err, "err");
                })
        }
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
            rules,
            formRef
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
    text-align: center;

    .ant-spin-spinning {
        position: absolute;
        display: inline-block;
        opacity: 1;
        top: 45vh;
    }

    .login-form {
        position: absolute;
        right: 10vw;
        top: 40vh;
        width: 16vw;
        height: 18vh;
    }
}
</style>
