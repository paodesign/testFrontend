import * as api from "./api.js"; 

export const formCliente = document.getElementById("formularioCliente");
const clienteFila = document.getElementById("cliente-fila");
const tablaCliente = document.getElementById("tabla-cliente");
const encabezadoTabla = document.getElementById("encabezadoTablaCliente");


function generadorIdCliente(){
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );    
}

export function agregarIdCliente() {
    formCliente.id.value = generadorIdCliente();
}

export function enviarCliente(event){
    event.preventDefault();
    let formData = new FormData(event.target);
    const client = Object.fromEntries(formData);
    api.altaCliente(client);
    limpiarFormCliente();
}

export function renderTabla(){
    tablaCliente.innerHTML = '';
    tablaCliente.appendChild(encabezadoTabla);
    cargarListaClientes();   
}

function limpiarFormCliente(){
    let inputs = formCliente.getElementsByTagName('input');
    console.log(inputs);
    inputs.rut.value = '';
    inputs.nombre.value = '';
    inputs.apellido.value = '';
    inputs.telefono.value = '';
    let checkBoxActivo = document.getElementById('gridCheck');
    checkBoxActivo.checked = false;
    let selectTipo = document.getElementById('tipo');
    selectTipo[0].selected = true;
}

function cargarListaClientes(){
    api.getAll((ListaClientes) => {
        ListaClientes.forEach(cliente => {
        let newFila = clienteFila.cloneNode(true);
        newFila.style = '';
        newFila.querySelector("#rut").textContent= cliente.rut;
        newFila.querySelector("#nombre").textContent= `${cliente.nombre} ${cliente.apellido}`;
        newFila.querySelector("#tipo").textContent= cliente.tipo;
        let btnElininar = newFila.querySelector("#btn-eliminar");
        btnElininar.id = `btn_${cliente._id}`;
        btnElininar.addEventListener("click", eliminarCliente);
        tablaCliente.appendChild(newFila);
      });
    });
}

// let botonEliminar = newFila.querySelector("#opciones").getElementsByTagName("button")[0];
//         botonEliminar.id = `btn_${item.id}`
//         botonEliminar.addEventListener("click",eliminarItem);
//         tablaItem.appendChild(newFila)

// function eliminarItem(event){
//     let botonEliminar = event.target;
//     let idString = botonEliminar.id.substring(4,9);
//     let idItem = new Number(idString);
//     console.log(idItem)
//     let newListaItems = listaItems.filter((item)=> item.id != idItem);
//     listaItems = newListaItems;
//     renderTabla()
// }

function eliminarCliente(event){
    let btnElininar = event.target;
    console.log("--------btn",btnElininar)
    let idCliente = btnElininar.id.substring(4,28);
    console.log("--------",idCliente);
    api.bajaCliente(idCliente);
    renderTabla()

}
