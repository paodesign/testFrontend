import * as itemGestion from "./items.js";
import * as clienteAbm from  "./cliente.js"

itemGestion.formItem.addEventListener("submit", itemGestion.agregarItem);

clienteAbm.formCliente.addEventListener("submit",clienteAbm.enviarCliente);


let collapseCliente = document.getElementById("collapseTwo");
collapseCliente.addEventListener('show.bs.collapse', clienteAbm.agregarIdCliente);


let collapseListaClientes = document.getElementById("collapseThree");
collapseListaClientes.addEventListener('show.bs.collapse', clienteAbm.cargarListaClientes);

//handleRequest();
itemGestion.cargarItems();