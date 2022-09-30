let
  players = document.querySelectorAll(".player"),
  redPlayers = document.querySelectorAll(".red"),
  bluePlayers = document.querySelectorAll(".blue"),
  boxs = document.querySelectorAll(".box"),
  title = document.querySelector(".title"),
  turn = "red";

let squares = [];
let player;
let boxH;
let boxI;


function start(){
  document.querySelector(".start").style.opacity = "0";
  setTimeout(()=>{
    document.querySelector(".start").style.display = "none";
  },500)
};

function restart(){
  // boxs.forEach((b) => {
  //   b.dataset.full = "yes";
  //   b.dataset.boxIn = "";
  // });
  // boxs[3].dataset.full = "no";
  // boxs[4].dataset.full = "no";
  // boxs[5].dataset.full = "no";
  players.forEach((p) => {
    p.style = "";
  });
  setTimeout(function () { location.reload() }, 500)
};

function end(winner){
  if(winner === "red"){
    document.querySelector(".restart").style.display = "flex";
    document.querySelector(".restart span").innerHTML = `Red player winnered.`;

  } else if (winner === "blue"){
    document.querySelector(".restart").style.display = "flex";
    document.querySelector(".restart span").innerHTML = `Blue player winnered.`;
  }

}

function check() {
  for (let i = 1; i < 10; i++) {
    squares[i] = document.getElementById(`box${i}`).dataset.boxIn;
  }
  if (squares[1] == squares[2] && squares[2] == squares[3] && squares[1] != undefined) {
    end(squares[1]);
  } else if (squares[4] == squares[5] && squares[5] == squares[6] && squares[4] != undefined) {
    end(squares[4]);
  } else if (squares[7] == squares[8] && squares[8] == squares[9] && squares[7] != undefined) {
    end(squares[7]);
  } else if (squares[1] == squares[4] && squares[4] == squares[7] && squares[1] != undefined) {
    end(squares[1]);
  } else if (squares[2] == squares[5] && squares[5] == squares[8] && squares[2] != undefined) {
    end(squares[2]);
  } else if (squares[3] == squares[6] && squares[6] == squares[9] && squares[3] != undefined) {
    end(squares[3]);
  } else if (squares[1] == squares[5] && squares[5] == squares[9] && squares[1] != undefined) {
    end(squares[1]);
  } else if (squares[3] == squares[5] && squares[5] == squares[7] && squares[3] != undefined) {
    end(squares[3]);
  }
}


function chosePlayer(id) {
  player = document.getElementById(id);
  if (turn === "red") {
    if (player.className === "player blue") {
      title.style.textShadow = "2px 2px 0 rgb(219, 1, 1)";
      title.innerHTML = "This red turn!";
      setTimeout(() => {
        title.innerHTML = "";
        title.style.textShadow = "none";
      }, 1500);
    } else {
      players.forEach((p) => {
        p.classList.remove("chosen");
      });
      player.classList.add("chosen");
      boxH = player.dataset.box;
      boxI = document.getElementById(boxH);
    }
  } else if (turn === "blue") {
    if (player.className === "player red") {
      title.style.textShadow = "2px 2px 0 rgb(1, 132, 219)";
      title.innerHTML = "This blue turn!";
      setTimeout(() => {
        title.innerHTML = "";
        title.style.textShadow = "none";
      }, 1500);
    } else {
      players.forEach((p) => {
        p.classList.remove("chosen");
      });
      player.classList.add("chosen");
      boxH = player.dataset.box;
      boxI = document.getElementById(boxH);
    }

  }
}


function moveP(top, left, element) {
  player.style.top = `${top}%`;
  player.style.left = `${left}%`;
  player.classList.remove("chosen");
  player.dataset.box = element.id;
  boxI.dataset.full = "no";
  boxI.dataset.boxIn = ""; 
  element.dataset.full = "yes";
  if (turn === "red") {
    element.dataset.boxIn = "red";
  } else if (turn === "blue") {
    element.dataset.boxIn = "blue";
  }
  check();
}

function game(id) {
  let element = document.getElementById(id);
  let top = element.dataset.top;
  let left = element.dataset.left;

  if (turn === "red" && player.className === "player red chosen" && element.dataset.full === "no") {
    moveP(top, left, element);
    turn = "blue";
  } else if (turn === "blue" && player.className === "player blue chosen" && element.dataset.full === "no") {
    moveP(top, left, element);
    turn = "red";
  } else if (element.dataset.full === "yes" && player.className === "player red chosen" || player.className === "player blue chosen") {
    title.innerHTML = "Chose another box!";
    title.style.textShadow = "none";
    setTimeout(() => {
      title.innerHTML = "";
    }, 1500);
  } else if (player.className === "player red" || player.className === "player blue") {
    title.innerHTML = "Chose player to play!";
    title.style.textShadow = "none";
    setTimeout(() => {
      title.innerHTML = "";
    }, 1500);
  }
}
