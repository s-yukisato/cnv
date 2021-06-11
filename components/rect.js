const canvasRect = {
    props: [],
    setup() {
        const data = Vue.reactive({
            x: 100,
            y: 100,
            w: 50,
            h: 100,
            isMount: false
        });
        let canvas = Vue.ref(null)
        let ctx = Vue.ref(null)
        const message = Vue.computed(() => {
            if (data.isMount) draw()
            else data.isMount = true
            return `${data.x}, ${data.y} 幅${data.w} 高さ${data.h}`
        });
        // methods
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.fillRect(data.x, data.y, data.w, data.h);
            ctx.stroke();
        }
        Vue.onMounted(() => {
            canvas = document.querySelector('#time-region')
            ctx = canvas.getContext('2d')
            draw()
        })
        return {
            data,
            message
        }
    },
    template: `
    <div>
        <p>{{ message }}</p>
        <input name="x" type="range" min="0" max="400" v-model="data.x">
        <label for="x">{{data.x}}</label>
        <input name="y" type="range" min="0" max="400" v-model="data.y">
        <label for="y">{{data.y}}</label>
        <input name="w" type="range" min="0" max="400" v-model="data.w">
        <label for="w">{{data.w}}</label>
        <input name="h" type="range" min="0" max="400" v-model="data.h">
        <label for="h">{{data.h}}</label>
        <canvas id="time-region" width="400" height="400"></canvas>
    </div>
    `
}