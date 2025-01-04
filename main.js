var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;
canvas.style.border = "2px solid #ffffff";

document.body.appendChild(canvas);


function clickk() {
    var soundd = document.createElement("audio");
    soundd.src = "hit.mp3";
    soundd.play();
}

var player = {

    x: 100,
    y: 100,

    w: 50,
    h: 50,

    spd: 1.0,
    color: "#ffffff",
    hittable: false,

    isLeft:false,isRight:false,isTop:false,isDown:false,

    render: function() {
        ctx.fillStyle = this.color;
        if(!this.hittable){this.color="#ffffff"}else{this.color="#00ff00"}
        ctx.fillRect(this.x,this.y,this.w,this.h);
    },

    hh: 1,
    vv: 1,
    rrnd: 1,

    updated: function() {
        if((Math.random()*2) < 1) {
            this.rrnd = 1;
        }else {
            this.rrnd = -1;
        }
        this.x+=this.hh;
        this.y+=this.vv;
        // if(this.isLeft){
        //     this.x-=this.spd;
        // }
        // if(this.isRight){
        //     this.x+=this.spd;
        // }
        // if(this.isTop) {
        //     this.y-=this.spd;
        // }
        // if(this.isDown) {
        //     this.y+=this.spd;
        // }

        if(this.x>=450){this.x=450; window.location.reload();}
        if(this.y>=450){this.y=450;}
        if(this.x<0){this.x=0;}
        if(this.y<0){this.y=0;}
    }
}

addEventListener("keydown", function(e) {
    if(e.key == "w") {
        player.isTop = true;
    }
    if(e.key == "s") {
        player.isDown = true;
    }
    if(e.key == "a") {
        player.isLeft = true;
    }
    if(e.key == "d") {
        player.isRight = true;
    }
});

addEventListener("keyup", function(e) {
    if(e.key == "w") {
        player.isTop = false;
    }
    if(e.key == "s") {
        player.isDown = false;
    }
    if(e.key == "a") {
        player.isLeft = false;
    }
    if(e.key == "d") {
        player.isRight = false;
    }
});

class Block {
    constructor(x,y) {

        var borderColor = "#ff0000";

        var colorBase = "#550055";

        var isColliding = false;

        var l0 = {
            xx:x,
            yy:y,
            upd:function() {
                ctx.fillStyle = borderColor;
                ctx.fillRect(this.xx, this.yy, 1, 50);
                if(player.x > this.xx - 50 && player.x < this.xx - 25 && player.y > this.yy - 50 && player.y < this.yy + 50) {
                    player.x = player.x - player.spd;
                    player.hh = -1;
                    player.vv = -1;
                    player.vv = player.rrnd;
                    clickk();
                }
            }
        }

        var r0 = {
            xx:x+50,
            yy:y,
            upd:function() {
                ctx.fillStyle = borderColor;
                ctx.fillRect(this.xx, this.yy, 1, 50);
                if(player.x < this.xx + 1 && player.x > this.xx - 1 && player.y > this.yy - 50 && player.y < this.yy + 50) {
                    player.x = player.x + player.spd;
                    player.hh = 1;
                    clickk();
                }
            }
        }

        var t0 = {
            xx:x,
            yy:y,
            upd:function() {
                ctx.fillStyle = borderColor;
                ctx.fillRect(this.xx, this.yy, 50, 1);
                if(player.x > this.xx - 50 && player.x < this.xx + 50 && player.y < this.yy + 51 && player.y > this.yy + 40) {
                    player.y = player.y + player.spd;
                    player.vv = 1;
                    clickk();
                }
            }
        }

        var d0 = {
            xx:x,
            yy:y+50,
            upd:function() {
                ctx.fillStyle = borderColor;
                ctx.fillRect(this.xx, this.yy, 50, 1);
                if(player.x > this.xx - 50 && player.x < this.xx + 50 && player.y > this.yy - 100 && player.y < this.yy - 45) {
                    player.y = player.y - player.spd;
                    player.vv = -1;
                    player.hh = player.rrnd;
                    clickk();
                }
            }
        }

        this.render = function() {
            if(player.x > x - 52 && player.x < x + 52 && player.y < y + 52 && player.y > y - 52) {
                isColliding = true;
            }else {
                isColliding = false;
            }
            if(isColliding) {
                colorBase = "green";
            }else {
                colorBase = "#550055";
            }
            ctx.fillStyle = colorBase;
            ctx.fillRect(x, y, 50, 50);
            l0.upd();
            r0.upd();
            t0.upd();
            d0.upd();
        }
    }
}

// var map = [
//     0, 0, 1, 1, 1,
//     0, 0, 0, 0, 1,
//     1, 0, 0, 0, 1,
//     1, 0, 0, 0, 1,
//     1, 1, 1, 1, 1,
// ]

var blocks = [
    new Block(0, 0),
    new Block(50, 0),
    new Block(100, 0),
    new Block(0, 50),

    new Block(0, 100),
    new Block(0, 150),
    new Block(0, 200),
    new Block(0, 250),
    new Block(0, 300),
    new Block(0, 350),
    new Block(0, 400),
    new Block(0, 450),
    new Block(0, 500),

    // new Block(100, 0),
    new Block(150, 0),
    new Block(200, 0),
    new Block(250, 0),
    new Block(300, 0),
    new Block(350, 0),
    new Block(400, 0),
    new Block(450, 0),


    new Block(50, 450),
    new Block(100, 450),
    new Block(150, 450),
    new Block(200, 450),
    new Block(250, 450),
    new Block(300, 450),
    new Block(350, 450),
    // new Block(400, 450),
    new Block(450, 450),

    new Block(450, 50),
    new Block(450, 100),
    new Block(450, 150),
    new Block(450, 200),
    new Block(450, 250),
    // new Block(450, 300),
    // new Block(450, 350),
    // new Block(450, 400),
    new Block(450, 450),
    new Block(400, 450),
]

var block30 = new Block(100 + Math.random() * 200, 100 + Math.random() * 200);
var block31 = new Block(100 + Math.random() * 200, 100 + Math.random() * 200);

function update() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 500, 500);

    player.updated();
    player.render();

    // for(let x = 0; x < map.length / 2; x++) {
    //     for(let y = 0; y < map.length / 2; y++) {
    //         if(map[x + y * 5] == 1) {
    //             new Block(x * 100, y * 100).render();
    //         }
    //     }
    // }

    for(let i = 0; i < blocks.length; i++) {
        blocks[i].render();   
    }

    block30.render();
    block31.render();
}

setInterval(update, 1000/120);