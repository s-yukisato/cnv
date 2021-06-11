export const component = {
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
    <div>
        {{count}}
        <button @click="countUp()"></button>
    </div>
    `
};