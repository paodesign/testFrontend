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
}

export function renderTabla(){
    tablaCliente.innerHTML = '';
    tablaCliente.appendChild(encabezadoTabla);
    cargarListaClientes();   
}

function cargarListaClientes(){
    api.getAll((ListaClientes) => {
        ListaClientes.forEach(cliente => {
        let newFila = clienteFila.cloneNode(true);
        newFila.style = '';
        newFila.querySelector("#rut").textContent= cliente.rut;
        newFila.querySelector("#nombre").textContent= `${cliente.nombre} ${cliente.apellido}`;
        newFila.querySelector("#tipo").textContent= cliente.tipo;
        tablaCliente.appendChild(newFila);
      });
    });
}