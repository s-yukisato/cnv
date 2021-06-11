const countUp = {
    props: [],
    setup() {
        const count = Vue.ref(0);
        const countUp = () => {
            count.value++
        }
        return {
            count,
            countUp
        }
    },
    template: `
    <div class="btn">
        {{count}}
        <button @click="countUp()">カウントアップ</button>
    </div>
    `
};