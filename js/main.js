const form = document.getElementById('novoItem')
const lista = document.querySelector('.lista')
const items = JSON.parse(localStorage.getItem('items')) || [];

function creaElemento(item){
  const newLi = document.createElement('li')
  newLi.classList.add('item');

  const cuantosItem = document.createElement('strong')
  cuantosItem.innerHTML = item.quantity;
  newLi.appendChild(cuantosItem);
  newLi.innerHTML += item.name;
  lista.appendChild(newLi);

 }
items.forEach((e) => {
  creaElemento(e)
})

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const name = e.target.elements['nome'];
  const quantity = e.target.elements['quantidade'];

  const itemActual = {
   'name': name.value,
   'quantity': quantity.value
  }

  creaElemento(itemActual)

  items.push(itemActual)

  localStorage.setItem('items', JSON.stringify(items));

  name.value = "";
  quantity.value = "";  

})




