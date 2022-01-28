// Array
let valores = [ 'a', 10, 'b', 'hola', 122, 15];
let numeros = [];
let letras = [];

let arrayBusqueda = [ 1, 11, 'a', 'b', 123];
let arrayConDiez = [];
let arraySinDiez = [];
let a = 10;

function isNum(val){
    return !isNaN(val)
  }

for (var i = 0; i <= valores.length-1; i++) {
    if(isNum(valores[i]) === true){
        numeros.push(valores[i]);
    }else {
        letras.push(valores[i]);
    }
 }
document.write( ` 1)- a. Array de contenido con letras : ${letras}  `); 
document.write( ` 1)- b. y Array de contenido con numeros: ${numeros}  `);

console.log(letras);
console.log(numeros);

// Mayor
let mayor = 0;

for(let i = 0; i<= numeros.length; i ++){
    if(numeros[i]>= mayor){
        mayor = numeros[i];   
     }
    
}

document.write( ` 1)- c. El mayor numero del array es:  ${mayor} `);

console.log( 'El número mayor es ' + mayor );


for (var i = 0; i <= arrayBusqueda.length-1; i++) {
    if((arrayBusqueda[i]) === a){
        arrayConDiez.push(arrayBusqueda[i]);
    }else {
        arraySinDiez.push(arrayBusqueda[i]);
      
    }
 }
 console.log("array let a = 10",arraySinDiez);

 document.write( `  2)-a. Recorrer un array con un For :  ${arraySinDiez} `);

 function generadorIdCliente(){
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );    
}

document.write( ` 1)- c. Este es el id:  ${generadorIdCliente()} `);
console.log("Este es el id: ",generadorIdCliente())