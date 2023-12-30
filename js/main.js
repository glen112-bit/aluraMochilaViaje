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

  const itemActual = {
   'name': name.value,
   'quantity': quantity.value
  }

  if(existe){
    itemActual.id = existe.id

    actualizaElemento(itemActual)

    items[items.findIndex(elemento => elemento.id === existe.id)] = itemActual
  }else{

    itemActual.id = items[items.length - 1] ? (items[items.length - 1]).id + 1 : 0;

    creaElemento(itemActual)

    items.push(itemActual)

  }

  localStorage.setItem('items', JSON.stringify(items));
  // actualizaLocal(itemActual)
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
  newLi.appendChild(deleteButton(item.id))
  lista.appendChild(newLi);

 }


function actualizaElemento(items ){
  document.querySelector("[data-id='"+items.id+"']").innerHTML = items.quantity
}

function deleteButton(id){
  const buttonElement = document.createElement("button");
  buttonElement.innerText = "X";
  buttonElement.addEventListener('click', function(){
    deleteElement(this.parentNode, id)
  })
  return buttonElement;
}
function deleteElement(tag, id ){
  console.log(id, items)
  tag.remove()
  items.splice(items.findIndex(e => e.id === id), 1)
  localStorage.setItem('items', JSON.stringify(items))
}
