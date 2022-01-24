const hashApi = "9828f043fe464434b051a6993a04c34e";


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

export function bajaCliente(){

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