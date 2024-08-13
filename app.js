let boxes = document.querySelectorAll(".box");
let x = document.querySelector("#cross");
let o = document.querySelector(".ri-circle-line");
let turn = x.outerHTML;
let main = document.querySelector("main");
let popup = document.querySelector("#popup");
let newGame = document.querySelector("#new");
let reset = document.querySelector(".reset");
let res = document.querySelector("#restart");
let person = document.querySelector("#winner");
let flag = 0;
let scorex = document.querySelector("#scorex");
let scoreo = document.querySelector("#scoreo");

let win = [
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [0, 1, 2],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function hoverAdd(event) {
  let target = event.currentTarget;
  if (target.innerHTML == "") {
    flag = 1;
    target.innerHTML = turn;
    let icon = target.querySelector("i");
    if (icon) {
      icon.style.opacity = "0.3";
    }
  }
}

function hoverRemove(event) {
  let target = event.currentTarget;
  let icon = target.querySelector("i");
  if (flag === 1) {
    target.innerHTML = "";

    if (icon) {
      // Changed: Added check to ensure `icon` is not null
      icon.style.opacity = "1";
    }
    flag = 0;
  }
}

function clicked(event) {
  console.log("clicked");
  let target = event.currentTarget;
  removeEvent(target);
  target.innerHTML = "";
  target.innerHTML = turn;
  winner();
  turn = turn === x.outerHTML ? o.outerHTML : x.outerHTML;
  let ti = 0;
  boxes.forEach((box) => {
    if (box.innerHTML === "") {
      ti = 1;
    }
    console.log(ti);
  });
  console.log("full" + ti);
  console.log("hello");
  if (ti === 0) {
    console.log("enter");
    popup.style.visibility = "visible";
    person.innerHTML = "This match was Draw!";
  }
}

function addEvent(target) {
  target.addEventListener("click", clicked);
  target.addEventListener("mouseenter", hoverAdd);
  target.addEventListener("mouseleave", hoverRemove);
}

function removeEvent(target) {
  target.removeEventListener("mouseenter", hoverAdd);
  target.removeEventListener("mouseleave", hoverRemove);
  target.removeEventListener("click", clicked);
}

function setup() {
  boxes.forEach((box) => {
    box.innerHTML = "";
    addEvent(box);
  });
}
function restart() {
  console.log("restart");
  scoreo.innerHTML = 0;
  scorex.innerHTML = 0;
  popup.style.visibility = "hidden";
  reset.disabled = false;
  setup();
}
function nextMatch() {
  popup.style.visibility = "hidden";
  reset.disabled = false;
  setup();
}

function winner() {
  console.log(boxes);
  win.forEach((combo) => {
    if (
      boxes[combo[0]].innerHTML &&
      boxes[combo[0]].innerHTML === boxes[combo[1]].innerHTML &&
      boxes[combo[1]].innerHTML === boxes[combo[2]].innerHTML
    ) {
      boxes.forEach((box) => {
        removeEvent(box);
      });
      popup.style.visibility = "visible";
      person.innerHTML = turn + "<br> Won the Match!";
      if (turn === x.outerHTML) {
        scorex.innerHTML++;
      } else {
        scoreo.innerHTML++;
      }
      reset.disabled = "true";
      console.log("win");
    }
  });
}

setup();
reset.addEventListener("click", restart);
res.addEventListener("click", restart);
newGame.addEventListener("click", nextMatch);
