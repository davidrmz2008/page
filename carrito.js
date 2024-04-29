
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

window.onload = function() {
    // Attach click event listener to the parent container of shopping-box elements
    var container = document.getElementById('lista-productos');
    container.addEventListener('click', function(event) {
        // Check if the clicked element is an <i> inside a .shopping-box
        if (event.target.matches('.shopping-box i')) {
            // Get the closest .shopping-box element
            var box = event.target.closest('.shopping-box');
            // Get the product ID from the dataset
            var productId = box.dataset.productId;
            eliminarProducto(productId);
        }
    });

    // Actualizar el carrito con los productos almacenados en LocalStorage
    actualizarCarrito();
};