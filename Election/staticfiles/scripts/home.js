$(document).ready(function(){
    hide_loading();
    showAlert(
        'Please Enter your CPF Number to Authenticate yourself in order to cast your vote.',
        'rgba(201, 136, 255, 0.3)', 'rgb(102, 0, 128)');
    setTimeout(function(){
        $('.loading-div').css({
            'height': 'calc(100vh - 50px)',
            'top': '50px',
        });
    }, 1000);

    $('#aadhar').on('input', function() {
        let valor = $(this).val();
    
        valor = valor.replace(/\D/g, ""); // Remove caracteres não numéricos
    
        // Formatação do CPF
        if (valor.length <= 6) {
            valor = valor.replace(/(\d{3})(\d{1,3})?/, "$1.$2");
        } else if (valor.length <= 9) {
            valor = valor.replace(/(\d{3})(\d{3})(\d{1,3})?/, "$1.$2.$3");
        } else {
            valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
        }
        // Permite apagar o ponto
        if (valor.endsWith('.') || valor.endsWith('-')) {
            valor = valor.slice(0, -1);
        }        
        $(this).val(valor); // Atualiza o valor no campo
    
        if(validateCPF(valor)) {
            hideCpfAlert();
        }
        else {
            showCpfAlert("Invalid CPF. Please enter a valid CPF Number.");
        }
    });
})

function validateCPF(numero) {
    const cpfRegex = /^(\d{3}\.\d{3}\.\d{3}-\d{2})$/; // Regex para validar CPF (11 dígitos)

    return cpfRegex.test(numero);
}

function showCpfAlert(mensagem) {
    $("#avisoNumeroInvalido").addClass("alert");
    $("#avisoNumeroInvalido").removeClass("aviso-oculto");
    $("#textoAviso").text(mensagem);
    
}

function hideCpfAlert() {
    $("#textoAviso").text("");
    $("#avisoNumeroInvalido").addClass("aviso-oculto");
    $("#avisoNumeroInvalido").removeClass("alert");
}

// Authenticate aadhar no after button click
function submit_aadhar() {
    
    show_loading('Please wait, you are being authenticated.');
    $.ajax(
        {
            type:"GET",
            url: "/authentication/",
            data: {'aadhar_no': $('#aadhar').val().replace(/[.-]/g, "")},
            success: function( data )
            {
                if(data.success){
                    candidate_details_json = data.details;

                    showAlert(
                        'Successfully Authenticated, Vote Now!',
                        'rgba(136, 255, 156, 0.3)', 'rgb(0, 128, 0)');
                    setTimeout( function(){
                        showAlert(
                            'Please verify an Email-ID, Private key will be sent to this Email-ID.',
                            'rgba(201, 136, 255, 0.3)', 'rgb(102, 0, 128)', null);
                    }, 5000);
                    
                    $('.main-content').html(data.html);
                    hide_loading();
                    showShortDetails();
                }

                else {
                    showAlert(data.error,
                        'rgba(255, 82, 82, 0.3)', 'rgb(122, 0, 0)', 'vibrate');
                    hide_loading();
                }
            }
        }
    );
}



// Show short Details at top right corner after authentication
function showShortDetails() {
    $('.basic-details').html(candidate_details_json.uuid+' ('+candidate_details_json.name+')');
    $('.profile-pic').first().attr('src', candidate_details_json.profile_pic);
    $('.short-details').css('display', 'flex');
}
