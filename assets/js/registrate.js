//document.ready
$(function () {

    $("#registrarFrm").validate({
        rules: {
            nombres: {
                required: true,
                minlength: 5
            },
            apellidos: {
                required: true,
                minlength: 5
            },
            email: {
                required: true,
                email: true,
                regex: true
            },
            password: {
                required: true,
                minlength: 5,
                pwcheck: true
            },
            passwordConfirmation: {
                required: true,
                equalTo: "#password"
            },
            telefono: "required",
        },
        messages: {
            nombres: {
                required: "Porfavor ingrese su Nombre.",
                minlength: "El nombre como minimo debe tener 5 caracteres."
            },
            apellidos: {
                required: "Porfavor ingrese su Apellido.",
                minlength: "El Apellido como minimo debe tener 5 caracteres."
            },
            email: {
                required: "Porfavor Ingrese su correo electronico.",
                email: "Correo invalido",
                regex: "Ingrese un email valido."
            },
            password: {
                required: "Porfavor ingrese su contraseña.",
                minlength: "Contraseña demasiado corta",
                pwcheck: "La contraseña no cumple el formato correcto"
            },
            passwordConfirmation: {
                required: "Porfavor ingrese nuevamente su contraseña.",
                equalTo: "Las Contraseñas no coinciden."
            },
            telefono: "Ingrese Telefono."
        },
        errorElement: "em",
        errorPlacement: function (error, element) {
            // Add the `invalid-feedback` class to the error element
            error.addClass("invalid-feedback");

            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.next("label"));
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass("is-invalid").removeClass("is-valid");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).addClass("is-valid").removeClass("is-invalid");
        }
    });

    $.validator.addMethod("pwcheck",
        function (value, element) {
            var noValido = / /;
            if (value.length < 8 //validar longitud contraseña
                || !value.match(/[A-z]/) //validar letra
                || !value.match(/[A-Z]/) //validar letra mayúscula
                || !value.match(/\d/) //validar numero
                || noValido.test(value) // se chequea el regex de que el string no tenga espacio
            ) {
                return false;
            }
            return true;
        });

    $.validator.addMethod("regex", function (value, element) {
        return expRegEmail.test(value);
    }
    );

    //inicio evento click de boton
    $("#registrar").click(function () {
        let nombres = $("#nombres").val();
        let apellidos = $("#apellidos").val();
        let email = $("#email").val();
        let telefono = $("#telefono").val();
        let password = $("#password").val();
        let passwordConfirmation = $("#passwordConfirmation").val();

        if (nombres == "" || apellidos == "" ||
            email == "" ||
            telefono == "" || password == "" ||
            passwordConfirmation == "") {
            ejecutarAlert("Ingrese todos los datos para poder registrarlo", alertArray[3]);
        } else {
            //valido con expresion regular el email
            var esValido = expRegEmail.test(email);
            if (esValido == true) {
                if (!validarContraseña(password)) {
                    ejecutarAlert("La contraseña debe contener un minimo de 8 carácteres alfanuméricos (a-z A-Z), contener mínimo un dígito (0-9).", alertArray[3]);
                } else {
                    if (password == passwordConfirmation) {
                        ejecutarAlert("Se ha creado su cuenta con exito", alertArray[2]);
                        //se redirige a login.html luego de 3 segundos
                        setTimeout(function () {
                            $(location).attr('href', 'login.html');
                        }, 3000);
                    } else {
                        ejecutarAlert("Las Contraseñas no coinciden", alertArray[4]);
                    }
                }
            } else {
                ejecutarAlert("Formato de Correo Incorrecto", alertArray[4]);
            }
        }

    });
    //fin evento click de boton

});