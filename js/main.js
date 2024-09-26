//PRODUCTOS

const zapatillas = [
    {
        id: 1,
        titulo: "Zapatillas Nike",
        img: "/img/zapatillas-nike.jpg",
        precio: 75000,    
    },
    {
        id: 2,
        titulo: "Zapatillas NEW BALANCE",
        img: "/img/zapatillas-new.jpg",
        precio: 67000,    
    },
    {
        id: 3,
        titulo: "Zapatillas Adidas",
        img: "/img/zapatillas-adidas.jpg",
        precio: 62000,    
    },
    {
        id: 4,
        titulo: "Zapatillas Puma",
        img: "/img/zapatillas-puma.jpg",
        precio: 55000,    
    }
    ]



//INDEX JS
    const contenedorTarjetas = document.querySelector("#productos-container");

    function crearTarjetasProductosInicio(productos) {
        productos.forEach(producto => {
            const nuevaZapatilla = document.createElement("div");
            nuevaZapatilla.classList.add("tarjeta-producto");
    
            nuevaZapatilla.innerHTML = `
            <img src=${producto.img}>
            <h2>${producto.titulo}</h2>
            <p class="precio">$${producto.precio}</p>
            <button>Agregar al carrito</button>
            `;
    
            contenedorTarjetas.appendChild(nuevaZapatilla);
            nuevaZapatilla.getElementsByTagName("button")[0].addEventListener("click",() => agregarAlCarrito(producto))
        });
    }
    
    crearTarjetasProductosInicio(zapatillas);

////////////////////////////////////////////

//CART-SERVICE
const cuentaCarritoElement = document.getElementById("cuenta-carrito");

/** Toma un objeto producto o un objeto con al menos un ID y lo agrega al carrito */
function agregarAlCarrito(producto){
  //Reviso si el producto está en el carrito.
  let memoria = JSON.parse(localStorage.getItem("zapatillas"));
  let cantidadProductoFinal;
  //Si no hay localstorage lo creo
  if(!memoria || memoria.length === 0) {
    const nuevoProducto = getNuevoProductoParaMemoria(producto)
    localStorage.setItem("zapatillas",JSON.stringify([nuevoProducto]));
    actualizarNumeroCarrito();
    cantidadProductoFinal = 1;
  }
  else {
    //Si hay localstorage me fijo si el artículo ya está ahí
    const indiceProducto = memoria.findIndex(zapatilla => zapatilla.id === producto.id)
    const nuevaMemoria = memoria;
    //Si el producto no está en el carrito lo agrego
    if(indiceProducto === -1){
      const nuevoProducto = getNuevoProductoParaMemoria(producto);
      nuevaMemoria.push(nuevoProducto);
      cantidadProductoFinal = 1;
    } else {
      //Si el producto está en el carrito le agrego 1 a la cantidad.
      nuevaMemoria[indiceProducto].cantidad ++;
      cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
    }
    localStorage.setItem("zapatillas",JSON.stringify(nuevaMemoria));
    actualizarNumeroCarrito();
    return cantidadProductoFinal;
  }
}

/** Resta una unidad de un producto del carrito */
function restarAlCarrito(producto){
  let memoria = JSON.parse(localStorage.getItem("zapatillas"));
  let cantidadProductoFinal = 0;
  const indiceProducto = memoria.findIndex(zapatilla => zapatilla.id === producto.id)
  let nuevaMemoria = memoria;
  nuevaMemoria[indiceProducto].cantidad--;
  cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
  if(cantidadProductoFinal === 0){
    nuevaMemoria.splice(indiceProducto,1)
  };
  localStorage.setItem("zapatillas",JSON.stringify(nuevaMemoria));
  actualizarNumeroCarrito();
  return cantidadProductoFinal;
}


// Toma un producto, le agregar cantidad 1 y lo devuelve
function getNuevoProductoParaMemoria(producto){
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}



function actualizarNumeroCarrito(){
    let cuenta = 0;
    const memoria = JSON.parse(localStorage.getItem("zapatillas"));
    if(memoria && memoria.length > 0){
      cuenta = memoria.reduce((acum, current)=>acum+current.cantidad,0)
      return cuentaCarritoElement.innerText = cuenta;
    }
    cuentaCarritoElement.innerText = 0;
  }

  function reiniciarCarrito(){
    localStorage.removeItem("zapatillas");
    actualizarNumeroCarrito();
  }
  
  
  actualizarNumeroCarrito();
