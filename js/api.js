const hashApi = "41df67895e5c4e31bbe240a03ab505c9";


export function altaCliente(cliente, confirmarCreado){
    const request = axios.post(`https://crudcrud.com/api/${hashApi}/clientes`, cliente);
    request.then(response => {
        confirmarCreado();
        alert("Cliente creado.");
        console.log(response);
    })
    request.catch(error =>{
        console.error(error);
    })
}

export function bajaCliente(clienteId, confimarEliminado){
    const request = axios.delete(`https://crudcrud.com/api/${hashApi}/clientes/${clienteId}`);
    request.then(response => {
        confimarEliminado();
        console.log(response);
    })
    request.catch(error =>{
        console.error(error);
    })
}

export function modificarCliente(clienteId, cliente, confirmarModificado){
    const request = axios.put(`https://crudcrud.com/api/${hashApi}/clientes/${clienteId}`, cliente);
    request.then(response => {
        confirmarModificado();
        alert("Cliente Modificado.");
        console.log(response);
    })
    request.catch(error =>{
        console.error(error);
    })
}

export function getAll(listarClientes){   
    const request = axios.get(`https://crudcrud.com/api/${hashApi}/clientes`);
    request.then(response => {
        listarClientes(response.data);
        console.log(response.data);
    })
    request.catch(error =>{
        console.error(error);
    })
}

export function getById(clienteId, obtenerCliente){
    const request = axios.get(`https://crudcrud.com/api/${hashApi}/clientes/${clienteId}`);
    request.then(response => {
        obtenerCliente(response.data);
        console.log(response.data);
    })
    request.catch(error =>{
        console.error(error);
    })
}