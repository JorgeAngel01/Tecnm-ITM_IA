var w=800;
var h=400;
var jugador;
var fondo;

var bala, balaD=false, nave;
var bala2, balaD2=false;

var salto;
var menu;

var movIzq;
var movDer;

var velocidadBala;
var despBala;
var despBala2;

var estatusSalto;
var estatusAdelante;
var estatusAtras;

var nnNetwork , nnEntrenamiento, nnSalida, datosEntrenamiento=[];
var modoAuto = false, eCompleto=false;

var alternateBala = false;

var balasDisp = 0;
var dirUltimaBala = '';

var juego = new Phaser.Game(w, h, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render:render});

function preload() {
    juego.load.image('fondo', 'assets/game/fondo.jpg');
    juego.load.spritesheet('mono', 'assets/sprites/altair.png',32 ,48);
    juego.load.image('nave', 'assets/game/ufo.png');
    juego.load.image('bala', 'assets/sprites/purple_ball.png');
    juego.load.image('menu', 'assets/game/menu.png');

}

function create() {

    juego.physics.startSystem(Phaser.Physics.ARCADE);
    juego.physics.arcade.gravity.y = 800;
    juego.time.desiredFps = 30;

    fondo = juego.add.tileSprite(0, 0, w, h, 'fondo');
    nave = juego.add.sprite(w-100, h-70, 'nave');
    bala = juego.add.sprite(w-100, h, 'bala');
    jugador = juego.add.sprite(50, h, 'mono');
    bala2 = juego.add.sprite(jugador.position.x, h-400, 'bala');


    juego.physics.enable(jugador);
    jugador.body.collideWorldBounds = true;
    var corre = jugador.animations.add('corre',[8,9,10,11]);
    jugador.animations.play('corre', 10, true);

    juego.physics.enable(bala);
    bala.body.collideWorldBounds = true;

    juego.physics.enable(bala2);
    bala2.body.collideWorldBounds = true;
    bala2.body.allowGravity = false;

    pausaL = juego.add.text(w - 100, 20, 'Pausa', { font: '20px Arial', fill: '#fff' });
    pausaL.inputEnabled = true;
    pausaL.events.onInputUp.add(pausa, self);
    juego.input.onDown.add(mPausa, self);

    salto = juego.input.keyboard.addKey(Phaser.Keyboard.UP);

    movIzq = juego.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    movDer = juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    
    nnNetwork =  new synaptic.Architect.Perceptron(3,7,7,3);
    nnEntrenamiento = new synaptic.Trainer(nnNetwork);

}

function enRedNeural(){
    nnEntrenamiento.train(datosEntrenamiento, {rate: 0.0003, iterations: 10000, shuffle: true});
}

function datosDeEntrenamiento(param_entrada){

    console.log("Entrada",param_entrada[0]+" "+param_entrada[1]+" "+param_entrada[2]);
    nnSalida = nnNetwork.activate(param_entrada);
    var salto=Math.round( nnSalida[0]*100 );
    var atras=Math.round( nnSalida[1]*100 );
    var adelante=Math.round( nnSalida[2]*100 );
    console.log("-------");
    console.log("Salto: "+ nnSalida[0] + " Atras: "+ nnSalida[1] + " Adelante: "+ nnSalida[2]);
    console.log("Valor ","En el Salto %: "+ salto);
    console.log("Valor ","Atras %: "+ atras);
    console.log("Valor ","Adelante %: "+ adelante);
    var salidas =[]
    salidas[0] = nnSalida[0]
    salidas[1] = nnSalida[1]
    salidas[2] = nnSalida[2]
    return salidas;
}



function pausa(){
    juego.paused = true;
    menu = juego.add.sprite(w/2,h/2, 'menu');
    menu.anchor.setTo(0.5, 0.5);
}

function mPausa(event){
    if(juego.paused){
        var menu_x1 = w/2 - 270/2, menu_x2 = w/2 + 270/2,
            menu_y1 = h/2 - 180/2, menu_y2 = h/2 + 180/2;

        var mouse_x = event.x  ,
            mouse_y = event.y  ;

        if(mouse_x > menu_x1 && mouse_x < menu_x2 && mouse_y > menu_y1 && mouse_y < menu_y2 ){
            if(mouse_x >=menu_x1 && mouse_x <=menu_x2 && mouse_y >=menu_y1 && mouse_y <=menu_y1+90){
                eCompleto=false;
                datosEntrenamiento = [];
                modoAuto = false;
            }else if (mouse_x >=menu_x1 && mouse_x <=menu_x2 && mouse_y >=menu_y1+90 && mouse_y <=menu_y2) {
                if(!eCompleto) {
                    console.log("","Entrenamiento "+ datosEntrenamiento.length +" valores" );
                    enRedNeural();
                    eCompleto=true;
                }
                modoAuto = true;
            }

            menu.destroy();
            resetVariables();
            juego.paused = false;

        }
    }
}


function resetVariables(){
    jugador.body.velocity.x=0;
    jugador.body.velocity.y=0;
    jugador.position.x=50;
    
    bala.body.velocity.x = 0;
    bala.position.x = w-100;
    
    bala2.body.velocity.y = 0;
    bala2.position.x = jugador.position.x;
    bala2.position.y = h-400; 
    
    balaD=false;
    balaD2=false;

    balasDisp = 0;
    dirUltimaBala = '';
}

function saltar(){
    jugador.body.velocity.y = -270;
}

function update() {

    fondo.tilePosition.x -= 1; 

    juego.physics.arcade.collide(bala, jugador, colisionH, null, this);
    juego.physics.arcade.collide(bala2, jugador, colisionH, null, this);

    estatusSalto = 0;

    if(!jugador.body.onFloor()) {
        estatusSalto = 1;
    }
	
    despBala = Math.floor( jugador.position.x - bala.position.x );
    despBala2 = Math.floor( jugador.position.y - bala2.position.y );

    if( modoAuto==false && salto.isDown &&  jugador.body.onFloor() ){
        saltar();
    }
    
    if( jugador.position.x > 150 ){
        jugador.body.velocity.x = 0;
        jugador.position.x = 149;
    }
    else{
        
        if ( modoAuto==false && movIzq.isDown ){
            estatusAtras = 1;
            estatusAdelante = 0;
            jugador.body.velocity.x = -150; 
        }
    
        if ( modoAuto==false && movDer.isDown ){
            estatusAdelante = 1;
            estatusAtras = 0;
            jugador.body.velocity.x = 150; 
        }
    
        if ( modoAuto==false && movIzq.isUp && movDer.isUp ){
            estatusAdelante = 0;
            estatusAtras = 0;
            jugador.body.velocity.x = 0; 
        }
    }

    
    if( modoAuto == true  && bala.position.x>0) {

        salidas = datosDeEntrenamiento( [despBala, velocidadBala, despBala2] );

        if( salidas[0] > 0.5 && jugador.body.onFloor()){
            saltar();
        }
        if( salidas[1] > salidas[2] && salidas[1] > 0.2 ){
            jugador.body.velocity.x = -150; 
        }
        if( salidas[2] > salidas[1] && salidas[2] > 0.2 ){
            jugador.body.velocity.x = 150; 
        }
        /* if( datosDeEntrenamiento( [despBala , velocidadBala] )  ){
            saltar();
        } */
    }

    random = randomIntFromInterval(0,1);
    console.log("Random: ",random);
    if ( random == 0) {
        alternateBala = true;
    }
    else{
        alternateBala = false;
    }
    
    if (balaD === false && alternateBala === true && balaD2 !== true) {
        if (dirUltimaBala !== 'left') {
            disparo();
            dirUltimaBala = 'left';
            balasDisp = 1;
        } else if (balasDisp < 3) {
            disparo();
            balasDisp++;
        }
    }

    if (balaD2 === false && alternateBala === false && balaD !== true) {
        if (dirUltimaBala !== 'right') {
            disparo2();
            dirUltimaBala = 'right';
            balasDisp = 1;
        } else if (balasDisp < 3) {
            disparo2();
            balasDisp++;
        }
    }  

    
    if( bala.position.x <= 0  ){
        resetVariables();
    }
    if( bala2.position.y >= 370  ){
        resetVariables();
    }

    
    if( modoAuto ==false  && bala.position.x > 0 ){

        datosEntrenamiento.push({
                'input' :  [despBala , velocidadBala, despBala2],
                'output':  [estatusSalto, estatusAtras, estatusAdelante ]  
        });

        /* console.log("Desplazamiento Bala, Velocidad Bala, Estatus, Estatus: ",
            despBala + " " +velocidadBala + " "+ estatusAire+" "+  estatuSuelo); */
        
        console.log("Desplazamiento Bala: " + despBala + " Velocidad Bala: " + velocidadBala + " Desplazamiento Bala2: " + despBala2);
   }

}

function spawnBala1() {
    if (balaD === false) {
        disparo();
        let delay = randomIntFromInterval(3000,6000)
        var timer = juego.time.delayedCall(delay, spawn, args, scope); 
    }
}

function spawnBala2() {
    if (balaD2 === false) {
        disparo2();
        let delay = randomIntFromInterval(3000,6000)
        var timer = juego.time.delayedCall(delay, spawn, args, scope); 
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

function disparo(){
    velocidadBala =  -1 * velocidadRandom(300,800);
    bala.body.velocity.y = 0 ;
    bala.body.velocity.x = velocidadBala ;
    balaD=true;
}

function disparo2(){
    
    velocidadBala2 =  1 * velocidadRandom(300,500);
    bala2.body.velocity.y = velocidadBala2 ;
    bala2.body.velocity.x = 0 ;
    balaD2=true;
}

function colisionH(){
    pausa();
}

function velocidadRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function render(){

}
