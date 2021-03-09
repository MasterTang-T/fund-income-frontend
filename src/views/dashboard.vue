<template>
    <div class="dashboard-container">
        {{text}}
    </div>
</template>
<script>
import {ref} from 'vue'
export default {
    setup(){
        const text = ref('dashboard page')
        return{
            text
        }
    }
}
</script>
<style lang="less" scoped>

</style>