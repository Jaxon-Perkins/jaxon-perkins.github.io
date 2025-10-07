//salutations

//declaring vars & consts
const box = document.getElementById("box")
let posx = 0
let posy = 0
let speedx = 0
let speedy = 0

const box_width = window.screen.availWidth * 0.1
const box_height = 0;
const bounds_right = window.screen.availWidth - box_width
const bounds_left = 0
const bounds_top = 0
const bounds_bottom = window.screen.availHeight

box.addEventListener("click", ()=> {speedx += 1})
function move_box() {
    posx += speedx
    box.style.left = posx + "px"
}

function check_collision() {
    if (posx >= bounds_right || posx < bounds_left) {
        speedx *= -1; move_box()
    } else {move_box()}
}

let interval = setInterval(check_collision, 10)