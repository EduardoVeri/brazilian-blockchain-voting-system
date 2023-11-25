$(document).ready(function(){
    hide_loading();
    $('#loginForm').on('submit', function(e){
        e.preventDefault(); // Impede o envio padrão do formulário

        var username = $(this).find('input[name="username"]').val();
        var password = $(this).find('input[name="password"]').val();

        // Enviar dados para o servidor para autenticação
        $.ajax({
            url: '/signin/', // A URL da sua view de login
            method: 'GET',
            data: {
                'username': username,
                'password': password,
                'csrfmiddlewaretoken': $('input[name="csrfmiddlewaretoken"]').val() // Token CSRF
            },
            success: function(response){
                if(response.success){
                    openModalWithContent(); // Redirecionar para a página após login
                } else {
                    $('.error').text('Invalid username or password');
                }
            }
        });
    });
});

function openModalWithContent() {
    var modalContent = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="create-data-wrapper">
                <div>
                    <input type="checkbox" id="createRandomVoters" checked>
                    <span>Create Random Voters</span>
                </div>
                <div>
                    <input type="checkbox" id="createPoliticianParties" checked>
                    <span>Create Politician Parties</span>
                </div>
                <div>
                    <input type="checkbox" id="castRandomVote" checked>
                    <span>Cast Vote Randomly</span>
                </div>
                <div class="submit-button">Create Dummy Data</div>
                <div class="danger-note">NOTE: All previous data will be deleted. Uncheck all, if you want to only delete old data.</div>
            </div>
        </div>`;

    var modal = $('<div class="modal">' + modalContent + '</div>');

    $('body').append(modal);
    modal.show();

    // Evento para fechar o modal
    modal.find('.close-modal').on('click', function() {
        modal.remove();
    });
}
