const app = Vue.createApp({
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
            if(data.isMount) draw()
            else data.isMount = true
            return `${data.x}, ${data.y} 幅${data.w} 高さ${data.h}`
        });
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
            message,
        }
    }
})
app.mount('#app')