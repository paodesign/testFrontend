const form = document.getElementById("formulario");
const itemDiv = document.getElementById("item");
const tablaItem = document.getElementById("tablaItem");

function enviar(event){
    event.preventDefault();
    let formData = new FormData(event.target);
    const client = Object.fromEntries(formData);
    console.log(client);
}

form.addEventListener("submit",enviar);

const listaItems = [
    { id:1, cantidad: 3, nombre: "Pera", precio: 200 },
    { id:2, cantidad: 10, nombre: "Banana", precio: 600 },
    { id:3, cantidad: 5, nombre: "Manzana", precio: 400 }
]

function cargarItems(){
    let contador = 1;
    listaItems.forEach(item => {
        let newItem = itemDiv.cloneNode(true);
        newItem.id = `item_${contador}`
        newItem.style = '';
        newItem.querySelector("#id").textContent= item.id;
        newItem.querySelector("#cantidad").textContent= item.cantidad;
        newItem.querySelector("#nombre").textContent= item.nombre;
        newItem.querySelector("#precio").textContent= item.precio;
        tablaItem.appendChild(newItem)
        contador++;
    })
}

cargarItems();
