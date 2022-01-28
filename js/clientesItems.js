import * as clienteAbm from "./cliente.js" 
import * as api from "./api.js"
import * as itemGestion from "./items.js";

const clienteFila = document.getElementById('cliente-fila');
const tablaCliente = document.getElementById('tabla-cliente');
const encabezadoTabla = document.getElementById("encabezadoTablaCliente");
const selectItmesContenedor = document.getElementById("agregar-items");
const formSelectItems = document.getElementById("form-select-item");
const listaSelectItems = document.getElementById("lista-items-select");

function cargarListaClientes(){
    tablaCliente.innerHTML = '';
    api.getAll((ListaClientes) => {
        ListaClientes.forEach(cliente => {
            let newFila = clienteFila.cloneNode(true);
            newFila.style = '';
            newFila.querySelector("#rut").textContent= cliente.rut;
            newFila.querySelector("#nombre").textContent= `${cliente.nombre} ${cliente.apellido}`;
            newFila.querySelector("#tipo").textContent= cliente.tipo;
            configurarOpciones(newFila, cliente._id);

            let botonFila = newFila.querySelector("#boton-fila");
            botonFila.id = `btn_${cliente._id}`
            botonFila.setAttribute("data-bs-target", `#coll_${cliente._id}`);

            let collContenido = newFila.querySelector("#collapseContenido");
            collContenido.id = `coll_${cliente._id}`;
            collContenido.addEventListener('show.bs.collapse', (event) => renderItemSeccion(event.target, cliente));
            tablaCliente.appendChild(newFila);
        });
    });
}

function configurarOpciones(fila, btnId){
    let btnElininar = fila.querySelector("#btn-eliminar");
    btnElininar.id = `eli_${btnId}`;
    btnElininar.addEventListener("click", clienteAbm.eliminarCliente);
    
    let btnModificar = fila.querySelector("#btn-modificar");
    btnModificar.id = `mod_${btnId}`;
    btnModificar.addEventListener("click", clienteAbm.crearVistaModificar);
    
    let btnVer = fila.querySelector("#btn-ver");
    btnVer.id = `ver_${btnId}`;
    btnVer.addEventListener("click", clienteAbm.crearVistaVer);    
}  

export function renderTablaClientes(event){
    if (event.target.id == "collapseThree") {
        tablaCliente.innerHTML = '';
        tablaCliente.appendChild(encabezadoTabla);
        cargarListaClientes();     
        cargarItemsSeleccion();   
    }   
}

function renderItemSeccion(elemColl, cliente) {    
    let newSelectItems = selectItmesContenedor.cloneNode(true);
    newSelectItems.style = '';
    let formSelect = newSelectItems.querySelector("#form-select-item")
    formSelect.id = `form_${cliente._id}`;
    formSelect.addEventListener('submit', (event) => agregarItemSeleccionado(event, cliente))
    
    cliente.items?.forEach(item => {
        const divClonado = newSelectItems.querySelector("#lista-items-select").cloneNode(true);
        let itemsCliente = divClonado.querySelector("#item-seleccionado");
        itemsCliente.id = `li_${cliente._id}`;
        itemsCliente.classList.remove("d-none");
        itemsCliente.querySelector("#nombre").textContent = item.nombre;
        itemsCliente.querySelector("#cantidad").textContent = `${item.cantidad} un.`;
        itemsCliente.querySelector("#precio").textContent = `$${item.precio}`;
        let itemsSellecionadoGroup = divClonado.querySelector("#lista-group-seleccionado");
        itemsSellecionadoGroup.id = `ul_${cliente._id}`;
        itemsSellecionadoGroup.appendChild(itemsCliente);
        newSelectItems.querySelector("#lista-items-select").appendChild(itemsSellecionadoGroup);
    })

    const contenido = elemColl.querySelector("#contenido")
    contenido.innerHTML = "";
    contenido.appendChild(newSelectItems);
}

function cargarItemsSeleccion() {
    const primerOption = formSelectItems.seleccionado.getElementsByTagName("option")[0]
    formSelectItems.seleccionado.textContent = "";
    formSelectItems.seleccionado.appendChild(primerOption);
    itemGestion.obtenerListaItems().forEach(item =>
    {
        var opt = document.createElement("option");
        opt.value= item.id;
        opt.innerHTML = item.nombre
        formSelectItems.seleccionado.appendChild(opt)
    })
}

function agregarItemSeleccionado(event, cliente)
{
    event.preventDefault();
    let formData = new FormData(event.target);
    const itemSeleccionado = Object.fromEntries(formData);
    let item = itemGestion.obtenerListaItems().find(x => x.id == itemSeleccionado.seleccionado)
    item.cantidad = itemSeleccionado.cantidad;
    cliente.items.push(item);
    api.modificarCliente(cliente._id, cliente, () =>{
        cargarListaClientes();
    })
}

