//Arreglo para almacenar los productos agregados al carrito
let carrito = [];

$(document).ready(function () {

    renderizarProductos();
    dibujarCarrito();

    $('#modalProducto').on('show.bs.modal', function (event) {
        var button = event.relatedTarget
        // extrae la informacion de data-bs-* attributes
        var recipient = button.getAttribute('data-bs-whatever');
        var valor = datosProductos[recipient - 1];
        $('#nombrePrdModal').text(valor.nombre);
        $('#precio1Modal').text(valor.precioActual);
        $('#precio2Modal').text(valor.precioAnterior);
        $("#descripModal").text(valor.descripcion);
        $("#imgModal").attr("src", valor.imagen);

    });

    //inicio evento click de boton vaciar
    $("#boton-vaciar").click(function () {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        dibujarCarrito();
    });
    //fin evento click de boton vaciar

    //INICIO MODAL CARRITO DE COMPRAR PAGAR
    $('#modalPagar').on('show.bs.modal', function (event) {
        dibujarCarritoModal();
    });
    //FIN MODAL CARRITO DE COMPRAR PAGAR

    //inicio evento click de boton pagar
    $("#boton-pagar").click(function () {
        var vacio = carrito.length;
        if (vacio == 0) {
            ejecutarAlert("Su carrito de compras esta vacio", alertArray[3]);
        } else {
            $("#modalPagar").modal("show");
        }
    });
    //fin evento click de boton pagar

});

/**
* Dibuja todos los productos a partir del arreglo de datos
*/
function renderizarProductos() {
    datosProductos.forEach((info) => {
        let div = "<div class='col-sm-4'>" +
            "<div class='card'>" +
            "<div class='card-header'>" + info.nombre + "</div>" +
            "<div class='card-block'>" +
            "<img width='100%' height='190px' src='" + info.imagen + "' />" +
            "<p class='card-text'><del>" + moneda + " " + info.precioAnterior + "</del></p>" +
            " <p class='card-text text-muted'>" + moneda + " " + info.precioActual + "</p>" +
            "<button type='button' class='fa fa-eye btn btn-info' data-bs-toggle='modal' data-bs-whatever='" + info.id + "'" +
            "data-bs-target='#modalProducto'>  Ver Detalle</button> " +
            "<button type='button' class='fa fa-shopping-cart btn btn-info ' marcador='" + info.id + "' onclick='agregaProductoCarrito(" + info.id + ")'></button>" +
            "</div>" +
            "<div class='card-footer text-muted'>Válido hasta agotar stock</div>" +
            "</div>" +
            "</div>";
        $("#itemsProductos").append(div);
    });
}

/**Evento para añadir un producto al carrito de la compra*/
function agregaProductoCarrito(evento) {
    // se  agrega un elemento al arreglo
    carrito.push(evento)
    //se renderiza el div de carrito
    dibujarCarrito();
}

/**Dibuja todos los productos guardados en el carrito*/
function dibujarCarrito() {
    //Eliminamos los elementos de li para volver a pintar la nueva lista actualizada
    $("#carrito").empty();

    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];

    // aqui genero los li en base a los item del arreglo carritoSinDuplicados
    carritoSinDuplicados.forEach((elementoCarrito) => {

        // se obtiene el producto desde el arreglo datosProductos
        //El método filter crea un nuevo arreglo y devuelve todos los elementos que pasan la condición especificada, 
        //en este caso solo el id del produto
        const miProducto = datosProductos.filter((elementoProducto) => {
            return elementoProducto.id === parseInt(elementoCarrito);
        });

        // aumento el contador del producto agregado
        const cantidadProducto = carrito.reduce((total, itemId) => {
            //Incremento el contador, en caso contrario lo mantengo
            return itemId === elementoCarrito ? total += 1 : total;
        }, 0);

        // se agrega un elemento a la lista
        let totalProducto = cantidadProducto * miProducto[0].precioActual;
        let divElementCarrito = "<li class='list-group-item text-right mx-2 d-flex justify-content-between list-group-item-info'>" +
            "<p>" + cantidadProducto + " x " + miProducto[0].nombre + " - " + moneda + " " + miProducto[0].precioActual + "</p> <p>Total: " + totalProducto + "</p>" +
            "<button class='btn btn-danger mx-6 fa fa-trash'  style='margin-left: 1rem;' data-item='" + elementoCarrito + "' onclick='borrarItemCarrito(" + elementoCarrito + ")'></button>" +
            "</li>";

        //se agrega al html sin aliminar lo anterior
        $("#carrito").append(divElementCarrito);
    });

    // Renderizamos el precio total en el HTML
    $("#total").text(calcularTotal());
}

/** Evento para borrar un elemento del carrito */
function borrarItemCarrito(id) {
    // se asigna al arreglo carrito todos sus elementos menos el elemento a borrar
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    // volvemos a renderizar
    dibujarCarrito();
}

/** Calcula el precio total teniendo en cuenta los productos repetidos */
function calcularTotal() {
    // Recorremos el array del carrito
    return carrito.reduce((total, valorItemCarrito) => {
        // De cada elemento obtenemos su precio del arreglo datosProductos
        const producto = datosProductos.filter((itemArregloProductos) => {
            return itemArregloProductos.id === parseInt(valorItemCarrito);
        });
        //se suma a variable total
        return total + producto[0].precioActual;
    }, 0).toFixed(2);
}

/**Evento para añadir un producto al carrito de la compra*/
function agregaProductoCarrito(evento) {
    // se  agrega un elemento al arreglo
    carrito.push(evento)
    //se renderiza el div de carrito
    dibujarCarrito();
}

/**Dibuja todos los productos guardados en el carrito*/
//es lo mismo que dibujarCarrito solo que aqui se dibuja en un div y en dibujarCarrito en un lu
function dibujarCarritoModal() {
    //Eliminamos los elementos de li para volver a pintar la nueva lista actualizada
    $("#divPagarCarrito").empty();
    $("#totalPagarCarrito").empty();

    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];

    // aqui genero los li en base a los item del arreglo carritoSinDuplicados
    carritoSinDuplicados.forEach((elementoCarrito) => {

        // se obtiene el producto desde el arreglo datosProductos
        //El método filter crea un nuevo arreglo y devuelve todos los elementos que pasan la condición especificada, 
        //en este caso solo el id del produto
        const miProducto = datosProductos.filter((elementoProducto) => {
            return elementoProducto.id === parseInt(elementoCarrito);
        });

        // aumento el contador del producto agregado
        const cantidadProducto = carrito.reduce((total, itemId) => {
            //Incremento el contador, en caso contrario lo mantengo
            return itemId === elementoCarrito ? total += 1 : total;
        }, 0);

        // se agrega un elemento a la lista
        let totalProducto = cantidadProducto * miProducto[0].precioActual;
        let divElementCarrito = "<div class='card mb-3 '>" +
            "<div class='card-body'>" +
            "<div class='d-flex justify-content-between'>" +
            "<div class='d-flex flex-row align-items-center'>" +
            "<div>" +
            "<img src='" + miProducto[0].imagen + "' class='img-fluid rounded-3' alt='Shopping item' style='width: 65px;'>" +
            "</div>" +
            "<div class='ms-3'>" +
            "<h5>" + miProducto[0].nombre + "</h5>" +
            "<p class='small mb-0'>" + miProducto[0].descripcion + "</p>" +
            "</div>" +
            "</div>" +
            "<div class='d-flex flex-row align-items-right'>" +
            "<div style='width: 50px;'>" +
            "<h5 class='fw-normal mb-0'>  " + cantidadProducto + "</h5>" +
            " </div>" +
            "<div style='width: 80px;'>" +
            "<h5 class='mb-0'>S/. " + totalProducto + "</h5>" +
            "</div>" +
            "<a href='#!' style='color: #cecece;'><i class='fas fa-trash-alt'></i></a>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";

        //se agrega al html sin aliminar lo anterior
        $("#divPagarCarrito").append(divElementCarrito);

    });

    var totalPagarCarrito = calcularTotal();
    var impuesto = totalPagarCarrito * igv;
    var subTotal = totalPagarCarrito - impuesto;

    $("#totalPagarCarrito").empty();
    let divSubtotal = "<div class='d-flex justify-content-between'> <p class='mb-2'>Subtotal</p>" +
        "<p class='mb-2'>S/. " + subTotal + "</p> </div>";

    let divImpuesto = "<div class='d-flex justify-content-between'><p class='mb-2'>Impuesto</p>" +
        "<p class='mb-2'>S/." + impuesto + "</p></div >";

    let divTotalCarrito = "<div class='d-flex justify-content-between mb-4'><p class='mb-2'>Total(Incl. Imp.)</p>" +
        "<p class='mb-2'>S/. " + totalPagarCarrito + "</p></div>";

    let divPagarCompra = "<button type='button' onclick='accionPagar()' class='btn btn-info btn-block btn-lg'>" +
        "<div class='d-flex justify-content-between'> <span>S/. " + totalPagarCarrito + "  </span>" +
        "   <span> Pagar <i class='fas fa-long-arrow-alt-right ms-2'></i></span>" +
        "</div></button>";

    $("#totalPagarCarrito").append(divSubtotal + divImpuesto + divTotalCarrito + divPagarCompra);

}

//accion para el boton pagar de modal
function accionPagar() {
    //remuevo clases valid e ininvalid
    removeClassPagar();


    var nombreTitular = $("#nombreTitular").val();
    var numTarjeta = $("#numTarjeta").val();
    var expiracion = $("#expiracion").val();
    var cvv = $("#cvv").val();

    if (nombreTitular == "") {
        $("#nombreTitular").addClass('is-invalid');
    } else {
        $("#nombreTitular").addClass('is-valid');
    }

    if (numTarjeta == "") {
        $("#numTarjeta").addClass('is-invalid');
    } else {
        $("#numTarjeta").addClass('is-valid');
    }

    if (expiracion == "") {
        $("#expiracion").addClass('is-invalid');
    } else {
        $("#expiracion").addClass('is-valid');
    }

    if (cvv == "") {
        $("#cvv").addClass('is-invalid');
    } else {
        $("#cvv").addClass('is-valid');
    }
}

//funcion para remoer clases
function removeClassPagar(){
    $("#nombreTitular").removeClass('is-invalid');
    $("#nombreTitular").removeClass('is-valid');
    $("#numTarjeta").removeClass('is-invalid');
    $("#numTarjeta").removeClass('is-valid');
    $("#expiracion").removeClass('is-invalid');
    $("#expiracion").removeClass('is-valid');
    $("#cvv").removeClass('is-invalid');
    $("#cvv").removeClass('is-valid');
}