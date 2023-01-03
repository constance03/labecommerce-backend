//Função de pegar um numero aleatorio 
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

//Escolhas do jogador
const jogadorImparPar = process.argv[2]
const jogadorNumero = process.argv[3]

//Escolha do computador
let computadorImparPar = ""
    if (jogadorImparPar === "impar") {
        computadorImparPar = "par"
    } else if (jogadorImparPar === "par") {
        computadorImparPar = "impar"
    }
const computadorNumero = getRndInteger(0, 5)

//Soma dos numeros do jogador e do computador
const somaJogadores = +jogadorNumero + computadorNumero

//Decidir ganhador
let ganhador = ""

if (somaJogadores%2 === 0) {
    if (computadorImparPar === "par") {
        ganhador = "computador"
    } else {
        ganhador = "jogador"
    }
} else {
    if (computadorImparPar === "impar") {
        ganhador = "computador"
    } else {
        ganhador = "jogador"
    }
}

function quemGanhou () {
    if (ganhador === "computador"){
        return "perdeu"
    } else {
        return "ganhou"
    }
}



//Console do resultado
console.log(`Você escolheu ${jogadorImparPar} e o computador escolheu ${computadorImparPar}. O resultado foi ${somaJogadores}. Você ${quemGanhou()}!`);