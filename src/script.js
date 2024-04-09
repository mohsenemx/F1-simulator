let canvas = document.querySelector("canvas");
canvas.width = 5000;
canvas.height = 4000;
let c = canvas.getContext("2d");
let s = document.getElementById("s");
let x = 50;
let y = 50;
let laps = 1;
let lastJadvalUpdate = 0;
let lastPopup = 0;
/**@type HTMLElement */
let jadval = document.getElementById("jadval");
let lapP = document.getElementById("laps");
let chance;
let isNextLap = true;
let x1, x2;
let pause = false;
let drivers = [
  {
    name: "Max Versteppen",
    team: "Redbull Racing",
    color: "rgb(118, 0, 0)",
    LocX: 620,
    LocY: 80,
    chance: 70,
    speed: random(20, 60),
    corner: 0,
    totalSpeed: 0,
    teamIcon: "./images/redbull.png",
    driverPic: "./images/drivers/verstappen.png",
    loc: 2,
    line: 0,
    lapTime: 0,
    drs: 0,
  },
  {
    name: "Sergio Perez",
    team: "Redbull Racing",
    speed: random(20, 60),
    color: "rgb(118, 0, 0)",
    LocX: 590,
    LocY: 50,
    chance: 50,
    corner: 0,
    totalSpeed: -30,
    teamIcon: "./images/redbull.png",
    driverPic: "./images/drivers/perez.png",
    loc: 1,
    line: 0,
    lapTime: 0,
    drs: 0,
  },
  {
    name: "Charles Leclerc",
    team: "Ferrari",
    speed: random(20, 60),
    color: "rgb(201, 0, 0)",
    LocX: 560,
    LocY: 80,
    chance: 65,
    corner: 0,
    totalSpeed: -60,
    teamIcon: "./images/ferrari.png",
    driverPic: "./images/drivers/leclerc.png",
    loc: 2,
    line: 0,
    lapTime: 0,
    drs: 0,
  },
  {
    name: "Carlos Sainz",
    team: "Ferrari",
    speed: random(20, 60),
    color: "rgb(201, 0, 0)",
    LocX: 530,
    LocY: 50,
    chance: 60,
    corner: 0,
    totalSpeed: -90,
    teamIcon: "./images/ferrari.png",
    driverPic: "./images/drivers/sainz.png",
    loc: 1,
    line: 0,
    lapTime: 0,
    drs: 0,
  },
  {
    name: "Lewis Hamilton",
    team: "Mercedes",
    speed: random(20, 60),
    color: "rgb(160, 160, 160)",
    LocX: 500,
    LocY: 80,
    chance: 65,
    corner: 0,
    totalSpeed: -120,
    teamIcon: "./images/mercedes.png",
    driverPic: "./images/drivers/hamilton.png",
    loc: 2,
    line: 0,
    lapTime: 0,
    drs: 0,
  },
  {
    name: "George Russel",
    team: "Mercedes",
    speed: random(20, 60),
    color: "rgb(160, 160, 160)",
    LocX: 470,
    LocY: 50,
    chance: 45,
    corner: 0,
    totalSpeed: -150,
    teamIcon: "./images/mercedes.png",
    driverPic: "./images/drivers/russel.png",
    loc: 1,
    line: 0,
    lapTime: 0,
    drs: 0,
  },
  {
    name: "Lando Norris",
    team: "McLaren",
    speed: random(20, 60),
    color: "rgb(255, 119, 0)",
    LocX: 440,
    LocY: 80,
    chance: 60,
    corner: 0,
    totalSpeed: -180,
    teamIcon: "./images/mclaren.png",
    driverPic: "./images/drivers/norris.png",
    loc: 2,
    line: 0,
    lapTime: 0,
    drs: 0,
  },
  {
    name: "Oscar Piastry",
    team: "McLaren",
    speed: random(20, 60),
    color: "rgb(255, 119, 0)",
    LocX: 410,
    LocY: 50,
    chance: 50,
    corner: 0,
    totalSpeed: -210,
    teamIcon: "./images/mclaren.png",
    driverPic: "./images/drivers/piastri.png",
    loc: 1,
    line: 0,
    lapTime: 0,
    drs: 0,
  },
  {
    name: "Fernando Alonso",
    team: "Aston Martin",
    speed: random(20, 60),
    color: "rgb(16, 94, 0)",
    LocX: 380,
    LocY: 80,
    chance: 60,
    corner: 0,
    totalSpeed: -240,
    teamIcon: "./images/aston.png",
    driverPic: "./images/drivers/alonso.png",
    loc: 2,
    line: 0,
    lapTime: 0,
    drs: 0,
  },
  {
    name: "Lance Stroll",
    team: "Aston Martin",
    speed: random(20, 60),
    color: "rgb(16, 94, 0)",
    LocX: 350,
    LocY: 50,
    chance: 40,
    corner: 0,
    totalSpeed: -270,
    teamIcon: "./images/aston.png",
    driverPic: "./images/drivers/stroll.png",
    loc: 1,
    line: 0,
    lapTime: 0,
    drs: 0,
  },
  {
    name: "Steben Ocon",
    team: "Alpine",
    speed: random(20, 60),
    color: "rgb(252, 112, 241)",
    LocX: 320,
    LocY: 80,
    chance: 45,
    corner: 0,
    totalSpeed: -300,
    teamIcon: "./images/alpine.png",
    driverPic: "./images/drivers/ocon.png",
    loc: 2,
    line: 0,
    lapTime: 0,
    drs: 0,
  },
  {
    name: "Piere Gasly",
    team: "Alpine",
    speed: random(20, 60),
    color: "rgb(252, 112, 241)",
    LocX: 290,
    LocY: 50,
    chance: 50,
    corner: 0,
    totalSpeed: -330,
    teamIcon: "./images/alpine.png",
    driverPic: "./images/drivers/gasly.png",
    loc: 1,
    line: 0,
    lapTime: 0,
    drs: 0,
  },
  {
    name: "Alex Albon",
    team: "Williams",
    speed: random(20, 60),
    color: "rgb(4, 33, 255)",
    LocX: 260,
    LocY: 80,
    chance: 40,
    corner: 0,
    totalSpeed: -360,
    teamIcon: "./images/williams.png",
    driverPic: "./images/drivers/albon.png",
    loc: 2,
    line: 0,
    lapTime: 0,
    drs: 0,
  },
  {
    name: "Logan Sargeant",
    team: "Williams",
    speed: random(20, 60),
    color: "rgb(4, 33, 255)",
    LocX: 230,
    LocY: 50,
    chance: 35,
    corner: 0,
    totalSpeed: -390,
    teamIcon: "./images/williams.png",
    driverPic: "./images/drivers/sargeant.png",
    yx: 0,
    loc: 1,
    line: 0,
    lapTime: 0,
    drs: 0,
  },
  {
    name: "Daniel Ricciardo",
    team: "Visa CashApp RB",
    speed: random(20, 60),
    color: "rgb(211, 211, 211)",
    LocX: 200,
    LocY: 80,
    chance: 40,
    corner: 0,
    totalSpeed: -420,
    teamIcon: "./images/rb.png",
    driverPic: "./images/drivers/ricciardo.png",
    loc: 2,
    line: 0,
    lapTime: 0,
    drs: 0,
  },
  {
    name: "Yuki Tsunoda",
    team: "Visa CashApp RB",
    speed: random(20, 60),
    color: "rgb(211, 211, 211)",
    LocX: 170,
    LocY: 50,
    chance: 30,
    corner: 0,
    totalSpeed: -450,
    teamIcon: "./images/rb.png",
    driverPic: "./images/drivers/tsunoda.png",
    loc: 1,
    line: 0,
    lapTime: 0,
    drs: 0,
  },
  {
    name: "Walteri Bottas",
    team: "Kick Sauber",
    speed: random(20, 60),
    color: "rgb(0, 255, 8)",
    LocX: 140,
    LocY: 80,
    chance: 25,
    corner: 0,
    totalSpeed: -470,
    teamIcon: "./images/kick.png",
    driverPic: "./images/drivers/bottas.png",
    loc: 2,
    line: 0,
    lapTime: 0,
    drs: 0,
  },
  {
    name: "Zhou Guanyu",
    team: "Kick Sauber",
    speed: random(20, 60),
    color: "rgb(0, 255, 8)",
    LocX: 110,
    LocY: 50,
    chance: 15,
    corner: 0,
    totalSpeed: -500,
    teamIcon: "./images/kick.png",
    driverPic: "./images/drivers/guanyu.png",
    loc: 1,
    line: 0,
    lapTime: 0,
    drs: 0,
  },
  {
    name: "Pico Hulkenberg",
    team: "Haas",
    speed: random(20, 60),
    color: "rgb(172, 69, 69)",
    LocX: 80,
    LocY: 80,
    chance: 30,
    corner: 0,
    totalSpeed: -530,
    teamIcon: "./images/haas.png",
    driverPic: "./images/drivers/hulkenberg.png",
    loc: 2,
    line: 0,
    lapTime: 0,
    drs: 0,
  },
  {
    name: "Kevin Magnessun",
    team: "Haas",
    speed: random(20, 60),
    color: "rgb(172, 69, 69)",
    LocX: 50,
    LocY: 50,
    chance: 25,
    corner: 0,
    totalSpeed: -560,
    teamIcon: "./images/haas.png",
    driverPic: "./images/drivers/magnussen.png",
    loc: 1,
    line: 0,
    lapTime: 0,
    drs: 0,
  },
];

for (const driver of drivers) {
  const div = document.createElement("div");
  div.classList.add("jadvalBackground");
  driver.div = div;
  jadval.appendChild(div);
}

// for(let i = 0;i<20;i++){
//    c.fillStyle = drivers[i].color;
//    c.fillRect(x,y,30,20);
//    y += 40;

// }
for (let i = 0; i < 20; i++) {
  c.fillStyle = `${drivers[i].color}`;
  c.fillRect(drivers[i].LocX, drivers[i].LocY, 30, 15);
}

function frame() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  Arena();
  // for (let i = 0; i < 20; i++) {
  //    c.fillStyle = `${drivers[i].color}`;-
  //    c.imageSmoothingEnabled = true;
  //    c.fillRect(drivers[i].LocX += drivers[i].speed, drivers[i].LocY, 30, 15);
  //    c.fillText(drivers[i].name,drivers[i].LocX, drivers[i].LocY - 5 , 300);
  // }
  jadvalHandler();
  lastPopup += 1;
  if (lastPopup > 1000) {
    speedPopUpHandler();
    handleLap();
    lastPopup = 0;
  }

  if (!pause) {
    requestAnimationFrame(frame);
  }
}

document.body.addEventListener("keydown", (e) => {
  if (e.key == "s") {
    for (let i = 0; i < 20; i++) {
      if (random(0, 100) <= drivers[i].chance) {
        if (drivers[i].speed < 60) drivers[i].speed = random(45, 70);
      } else {
        drivers[i].speed = random(30, 55);
      }
    }
    requestAnimationFrame(frame);
  } else if (e.key == "space") {
    e.preventDefault();
    pause = !pause;
    if (!pause) {
      requestAnimationFrame(frame);
    }
  }
});

function Arena() {
  for (let i = 0; i < 20; i++) {
    //1st corner.....

    if (
      (drivers[i].corner == 0 && drivers[i].line == 0) ||
      drivers[i].line == 11 ||
      drivers[i].line == 12
    ) {
      drivers[i].line = rand(1, 2);
    }

    if (drivers[i].corner == 0 && drivers[i].line == 1) {
      if (isNextLap) {
        laps++;
        isNextLap = false;
      }
      if (drivers[i].LocX <= 1200) {
        c.fillStyle = `${drivers[i].color}`;
        c.imageSmoothingEnabled = true;
        c.fillRect(
          (drivers[i].LocX += drivers[i].speed),
          drivers[i].LocY,
          15,
          15
        );
        drivers[i].totalSpeed += drivers[i].speed;
        c.fillText(drivers[i].name, drivers[i].LocX, drivers[i].LocY - 5, 300);
      } else {
        drivers[i].corner = 1;
      }
    }

    if (drivers[i].corner == 0 && drivers[i].line == 2) {
      if (drivers[i].LocX <= 1240) {
        c.fillStyle = `${drivers[i].color}`;
        c.imageSmoothingEnabled = true;
        c.fillRect(
          (drivers[i].LocX += drivers[i].speed),
          drivers[i].LocY,
          15,
          15
        );
        drivers[i].totalSpeed += drivers[i].speed;
        c.fillText(drivers[i].name, drivers[i].LocX, drivers[i].LocY - 5, 300);
      } else {
        drivers[i].corner = 1;
      }
    }

    //2nd corner....

    if (drivers[i].corner == 1 && drivers[i].line < 3) {
      drivers[i].line = rand(3, 4);
    }

    if (drivers[i].corner == 1 && drivers[i].line == 3) {
      if (drivers[i].LocX <= 1790) {
        c.fillStyle = `${drivers[i].color}`;
        c.imageSmoothingEnabled = true;
        c.fillRect(
          (drivers[i].LocX += drivers[i].speed),
          (drivers[i].LocY += drivers[i].speed),
          15,
          15
        );
        drivers[i].totalSpeed += drivers[i].speed;
        c.fillText(drivers[i].name, drivers[i].LocX, drivers[i].LocY - 5, 300);
      } else {
        drivers[i].corner = 2;
      }
    }

    if (drivers[i].corner == 1 && drivers[i].line == 4) {
      if (drivers[i].LocX <= 1790) {
        c.fillStyle = `${drivers[i].color}`;
        c.imageSmoothingEnabled = true;
        c.fillRect(
          (drivers[i].LocX += drivers[i].speed),
          (drivers[i].LocY += drivers[i].speed),
          15,
          15
        );
        drivers[i].totalSpeed += drivers[i].speed;
        c.fillText(drivers[i].name, drivers[i].LocX, drivers[i].LocY - 5, 300);
      } else {
        drivers[i].corner = 2;
      }
    }

    // 3rd corner.....

    if (drivers[i].corner == 2 && drivers[i].line < 5) {
      drivers[i].line = rand(5, 6);
    }

    if (drivers[i].corner == 2 && drivers[i].line == 5) {
      if (drivers[i].LocX <= 2600) {
        c.fillStyle = `${drivers[i].color}`;
        c.imageSmoothingEnabled = true;
        c.fillRect(
          (drivers[i].LocX += drivers[i].speed),
          drivers[i].LocY,
          15,
          15
        );
        drivers[i].totalSpeed += drivers[i].speed;
        c.fillText(drivers[i].name, drivers[i].LocX, drivers[i].LocY - 5, 300);
      } else {
        drivers[i].corner = 3;
      }
    }

    if (drivers[i].corner == 2 && drivers[i].line == 6) {
      if (drivers[i].LocX <= 2550) {
        c.fillStyle = `${drivers[i].color}`;
        c.imageSmoothingEnabled = true;
        c.fillRect(
          (drivers[i].LocX += drivers[i].speed),
          drivers[i].LocY,
          15,
          15
        );
        drivers[i].totalSpeed += drivers[i].speed;
        c.fillText(drivers[i].name, drivers[i].LocX, drivers[i].LocY - 5, 300);
      } else {
        drivers[i].corner = 3;
      }
    }

    //4th corner .....

    if (drivers[i].corner == 3 && drivers[i].line < 7) {
      drivers[i].line = rand(7, 8);
    }

    if (drivers[i].corner == 3 && drivers[i].line == 7) {
      if (drivers[i].LocY <= 1100) {
        c.fillStyle = `${drivers[i].color}`;
        c.imageSmoothingEnabled = true;
        c.fillRect(
          drivers[i].LocX,
          (drivers[i].LocY += drivers[i].speed),
          15,
          15
        );
        drivers[i].totalSpeed += drivers[i].speed;
        c.fillText(drivers[i].name, drivers[i].LocX, drivers[i].LocY - 5, 300);
      } else {
        drivers[i].corner = 4;
      }
    }

    if (drivers[i].corner == 3 && drivers[i].line == 8) {
      if (drivers[i].LocY <= 1150) {
        c.fillStyle = `${drivers[i].color}`;
        c.imageSmoothingEnabled = true;
        c.fillRect(
          drivers[i].LocX,
          (drivers[i].LocY += drivers[i].speed),
          15,
          15
        );
        drivers[i].totalSpeed += drivers[i].speed;
        c.fillText(drivers[i].name, drivers[i].LocX, drivers[i].LocY - 5, 300);
      } else {
        drivers[i].corner = 4;
      }
    }

    //5th corner......

    if (drivers[i].corner == 4 && drivers[i].line < 9) {
      drivers[i].drs = 1;
      drivers[i].line = rand(9, 10);
    }

    if (drivers[i].corner == 4 && drivers[i].line == 9) {
      if (drivers[i].LocX >= 50) {
        c.fillStyle = `${drivers[i].color}`;
        c.imageSmoothingEnabled = true;
        c.fillRect(
          (drivers[i].LocX -= drivers[i].speed),
          drivers[i].LocY,
          15,
          15
        );
        drivers[i].totalSpeed += drivers[i].speed;
        c.fillText(drivers[i].name, drivers[i].LocX, drivers[i].LocY - 5, 300);
      } else {
        drivers[i].corner = 5;
      }
    }

    if (drivers[i].corner == 4 && drivers[i].line == 10) {
      if (drivers[i].LocX >= 80) {
        c.fillStyle = `${drivers[i].color}`;
        c.imageSmoothingEnabled = true;
        c.fillRect(
          (drivers[i].LocX -= drivers[i].speed),
          drivers[i].LocY,
          15,
          15
        );
        drivers[i].totalSpeed += drivers[i].speed;
        c.fillText(drivers[i].name, drivers[i].LocX, drivers[i].LocY - 5, 300);
      } else {
        drivers[i].corner = 5;
      }
    }

    //6th corner.....
    if (drivers[i].corner == 5 && drivers[i].line < 11) {
      drivers[i].drs = 0;
      drivers[i].line = rand(11, 12);
    }

    if (drivers[i].corner == 5 && drivers[i].line == 11) {
      if (drivers[i].LocY >= 50) {
        c.fillStyle = `${drivers[i].color}`;
        c.imageSmoothingEnabled = true;
        c.fillRect(
          drivers[i].LocX,
          (drivers[i].LocY -= drivers[i].speed),
          15,
          15
        );
        drivers[i].totalSpeed += drivers[i].speed;
        c.fillText(drivers[i].name, drivers[i].LocX, drivers[i].LocY - 5, 300);
      } else {
        drivers[i].corner = 0;
      }
    }

    if (drivers[i].corner == 5 && drivers[i].line == 12) {
      if (drivers[i].LocY >= 80) {
        c.fillStyle = `${drivers[i].color}`;
        c.imageSmoothingEnabled = true;
        c.fillRect(
          drivers[i].LocX,
          (drivers[i].LocY -= drivers[i].speed),
          15,
          15
        );
        drivers[i].totalSpeed += drivers[i].speed;
        c.fillText(drivers[i].name, drivers[i].LocX, drivers[i].LocY - 5, 300);
      } else {
        drivers[i].corner = 0;
        if (i == 19) {
          isNextLap = true;
        }
      }
    }
  }
}

function random(min, max) {
  setTimeout((t) => {}, 500);
  return Math.floor(Math.random() * (max - min + 1) + min) * 0.05;
}

function rand(min, max) {
  setTimeout((t) => {}, 500);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let timer1 = setInterval(() => {
  for (let i = 0; i < 20; i++) {
    if (drivers[i].drs != 1) {
      if (random(0, 100) <= drivers[i].chance) {
        drivers[i].speed = random(55, 57);
      } else {
        drivers[i].speed = random(53, 55);
      }
    } else {
      if (random(0, 100) <= drivers[i].chance) {
        if (drivers[i].speed <= random(65, 80)) {
          drivers[i].speed += 0.8;
        }
      }
    }
  }
}, random(7000, 9000) * 10);
let names = [];
function jadvalHandler() {
  drivers.sort((a, b) => b.totalSpeed - a.totalSpeed);

  /* for (let i = 0; i < 20; i++) {
       for (let j = 0; j < 20; j++) {
          if (speeds[i] == drivers[j].totalSpeed && !alreadyDrivers.includes(drivers[j].name)) {
          alreadyDrivers.push(drivers[j].name);
          let nam = drivers[j].name.split(" ");
          names.push({name: nam[1].substring(0,3).toUpperCase(), color: drivers[j].color, teamIcon: drivers[j].teamIcon});
          }
       }
    }*/
  drivers.forEach((e) => {
    let nam = e.name.split(" ");
    names.push({
      teamIcon: e.teamIcon,
      name: nam[1].substring(0, 3).toUpperCase(),
      color: e.color,
    });
  });
  //jadval.innerHTML = "";
  let j = 0;
  // console.log('aaaa')
  for (let driver of drivers) {
    driver.div.style.top = j * 50 + "px";
    driver.div.innerHTML = `<p class="pos"> ${j + 1} </p><img src="${
      names[j].teamIcon
    }" class="pic"><p class="names" style="color:${names[j].color};">${
      names[j].name
    }</p>`;
    j++;
  }
  //jadval.innerHTML += `<div class="jadvalBlock"><p class="pos"> ${i} </p><img src="${e.teamIcon}" class="pic"><p class="names" style="color:${e.color};">${e.name}</p></div> <br />`;

  //setTimeout(() => {},100);

  //console.log(names);
  names = [];
}
function speedPopUpHandler() {
  let p = document.getElementById("kmh");
  let p2 = p.children[0];
  let i = Math.floor(random(0, 10) * 10);
  let driver = drivers[i];
  let x = 0;
  //.classList.remove('animStart');
  //p2.classList.remove('animEnd');
  p.style.display = "flex";

  p2.classList.add("animStart");
  p2.classList.remove("animEnd");
  let dSpeed = driver.speed;
  p.appendChild(p2);
  let inv = setInterval(function () {
    dSpeed = Math.ceil(driver.speed * random(100, 150) * (random(13, 18) * 11));
    p2.innerHTML = `<img src="${
      driver.driverPic
    }" id="driverpic"><br><img id="teamLogo" src="${
      driver.teamIcon
    }"><br><p style="font-size=10px;"> ${
      driver.name
    }</p><p style="font-size=10px;">${dSpeed} km/h | ${(
      driver.speed *
      random(1400, 1600) *
      15
    ).toFixed(0)} RPM </p><p style="font-size=10px;"></p>`;
    x++;
    if (x > 30) {
      clearInterval(inv);
    }
  }, 300);

  setTimeout(function () {
    p2.classList.remove("animStart");
    p2.classList.add("animEnd");
    //p.style.display = 'none';
  }, 5000);
  p.appendChild(p2);
}
window.addEventListener("resize", (e) => {
  canvas.width = window.innerWidth;
});
/*window.addEventListener("scroll",(e) => {
   console.log(e.preventDefault());
});*/
function handleLap() {
  lapP.innerHTML = `${laps} / 50`;
}
