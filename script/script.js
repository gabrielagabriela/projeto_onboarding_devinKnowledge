import { contador } from "./contador.js";
import { adicionaId1, adicionaId2, adicionaId3 } from "./criarIds.js";
import { buscar, buscador } from "./buscador.js";

const formulario = document.getElementById('formulario');
let formValue = [];


function criarCard(elemento) {

  elemento.id = adicionaId2();

  const ul = document.querySelector('#ul');
  let li = document.createElement('li');
  li.classList.add('classeLista')
  let cards = document.createElement('div');
  cards.classList.add("cards");
  let tituloH2 = document.createElement('h2');
  let linguagemH3 = document.createElement('h3');
  let categoriaH3 = document.createElement('h3');
  let descricaoParagrafo = document.createElement('p');

  let deleteIcon = document.createElement('button');
  deleteIcon.classList.add('delete');
  deleteIcon.setAttribute('id', adicionaId1());

  let editIcon = document.createElement('button');
  editIcon.classList.add('editar');
  editIcon.setAttribute('id', adicionaId3());

  let videoIcon = document.createElement('a');
  videoIcon.setAttribute('href', '');
  videoIcon.setAttribute('target', "_blank");
  videoIcon.classList.add('botaoVideo');

  deleteIcon.innerText = "Deletar";
  editIcon.innerText = "Editar";
  videoIcon.innerText = "Video";

  tituloH2.innerText = elemento.titulo;
  linguagemH3.innerText = elemento.linguagem;
  categoriaH3.innerText = elemento.categoria;
  descricaoParagrafo.innerText = elemento.descricao;

  if (elemento.video === '') {
    videoIcon.classList.add('apagaBotao')
  } else {
    videoIcon.classList.remove('apagaBotao');
    videoIcon.setAttribute('href', elemento.video)
  }

  ul.appendChild(li);
  li.appendChild(cards);
  cards.appendChild(tituloH2);
  cards.appendChild(linguagemH3);
  cards.appendChild(categoriaH3);
  cards.appendChild(descricaoParagrafo);
  cards.appendChild(deleteIcon);
  cards.appendChild(editIcon);
  cards.appendChild(videoIcon);

  deleteIcon.onclick = deletar;
  editIcon.onclick = editar;
  formulario.reset();
}



function salvar(event) {
  event.preventDefault();

  let value = {
    titulo: document.getElementById('titulo').value,
    linguagem: document.getElementById('linguagem').value,
    categoria: document.getElementById('categoria').value,
    descricao: document.getElementById('descricao').value,
    video: document.getElementById('videoYoutube').value,
  }

  formValue.push(value);
  enviaValor(formValue);
  contador(formValue);
  alert('Dica cadastrada com sucesso!');
  localStorage.setItem("valores", JSON.stringify(formValue));
}

function enviaValor(array) {
  let objeto = array[array.length - 1]
  criarCard(objeto);
}



function deletar(event) {
  let confirma = confirm("Você realmente deseja remover a dica selecionada?")
  if (confirma == false) {
    return;
  }

  event.preventDefault();
  event.target.parentElement.parentElement.remove()

  let ind = parseInt(this.id);
  let busca = formValue.findIndex((item) => item.id === ind);
  formValue.splice(busca, 1)

  contador(formValue);
  localStorage.setItem("valores", JSON.stringify(formValue));
  alert("A dica selecionada foi deletada com sucesso!")
}



function editar(event) {
  let confirmacao = confirm("Deseja realmente editar esta dica?");
  if (confirmacao === false) {
    return;
  }

  event.preventDefault();
  let eventoBotaoEditar = event;
  const botaosalvar = document.getElementById('botaoSalvar');

  botaosalvar.classList.add('apagaBotao');
  const botaoAtualizar = document.getElementById('botaoAtualizar');
  botaoAtualizar.classList.remove("apagaBotao");

  let ind = parseInt(this.id);
  let busca = formValue.findIndex((item) => item.id === ind);

  document.getElementById('titulo').value = formValue[busca].titulo;
  document.getElementById('linguagem').value = formValue[busca].linguagem;
  document.getElementById('categoria').value = formValue[busca].categoria;
  document.getElementById('descricao').value = formValue[busca].descricao;
  document.getElementById('videoYoutube').value = formValue[busca].video;

  function atualiza() {
    formValue[busca].titulo = document.getElementById('titulo').value;
    formValue[busca].linguagem = document.getElementById('linguagem').value;
    formValue[busca].categoria = document.getElementById('categoria').value;
    formValue[busca].descricao = document.getElementById('descricao').value;
    formValue[busca].video = document.getElementById('videoYoutube').value;

    eventoBotaoEditar.target.parentElement.children[0].innerText = formValue[busca].titulo;
    eventoBotaoEditar.target.parentElement.children[1].innerText = formValue[busca].linguagem;
    eventoBotaoEditar.target.parentElement.children[2].innerText = formValue[busca].categoria;
    eventoBotaoEditar.target.parentElement.children[3].innerText = formValue[busca].descricao;
    eventoBotaoEditar.target.parentElement.children[6].href = formValue[busca].video;

    if (eventoBotaoEditar.target.parentElement.children[6].attributes[0].value === "") {
      eventoBotaoEditar.target.parentElement.children[6].classList.add('apagaBotao')
    } else {
      eventoBotaoEditar.target.parentElement.children[6].classList.remove('apagaBotao')
    }

    contador(formValue);
    formulario.reset();
    botaoAtualizar.classList.add("apagaBotao");
    botaosalvar.classList.remove('apagaBotao');

    alert("A dica selecionada foi atualizada!")
    localStorage.setItem("valores", JSON.stringify(formValue));
  }

  botaoAtualizar.onclick = atualiza;
  localStorage.setItem("valores", JSON.stringify(formValue));
}



let body = document.body;
function recarregar(event) {
  event.preventDefault();
  formValue = JSON.parse(localStorage.getItem('valores') || '[]');
  contador(formValue)

  console.log(formValue);

  if (formValue.length !== 0) {
    formValue.forEach((item) => {
      criarCard(item)
    })
  }
}



body.onload = recarregar;
formulario.addEventListener("submit", salvar);
buscar.onclick = buscador;




