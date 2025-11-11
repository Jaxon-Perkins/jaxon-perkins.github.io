//salutations

//declaring vars & consts
const fox = document.getElementById("fox")
let posx = 100
let posy = 50
let speedx = -5
let speedy = 5
let bounce_mod = 0.9
let rotating = false
let rotation_direction = "c"
let rotation_speed = 0
let angle = 0

const fox_width = window.screen.availWidth * 0.1
const fox_height = fox_width * (2 / 3)
const bounds_right = window.screen.availWidth - fox_width
const bounds_left = 0
const bounds_top = 0
const bounds_bottom = window.screen.availHeight - fox_height - 85

//defining functions
function move_fox() {
    posx += speedx
    fox.style.left = posx + "px"
    posy += speedy
    fox.style.top = posy + "px"
}

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
    if (keys_down["w"] || keys_down["upArrow"]) {speedy -= 0.5}
    if (keys_down["a"] || keys_down["leftArrow"]) {speedx -= 0.5}
    if (keys_down["s"] || keys_down["downArrow"]) {speedy += 0.5}
    if (keys_down["d"] || keys_down["rightArrow"]) {speedx += 0.5}
    if (keys_down["q"]) {if (bounce_mod > 0.01) {bounce_mod -= 0.01}}
    if (keys_down["e"]) {bounce_mod += 0.01}
    if (keys_down[" "]) {bounce_mod = 1}
    if (keys_down["f"]) {doaflip_pt2_electric_boogaloo()}
    if (keys_down["h"]) {rotating = true; rotation_direction = "cc"}
    if (keys_down["l"]) {rotating = true; rotation_direction = "c"}
    if (keys_down["j"]) {rotation_speed -= 1}
    if (keys_down["k"]) {rotation_speed += 1}
    document.getElementById("bounce_mod_disp").innerHTML = "Bounce Modifier: " + Math.floor(bounce_mod * 100) / 100
}

function doaflip() {
    if (rotation_speed <= 100 && rotation_speed >= -100) {
        if (rotation_direction === "c") {
            angle += rotation_speed
        } else {angle -= rotation_speed}
    } else {rotation_speed /= 10}
    fox.style.transform = "rotate(" + angle + "deg)"
}

function doaflip_pt2_electric_boogaloo() {
    rotating = true; rotation_speed = 5
    setTimeout(()=> {
        rotating = false; rotation_speed = 0
    }, 1000)
}

function check_collision() {
    if (posx >= bounds_right || posx <= bounds_left) {speedx *= -bounce_mod}
    if (posy >= bounds_bottom || posy <= bounds_top) {speedy *= -bounce_mod}
    unphase()
}
function unphase() {
    if (posx > bounds_right) {
        posx -= (posx - bounds_right)
    } else if (posx < bounds_left) {
        posx -= posx
    }

    if (posy > bounds_bottom) {
        posy -= (posy - bounds_bottom)
    } else if (posy < bounds_top) {
        posy -= posy
    }
}

function orbit() {
    if (posx >= bounds_right / 2) { speedx -= 0.5 }
    if (posx <= bounds_right / 2) { speedx += 0.5 }
    if (posy >= bounds_bottom / 2) { speedy -= 0.5 }
    if (posy <= bounds_bottom / 2) { speedy += 0.5 }
}

//let orbit_interval = setInterval(orbit, 10)
let update_interval = setInterval(() => {
    check_collision()
    move_fox()
    handle_keys()
    doaflip()
}, 1)