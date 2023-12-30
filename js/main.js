const form = document.getElementById('novoItem')
const lista = document.querySelector('.lista')
const items = JSON.parse(localStorage.getItem('items')) || [];

items.forEach((e) => {
  creaElemento(e)
})

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const name = e.target.elements['nome'];
  const quantity = e.target.elements['quantidade'];

  const existe = items.find((e) => e.name === name.value);
  // console.log(existe)

  const itemActual = {
   'name': name.value,
   'quantity': quantity.value
  }

  if(existe){
    itemActual.id = existe.id
    // console.log(existe)
    actualizaElemento(itemActual)
  }else{
    itemActual.id = items.length;
    creaElemento(itemActual)
    items.push(itemActual)

  }

  localStorage.setItem('items', JSON.stringify(items));

  name.value = "";
  quantity.value = "";  

})
function creaElemento(item){
  const newLi = document.createElement('li')
  newLi.classList.add('item');

  const cuantosItem = document.createElement('strong')
  cuantosItem.innerHTML = item.quantity;
  cuantosItem.dataset.id = item.id;
  newLi.appendChild(cuantosItem);
  newLi.innerHTML += item.name;
  lista.appendChild(newLi);

 }


function actualizaElemento(items){
  document.querySelector("[data-id='"+items.id+"']").innerHTML = items.quantity

}

