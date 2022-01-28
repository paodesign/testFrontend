import * as itemGestion from "./items.js";
import * as clienteAbm from  "./cliente.js"
import * as clienteItems from "./clientesItems.js"

itemGestion.formItem.addEventListener("submit", itemGestion.agregarItem);
clienteAbm.formCliente.addEventListener("submit",clienteAbm.enviarCliente);

let collapseCliente = document.getElementById("collapseTwo");
collapseCliente.addEventListener('show.bs.collapse', clienteAbm.definirTipoVista);
collapseCliente.addEventListener('hide.bs.collapse', clienteAbm.asignarVistaAlta);

let collapseListaClientes = document.getElementById("collapseThree");
collapseListaClientes.addEventListener('show.bs.collapse', clienteItems.renderTablaClientes);

itemGestion.cargarItems();