const countUp = {
    props: [],
    setup() {
        const count = Vue.ref(0);
        const countUp = () => {
            count.value++
        }
        const reset = () => {
            count.value = 0
        }
        const alertMsg = Vue.computed(() => {
            return `${count.value} does not exist.<br><button @click="reset" class="alert-link">return to 0</a>`
        })
        return {
            count,
            countUp,
            reset,
            alertMsg
        }
    },
    template: `
    <div class="btn">
        {{count}}
        <button class="btn btn-outline-dark" @click="countUp()">カウントアップ</button>
        <div v-if="count > 3" class="alert alert-danger" role="alert">
            <p v-html="alertMsg"></p>
        </div>
    </div>
    `
};