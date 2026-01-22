console.log("welcome to tic tac teo");
let music = new Audio("music.mp3");
let audioturn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "X";
let agameover = false;
//new code
const showWinLine = (i1, i2, i3) => {
  const line = document.querySelector(".line");
  const boxes = document.getElementsByClassName("box");
  const board = document.querySelector(".creater");

  const r1 = boxes[i1].getBoundingClientRect();
  const r3 = boxes[i3].getBoundingClientRect();
  const br = board.getBoundingClientRect();

  const x1 = r1.left + r1.width / 2 - br.left;
  const y1 = r1.top + r1.height / 2 - br.top;
  const x2 = r3.left + r3.width / 2 - br.left;
  const y2 = r3.top + r3.height / 2 - br.top;

  const length = Math.hypot(x2 - x1, y2 - y1);
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

  line.style.width = `${length}px`;
  line.style.transform = `translate(${x1}px, ${y1}px) rotate(${angle}deg)`;
};

//function to change turn
const changeTurn = () => {
  return turn === "X" ? "0" : "X";
};
//function to checkwin

// const checkwin = () => {
//   let boxtext = document.getElementsByClassName("boxtext");
//   let wins = [
//     [0, 1, 2, -50, -4025, 0],
//     [3, 4, 5, -49, 15, 0],
//     [6, 7, 8, -49, 4121, 0],
//     [0, 3, 6, -83.5, -890, 90],
//     [1, 4, 7, -49.5, -890, 90],
//     [2, 5, 8, -16.5, -890, 90],
//     [0, 4, 8, -49, 51, 45],
//     [2, 4, 6, -51, 15, 135],
//   ];
//   wins.forEach((e) => {
//     if (
//       boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
//       boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
//       boxtext[e[0]].innerText !== ""
//     ) {
//       document.querySelector(".info").innerText =
//         boxtext[e[0]].innerText + " won ";
//       agameover = true;

//       document
//         .querySelector(".imgb")
//         .getElementsByTagName("img")[0].style.width = "200px";
//       document.querySelector(
//         ".line"
//       ).style.transform = `translate(${e[3]}%,${e[4]}%) rotate(${e[5]}deg)`;
//       document.querySelector(".line").style.width = "101%";
//       gameover.play();
//     }
//   });
// };
const checkWin = () => {
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  wins.forEach(([a, b, c]) => {
    const t1 = boxes[a].querySelector(".boxtext").innerText;
    const t2 = boxes[b].querySelector(".boxtext").innerText;
    const t3 = boxes[c].querySelector(".boxtext").innerText;

    if (t1 !== "" && t1 === t2 && t2 === t3) {
      document.querySelector(".info").innerText = `${t1} won`;
      agameover = true;
      document.querySelector(".imgb img").style.width = "200px";
      showWinLine(a, b, c);
      gameover.play();
    }
  });
};

//game logic
music.play();

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "") {
      boxtext.innerText = turn;
      turn = changeTurn();
      audioturn.play();
      checkwin();

      if (!agameover) {
        document.getElementsByClassName("info")[0].innerText =
          " Turn for " + turn;
      }
    }
  });
});
// Add onclick listener to reset button
reset.addEventListener("click", () => {
  let boxtexts = document.querySelectorAll(".boxtext");
  Array.from(boxtexts).forEach((element) => {
    element.innerText = "";
  });
  agameover = false;
  document.getElementsByClassName("info")[0].innerText = " Turn for " + turn;
  document.querySelector(".imgb").getElementsByTagName("img")[0].style.width =
    "0px";
  document.querySelector(".line").style.width = "0";
});


