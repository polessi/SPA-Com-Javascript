//RESETAR FORMULÁRIO QUANDO CLICAR NO BUTTON "RECOMEÇAR"
function recomecarBtnForm() {
    // console.log('aqui');
    const form = document.getElementById('myForm'); // ID do formulário
    form.reset(); // Redefinir o formulário
}

//ENVIAR DADOS DO FORMULÁRIO PARA API
function enviarForm() {
    const cpf = document.getElementById('cpf').value;
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const email = document.getElementById('email').value;
    const genero = document.getElementById('genero').value;

    // const formData = {cpf, nome, sobrenome, dataNascimento, email, genero};
    const formData = JSON.stringify({ cpf, nome, sobrenome, dataNascimento, email, genero });

    const mensagemErroElement = document.getElementById('mensagemErro');
    const mensagemSucessoElement = document.getElementById('mensagemSucesso');
    
    mensagemErroElement.style.display = 'none'; // Ocultar mensagem de erro inicialmente
    mensagemSucessoElement.style.display = 'none'; // Ocultar mensagem de sucesso inicialmente

    fetch('http://localhost:8080/cadastrar', {
        method: 'POST',
        body: formData,
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                // Exibir mensagem de erro no formulário
                mensagemErroElement.textContent = data.mensagem;
                mensagemErroElement.style.display = 'block';
            } else {
                // Exibir mensagem de sucesso no formulário
                mensagemSucessoElement.textContent = data.mensagem;
                mensagemSucessoElement.style.display = 'block';
                recomecarBtnForm();
            }
        })
        .catch(error => {
            console.error('Erro ao enviar os dados para o servidor:', error);
        });
}