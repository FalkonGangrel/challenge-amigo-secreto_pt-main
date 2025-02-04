//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.
let listaAmigos = new Set();
let amigosSorteados = new Set();
let sorteioIniciado = false;

function exibeTexto(seletor,texto){ //Exibir texto na tag(seletor) especificada
    const elemento = document.querySelector(seletor);
    if(elemento){
        elemento.innerHTML = texto;
    }
}

function exibeTextoById(seletorID,texto){ //Exibir texto na tag especificada pelo ID
    const elemento = document.getElementById(seletorID);
    if(elemento){
        elemento.innerHTML = texto;
    }
}

function limparCampo(seletor = 'input') { //Limpar o campo conforme tag com padrão sendo input
    const elemento = document.querySelector(seletor);
    if (elemento) {
        elemento.value = '';
    }
}

function exibeNomes() {
    const tagLista = document.getElementById('listaAmigos') ; //Tag UL
    tagLista.innerHTML = "";
    listaAmigos.forEach((amigo)=>{
        const item = document.createElement('li');
        item.style.marginBottom = '10px';
        item.textContent = amigo;

        // Criar botão "x" para remover o nome caso o sorteio não tenha sido iniciado
        if (!sorteioIniciado) {
            const botaoRemover = document.createElement('button');
            botaoRemover.textContent = ' x';
            botaoRemover.style.marginLeft = '10px';
            botaoRemover.style.cursor = 'pointer';
            botaoRemover.style.color = 'red';
            botaoRemover.style.border = 'none';
            botaoRemover.style.background = 'none';
            botaoRemover.style.padding = '3px 10px';
            botaoRemover.onclick = () => removerAmigo(amigo);
            item.appendChild(botaoRemover); // Adicionar botão ao item
        }

        tagLista.appendChild(item); // Adicionar item à lista
    })
}

function adicionarAmigo() { //Verificar validade do campo nome e duplicidade de nomes na lista de amigos antes de adicionar nome na lista e exibir na tela
    const campoInput = document.querySelector('input');
    let nomeAmigo = campoInput.value.trim(); //Remove espaços extras
    limparCampo('input');

    if(!nomeAmigo){
        exibeTexto('h2','Favor inserir um nome válido!');
        return;
    }

    if (listaAmigos.has(nomeAmigo)) {
        exibeTexto('h2', 'Nome do amigo já foi adicionado!');
        return;
    }

    listaAmigos.add(nomeAmigo);
    exibeNomes(); //Atualizar lista exibida
    exibeTexto('h2','Digite o nome dos amigos participantes');
}

function removerAmigo(amigo) { // Remover amigo da lista(Set)
    listaAmigos.delete(amigo); // Remover o amigo correspondente
    exibeNomes(); // Atualizar a exibição da lista
    exibeTexto('h2', 'Amigo removido com sucesso!');
}

function sortearAmigo(){
    if (listaAmigos.size === 0) {
        exibeTexto('h2', 'Adicione amigos antes de sortear!');
        return;
    }

    sorteioIniciado = true;
    document.getElementById('botaoAdicionar').disabled = true;
    exibeNomes(); // Atualiza a lista removendo botões de exclusão

    const resultadoLista = document.getElementById('resultado');
    resultadoLista.innerHTML = "";
    
    let amigoSorteado;
    do {
        amigoSorteado = Array.from(listaAmigos)[Math.floor(Math.random() * listaAmigos.size)];
    } while (amigosSorteados.has(amigoSorteado));
    
    const item = document.createElement('li');
    item.textContent = amigoSorteado;
    
    const botaoAceitar = document.createElement('button');
    botaoAceitar.textContent = '✔';
    botaoAceitar.style.marginLeft = '10px';
    botaoAceitar.onclick = () => aceitarSorteio(amigoSorteado, item);
    
    const botaoSortearNovamente = document.createElement('button');
    botaoSortearNovamente.textContent = '🔄';
    botaoSortearNovamente.style.marginLeft = '10px';
    botaoSortearNovamente.onclick = () => verificarUltimoSorteio();
    
    item.appendChild(botaoAceitar);
    item.appendChild(botaoSortearNovamente);
    resultadoLista.appendChild(item);
}

function verificarUltimoSorteio() {
    if (listaAmigos.size - amigosSorteados.size === 1) {
        exibeTexto('h2', 'Não existem mais amigos a serem sorteados, deseja sortear novamente?');
        mostrarBotaoLimparSorteio();
    } else {
        sortearAmigo();
    }
}

function aceitarSorteio(amigo, item) {
    amigosSorteados.add(amigo);
    item.style.display = 'none';

    if (listaAmigos.size === amigosSorteados.size) {
        exibeTexto('h2', 'Todos os amigos foram sorteados!');
        mostrarBotaoNovoSorteio();
        return;
    }
}

function mostrarBotaoLimparSorteio() {
    const botaoSorteio = document.getElementById('botaoSortear');
    botaoSorteio.style.display = 'none';

    const botao = document.createElement('button');
    botao.innerHTML = `<img src="assets/play_circle_outline.png" alt="Ícone para sortear">Limpar sorteio`;
    botao.id = 'botaoLimparSorteio';
    botao.className = 'button-draw-new';
    botao.onclick = limparSorteio;
    botaoSorteio.parentNode.appendChild(botao);
}

function limparSorteio() {
    amigosSorteados.clear();
    document.getElementById('resultado').innerHTML = "";
    exibeTexto('h2', 'Iniciando novo sorteio...');
    document.getElementById('botaoLimparSorteio').remove();

    const botaoSorteio = document.getElementById('botaoSortear');
    botaoSorteio.style.display = 'flex';

    sortearAmigo();
}

function mostrarBotaoNovoSorteio() {
    const botaoSorteio = document.getElementById('botaoSortear');
    botaoSorteio.style.display = 'none';

    const botaoNovoSorteio = document.createElement('button');
    botaoNovoSorteio.innerHTML = `<img src="assets/play_circle_outline.png" alt="Ícone para sortear">Novo Sorteio`;
    botaoNovoSorteio.id = 'botaoNovoSorteio';
    botaoNovoSorteio.className = 'button-draw-new';
    botaoNovoSorteio.onclick = iniciarNovoSorteio;
    botaoSorteio.parentNode.appendChild(botaoNovoSorteio);
}

function iniciarNovoSorteio() {
    amigosSorteados.clear();
    listaAmigos.clear();
    exibeTextoById('resultado', '');
    exibeTexto('h2', 'Digite o nome dos seus amigos');
    document.getElementById('botaoAdicionar').disabled = false;
    document.getElementById('botaoNovoSorteio').remove();
    document.getElementById('botaoSortear').style.display = 'flex';
    sorteioIniciado = false;
    exibeNomes();
}