var w=800;
var h=400;
var jugador;
var fondo;

var bala, balaD=false, nave;
var bala2, balaD2=false;

var salto;
var menu;

var posicionJugador;
var velocidadBala;
var despBala;
var posicionBala2 = 0;
var velocidadBala2;
var despBala2;

var estatusSalto;
var estatusAdelante;
var estatusAtras;

var nnNetwork , nnEntrenamiento, nnSalida, datosEntrenamiento=[];
var modoAuto = false, eCompleto=false;

var alternateBala = false;

var timeBala1 = 0;
var timeBala2 = 0;

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
    posicionJugador = jugador.position.x;

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
    
    nnNetwork =  new synaptic.Architect.Perceptron(6, 10, 10, 10, 3);
    nnEntrenamiento = new synaptic.Trainer(nnNetwork);

}

function enRedNeural(){
    nnEntrenamiento.train(datosEntrenamiento, {rate: 0.0003, iterations: 10000, shuffle: true});
}

function datosDeEntrenamiento(param_entrada){

    console.log("Entrada",param_entrada[0]+" "+param_entrada[1]+" "+param_entrada[2] + " "+param_entrada[3] + " "+param_entrada[4]);
    nnSalida = nnNetwork.activate(param_entrada);
    var salto=Math.round( nnSalida[0]*100 );
    var atras=Math.round( nnSalida[1]*100 );
    var adelante=Math.round( nnSalida[2]*100 );
    console.log("-------");
    console.log("Salto: "+ salto + " Atras: "+ atras + " Adelante: "+ adelante);
    console.log("Valor ","En el Salto %: "+ salto);
    console.log("Valor ","Atras %: "+ atras);
    console.log("Valor ","Adelante %: "+ adelante);
    var salidas =[]
    salidas[0] = nnSalida[0]
    salidas[1] = nnSalida[1] - nnSalida[2]
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

    bala.body.velocity.x = 0;
    bala.position.x = w-100;

    bala2.body.velocity.y = 0;
    bala2.position.x = jugador.position.x;
    bala2.position.y = h-400; 
    
    jugador.position.x=50;
    balaD=false;
    balaD2=false;
}

function resetBala(){
    bala.body.velocity.x = 0;
    bala.position.x = w-100;
    balaD=false;
}

function resetBala2(){
    bala2.body.velocity.y = 0;
    bala2.position.x = jugador.position.x;
    bala2.position.y = h-400; 
    balaD2=false;
}

function saltar(){
    jugador.body.velocity.y = -270;
}

function update() {

    fondo.tilePosition.x -= 1; 
    
    posicionBala2 = bala.position.y;
    posicionJugador = jugador.position.x;

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

    
    if( modoAuto == true  && bala.position.x>0 && jugador.body.onFloor()) {

        salidas = datosDeEntrenamiento( [ posicionJugador, despBala , velocidadBala, posicionBala2, despBala2, velocidadBala2] );

        if( salidas[0] > 0.5 && jugador.body.onFloor()){
            saltar();
        }
        if(Math.abs(salidas[1]) > 0.2){
            if( salidas[1] > 0 ){
                jugador.body.velocity.x = -150; 
            }else{
                jugador.body.velocity.x = 150; 
            }
        }

        /* if( datosDeEntrenamiento( [despBala , velocidadBala] )  ){
            saltar();
        } */
    }

    
    if( balaD==false ){
        timeBala1 += juego.time.elapsed;
        let delay = randomIntFromInterval(0,3500);
        if (timeBala1 >= delay)  
        {
            timeBala1 = 0;
            disparo();
        }
    } 
    
    if( balaD2==false ){
        timeBala2 += juego.time.elapsed;
        let delay = randomIntFromInterval(1000,5000);
        if (timeBala2 >= delay)  
        {
            timeBala2 = 0;
            disparo2();
        }
    } 
    
    if( bala.position.x <= 0  ){
        resetBala();
    }
    if( bala2.position.y >= 370  ){
        resetBala2();
    }

    
    if( modoAuto ==false  && bala.position.x > 0 
        || modoAuto == false && bala2.position.y < 370
        ){

        datosEntrenamiento.push({
                'input' :  [posicionJugador, despBala , velocidadBala, posicionBala2,despBala2, velocidadBala2],
                'output':  [estatusSalto, estatusAtras, estatusAdelante ]  
        });

        /* console.log("Desplazamiento Bala, Velocidad Bala, Estatus, Estatus: ",
            despBala + " " +velocidadBala + " "+ estatusAire+" "+  estatuSuelo); */
        
        console.log("Desplazamiento Bala, Velocidad Bala, Posicion Bala2, Desplazamiento Bala2, Velocidad Bala2, Estatus Salto, Estatus Atras, Estatus Adelante: ",
            despBala + " " +velocidadBala + " "+ posicionBala2 + " "+ despBala2 + " "+ velocidadBala2 + " "+ estatusSalto+" "+  estatusAtras+" "+  estatusAdelante);
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
    
    velocidadBala2 =  1 * velocidadRandom(300,800);
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
