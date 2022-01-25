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

export function crearCliente(event){
    event.preventDefault();
    let formData = new FormData(event.target);
    const client = Object.fromEntries(formData);
    if(client.activo){
        client.activo = true;
    }else {
        client.activo = false;
    }
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

function configurarOpciones(fila, btnId){
    let btnElininar = fila.querySelector("#btn-eliminar");
        btnElininar.id = btnId;
        btnElininar.addEventListener("click", eliminarCliente);

    // let btnModificar = fila.querySelector("#btn-modificar");
    //     btnModificar.id = btnId;
    //     btnModificar.addEventListener("click", modificarCliente);
    
    let btnVer = fila.querySelector("#btn-ver");
        btnVer.id = btnId;
        btnVer.addEventListener("click", verCliente);
    
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

export function verCliente(event){
    let btnVer = event.target;
    let idCliente = btnVer.id.substring(4,28);
    
    api.getById (idCliente, (cliente) => {
        cargarFormCliente(cliente)
    })
}