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

    // Limpar a tabela removendo todo o conteúdo existente
    tbody.innerHTML = '';

    data.forEach((item, index) => {
        const newRow = tbody.insertRow(index);

        //Criar as linhas da tabela com os dados cadastrados
        newRow.insertCell(0).innerText = item.idUsers;
        newRow.insertCell(1).innerText = item.cpf;
        newRow.insertCell(2).innerText = item.nome;
        newRow.insertCell(3).innerText = item.sobrenome;
        newRow.insertCell(4).innerText = item.dataNascimento;
        newRow.insertCell(5).innerText = item.email;
        newRow.insertCell(6).innerText = item.genero;

        // Criar um ícone "Editar"
        const editIcon = document.createElement('i');
        editIcon.className = 'fa fa-pencil-square-o text-primary cursor-pointer';
        editIcon.setAttribute('aria-hidden', 'true');
        editIcon.addEventListener('click', () => {
            // Quando o ícone "Editar" é clicado, chamar a função para abrir o modal de edição
            abrirModalDeEdicao(item);
        });
        newRow.insertCell(7).appendChild(editIcon)

        // Criar um ícone "Deletar"
        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fa fa-trash text-danger cursor-pointer';
        deleteIcon.setAttribute('aria-hidden', 'true');
        deleteIcon.addEventListener('click', () => {
            // Quando o ícone "Deletar" é clicado, chamar a função para abrir o modal de edição
            abrirModalDeDelete(item);
        });
        newRow.insertCell(8).appendChild(deleteIcon)
    });
}

function abrirModalDeEdicao(cadastro) {
    
    // Abrir o modal de edição
    $('#editarModal').modal('show');

    // Preencha os campos do formulário de edição com os dados do cadastro
    document.getElementById('cpf').value = cadastro.cpf;
    document.getElementById('nome').value = cadastro.nome;
    document.getElementById('sobrenome').value = cadastro.sobrenome;
    document.getElementById('dataNascimento').value = cadastro.dataNascimento;
    document.getElementById('email').value = cadastro.email;
    document.getElementById('genero').value = cadastro.genero;

    // Adiciona um identificador ao botão "Salvar Alterações" para saber que se trata de uma edição
    const botaoSalvar = document.getElementById('botaoSalvar');
    botaoSalvar.setAttribute('data-edit-id', cadastro.idUsers);

    // Adiciona um evento de clique ao botão "Salvar Alterações" para chamar a função de atualização
    botaoSalvar.addEventListener('click', () => {
        const idUser = botaoSalvar.getAttribute('data-edit-id');
        const cpf = document.getElementById('cpf').value;
        const nome = document.getElementById('nome').value;
        const sobrenome = document.getElementById('sobrenome').value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        const email = document.getElementById('email').value;
        const genero = document.getElementById('genero').value;

        // Cria um objeto com os dados de atualização
        const dadosDeAtualizacao = {
            cpf,
            nome,
            sobrenome,
            dataNascimento,
            email,
            genero
        };

        // Chamar a função de atualização
        alterarDados(idUser, dadosDeAtualizacao);
    });
}


function abrirModalDeDelete(cadastro) {
    
    //Abrir modal delete
    $('#deleteModal').modal('show');

    // Adiciona um identificador ao botão "Sim" para saber que se trata de um delete
    const botaoDeletar = document.getElementById('botaoDeletar');
    botaoDeletar.setAttribute('data-delete-id', cadastro.idUsers);

    // Adiciona um evento de clique ao botão "Sim" para chamar a função de delete
    botaoDeletar.addEventListener('click', () => {
        const idUser = botaoDeletar.getAttribute('data-delete-id');

        // Chamar a função de delete
        deletarDados(idUser);
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
                // Fechar o modal
                $('#editarModal').modal('hide');

                // Atualizar os dados na tabela
                buscarCadastros();

                // Limpar os campos do formulário
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

//chamada da api para deletar os dados
function deletarDados(userId) {
    fetch(`http://localhost:8080/delatarCadastro/${userId}`, {
        method: 'DELETE',
    })
        .then((response) => {
            if (response.status === 204) {
                // console.log('Usuário excluído com sucesso');

                //Fechar o modal após excluir o cadastro.
                $('#deleteModal').modal('hide');

                // Atualizar os dados na tabela
                buscarCadastros();

            } else if (response.status === 404) {
                console.error('Usuário não encontrado');
            } else {
                console.error('Erro ao excluir o usuário');
            }
        })
        .catch((error) => {
            console.error('Erro na solicitação:', error);
        });
}