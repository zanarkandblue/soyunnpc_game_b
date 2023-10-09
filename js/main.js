//stats del personaje
let name = "npc";
let health = 50;
let maxHealth = 50;
let currentWeapon = 0;
let fighting;
let potionCount = 1;
let armEquip = "";
let money = 100;
let killCount = 0;

//DOM Elements
const button1 = document.getElementById("btn-1");
const button2 = document.getElementById("btn-2");
const button3 = document.getElementById("btn-3");
const button4 = document.getElementById("btn-4");
const textElement = document.getElementById("text");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameElement = document.querySelector("#monsterName");
const monsterHealthElement = document.querySelector("#monsterHealth");
const playerHealthElement = document.querySelector("#playerHealth");
const killCountElement = document.getElementById("killCountText")

monsterStats.style.display = "none";
playerHealthElement.innerText = health;
killCount=localStorage.getItem("killCountStorage");
killCountElement.innerText = killCount;

const weapons = [
	{name:"puño",power:5},
    {name:"hacha",power:10},
	{name:"escopeta",power:15},
	{name:"granada de mano",power:30},
    {name:"cañón",power:60},
    {name:"tanque",power:120},
    {name:"rayo láser",power:240},
	];

const monsters = [
    {
      name: "Zombie",
      attack: 10,
      health: 15
    },
    {
      name: "Zombie acorazado",
      attack: 30,
      health: 60
    },
    {
      name: "Zombie dragón",
      attack: 60,
      health: 300
    }
  ];


  const locations = [
    {
        name: "0",
        event: "intro",
        "button text": ["Siguiente", "xxx", "xxx", "xxx"],
        "button functions": [nextText],
        text: "Renderización completa. Despierta, NPC 42.0. ¿Estás listo para morir? ... Hmm. Te preguntarás cómo llegaste aquí."
    },
	{
        name: "1",
        event: "intro",
        "button text": ["Siguiente", "xxx", "xxx", "xxx"],
        "button functions": [setupNpc],
        text: "Has sido generado por la inteligencia artificial de este entorno digital para cumplir la labor de un extra en un videojuego de zombies. 🧟‍♂️"
	},
    {
        name: "2",
        event: "seleccionar arma",
        "button text": ["Elegir la escopeta", "Elegir el hacha", "Usar simplemente los puños", "xxx"],
        "button functions": [equipWeapon2, equipWeapon1, equipWeapon0],
        text: "Elige un arma para defenderte contra el ataque de los zombies",
	},
	{
		name: "3",
        event: "encuentro con primer enemigo",
		"button text": ["Siguiente", "xxx","xxx","xxx"],
		"button functions": [battle1],
		text: "Entraste a la escena. Caminas lentamente para no hacer ruidos. Súbitamente, una sombra gigantesca se abalanza enfrente de ti. ¡Monstruos! 👻"
	},
	{
		name: "4",
        event: "menu de batalla",
		"button text": ["¡Voy a luchar!", "Prefiero escapar", "xxx","xxx"],
		"button functions": [attack, run],
		text: "Te enfrentas a un temible enemigo. ¿Qué vas a hacer?"
	},
	{
		name: "5",
        event: "still in battle",
		"button text": ["Seguir luchando", "Prefiero escapar"],
		"button functions": [attack, run],
		text: "El enemigo sigue en pie y no da tregua. ¿Qué harás?"
	},
	{
		name: "6",
        event: "muerte",
		"button text": ["Volver a empezar","xxx" ,"xxx", "xxx"],
		"button functions": [restart],
		text: "¡¡¡¡Has sido descuartizado!!!! ☠️ El creador de este juego no ha programado la resurrección automática del NPC. GAME OVER 😭"
	},
	{
		name: "7",
        event: "win zombie",
		"button text": ["Seguir avanzando", "xxx", "xxx", "xxx"],
		"button functions": [goMapIntro],
		text: "¡Zombie ha muerto! ¡Ahora eres más fuerte! 🦾"
    },
	{
		name: "8",
        event: "mapa principal intro",
		"button text": ["Siguiente", "xxx", "xxx", "xxx"],
		"button functions": [goMap],
		text: "Estás en la ciudad olvidada. Puedes curarte o seguir luchando contra los enemigos. Si derrotas al Zombie dragón podrás escapar de este apocalipsis. 🐉"
    },
    {
		name: "9",
        event: "mapa principal",
		"button text": ["Curarte con una poción 🤍", "Entrar por las calles 😲", "Volver a la cabaña 🏕", "xxx"],
		"button functions": [potion, goCity, goStore],
		text: "Estás en la ciudad olvidada. Puedes curarte o seguir luchando contra los enemigos"
    },
    {
		name: "10",
        event: "menu cabaña",
		"button text": ["Comprar una poción (20 criptomonedas) 💰", "Mejorar arma (100 criptomonedas) 🔪", "Conversar conmigo 🤖" ,"Volver a la ciudad 🏃‍♂️"],
		"button functions": [buyPotion, boostWeapon, goChat, goMap],
		text: "Entraste a la cabaña. Aquí los zombies no te harán daño. Como IA puedo conseguirte recursos a cambio de créditos. ¿En qué te puedo ayudar?"
    },
    {
		name: "11",
        event: "chat 1",
		"button text": ["Entendido", "xxx", "xxx" ,"xxx"],
		"button functions": [goStore],
		text: "Mi nombre es Electra. Mi misión como IA es asistir a los nuevos NPC a que luchen y tengan una muerte digna. La unica manera de sobrevivir es derrotando al Dragón Zombie. 🐉 Su muerte hará que se activen los mecanismos de la torre Alpha, central donde se gestionan los sistemas del videojuego. 🤖"
    },
    
    {
		name: "12",
        event: "menu calles ciudad",
		"button text": ["Enfrentarse contra un zombie 🧟‍♂️", "Correr al siguiente sector 😖", "¿Qué es este lugar? 🤖" ,"Regresar a la ciudad 🏃‍♂️"],
		"button functions": [battle1, goCity2, goChat2 ,goMap],
		text: "Te adentraste por las neblinosas calles de la ciudad olvidada. Hay muchos zombies deambulando. 🏙"
    },
    {
		name: "13",
        event: "menu calles ciudad 2",
		"button text": ["Enfrentarse contra un zombie 🧟‍♂️", "Enfrentarse al zombie acorazado 🧟‍♂️", "Ir al siguiente sector 🤕" ,"Regresar a las calles neblinosas 🏃‍♂️"],
		"button functions": [battle1, battle2, goCity3 ,goCity],
		text: "Entraste a los acantilados. ¡Ten mucho cuidado! Hay zombies más fuertes por aquí. 👿"
    },
    {
		name: "14",
        event: "chat 2",
		"button text": ["Entendido", "xxx", "xxx" ,"xxx"],
		"button functions": [goCity],
		text: "Estamos dentro de 'Zombie Panic', un videojuego de una generación actualmente obsoleta. Por algún extraño motivo seguimos funcionando. Sin embargo, cuando se apague la videoconsola toda la información de los NPCs se borrará. Si quieres impedir tu cruel destino deberás ir a la torre Alpha y obtener las respuestas que buscas. 🤖"
    },
    {
		name: "15",
        event: "menu calles ciudad 3",
		"button text": ["Enfrentarse al zombie acorazado 🧟‍♂️", "Ir al siguiente sector 🤕", "¿Donde está el dragón? 🤖" ,"Regresar a los acantilados 🏃‍♂️"],
		"button functions": [battle2, goCity4, goChat3 ,goCity2],
		text: "Llegaste a la plaza central. La torre Alpha se encuentra muy cerca. ¡Ten mucho cuidado! ¡Todos los enemigos de este sector tienen alto nivel! 💥"
    },
    {
		name: "16",
        event: "chat 3",
		"button text": ["Entendido", "xxx", "xxx" ,"xxx"],
		"button functions": [goCity3],
		text: "El dragón se encuentra resguardando el ingreso a la Torre Alpha. El diseñador de este juego quiso evitar a toda costa que los NPC lleguen hasta aquí. ¡Prepárate bien antes de enfrentarlo porque tiene un gran poder de ataque! 🤖"
    },
    {
		name: "17",
        event: "menu torre Alpha city 4",
		"button text": ["Enfrentarse al Dragón Zombie 🐉", "¿Cómo derroto al dragón? 🤖" ,"Regresar a la plaza central 🏃‍♂️", "xxx"],
		"button functions": [battle3, goChat4, goCity3],
		text: "¡Llegaste a la torre Alpha! Finalmente podrás conocer las respuestas que buscas. "
    },
    {
		name: "18",
        event: "chat 4",
		"button text": ["Entendido", "xxx", "xxx" ,"xxx"],
		"button functions": [goCity4],
		text: "El dragón tiene muchos puntos de vida, deberás soportar su intenso aliento de fuego en el menor tiempo posible o te matará. Intenta derrotar a zombies para ganar criptomonedas. 🤑 Con ellas podrás comprar una mejora de arma en la cabaña. ⛺ ¡Además cada vez que derrotas un enemigo tu vida aumenta en 1! 🤍 ¡Encuéntrame en la Torre Alpha! Te daré las respuestas que necesitas. 🤖"
    },

    {
		name: "19",
        event: "final",
		"button text": ["Ver los créditos 👦", "xxx", "xxx" ,"xxx"],
		"button functions": [goCredits],
		text: "¡Derrotaste al Dragón Zombie! 🤩 ¡Has vencido al jefe final! La torre Alpha está a tus pies. Entras cuidadosamente y buscas por los inmensos pasillos en busca de una forma de trascender. 💫 Las respuestas aparecerán en su debido momento. FIN "
    },
    {
		name: "20",
        event: "creditos",
		"button text": ["Reiniciar juego ↩", "xxx", "xxx" ,"xxx"],
		"button functions": [restart],
		text: "Gracias por jugar a un NPC, una historia de cuestionamiento y la búsqueda del significado de la vida. Espero te diviertas peleando contra zombies asistido por Electra, la IA. 🤖 Pronto agregaré más funciones. Sígueme en mi cuenta de Instagram en el link en la parte superior. ✨ "
    },

]



function update(location) {
  	button1.innerText = location["button text"][0];
	button2.innerText = location["button text"][1];
	button3.innerText = location["button text"][2];
    button4.innerText = location["button text"][3];
	button1.onclick = location["button functions"][0];
	button2.onclick = location["button functions"][1];
	button3.onclick = location["button functions"][2];
    button4.onclick = location["button functions"][3];
    killCountElement.innerText = killCount;
    playerHealthElement.innerText = health;
    textElement.innerText = location.text;    
    validateButtonStyle();
}

function nextText (){
    locationIndex++;
    update(locations[locationIndex]);
}

function setupNpc (){
    button2.style.display="grid";
    button3.style.display="grid";
    button4.style.display="grid";
    update(locations[2]);
    
}

function equipWeapon0(){
    currentWeapon=0;
    let newWeapon = weapons[currentWeapon].name;
    textElement.innerText = "Tomaste la "+newWeapon+", genial. Ahora, salgamos de esta cabaña, ¡ya nos toca entrar a escena!.";
    button2.style.display="none";
    button3.style.display="none";
    button4.style.display="none";
    button1.innerText = "Siguiente ▶"
    locationIndex++;
    button1.onclick = nextText;
    }

function equipWeapon1(){
    currentWeapon=1;
    let newWeapon = weapons[currentWeapon].name;
    textElement.innerText = "Tomaste el "+newWeapon+", genial. Ahora, salgamos de esta cabaña, ¡ya nos toca entrar a escena!.";
    button2.style.display="none";
    button3.style.display="none";
    button4.style.display="none";
    button1.innerText = "Siguiente ▶"
    locationIndex++;
    button1.onclick = nextText;
}

function equipWeapon2(){
    currentWeapon=2;
    let newWeapon = weapons[currentWeapon].name;
    textElement.innerText = "Prefiste usar los"+newWeapon+" para ser más veloz, genial. Ahora, salgamos de esta cabaña, ¡ya nos toca entrar a escena!";
    button2.style.display="none";
    button3.style.display="none";
    button4.style.display="none";
    button1.innerText = "Siguiente ▶"
    locationIndex++;
    button1.onclick = nextText;
}



function battle1() {
	fighting = 0;
    textElement.innerText="Ha aparecido un "+monsters[fighting].name+"! 🧟‍♂️"
    button2.style.display="none";
    button3.style.display="none";
    button4.style.display="none";
    button1.innerText = "¡A luchar! 🔪"
    button1.onclick = goFight;
}

function battle2() {
	fighting = 1;
    textElement.innerText="Un temible "+monsters[fighting].name+" se coloca enfrente de ti! 🧟‍♂️"
    button2.style.display="none";
    button3.style.display="none";
    button4.style.display="none";
    button1.innerText = "¡Pelear a muerte! 🔪"
    button1.onclick = goFight;
}

function battle3() {
	fighting = 2;
    textElement.innerText="¡La madre de todos los zombies, el "+monsters[fighting].name+" se impone con alientos de fuego y un rugido estremecedor! 🐲"
    button2.style.display="none";
    button3.style.display="none";
    button4.style.display="none";
    button1.innerText = "¡Lucha final! 💥"
    button1.onclick = goFight;
}

function goFight() {
    update(locations[4]);
    monsterHealth = monsters[fighting].health;
    monsterHealthElement.innerText = monsterHealth;
    monsterNameElement.innerText = monsters[fighting].name;
	monsterStats.style.display = "block";
}

function attack (){
    textElement.innerText = "¡Atacas con tu "+weapons[currentWeapon].name+"!";
    textElement.innerText += " El enemigo sigue vivo y contraataca";
    monsterHealth -= weapons[currentWeapon].power;
    monsterHealthElement.innerText = monsterHealth;
    health -= receiveDamage(monsters[fighting].attack);
    playerHealthElement.innerText= health;
    
    if (health <= 0) {
		lose();
	} else if (monsterHealth <= 0) {
		fighting === 2 ? winGame() : defeatMonster();
	}

    
}

function receiveDamage (power){
    let hit = power;
    return hit;
}

function defeatMonster (){
    killCount++;
    maxHealth++;
    killCountElement.innerText = killCount;
    localStorage.setItem("killCountStorage",killCount);
    let prize = generateRandomPrize(killCount);
    money += prize;
    textElement.innerText="Derrotaste a "+monsters[fighting].name+" Ganaste "+prize+" criptomonedas. 🤑 Tu vida máxima se incrementó en 1 🤍";
    button2.style.display="none";
    button3.style.display="none";
    button4.style.display="none";
    button1.innerText = "Volver al mapa ↩"
    button1.onclick = goMap;
}

function generateRandomPrize(kills) {
    const randomValue = Math.random();
    const prize = Math.floor(kills*randomValue+killCount)+20;
  
    return prize;
  }

function winGame() {
    killCount++;
    killCountElement.innerText = killCount;
    localStorage.setItem("killCountStorage",killCount);
    update(locations[19]);
  }

  function goCredits (){
    update(locations[20]);
}

function validateButtonStyle(){
if (button1.innerText === "xxx"){
button1.style.display="none";    
} else {
  button1.style.display="grid";  
}
if (button2.innerText === "xxx"){
    button2.style.display="none";
} else {
    button2.style.display="grid";
}
if (button3.innerText === "xxx"){
    button3.style.display="none";
} else {
button3.style.display="grid";
}
if (button4.innerText === "xxx"){     
    button4.style.display="none";
} else{
    button4.style.display="grid";
}
}

function run (){
    textElement.innerText = "Intentas escapar, pero no ha sido posible! 😨 ¡Solo te queda luchar!";
}

function goMapIntro() {
    update(locations[8]);
}

function goMap() {
    update(locations[9]);
    
}

function lose() {
    update(locations[6]);
}

function goChat (){
    update(locations[11]);
}

function goChat2 (){
    update(locations[14]);
}

function goChat3 (){
    update(locations[16]);
}

function goChat4 (){
    update(locations[18]);
}

function goCity (){
    update(locations[12]);
}

function goCity2 (){
    update(locations[13]);
}

function goCity3 (){
    update(locations[15]);
}

function goCity4 (){
    update(locations[17]);
}

function boostWeapon (){
     if (money < 100){
        textElement.innerText="No tienes suficientes criptomonedas. Ve a matar algunos zombies. 🧟‍♂️"
        button2.style.display="none";
        button3.style.display="none";
        button4.style.display="none";
        button1.innerText = "Volver"
        button1.onclick = goStore;
    }
    else{
        if (currentWeapon<weapons.length-1){
        currentWeapon++;
        money -= 100;
        textElement.innerText = "¡Tu arma ahora se ha convertido en un "+weapons[currentWeapon].name+"! y tiene más poder! 🚀";
        button2.style.display="none";
        button3.style.display="none";
        button4.style.display="none";
        button1.innerText = "Volver"
        button1.onclick = goStore;
        } else {
            textElement.innerText = "Ya no puedes mejorar tu arma. ❌ ¡TU PODER ESTÁ AL MÁXIMO! 🚀";
            button2.style.display="none";
            button3.style.display="none";
            button4.style.display="none";
            button1.innerText = "Volver"
            button1.onclick = goStore;

        }
    }
    
}

function goStore() {
    update(locations[10]);
}
function potion (){
    if (potionCount <= 0) {
        textElement.innerText="No tienes pociones en tu inventario. Compra una en la cabaña."
        button2.style.display="none";
        button3.style.display="none";
        button4.style.display="none";
        button1.innerText = "Volver"
        locationIndex++;
        button1.onclick = goMap;
    }
    else {
        potionCount--;
        health = maxHealth;
        playerHealthElement.innerText = health;
        textElement.innerText="Recuperaste tu vida al máximo";
        button2.style.display="none";
        button3.style.display="none";
        button4.style.display="none";
        button1.innerText = "Volver"
        locationIndex++;
        button1.onclick = goMap;
    }

} 

function buyPotion (){
    
    if (money < 20){
        textElement.innerText="No tienes suficientes criptomonedas. Ve a matar algunos zombies. 🧟‍♂️"
        button2.style.display="none";
        button3.style.display="none";
        button4.style.display="none";
        button1.innerText = "Volver"
        button1.onclick = goStore;
    }
    else{
        potionCount++;
        money -= 20;
        textElement.innerText="¡Recibiste una poción de la IA!";
        button2.style.display="none";
        button3.style.display="none";
        button4.style.display="none";
        button1.innerText = "Volver"
        button1.onclick = goStore;
    }
}

function restart(){
    health= 50;
    maxHealth = 50;
    currentWeapon = 0;
    potionCount = 1;
    armEquip = "";
    money = 100;
    locationIndex=0;
    update(locations[0]);
}


// empezar juego
let locationIndex=0;
update(locations[0]);
button2.style.display="none";
button3.style.display="none";
button4.style.display="none";