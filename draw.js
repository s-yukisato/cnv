const WIDTH = 500;
const HEIGHT = 400;
const blank = 20;

function line(context, start_x, start_y, end_x, end_y) {
    context.beginPath();
    context.moveTo(start_x, start_y);
    context.lineTo(end_x, end_y);
    context.closePath();
    context.stroke();
}

function Graph(am, ctx, P=10, color = "#8a2be2") {
    ctx.beginPath();
    ctx.lineWidth = 2.0;
    var N = WIDTH - blank;

    const space = N / P;
    for (var n = 0; n < N; n++) {
        var x = n + blank;
        // var y = HEIGHT / 2 - func_y_graph(n);
        // console.log("y=" + y)
        var y = HEIGHT / 2 - func_y_graph(am, 3, n)

        if (n == 0) {
            // let max = Math.max(sin_amplitude, cos_amplitude)
            let tate = Math.abs((HEIGHT / 2) - y) / 1
            // let tate = Math.abs((HEIGHT / 2) - y) / 10
            let c = 0
            for (let i = HEIGHT / 2; i > 0; i -= tate) {
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)'
                line(ctx, x - 10, i, WIDTH, i)
                ctx.fillStyle = 'rgba(0, 0, 0)'
                ctx.font = '6pt Arial';
                ctx.fillText(c, x - blank + 2, i);
                c++
            }
            c = 0
            for (let i = HEIGHT / 2; i < HEIGHT; i += tate) {
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)'
                line(ctx, x - 10, i, WIDTH, i)
                ctx.fillStyle = 'rgba(0, 0, 0)'
                ctx.font = '6pt Arial';
                ctx.fillText(c, x - blank + 2, i);
                c--
            }
            ctx.stroke()
            ctx.moveTo(x, y);
            ctx.arc(x, y, 5, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
            ctx.fillStyle = "rgba(255, 0, 0)";
            ctx.fill();
            ctx.strokeStyle = color
        } else {
            if (n % space == 0) {
                ctx.stroke()
                ctx.beginPath();
                ctx.arc(x, y, 5, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
                ctx.fillStyle = 'rgba(244, 55, 118)';
                ctx.fill();
                // 補助線
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
                ctx.moveTo(x, 10);
                ctx.lineTo(x, HEIGHT - 10);
                ctx.stroke();
                // ctx.closePath();
                ctx.beginPath();
                ctx.strokeStyle = color;
                ctx.moveTo(x, y)
            } else {
                ctx.lineTo(x, y);
            }
        }
    }
    ctx.stroke();
}

function func_y_graph(a, f, n) {
    // const max = Math.max(sin_amplitude, cos_amplitude)
    const max = 1
    return (
        4*(1 * Math.sin(1 * n * 2 * Math.PI / (WIDTH - blank)) * HEIGHT / (max * 4)
        + a * Math.cos(f * n * 2 * Math.PI / (WIDTH - blank)) * HEIGHT / (max * 4)
        + (Math.sin(3 * n * 2 * Math.PI / (WIDTH - blank)) * HEIGHT / (max * 4))/3
        + (Math.sin(5 * n * 2 * Math.PI / (WIDTH - blank)) * HEIGHT / (max * 4))/5
        + (Math.sin(7 * n * 2 * Math.PI / (WIDTH - blank)) * HEIGHT / (max * 4))/7
        + (Math.sin(9 * n * 2 * Math.PI / (WIDTH - blank)) * HEIGHT / (max * 4))/9
        + (Math.sin(11 * n * 2 * Math.PI / (WIDTH - blank)) * HEIGHT / (max * 4))/11
        + (Math.sin(13 * n * 2 * Math.PI / (WIDTH - blank)) * HEIGHT / (max * 4))/13
        + (Math.sin(15 * n * 2 * Math.PI / (WIDTH - blank)) * HEIGHT / (max * 4))/15
        + (Math.sin(17 * n * 2 * Math.PI / (WIDTH - blank)) * HEIGHT / (max * 4))/17
        + (Math.sin(19 * n * 2 * Math.PI / (WIDTH - blank)) * HEIGHT / (max * 4))/19
        + (Math.sin(21 * n * 2 * Math.PI / (WIDTH - blank)) * HEIGHT / (max * 4))/21
        )/Math.PI
    )
}

export default {
    Graph
}