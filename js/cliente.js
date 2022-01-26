import * as api from "./api.js"; 

export const formCliente = document.getElementById("formularioCliente");
const clienteFila = document.getElementById("cliente-fila");
const tablaCliente = document.getElementById("tabla-cliente");
const encabezadoTabla = document.getElementById("encabezadoTablaCliente");

let tipoVista = "alta";
let ultimoEventBtn = {};

export function definirTipoVista(event){
    event.preventDefault();
    if(tipoVista === "alta") {
        crearVistaAlta(event);
    }
    // else if(tipoVista === "modificar"){
    //     crearVistaModificar(ultimoEventBtn)
    // }
    // else {
    //     crearVistaVer(ultimoEventBtn);
    // }
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
    formCliente.activo.checked = true;
    formCliente.activo.disabled= true;
}

function crearVistaVer(event){
    console.log("creando vista ver");
    ultimoEventBtn = event;
    tipoVista = "ver";
    let btnVer = event.target;

    let idCliente = btnVer.id.substring(4,28);
    
    api.getById(idCliente, (cliente) => {
        cargarFormCliente(cliente);
        desactivarInputs();
        expandirSeccionCliente();
    })
}

function crearVistaModificar(event){
    console.log("creando vista modificar");
    ultimoEventBtn = event;
    tipoVista = "modificar";
    let btnModificar = event.target;
    let idCliente = btnModificar.id.substring(4,28);
    api.getById(idCliente, (cliente)=>{
        cargarFormCliente(cliente);
        expandirSeccionCliente()
        activarInputs();
    }); 
}

export function expandirSeccionCliente(){
    const seccionCliente = document.getElementById('collapseTwo')
    new bootstrap.Collapse(seccionCliente, {
        toggle: true
    })
}

export function enviarCliente(event){
    event.preventDefault();
    let formData = new FormData(event.target);
    const client = Object.fromEntries(formData);
    if(!client.tipo){
        event.target.tipo.classList.add('is-invalid')
        return;
    }
    if(client.activo){
        client.activo = true;
    }else {
        client.activo = false;
    }
    if(tipoVista === "alta"){
        api.altaCliente(client);
    }if(tipoVista === "modificar"){
        api.modificacionCliente(client._id, client);
    }
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
    selectTipo.classList.remove("is-invalid");
}

function configurarOpciones(fila, btnId){
    let btnElininar = fila.querySelector("#btn-eliminar");
        btnElininar.id = btnId;
        btnElininar.addEventListener("click", eliminarCliente);

    let btnModificar = fila.querySelector("#btn-modificar");
        btnModificar.id = btnId;
        btnModificar.addEventListener("click", crearVistaModificar);
    
    let btnVer = fila.querySelector("#btn-ver");
        btnVer.id = btnId;
        btnVer.addEventListener("click", crearVistaVer);    
}

function cargarListaClientes(){
    api.getAll((ListaClientes) => {
        ListaClientes.forEach(cliente => {
        let newFila = clienteFila.cloneNode(true);
        newFila.style = '';
        newFila.querySelector("#rut").textContent= cliente.rut;
        newFila.querySelector("#nombre").textContent= `${cliente.nombre} ${cliente.apellido}`;
        newFila.querySelector("#tipo").textContent= cliente.tipo;
        configurarOpciones(newFila, `btn_${cliente._id}`);
        tablaCliente.appendChild(newFila);
      });
    });
}

function eliminarCliente(event){
    if(confirm("Desea eliminar este cliente?") == true){
        let btnElininar = event.target;
        let idCliente = btnElininar.id.substring(4,28);
        api.bajaCliente(idCliente, () =>{
            renderTabla()
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
    let btnCrearCliente = formCliente.getElementsByTagName('button');
    btnCrearCliente[0].disabled = true;
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
    let btnCrearCliente = formCliente.getElementsByTagName('button');
    btnCrearCliente[0].textContent = 'Modificar';
    btnCrearCliente[0].target;
}

