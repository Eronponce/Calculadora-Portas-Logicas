//declaração global do mapa da tabela verdade
var map = new Map();

//declaração global do array de nomes da tabela
var nomes = new Array();

//recebendo a quantidade de proposições do usuário para criar a tabela verdade. e adicionando nome para as proposições
function criar(coluna) {
    limpartabela();
    coluna = Number(document.getElementById("proposicoes").value);
    if (coluna > 5) return alert("Não é possível criar uma tabela com mais de 5 proposições.");
    var contador = 0;
    for (var i = 0; i < coluna; i++) {
        nomes.push(letraAleatoria(contador));
        contador++;
    }
    criarTabelaVerdade(map, coluna, nomes);
}

/**
  Método que cria um caracter aleatório
  @param  um contador por meio de um loop para escolha do caracter

  @return caracter em ordem
*/
function letraAleatoria(contador) {
    var result = "";
    var characters = "1234";
    result += characters.charAt(contador);
    return result;
}

/**
  Método que inicializa a tabela verdade conforme o número de proposições da mesma
  @param  
  map - mapa da tabela
  coluna - quantidade de proposições

  @return map - preenchido com as colunas e linhas da tabela verdade
*/
function criarTabelaVerdade(map, coluna) {
    var cadaLinha = new Array();
    var linha = 2 ** coluna;
    var metade = linha / 2;
    var bool = true;
    var contador = 0;
    for (i = 0; i < coluna; i++) {
        for (var j = 0; j < linha; j++) {
            if (contador == metade) {
                contador = 0;
                bool = change(bool);
            }
            cadaLinha.push(bool);
            contador++;
        }
        contador = 0;
        bool = change(bool);
        metade = metade / 2;
        map.set(i, cadaLinha);
        cadaLinha = [];
    }
    transformaVerdade(map, nomes);
}
/**
  Método que transforma a tabela de true's e false's em 
  uma tabela de 'V' e 'F'
  @param map - Mapa da tabela verdade
  @return map - Mapa da tabela verdade, agora com V's e F's
*/

function transformaVerdade(map) {
    var newMap = new Map();
    var cadaLinha = new Array();
    for (var i = 0; i < map.size; i++) {
        for (var j = 0; j < map.get(i).length; j++) {
            if (map.get(i)[j]) {
                cadaLinha.push("V");
            } else {
                cadaLinha.push("F");
            }
        }
        newMap.set(i, cadaLinha);
        cadaLinha = [];
    }
    map = [];
    map = newMap;
    escreveTabela(map, nomes);
}

/**
   Método que pega a tabela e transforma em uma <table>
   @param map - Mapa da tabela verdade
    @return map - Mapa da tabela verdade, em uma table com tr's e th's
*/
function escreveTabela(map) {
    if (map.size == 0) {
        document.getElementById("tabela").innerHTML = "";
        return;
    }
    document.getElementById("tabela").innerHTML = "";
    let tabela = document.getElementById("tabela");
    let table = document.createElement("table");
    let headerRow = document.createElement("tr");
    tabela.appendChild(headerRow);
    for (var i = 0; i < map.size; i++) {
        let header = document.createElement("th");
        var colunaTexto = document.createTextNode(nomes[i]);
        headerRow.appendChild(header);
        header.appendChild(colunaTexto);
    }
    for (var j = 0; j < map.get(0).length; j++) {
        let headerRow = document.createElement("tr");
        tabela.appendChild(headerRow);
        for (var k = 0; k < map.size; k++) {
            let tableData = document.createElement("td");
            headerRow.appendChild(tableData);
            var colunaTexto = document.createTextNode(map.get(k)[j]);
            tableData.appendChild(colunaTexto);
        }
    }
    atualizarColunas();
}

/* outro metodo para escrever a tabela na tabela
porem na horizontal
function escreveTabela(map) {
    let tabela = document.getElementById("tabela");
    let table = document.createElement('table');
    for (var y = 0; y < map.size; y++) {
        let headerRow = document.createElement('tr');
        tabela.appendChild(headerRow)
        let header = document.createElement('th');
        var colunaTexto = document.createTextNode(y);
        headerRow.appendChild(header)
        header.appendChild(colunaTexto);
        for (var k = 0; k < map.get(y).length; k++) {
            let tableData = document.createElement('td');
            var dataTexto = document.createTextNode(map.get(y)[k])
            headerRow.appendChild(tableData)
            tableData.appendChild(dataTexto)
        }
    }
}
*/

/**
  Método que altera o valor da variável booleana para o seu oposto  
  @para bool
  @return !bool
*/
function change(bool) {
    if (bool == true) {
        return false;
    } else {
        return true;
    }
}

/**
 
*/
function and(map, primeiraProposicao, segundaProposicao) {
    var novaLinha = new Array();
    for (var i = 0; i < primeiraProposicao.length; i++) {
        if (primeiraProposicao[i] && segundaProposicao[i]) {
            novaLinha.push(true);
        } else {
            novaLinha.push(false);
        }
    }
    map.set(map.size, novaLinha);
    criarTabelaVerdade(map);
}

/**
  
*/
function nand(map, primeiraProposicao, segundaProposicao) {
    var novaLinha = new Array();
    for (var i = 0; i < primeiraProposicao.length; i++) {
        if (primeiraProposicao[i] && segundaProposicao[i]) {
            novaLinha.push(false);
        } else {
            novaLinha.push(true);
        }
    }
    map.set(map.size, novaLinha);
    criarTabelaVerdade(map);
}

/**
  
*/
function or(map, primeiraProposicao, segundaProposicao) {
    var novaLinha = new Array();
    for (var i = 0; i < primeiraProposicao.length; i++) {
        if (primeiraProposicao[i] || segundaProposicao[i]) {
            novaLinha.push(true);
        } else {
            novaLinha.push(false);
        }
    }
    map.set(map.size, novaLinha);
    criarTabelaVerdade(map);
}

/**
 
*/
function xor(map, primeiraProposicao, segundaProposicao) {
    var novaLinha = new Array();
    for (var i = 0; i < primeiraProposicao.length; i++) {
        if (primeiraProposicao[i] && segundaProposicao[i]) {
            novaLinha.push(false);
        }else if(! primeiraProposicao[i] && segundaProposicao[i]){
            novaLinha.push(true);
        } else {
            novaLinha.push(true);
        }
    }
    map.set(map.size, novaLinha);
    criarTabelaVerdade(map);
}

function xor(map, primeiraProposicao, segundaProposicao) {
    var novaLinha = new Array();
    for (var i = 0; i < primeiraProposicao.length; i++) {
        if (primeiraProposicao[i] && segundaProposicao[i]) {
            novaLinha.push(false);
        }else if(! primeiraProposicao[i] && segundaProposicao[i]){
            novaLinha.push(true);
        } else {
            novaLinha.push(true);
        }
    }
    map.set(map.size, novaLinha);
    criarTabelaVerdade(map);
}



function xnor(map, primeiraProposicao, segundaProposicao) {
    var novaLinha = new Array();
    for (var i = 0; i < primeiraProposicao.length; i++) {
        if (primeiraProposicao[i] && segundaProposicao[i]) {
            novaLinha.push(true);
        } else if (
            primeiraProposicao[i] == false &&
            segundaProposicao[i] == false
        ) {
            novaLinha.push(true);
        } else {
            novaLinha.push(false);
        }
    }
    map.set(map.size, novaLinha);
    criarTabelaVerdade(map);
}

/**
  Método que retorna a coluna com os valores !negados, ou invertidos
  
  @param  map - tabela verdade
  proposicao - primeira coluna para cálculo

  @return - mapa completo, com a linha adicionada, oriunda do cáculo realizado.
*/
function not(map, proposicao) {
    var novaLinha = new Array();
    for (var i = 0; i < proposicao.length; i++) {
        novaLinha.push(change(proposicao[i]));
    }
    map.set(map.size, novaLinha);
    criarTabelaVerdade(map);
}

/**
Método utilizado para verificar se existe implicação lógica entre duas proposições
@param primeiraProposicao - primeira coluna a ser verificada
       segundaProposicao - segunda coluna a ser verificada
@return true ou false - no caso se existe implicação lógica ou não
*/
function implica(primeiraProposicao, segundaProposicao) {
    implicacaoTrue = false;
    implicaFalse = true;
    var implicacoes = "";
    for (var i = 0; i < primeiraProposicao.length; i++) {
        if (primeiraProposicao[i]) {
            if (segundaProposicao[i]) {
                implicacaoTrue = true;
            } else {

                implicaFalse = false;
                implicacoes += i + 1 + "º, ";
            }
        }
    }
    if (implicacaoTrue && implicaFalse) {
        document.getElementById("tela").value = "Existe implicação pois os V condizem com V";
    } else {
        document.getElementById("tela").value = "Não tem implicação, pois na " + implicacoes + "linhas a verdade nao implica em falso";
    }
}

/*
Outro método de implicação lógica, utilizando uma lógica diferente
function implica2(primeiraProposicao, segundaProposicao){
  var posicoesPrimeiroArray = new Array();
  var posicoesSegundoArray = new Array();
  var implica = false;
  for(var i=0; i < primeiraProposicao.length; i++){
    if(primeiraProposicao[i]){
      posicoesPrimeiroArray.push(i);
    }
    if(segundaProposicao[i]){
      posicoesSegundoArray.push(i);
    }
  }
  if(posicoesPrimeiroArray.length > posicoesSegundoArray.length){
    return implica;
  }
  for(var j = 0; j < posicoesPrimeiroArray.length; j++){
    if(posicoesPrimeiroArray[j] == posicoesSegundoArray[j]){
      implica = true;
    }else{
      implica = false;
      return implica
    }
  }
  return implica
}
*/

/**
Método utilizado para verificar a equivalência entre duas proposições
@param primeiraProposicao - primeira proposição a ser verificada
       segundaProposicao - segunda proposicao a ser verificada

@return - true or false - Se existe equivalência ou não e um texto
explicativo ao usuário
*/
function equivale(primeiraProposicao, segundaProposicao) {
    var boolean = true;
    var equivalencias = "";
    for (var i = 0; i < primeiraProposicao.length; i++) {
        if (primeiraProposicao[i] != segundaProposicao[i]) {
            boolean = false;
            equivalencias += i + 1 + "º, "
        }
    }
    if (boolean) {
        document.getElementById("tela").value = "São equivalentes os V condizem com V e F condizem com F";
    } else {
        document.getElementById("tela").value = "Não sao equivalentes, pois na " + equivalencias + "linhas as 2 proposições não são iguais";
    }
}

/**
Método utilizado para o placeholder conforme as colunas
@param - Proposiçoes da coluna

@return - Números nos placeholders conforme o tamanho da coluna
*/
function atualizarColunas() {
    var selectPrimeira = document.getElementById("primeiraOpcao");
    var selectSegunda = document.getElementById("segundaOpcao");
    var selectTerceira = document.getElementById("terceiraOpcao");
    selectPrimeira.innerHTML = "";
    selectSegunda.innerHTML = "";
    selectTerceira.innerHTML = "";
    for (var i = 0; i < map.size; i++) {
        var opt1 = document.createElement("option");
        opt1.value = i;
        opt1.text = nomes[i];
        selectPrimeira.add(opt1);
    }
    for (var j = 0; j < map.size; j++) {
        var opt2 = document.createElement("option");
        opt2.value = j;
        opt2.text = nomes[j];
        opt2.id = 2;
        selectSegunda.add(opt2);
    }
}
/**
Método utilizado para atualizar escrever na tela as colunas conforme os fatores 
logicos e proposições
@param - Proposiçoes da coluna e o fator logico

@return - logica de cada fator logico escrito na tela 
*/
function inserirCalculos() {
    var valorPrimeira = parseInt(document.getElementById("primeiraOpcao").value);
    var valorCalculo = parseInt(document.getElementById("calculo").value);
    var valorSegundo = parseInt(document.getElementById("segundaOpcao").value);
    var nomePrimeira =
        document.getElementById("primeiraOpcao").options[valorPrimeira].text;
    var nomeSegunda =
        document.getElementById("segundaOpcao").options[valorSegundo].text;
    switch (valorCalculo) {
        case 1:
            nomes.push("(" + nomePrimeira + " AND " + nomeSegunda + ")");
            and(map, map.get(valorPrimeira), map.get(valorSegundo));
            break;
        case 2:
            nomes.push("(" + nomePrimeira + " OR " + nomeSegunda + ")");
            or(map, map.get(valorPrimeira), map.get(valorSegundo));
            break;
        case 3:
            nomes.push("(" + nomePrimeira + " NAND " + nomeSegunda + ")");
            nand(map, map.get(valorPrimeira), map.get(valorSegundo));
            break;
        case 4:
            nomes.push("(" + nomePrimeira + " XOR " + nomeSegunda + ")");
            xor(map, map.get(valorPrimeira), map.get(valorSegundo));
            break;

        case 5:
            nomes.push("(" + nomePrimeira + " XNOR " + nomeSegunda + ")");
            xnor(map, map.get(valorPrimeira), map.get(valorSegundo));
            break;
        case 6:
            nomes.push("NOT " + nomePrimeira);
            not(map, map.get(valorPrimeira));
            break;
        case 6:
            implica(map.get(valorPrimeira), map.get(valorSegundo));
            break;
        case 7:
            equivale(map.get(valorPrimeira), map.get(valorSegundo));
            break;
    }
    atualizarColunas();
}

/**
Método para limpar o mapa e suas colunas que dao erro ao serem reescritas
@param - Mapa com valores

@return - Mapa vazio e nome vazio
*/
function limpartabela() {
    map = new Map();
    escreveTabela(map);
    nomes = new Array();
}