import * as api from "./api.js"; 
import * as clienteItems from "./clientesItems.js"

export const formCliente = document.getElementById("formularioCliente");

let tipoVista = "alta";
let ultimoEventBtn = {};

export function definirTipoVista(event){
    if(tipoVista === "alta") {
        crearVistaAlta(event);
    }
}

export function asignarVistaAlta(){
    tipoVista = "alta";
}

function generadorIdCliente(){
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );    
}

function crearVistaAlta() {
    console.log("creando vista alta");
    formCliente.id.value = generadorIdCliente();
    activarInputs();
    limpiarFormCliente();
    let btns = formCliente.getElementsByTagName('button');
    btns[0].textContent = "Crear"
    formCliente.activo.checked = true;
    formCliente.activo.value = true;
}

export function crearVistaVer(event){
    console.log("creando vista ver");
    ultimoEventBtn = event;
    tipoVista = "ver";
    let btnVer = event.target;
    let idCliente = btnVer.id.substring(4,28);
    let btns = formCliente.getElementsByTagName('button');
    btns[0].textContent = "Volver"
    api.getById(idCliente, (cliente) => {
        cargarFormCliente(cliente);
        desactivarInputs();
        expandirSeccionCliente();
    })
}

export function crearVistaModificar(event){
    console.log("creando vista modificar");
    ultimoEventBtn = event;
    tipoVista = "modificar";
    let btnModificar = event.target;
    let idCliente = btnModificar.id.substring(4,28);
    let btns = formCliente.getElementsByTagName('button');
    btns[0].textContent = "Modificar"
    api.getById(idCliente, (cliente)=>{
        cargarFormCliente(cliente);
        activarInputs();
        expandirSeccionCliente();
    }); 
}

export function expandirSeccionCliente(){
    const seccionCliente = document.getElementById('collapseTwo')
    new bootstrap.Collapse(seccionCliente, {
        toggle: true
    })
}

export function expandirSeccionListado(){
    const seccionCliente = document.getElementById('collapseThree')
    new bootstrap.Collapse(seccionCliente, {
        toggle: true
    })
}

export function enviarCliente(event){
    event.preventDefault();
    if(tipoVista === "ver")
    {
        expandirSeccionListado();
        return;
    }
    let formData = new FormData(event.target);
    const clientData = Object.fromEntries(formData);
    clientData.items = [];
    
    if(!clientData.tipo){
        event.target.tipo.classList.add('is-invalid')
        return;
    }
    if(clientData.activo){
        clientData.activo = true;
    }else {
        clientData.activo = false;
    }

    if(tipoVista === "alta"){
        api.altaCliente(clientData, expandirSeccionListado);
    }
    if(tipoVista === "modificar"){
        api.modificarCliente(formCliente.id.value, clientData, expandirSeccionListado);
    }
    limpiarFormCliente();
}
  


export function eliminarCliente(event){
    if(confirm("Desea eliminar este cliente?") == true){
        let btnElininar = event.target;
        let idCliente = btnElininar.id.substring(4,28);
        api.bajaCliente(idCliente, () =>{
          clienteItems.renderTablaClientes();
        });
    }
}

function cargarFormCliente(cliente) {
    let inputs = formCliente.getElementsByTagName('input');
    inputs.id.value = cliente._id;
    inputs.rut.value = cliente.rut;
    inputs.nombre.value = cliente.nombre;
    inputs.apellido.value = cliente.apellido;
    inputs.telefono.value = cliente.telefono;
    let checkBoxActivo = document.getElementById('gridCheck');
    checkBoxActivo.checked = cliente.activo;
    let selectTipo = document.getElementById('tipo');
    selectTipo.value = cliente.tipo;
}
    
function desactivarInputs(){
    let inputs = formCliente.getElementsByTagName('input');
    inputs.rut.disabled = true;
    inputs.nombre.disabled = true;
    inputs.apellido.disabled = true;
    inputs.telefono.disabled = true;
    let checkBoxActivo = document.getElementById('gridCheck');
    checkBoxActivo.disabled = true;
    let selectTipo = document.getElementById('tipo');
    selectTipo.disabled = true;
}


function activarInputs(){
    let inputs = formCliente.getElementsByTagName('input');
    inputs.rut.disabled= false;
    inputs.nombre.disabled= false;
    inputs.apellido.disabled= false;
    inputs.telefono.disabled= false;
    let checkBoxActivo = document.getElementById('gridCheck');
    checkBoxActivo.disabled= false;
    let selectTipo = document.getElementById('tipo');
    selectTipo.disabled = false;
}

function limpiarFormCliente(){
    let inputs = formCliente.getElementsByTagName('input');
    inputs.rut.value = '';
    inputs.nombre.value = '';
    inputs.apellido.value = '';
    inputs.telefono.value = '';
    let checkBoxActivo = document.getElementById('gridCheck');
    checkBoxActivo.checked = false;
    let selectTipo = document.getElementById('tipo');
    selectTipo[0].selected = true;
    selectTipo.classList.remove("is-invalid");
}

