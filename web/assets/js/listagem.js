// Função para buscar os cadastros
function buscarCadastros() {
    setTimeout(function () {
        fetch('http://localhost:8080/buscaCadastros')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro na requisição');
                }
                return response.json();
            })
            .then((data) => {
                criarTabela(data);
            })
            .catch((error) => {
                console.error('Erro ao buscar cadastros:', error);
            });
    }, 100);
}

// Função para criar a tabela com os resultados
function criarTabela(data) {
    const tabelaCadastros = document.getElementById('tabelaCadastros');
    const tbody = tabelaCadastros.getElementsByTagName('tbody')[0];

    // Limpe a tabela removendo todo o conteúdo existente
    tbody.innerHTML = '';

    data.forEach((item, index) => {
        const newRow = tbody.insertRow(index);

        //Cria as linhas da tabela com os dados cadastrados
        newRow.insertCell(0).innerText = item.idUsers;
        newRow.insertCell(1).innerText = item.cpf;
        newRow.insertCell(2).innerText = item.nome;
        newRow.insertCell(3).innerText = item.sobrenome;
        newRow.insertCell(4).innerText = item.dataNascimento;
        newRow.insertCell(5).innerText = item.email;
        newRow.insertCell(6).innerText = item.genero;

        // Cria um ícone "Editar"
        const editIcon = document.createElement('i');
        editIcon.className = 'fa fa-pencil-square-o text-primary d-flex align-items-center cursor-pointer';
        editIcon.setAttribute('aria-hidden', 'true');
        editIcon.addEventListener('click', () => {
            // Quando o ícone "Editar" é clicado, chame a função para abrir o modal de edição
            abrirModalDeEdicao(item);
        });
        newRow.insertCell(7).appendChild(editIcon)

        // Cria um ícone "Deletar"
        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fa fa-trash text-danger';
        deleteIcon.setAttribute('aria-hidden', 'true');
        deleteIcon.addEventListener('click', () => {
            // Coloque o código para a ação de exclusão aqui
            console.log('Deletar', item.idUsers);
        });
        newRow.insertCell(8).appendChild(deleteIcon)
    });
}

//Abrir modal editar
function abrirModalDeEdicao(cadastro) {
    // Abra o modal de edição
    $('#editarModal').modal('show');

    // Preencha os campos do formulário de edição com os dados do cadastro
    document.getElementById('cpf').value = cadastro.cpf;
    document.getElementById('nome').value = cadastro.nome;
    document.getElementById('sobrenome').value = cadastro.sobrenome;
    document.getElementById('dataNascimento').value = cadastro.dataNascimento;
    document.getElementById('email').value = cadastro.email;
    document.getElementById('genero').value = cadastro.genero;

    // Adicione um identificador ao botão "Salvar Alterações" para saber que se trata de uma edição
    const botaoSalvar = document.getElementById('botaoSalvar');
    botaoSalvar.setAttribute('data-edit-id', cadastro.idUsers);

    // Adicione um evento de clique ao botão "Salvar Alterações" para chamar a função de atualização
    botaoSalvar.addEventListener('click', () => {
        const idUser = botaoSalvar.getAttribute('data-edit-id');
        const cpf = document.getElementById('cpf').value;
        const nome = document.getElementById('nome').value;
        const sobrenome = document.getElementById('sobrenome').value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        const email = document.getElementById('email').value;
        const genero = document.getElementById('genero').value;

        // Crie um objeto com os dados de atualização
        const dadosDeAtualizacao = {
            cpf,
            nome,
            sobrenome,
            dataNascimento,
            email,
            genero
        };

        // Chame a função de atualização
        alterarDados(idUser, dadosDeAtualizacao);
    });
}

//chamada da api para alterar os dados
function alterarDados(userId, dadosDeAtualizacao) {
    fetch(`http://localhost:8080/atualizar/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosDeAtualizacao)
    })
        .then(response => response.json())
        .then(data => {
            if (data.erro === false) {
                // Feche o modal
                $('#editarModal').modal('hide');

                // Atualize os dados na tabela
                buscarCadastros();

                // Limpe os campos do formulário
                document.getElementById('cpf').value = '';
                document.getElementById('nome').value = '';
                document.getElementById('sobrenome').value = '';
                document.getElementById('dataNascimento').value = '';
                document.getElementById('email').value = '';
                document.getElementById('genero').value = '';
            }
        })
        .catch(error => {
            console.error('Erro na solicitação para atualizar usuário:', error);
        });
}