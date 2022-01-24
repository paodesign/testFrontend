const hashApi = "aa19d9c0291342dc998275ee676c86d1";


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

export function bajaCliente(clienteId){
    const request = axios.delete(`https://crudcrud.com/api/${hashApi}/clientes/${clienteId}`);

    request.then(response => {
        console.log(response);
    })

    request.catch(error =>{
        console.error(error);
    })
}

export function modificacionCliente(){

}

export function getAll(listarClientes ){

   
    const request = axios.get(`https://crudcrud.com/api/${hashApi}/clientes`);

    request.then(response => {
        listarClientes(response.data);
        console.log(response.data);
    })

    request.catch(error =>{
        console.error(error);
    })
}

export function getById(){

}