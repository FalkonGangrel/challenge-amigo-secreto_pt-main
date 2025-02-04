//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.
let listaAmigos = [];

function exibeTexto(tag,texto){ //Exibir texto na tag especificada
    const campo = document.querySelector(tag);
    if(campo){
        campo.innerHTML = texto;
    }
}

function limparCampo(tag){ //Limpar o campo input
    const campo = document.querySelector(tag);
    if (campo){
        campo.value = '';
    }
}

function exibeNomes() {
    const tagLista = document.getElementById('listaAmigos') ; //Tag UL
    tagLista.innerHTML = "";
    listaAmigos.forEach((amigo,index)=>{
        const item = document.createElement('li');
        item.style.marginBottom = '10px';
        item.textContent = amigo;

        // Criar botão "x" para remover o nome
        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = ' x';
        botaoRemover.style.marginLeft = '10px';
        botaoRemover.style.cursor = 'pointer';
        botaoRemover.style.color = 'red';
        botaoRemover.style.border = 'none';
        botaoRemover.style.background = 'none';
        botaoRemover.style.padding = '3px 10px';
        botaoRemover.onclick = () => removerAmigo(index);

        item.appendChild(botaoRemover); // Adicionar botão ao item
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

    if(listaAmigos.includes(nomeAmigo)){
        exibeTexto('h2','Nome do amigo já foi adicionado!');
        return;
    }

    listaAmigos.push(nomeAmigo);
    exibeNomes(); //Atualizar lista exibida
    exibeTexto('h2','Digite o nome dos amigos participantes');
}

function removerAmigo(index) { // Remover amigo da lista pelo índice
    listaAmigos.splice(index, 1); // Remover o amigo correspondente
    exibeNomes(); // Atualizar a exibição da lista
    exibeTexto('h2', 'Amigo removido com sucesso!');
}

function sortearAmigo(){
    alert(0);
}