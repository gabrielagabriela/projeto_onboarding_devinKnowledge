export const buscar = document.getElementById('buscarTitulo');

export function buscador(event) {
  event.preventDefault();
  let formularioBusca = document.getElementById('formularioBusca');
  let listas = document.querySelectorAll('.classeLista');
  let valorBusca = document.getElementById('buscador').value;

  listas.forEach((li) => {
    if (!li.firstChild.firstChild.innerText.toLowerCase().includes(valorBusca.toLowerCase())) {
      li.classList.add('apagaLista')
    }
  })


  const botaoApagaBusca = document.getElementById('apagarBusca')

  function apagaBusca(event) {
    event.preventDefault();
    listas.forEach((li) => li.classList.remove('apagaLista'))
    formularioBusca.reset();
  }
  botaoApagaBusca.onclick = apagaBusca;
}

