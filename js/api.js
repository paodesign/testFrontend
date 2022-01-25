const hashApi = "3d4c40a1450240c3bbd9836e9f80f72d";


export function altaCliente(cliente){

    const request = axios.post(`https://crudcrud.com/api/${hashApi}/clientes`, cliente);

    request.then(response => {
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

export function modificacionCliente(clienteId, cliente){
    const request = axios.put(`https://crudcrud.com/api/${hashApi}/clientes/${clienteId}`, cliente);

    request.then(response => {
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