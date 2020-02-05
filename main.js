let s, v, r = 20, speed = 6, defualtSpeed = 2.5, sn, score = 0;
let left = 1, right = 2, up = 3, down = 4;
let x = 20, y = 20, rx = 20, ry = 20;
let direction;

let colors = [{
    r: 255,
    g: 0,
    b: 0,
}, {
    r: 0,
    g: 255,
    b: 0,
}, {
    r: 0,
    g: 0,
    b: 255,
}, {
    r: 255,
    g: 255,
    b: 0,
}, {
    r: 0,
    g: 255,
    b: 255,
}]

let food = []

function setup() {

    createCanvas(windowWidth, windowHeight);
    s = createVector(50, 100);
    v = createVector(0, 0);

    textSize(28);
    let rc = colors[Math.round(random(4))]
    direction = Math.round(random(1, 4));

    food = [{
        x: 10,
        y: 10,
        r: 10,
        c: rc,
    }, {
        x: 400,
        y: 400,
        r: 10,
        c: rc,
    }, {
        x: 200,
        y: 50,
        r: 10,
        c: rc,
    }]

    setInterval(() => {
        food.push({
            x: random(windowWidth),
            y: random(windowHeight),
            r: 10,
            c: rc,
        })

    }, 2000);

    setInterval(() => {
        direction = Math.round(random(1, 4));
    }, 10000);
}

function draw() {
    
    // console.log(direction)
    background(0)
    stroke(255);
    fill(255)
    ellipse(s.x, s.y, r, r);

    // for (let w = 0; w <= 8; w++) {
    //     for (let h = 0; h <= 8; h++) {
    //         stroke(255);
    //         line(w * (width / 8), h, w * (width / 8), height * h);
    //         line(w, h * (height / 8), w * width, h * (height / 8));
    //     }
    // }

    stroke(255);
    for (let w = 0; w <= 22; w++) {
        line(w * (windowWidth / 22), 0, w * (windowWidth / 22), windowHeight);
    }

    for (let h = 0; h <= 10; h++) {
        line(0, h * (windowHeight / 10), windowWidth, h * (windowHeight / 10));
    }

    s.add(v);

    var dis = Math.sqrt((mouseX - s.x) * (mouseX - s.x) + (mouseY - s.y) * (mouseY - s.y))

    if (dis < 10) {
        let nx = mouseX, ny = mouseY;
        s.x = nx;
        s.y = ny;
    }

    // s.x += v.x;
    // s.y += v.y;
    for (let i = 0; i < food.length; i++) {
        let f = food[i];

        if (check(s.x, s.y, r, f.x, f.y, f.r)) {
            food.splice(i, 1);
            r += f.r / 2;
            sn = r / 80
            speed = defualtSpeed / sn
            score += 1;
 
        }
        stroke(f.c.r, f.c.g, f.c.g);
        fill(f.c.r, f.c.g, f.c.g);
        ellipse(f.x, f.y, f.r, f.r);
    }
    stroke(255, 255, 0);
    fill(255, 255, 0);
    text(score, 5, 30);

    botMoved();
}

function botMoved() {

    stroke(255);
    fill(255)
    
    if (direction == right && x <= windowWidth - rx) x++;
    if (direction == left && x >= 0) x--;
    if (direction == up && y >= 0) y--;
    if (direction == down && y <= windowHeight - rx) y++;

    rect(x, y, rx, ry);

    console.log(direction);
}

function mouseMoved() {
    var angle = Math.atan2(mouseY - s.y, mouseX - s.x);
    v.x = Math.cos(angle) * speed;
    v.y = Math.sin(angle) * speed;

}

function check(x, y, r, x2, y2, r2) {
    let dx = x2 - x;
    let dy = y2 - y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    return dist < r / 2 + r2 / 2;
}