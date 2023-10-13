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

        /// Cria um ícone "Editar"
        const editIcon = document.createElement('i');
        editIcon.className = 'fa fa-pencil-square-o text-primary d-flex align-items-center'; // Use a classe 'd-flex' e 'align-items-center' para centralizar o texto verticalmente
        editIcon.setAttribute('aria-hidden', 'true');
        editIcon.addEventListener('click', () => {
            // Coloque o código para a ação de edição aqui
            console.log('Editar', item.idUsers);
        });
        newRow.insertCell(7).appendChild(editIcon);

        // Cria um ícone "Deletar"
        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fa fa-trash text-danger d-flex align-items-center'; // Use a classe 'd-flex' e 'align-items-center' para centralizar o texto verticalmente
        deleteIcon.setAttribute('aria-hidden', 'true');
        deleteIcon.addEventListener('click', () => {
            // Coloque o código para a ação de exclusão aqui
            console.log('Deletar', item.idUsers);
        });
        newRow.insertCell(8).appendChild(deleteIcon);


    });
}

