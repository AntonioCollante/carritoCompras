//document.ready
$(function () {
    //inicio evento click de boton
    $("#login").click(function () {
        let email = $("#email").val();
        let clave = $("#password").val();
        if (email == "" || clave == "") {
            ejecutarAlert("Ingrese Email y/o Contraseña", alertArray[3]);
        } else {
            var esValido = expRegEmail.test(email);
            if (esValido == true) {
                //se redirige a inicio.html
                $(location).attr('href','inicio.html');
            } else {
                ejecutarAlert("Formato de Correo Incorrecto", alertArray[4]);
            }
        }
    });
    //fin evento click de boton

});