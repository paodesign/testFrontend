
const itemFila = document.getElementById("item");
const tablaItem = document.getElementById("tablaItem");
export const formItem = document.getElementById("form-item");
const encabezadoTabla = document.getElementById("encabezadoTablaItem");

let listaItems = [
    { id:1001, cantidad: 3, nombre: "Pera", precio: 200 },
    { id:1002, cantidad: 10, nombre: "Banana", precio: 600 },
    { id:1003, cantidad: 5, nombre: "Manzana", precio: 400 }
]

function renderTabla(){
    tablaItem.innerHTML = '';
    tablaItem.appendChild(encabezadoTabla);
    cargarItems();   
}

function generadorIdNext(){
    let indice = listaItems.length - 1;
    let ultimoItem = listaItems[indice];
    let ultimoId = ultimoItem.id + 1;
    return ultimoId;
}


export function cargarItems(){
   
    listaItems.forEach(item => {
        let newFila = itemFila.cloneNode(true);
        newFila.id = `item_${item.id}`
        newFila.style = '';
        newFila.querySelector("#id").textContent= item.id;
        newFila.querySelector("#cantidad").textContent= item.cantidad;
        newFila.querySelector("#nombre").textContent= item.nombre;
        newFila.querySelector("#precio").textContent= item.precio;
        let botonEliminar = newFila.querySelector("#opciones").getElementsByTagName("button")[0];
        botonEliminar.id = `btn_${item.id}`
        botonEliminar.addEventListener("click",eliminarItem);
        tablaItem.appendChild(newFila)
        
    })
}

export function agregarItem(event){
    event.preventDefault();
    let formData = new FormData(event.target);
    const item = Object.fromEntries(formData);
    item.id = generadorIdNext();
    listaItems.push(item);
    renderTabla()
    limpiarForm()
}

function limpiarForm(){
    let inputs = formItem.getElementsByTagName('input');
    console.log(inputs);
    inputs.cantidad.value = '';
    inputs.precio.value = '';
    inputs.nombre.value = '';
}


function eliminarItem(event){
    let botonEliminar = event.target;
    let idString = botonEliminar.id.substring(4,9);
    let idItem = new Number(idString);
    console.log(idItem)
    let newListaItems = listaItems.filter((item)=> item.id != idItem);
    console.log(newListaItems)

    listaItems = newListaItems;
    renderTabla()
}
