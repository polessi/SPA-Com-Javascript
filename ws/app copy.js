const express = require('express');
const app = express();
const cors = require('cors');
const Users = require('./models/User');

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    res.send("Página Inicial");
})

app.post("/cadastrar", async (req, res) => {
    try {
        const dadosRecebidos = req.body;
        console.log(dadosRecebidos);

        // Verificar se algum campo está vazio
        if (
            !dadosRecebidos.cpf ||
            !dadosRecebidos.nome ||
            !dadosRecebidos.sobrenome ||
            !dadosRecebidos.dataNascimento ||
            !dadosRecebidos.email ||
            !dadosRecebidos.genero
        ) {
            return res.json({
                erro: true,
                mensagem: "Erro: Preencha todos os campos."
            });
        }

        await Users.create(req.body)
            .then(() => {
                return res.json({
                    erro: false,
                    mensagem: "Usuário cadastrado com sucesso!"
                })
            }).catch(() => {
                return res.json({
                    erro: true,
                    mensagem: "Erro: Usuário não cadastrado!"
                })
            })

        // res.json({ mensagem: 'Dados recebidos com sucesso' }); 

    } catch (error) {
        res.json({ mensagem: 'Erro ao processar os dados' });
    }
});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
})
