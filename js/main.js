//PRODUCTOS

const zapatillas = [
    {
        id: "zapatilla-1",
        titulo: "Zapatillas Nike",
        img: "../img/zapatillas-nike.jpg",
        precio: 75000,    
    },
    {
        id: "zapatilla-2",
        titulo: "Zapatillas NEW BALANCE",
        img: "../img/zapatillas-new.jpg",
        precio: 67000,    
    },
    {
        id: "zapatilla-3",
        titulo: "Zapatillas Adidas",
        img: "../img/zapatillas-adidas.jpg",
        precio: 62000,    
    },
    {
        id: "zapatilla-4",
        titulo: "Zapatillas Puma",
        img: "../img/zapatillas-puma.jpg",
        precio: 55000,    
    }
    ]

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//INDEX JS
    const contenedorTarjetas = document.querySelector("#productos-container");

    function crearTarjetasProductosInicio(productos) {
        productos.forEach(producto => {
            const nuevaZapatilla = document.createElement("div");
            nuevaZapatilla.classList.add("tarjeta-producto");
    
            nuevaZapatilla.innerHTML = `
            <img src=${producto.img}>
            <h2>${producto.titulo}</h2>
            <p>$${producto.precio}</p>
            <button>Agregar al carrito</button>
            `;
    
            contenedorTarjetas.appendChild(nuevaZapatilla);
            nuevaZapatilla.getElementsByTagName("button")[0].addEventListener("click",() => agregarAlCarrito(producto))
        });
    }
    
    crearTarjetasProductosInicio(zapatillas);

////////////////////////////////////////////

//CART-SERVICE
function agregarAlCarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("zapatillas"));
     console.log(memoria);
     if(!memoria){
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        localStorage.setItem("zapatillas",JSON.stringify([nuevoProducto]));
     } else{
        const indiceProducto = memoria.findIndex(zapatilla => zapatilla.id === producto.id);
        console.log(indiceProducto)
        const nuevaMemoria = memoria;
        if(indiceProducto === -1){            
            nuevaMemoria.push(getNuevoProductoParaMemoria(producto))
        } else {
            nuevaMemoria[indiceProducto].cantidad ++;
        }
        localStorage.setItem("zapatillas",JSON.stringify(nuevaMemoria));
     }
     actualizarNumeroCarrito();
}

// Toma un producto, le agregar cantidad 1 y lo devuelve
function getNuevoProductoParaMemoria(producto){
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}

const cuentaCarritoElement = document.getElementById("cuenta-carrito");

function actualizarNumeroCarrito(){
    const memoria = JSON.parse(localStorage.getItem("zapatillas"));
    const cuenta = memoria.reduce((acum, current) => acum+current.cantidad,0);
    cuentaCarritoElement.innerText= cuenta;
}




/// CART JS

const contenidoTarjeta = document





















//     // Definir nuevaMemoria antes del bloque condicional
//     let nuevaMemoria = memoria ? [...memoria] : []; // Crea una copia de memoria o un arreglo vacío

//     if (!memoria) {
//         const nuevoProducto = getNuevoProductoParaMemoria(producto);
//         localStorage.setItem("zapatillas", JSON.stringify([nuevoProducto]));
//     } else {
//         const indiceProducto = nuevaMemoria.findIndex(zapatilla => zapatilla.id === producto.id);
//         console.log(indiceProducto);
        
//         if (indiceProducto === -1) {
//             nuevaMemoria.push(getNuevoProductoParaMemoria(producto));
//         } else {
//             // Si el producto está en el carrito, le agrego 1 a la cantidad.
//             nuevaMemoria[indiceProducto].cantidad++;
//         }
        
//         localStorage.setItem("zapatillas", JSON.stringify(nuevaMemoria));
//     }
// }

// function getNuevoProductoParaMemoria(producto) {
//     // Crea una copia del producto para evitar mutaciones
//     return { ...producto, cantidad: 1 }; // Uso del spread operator
// }












