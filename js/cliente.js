import * as api from "./api.js"; 

export const formCliente = document.getElementById("formularioCliente");





function generadorIdCliente(){
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
    
}

export function agregarIdCliente() {
    formCliente.id.value = generadorIdCliente();
    console.log(formCliente.id.value);
}



export function enviarCliente(event){
    event.preventDefault();
    let formData = new FormData(event.target);
    const client = Object.fromEntries(formData);
    api.altaCliente(client);
}

export function cargarListaClientes(){
    api.getAll(null);
    
}