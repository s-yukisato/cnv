const WIDTH = 400;
const HEIGHT = 400;
const blank = 20;

// Σ(n0~10){cos(nx)}

function line(context, start_x, start_y, end_x, end_y) {
    context.beginPath();
    context.moveTo(start_x, start_y);
    context.lineTo(end_x, end_y);
    context.closePath();
    context.stroke();
}
function auxiliary_line(context) {
    // x軸
    line(context, 0, HEIGHT / 2, WIDTH, HEIGHT / 2)
    // y軸
    line(context, blank, HEIGHT - 10, blank, 10)
}

const drawFunction = {
    setup() {
        const state = Vue.reactive({
            canvas: null,
            ctx: null,
            canvas2: null,
            ctx2: null,
            sinAmplitudeList: [],
            sinFrequencyList: [],
            cosAmplitudeList: [],
            cosFrequencyList: [],
            sampleNumber: 10,
            formula: "y=cos(x)",
            text: "",
            isCorrectFormula: true,
            record: ["y=sin(x)+1/3sin(3x)+1/5sin(5x)+1/7sin(7x)+1/9sin(9x)"]
        })
        const back = (key) => {
            state.formula = state.record[key]
        }
        const func = (n) => {
            let val = 0;
            if (state.sinAmplitudeList.length >= 1 || state.cosAmplitudeList.length >= 1) {
                let max = Math.max(...state.sinAmplitudeList.concat(state.cosAmplitudeList))
                for (let i = 0; i < state.sinAmplitudeList.length; i++) {
                    val += state.sinAmplitudeList[i] * Math.sin(state.sinFrequencyList[i] * n * 2.0 * Math.PI / (WIDTH - blank)) * HEIGHT / (max * 4)
                }
                for (let i = 0; i < state.cosAmplitudeList.length; i++) {
                    val += state.cosAmplitudeList[i] * Math.cos(state.cosFrequencyList[i] * n * 2 * Math.PI / (WIDTH - blank)) * HEIGHT / (max * 4)
                }
            } else {
                val += n - 200
            }
            return val
        }
        const Graph = (ctx, clear = true, P = 10, color = "blue") => {
            // canvas上のデータを全て消す
            if (clear) ctx.clearRect(0, 0, WIDTH, HEIGHT);
            // 補助線
            ctx.strokeStyle = "black"
            auxiliary_line(ctx)
            ctx.beginPath()
            ctx.strokeStyle = color
            ctx.lineWidth = 2.0;
            var N = WIDTH - blank;
            const space = N / P;
            for (var n = 0; n < N; n++) {
                var x = n + blank;
                var y = HEIGHT / 2 - func(n)
                if (n == 0) ctx.moveTo(x, y);
                ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
        const eval = () => {
            const fnc = state.formula.split(' ').join('')
            const operator = ["+", "-", "*", "/", "="]
            if (operator.includes(fnc.slice(-1)) || fnc.slice(-1).match(/[a-w, y-z]/)) {
                console.log('great')
                state.isCorrectFormula = false
                return
            } else {
                // ()が閉じているのかを判定
                if ((fnc.match(/\(/g) || []).length != (fnc.match(/\)/g) || []).length) {
                    state.isCorrectFormula = false
                    return
                } else if ((fnc.match(/\=/g) || []).length > 2) {
                    state.isCorrectFormula = false
                    return
                } else {
                    state.isCorrectFormula = true
                }
            }
            const value = fnc.split(/[\+ || - || * || =]/)
            value.forEach(e => {
                if (e.match(/cos\([0-9]*x\)/)) {
                } else if (e.match(/sin\([0-9]*x\)/)) {
                } else if (e.match(/y/)) {
                } else if (e.match(/x/)) {
                } else if (e.match(/[0-9]+/)) {
                } else if (e.match(/π/)) {
                } else if (e.match(/Σ/)) {
                } else {
                    state.isCorrectFormula = false
                }
            })
            console.log(value)
            state.sinAmplitudeList = []
            state.sinFrequencyList = []
            state.cosAmplitudeList = []
            state.cosFrequencyList = []
            value.forEach(element => {
                if (element.includes("cos")) {
                    let a = element.slice(0, element.indexOf("c")) == "" ? 1 : element.slice(0, element.indexOf("c"))
                    if (a.toString().match(/\//)) {
                        let parts = a.split('/')
                        a = parts.reduce((acc, v) => acc / v)
                    }
                    state.cosAmplitudeList.push(a)
                    state.cosFrequencyList.push(element.slice(element.indexOf("(") + 1, element.indexOf("x")) == "" ? 1 : element.slice(element.indexOf("(") + 1, element.indexOf("x")))
                } else if (element.includes("sin")) {
                    let a = element.slice(0, element.indexOf("s")) == "" ? 1 : element.slice(0, element.indexOf("s"))
                    if (a.toString().match(/\//)) {
                        let parts = a.split('/')
                        a = parts.reduce((acc, v) => acc / v)
                    }
                    state.sinAmplitudeList.push(a)
                    let f = element.slice(element.indexOf("(") + 1, element.indexOf("x")) == "" ? 1 : element.slice(element.indexOf("(") + 1, element.indexOf("x"))
                    state.sinFrequencyList.push(f)
                }
            });
            state.text = fnc
            if (!state.record.includes(fnc)) state.record.push(fnc)
            Graph(state.ctx)
            dft()
        }
        const func_dft = (x) => {
            let val = 0;
            if (state.sinAmplitudeList.length >= 1 || state.cosAmplitudeList.length >= 1) {
                for (let i = 0; i < state.sinAmplitudeList.length; i++) {
                    val += state.sinAmplitudeList[i] * Math.sin(state.sinFrequencyList[i] * x)
                }
                for (let i = 0; i < state.cosAmplitudeList.length; i++) {
                    val += state.cosAmplitudeList[i] * Math.cos(state.cosFrequencyList[i] * x)
                }
            }
            return val
        }
        const P = 10;
        const draw_dft = (context, x, n) => {
            let w = WIDTH / P - (WIDTH / (P * 10));
            let bar = x * 10;
            context.font = '6pt Arial';
            context.strokeStyle = 'rgba(128, 128, 128, 0.3)'
            // 周波数スペクトルが存在したら
            if (x != 0) {
                context.fillStyle = 'rgba(0, 255, 0)'
                context.font = '10pt Arial';
                context.fillText(x, blank + n * w, HEIGHT / 2 - bar);
                context.font = '6pt Arial';
            }
            else context.fillStyle = 'rgba(0, 0, 0)';
            context.fillText(n, blank + (w / 2) + w * n, HEIGHT / 2 + 30);
            context.fillStyle = 'rgba(244, 128, 128, 0.3)';
            // 棒グラフ
            context.fillRect(20 + w * n, HEIGHT / 2 - bar, w, bar)
            context.stroke();
        }
        const dft = () => {
            // canvas上のデータを全て消す
            state.ctx2.clearRect(0, 0, WIDTH, HEIGHT);
            // 補助線
            state.ctx2.strokeStyle = "black"
            auxiliary_line(state.ctx2)
            let f = new Array(P);
            // データサンプリング
            for (let m = 0; m < P; m++) {
                let x = ((2.0 * Math.PI) / P) * m
                f[m] = func_dft(x)
            }
            // DFT係数計算
            console.log("次数\t実数部\t虚数部\t絶対値");
            for (let n = 0; n < P; n++) {
                let ar = 0.0;
                let ai = 0.0;
                let x;
                for (let m = 0; m < P; m++) {
                    x = ((2.0 * Math.PI) / P) * m * n;
                    ar += f[m] * Math.cos(-x);
                    ai += f[m] * Math.sin(-x);
                }
                ar /= P;
                ai /= P;
                x = Math.sqrt(4.0 * ar * ar + 4.0 * ai * ai);
                x = Math.round(x * 100) / 100
                draw_dft(state.ctx2, x, n)
                console.log(
                    n,
                    Math.round(ar * 100) / 100,
                    Math.round(ai * 100) / 100,
                    Math.round(x * 100) / 100
                );

            }
        }
        Vue.onMounted(() => {
            state.canvas = document.querySelector('#canvas')
            state.ctx = canvas.getContext('2d')
            state.canvas2 = document.querySelector('#canvas2')
            state.ctx2 = canvas2.getContext('2d')
        })
        return {
            state,
            eval,
            func,
            back,
            dft,
            func_dft,
            draw_dft,
        }
    },
    template: `
        <div class="d-flex justify-content-center">
            <div class="w-50 m-2">
                <div>
                    <p>Sample Number: <input v-model="state.sampleNumber" class="" type="number"></p>
                </div>
                <div class="row">
                    <div class="col-md-10">
                        <input v-model="state.formula" class=" p-3" type="text" placeholder="Formula" aria-label="Search">
                    </div>
                    <div class="col-md-2">
                        <button class="m-2 btn btn-outline-success" @click="eval">Draw!</button>
                    </div>
                </div>
                <div>
                    <div v-if="!state.isCorrectFormula" class="m-2 p-2 alert alert-danger" role="alert">
                        <p>This formula is not available!</p>
                    </div>
                    <div v-if="state.isCorrectFormula">
                        <p class="text-center text-primary p-3 display-4">{{ state.text }}</p>
                    </div>
                </div>
            </div>
            <div class="w-50 m-2">
                <table class="table table-light table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Formula</th> 
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(formula, key) in state.record" @click="back(key)">
                            <td>{{ key + 1 }}</td>
                            <td class="text-break">{{ formula }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <canvas class="m-3" id="canvas" width="400" height="400"></canvas>
        <canvas class="m-3" id="canvas2" width="400" height="400"></canvas>
    `
}