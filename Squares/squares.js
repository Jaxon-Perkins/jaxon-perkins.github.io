//salutations

//declaring vars & consts
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
canvas.setAttribute("width", String(window.screen.availWidth).toString())
canvas.setAttribute("height", String(window.screen.availHeight - 100).toString())
const canvas_width = canvas.width - 50
const canvas_height = canvas.height - 50

const posx = []
const posy = []
const speedx = []
const speedy = []
let bounce_mod = 0.9
let number_of_foxes = 10

class Fox {
    constructor(posx, posy, speedx, speedy) {
        this.posx = posx
        this.posy = posy
        this.speedx = speedx
        this.speedy = speedy
        this.draw_style = "#000000"
        this.image = ""
    }
}

//defining functions
document.addEventListener("keydown", keydown_function)
document.addEventListener("keyup", keyup_function)
const keys_down = {}
function keydown_function(e) {
    keys_down[e.key] = true
}
function keyup_function(e) {
    keys_down[e.key] = false
}
function handle_keys() {
    if (keys_down["w"]) {increase_array(speedy, -0.1)}
    if (keys_down["a"]) {increase_array(speedx, -0.1)}
    if (keys_down["s"]) {increase_array(speedy, 0.1)}
    if (keys_down["d"]) {increase_array(speedx, 0.1)}
    if (keys_down["q"]) {if (bounce_mod > 0.01) {bounce_mod -= 0.01}}
    if (keys_down["e"]) {bounce_mod += 0.01}
    if (keys_down[" "]) {bounce_mod = 1}
}
function setup() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < number_of_foxes; i++) {
        draw_fox(rng(1), rng(1), rng(0), rng(0))
    }
}
setup()

function draw_screen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < number_of_foxes; i++) {
        ctx.fillRect(posx[i], posy[i], 50, 50)
    }
}
function draw_fox(x, y, sx, sy) {
    posx.push(x); posy.push(y)
    speedx.push(sx); speedy.push(sy)
    ctx.fillRect(x, y, 50, 50)
    
}

function move_fox() {
    for (let i = 0; i < number_of_foxes; i++) {
        if (posx[i] <= 0 || posx[i] >= canvas_width) {
            speedx[i] *= -bounce_mod
        }
        if (posy[i] <= 0 || posy[i] >= canvas_height) {
            speedy[i] *= -bounce_mod
        }
        posx[i] += speedx[i]
        posy[i] += speedy[i]
    }
    unphase()
    draw_screen()
}
function unphase() {
    for (let i = 0; i < number_of_foxes; i++) {
        if (posx[i] > canvas_width) {
            posx[i] -= (posx[i] - canvas_width)
            speedx[i] -= 0.1
        } else if (posx[i] < 0) {
            posx[i] -= posx[i]
            speedx[i] += 0.1
        }

        if (posy[i] > canvas_height) {
            posy[i] -= (posy[i] - canvas_height)
            speedy[i] -= 0.1
        } else if (posy[i] < 0) {
            posy[i] -= posy[i]
            speedy[i] += 0.1
        }
    }
}

function rng(type) {
    let number = Math.random()
    if (type === 1) {
        return Math.floor(number * 500)
    } else {
        return Math.floor(number * -10)
    }
}
function increase_array(array, amount) {
    for (let i = 0; i < array.length; i++) {
        array[i] += amount
    }
}

let game_interval = setInterval(() => {
    move_fox()
    handle_keys()
}, 10);