
export function contador(lista) {
  let cardTotal = document.getElementById('cardTotal');
  cardTotal.innerText = lista.length;

  let cardFrontEnd = document.getElementById('cardFrontEnd');
  cardFrontEnd.innerText = lista.filter((item) => item.categoria === "FrontEnd").length;

  let cardBackEnd = document.getElementById('cardBackEnd');
  cardBackEnd.innerText = lista.filter((item) => item.categoria === "BackEnd").length;

  let cardFullStack = document.getElementById('cardFullStack');
  cardFullStack.innerText = lista.filter((item) => item.categoria === "FullStack").length;

  let cardSoftSkill = document.getElementById('cardSoftSkill');
  cardSoftSkill.innerText = lista.filter((item) => item.categoria === "SoftSkill").length;
}