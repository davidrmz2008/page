let shop = document.querySelector('#shop-cart');
let shopcart = document.querySelector('.shopping-cart');

function mostrarMensaje(mensaje) {
    // Crear un elemento de mensaje
    const mensajeElement = document.createElement('div');
    mensajeElement.classList.add('mensaje');
    mensajeElement.textContent = mensaje;

    // Agregar el mensaje a la parte inferior izquierda
    document.body.appendChild(mensajeElement);

    // Activar la transición
    setTimeout(() => {
        mensajeElement.classList.add('mostrando');
    }, 10); // Agrega una pequeña espera para activar la transición

    // Eliminar el mensaje después de cierto tiempo
    setTimeout(() => {
        mensajeElement.classList.remove('mostrando');
        // Eliminar el mensaje después de que termine la transición
        setTimeout(() => {
            mensajeElement.remove();
        }, 300); // 300 milisegundos = duración de la transición
    }, 1000); // 3 segundos
}

document.addEventListener("DOMContentLoaded", function() {
    const openCartBtn = document.querySelector(".open-cart-btn");
    const closeCartBtn = document.querySelector(".close-cart-btn");
    const modalOverlay = document.querySelector(".modal-overlay");
    
    openCartBtn.addEventListener("click", function() {
        modalOverlay.style.display = "block";
    });
    
    closeCartBtn.addEventListener("click", function() {
        modalOverlay.style.display = "none";
    });
});

window.onload = function() {

    const url = window.location.href;

    let productos = [];
    
    if (url.includes("hombres.html")) {
        productos = [
            { id: 1, nombre: "Camisa a Cuadros", precio: 45.00, imagen: "images/camisacuadros.jpg" },
            { id: 2, nombre: "Pantalón de Mezclilla", precio: 55.00, imagen: "images/mezclilla.jpg" },
            { id: 3, nombre: "Chaqueta de Cuero", precio: 120.00, imagen: "images/cuero.jpg" }
        ];
    } else if (url.includes("mujeres.html")) {
        productos = [
            { id: 4, nombre: "Chamarra de piel", precio: 60.00, imagen: "images/mujerpiel.jpg" },
            { id: 5, nombre: "Blusa elegante", precio: 35.00, imagen: "images/blusa.jpg" },
            { id: 6, nombre: "Falda de Mezclilla", precio: 40.00, imagen: "images/falda.jpg" },
            { id: 7, nombre: "Blusa lino", precio: 160.00, imagen: "images/girl.png" },
            { id: 8, nombre: "Sudadera bordada", precio: 65.00, imagen: "images/chicaazul.jpg" },
            { id: 9, nombre: "Pantalón de algodón", precio: 40.00, imagen: "images/woman.jpg" }
        ];
    }
    const listaProductos = document.querySelector('.productos');

    productos.forEach(producto => {
        const li = document.createElement('li');
        li.classList.add('producto');
        li.dataset.id = producto.id;
        li.dataset.nombre = producto.nombre;
        li.dataset.precio = producto.precio.toFixed(2); // Ajustar a 2 decimales
        li.dataset.imagen = producto.imagen;

        li.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio.toFixed(2)}</p>
            <button class="agregar-carrito" data-id="${producto.id}" data-nombre="${producto.nombre}" data-precio="${producto.precio.toFixed(2)}" data-imagen="${producto.imagen}">Agregar al carrito</button>
        `;

        listaProductos.appendChild(li);
    });

    const agregarCarritoButtons = document.querySelectorAll('.agregar-carrito');

    agregarCarritoButtons.forEach(button => {
        button.addEventListener('click', agregarAlCarritoInterno);
    });

// Función para crear elementos de producto
function crearElementoProducto(producto) {
    const li = document.createElement('li');
    li.classList.add('producto');
    li.dataset.id = producto.id;
    li.dataset.nombre = producto.nombre;
    li.dataset.precio = producto.precio.toFixed(2); // Ajustar a 2 decimales
    li.dataset.imagen = producto.imagen;

    li.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio.toFixed(2)}</p>
        <button class="agregar-carrito" data-id="${producto.id}" data-nombre="${producto.nombre}" data-precio="${producto.precio.toFixed(2)}" data-imagen="${producto.imagen}">Agregar al carrito</button>
    `;

    return li;
}

// Función para filtrar productos según el término de búsqueda
function filtrarProductos(filtro) {
    const productosFiltrados = productos.filter(producto => {
        // Convertir el nombre del producto a minúsculas y verificar si coincide con el término de búsqueda
        return producto.nombre.toLowerCase().includes(filtro);
    });

    // Limpiar la lista de productos en la interfaz
    const listaProductos = document.querySelector('.productos');
    listaProductos.innerHTML = '';

    // Mostrar solo los productos que coinciden con el filtro
    productosFiltrados.forEach(producto => {
        const li = crearElementoProducto(producto);
        listaProductos.appendChild(li);
    });

    // Volver a agregar event listeners a los botones de agregar al carrito
    const agregarCarritoButtons = document.querySelectorAll('.agregar-carrito');
    agregarCarritoButtons.forEach(button => {
        button.addEventListener('click', agregarAlCarritoInterno);
    });
}

// Obtener el input de búsqueda
const filtroProductosInput = document.getElementById('filtro-productos');

// Agregar un event listener para detectar cambios en el input de búsqueda
filtroProductosInput.addEventListener('input', function(event) {
    const filtro = event.target.value.toLowerCase(); // Obtener el valor del input en minúsculas
    filtrarProductos(filtro);
});
};

// Función para añadir un producto al carrito
function agregarAlCarritoInterno(event) {
    const button = event.target;
    const id = button.dataset.id;
    const nombre = button.dataset.nombre;
    const precio = button.dataset.precio;
    const imagen = button.dataset.imagen;

    // Llamar a la función para agregar al carrito
    agregarAlCarrito(id, nombre, 1, parseFloat(precio), imagen);

    mostrarMensaje('¡Se agregó correctamente! Revisa tu carrito.');
}


// Función para añadir un producto al carrito
function agregarAlCarrito(id, nombre, cantidad, precio, imagen) {
    // Obtener productos del LocalStorage si existen
    var productos = obtenerProductosDelLocalStorage();

    // Verificar si el producto ya está en el carrito
    if (productos.hasOwnProperty(id)) {
        // Si el producto ya está en el carrito, sumar la cantidad
        productos[id].cantidad += cantidad;
    } else {
        // Si es un nuevo producto, crear un nuevo objeto producto
        productos[id] = {
            id: id,
            nombre: nombre,
            cantidad: cantidad,
            precio: precio,
            imagen: imagen
        };
    }

    // Guardar los productos actualizados en LocalStorage
    guardarProductosEnLocalStorage(productos);

    // Llamar a una función para actualizar la interfaz de usuario si es necesario
    actualizarCarrito();
}

// Función para obtener los productos del LocalStorage
function obtenerProductosDelLocalStorage() {
    var productos;
    // Verificar si hay productos en LocalStorage
    if (localStorage.getItem('productos')) {
        // Si hay productos, obtenerlos del LocalStorage
        productos = JSON.parse(localStorage.getItem('productos'));
    } else {
        // Si no hay productos, inicializar un objeto vacío
        productos = {};
    }
    return productos;
}

// Función para guardar los productos en LocalStorage
function guardarProductosEnLocalStorage(productos) {
    // Guardar los productos en LocalStorage
    localStorage.setItem('productos', JSON.stringify(productos));
}

// Función para actualizar la interfaz de usuario del carrito
function actualizarCarrito() {
    var listaProductosHTML = ''; // Variable para almacenar el HTML de la lista de productos

    // Obtener productos del LocalStorage
    var productos = obtenerProductosDelLocalStorage();

    // Verificar si el carrito está vacío
    if (Object.keys(productos).length === 0) {
        document.getElementById('lista-productos').innerHTML = '<div class="empty-cart"><h1>El carrito está vacío</h1>'

        // Salir de la función ya que no hay productos que mostrar
        return;
    }

    // Recorrer el objeto de productos y generar el HTML para cada producto
    for (var id in productos) {
        if (productos.hasOwnProperty(id)) {
            var producto = productos[id];
            listaProductosHTML += `
                <div class="shopping-box" data-product-id="${producto.id}">
                    <i class="fas fa-times"></i>
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <div class="shop-content">
                        <h3>${producto.nombre}</h3>
                        <span class="quantity">${producto.cantidad}</span>
                        <span class="multiply">*</span>
                        <span class="multiply">$${producto.precio}</span>
                    </div>
                </div>
            `;
        }
    }

    listaProductosHTML += `
    <button class="green-button" style="margin-top: 10px;">Proceder al pago</button>
    `;

    // Actualizar el contenido del contenedor con la lista de productos
    document.getElementById('lista-productos').innerHTML = listaProductosHTML;
}

// Función para eliminar un producto del carrito
function eliminarProducto(id) {
    // Obtener productos del LocalStorage si existen
    var productos = obtenerProductosDelLocalStorage();

    // Verificar si el producto está en el carrito
    if (productos.hasOwnProperty(id)) {
        // Eliminar el producto del diccionario
        delete productos[id];

        // Guardar los productos actualizados en LocalStorage
        guardarProductosEnLocalStorage(productos);

        // Actualizar la interfaz de usuario del carrito
        actualizarCarrito();
    }
}
