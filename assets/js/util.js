//valor de igv
const igv = 0.18;

//Arreglo que ontiene todos los datos del producto
const datosProductos = [
    {
        id: 1,
        nombre: 'Canilleras',
        precioActual: 150,
        precioAnterior: 180,
        descripcion: 'Canilleras especialmente fabricdas para los deportes de contacto.',
        imagen: "assets/img/canilleras.jpg"
    },
    {
        id: 2,
        nombre: 'Casco',
        precioActual: 89,
        precioAnterior: 100,
        descripcion: 'Casco con tres capas de relleno para maxima proteccion.',
        imagen: "assets/img/casco.jpg"
    },
    {
        id: 3,
        nombre: 'Guantes',
        precioActual: 90,
        precioAnterior: 110,
        descripcion: 'Guantes de box de maxima resistencia.',
        imagen: "assets/img/guantes.webp"
    },
    {
        id: 4,
        nombre: 'Pads',
        precioActual: 65,
        precioAnterior: 80,
        descripcion: 'Equipo para practicar con total proteccion combinaciones.',
        imagen: "assets/img/pads.jpg"
    },
    {
        id: 5,
        nombre: 'Pera Loca',
        precioActual: 45,
        precioAnterior: 50,
        descripcion: 'Pera loca para la practica de reflejos.',
        imagen: "assets/img/peraloca.jpg"
    },
    {
        id: 6,
        nombre: 'Sacos',
        precioActual: 190,
        precioAnterior: 220,
        descripcion: 'Sacos de alta resistencia.',
        imagen: "assets/img/sacos.webp"
    },
    {
        id: 7,
        nombre: 'Short',
        precioActual: 100,
        precioAnterior: 150,
        descripcion: 'Short de alta resistencia para la practica de deportes de contacto.',
        imagen: "assets/img/short.webp"
    },
    {
        id: 8,
        nombre: 'Soga',
        precioActual: 15,
        precioAnterior: 25,
        descripcion: 'Perfecto para mejorar la resistencia.',
        imagen: "assets/img/soga.jpg"
    },
    {
        id: 9,
        nombre: 'Tobilleras',
        precioActual: 20,
        precioAnterior: 28,
        descripcion: 'Tobilleras de alta resistencia.',
        imagen: "assets/img/tobilleras.jpg"
    },
    {
        id: 10,
        nombre: 'Vendas',
        precioActual: 15,
        precioAnterior: 25,
        descripcion: 'Proteccion asegurada para las manos al momento de golpear el saco o sparring.',
        imagen: "assets/img/vendas.webp"
    }

];

const moneda = "S/.";

//Expresion regular para validar formato de correo
var expRegEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;


//funcion flecha que recibe tipo de alerte y mensaje a mostrar en alert
const alert = (mensaje, tipo) => {
    let div = "<div class='alert alert-" + tipo + " alert-dismissible' role='alert'>" +
        "<div>" + mensaje + "</div>" +
        "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>" +
        "</div>";
    $("#alert_msg").html(div);
}

//tipo de div alert bootstrat
alertArray = [
    "primary", "secondary", "success", "danger", "warning", "info", "light", "dark"
];

//funcion para ejecutar alert dando un tiempo para que se oculte
function ejecutarAlert(mensaje, tipo) {
    alert(mensaje, tipo);
    $("#alert_msg").fadeTo(2000, 500).slideUp(500, function () {
        $("#alert_msg").slideUp(500);
    });
}

//Funcion que valida el formato de la contraseña
function validarContraseña(p1) {
    var noValido = / /;
    if (p1.length < 8 //validar longitud contraseña
        || !p1.match(/[A-z]/) //validar letra
        || !p1.match(/[A-Z]/) //validar letra mayúscula
        || !p1.match(/\d/) //validar numero
        || noValido.test(p1) // se chequea el regex de que el string no tenga espacio
    ) {
        return false;
    }
    return true;
}

//validar solo letras
function soloLetras(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
    especiales = [8, 37, 39, 46];

    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial)
        return false;
}

//si es diferente de numero lo limpia
function limpia() {
    var val = $("#nombreTitular").val();
    var tam = val.length;
    for (i = 0; i < tam; i++) {
        if (!isNaN(val[i])) {
            $("#nombreTitular").val() = '';
        }
    }
}