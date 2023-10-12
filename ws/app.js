const express = require('express');
const app = express();
const cors = require('cors');
const Users = require('./models/User');

app.use(express.json());
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
    res.send("Página Inicial");
})

app.post("/cadastrar", async (req, res) => {
    try {
        const dadosRecebidos = req.body;
        console.log(dadosRecebidos);

        if (!dadosRecebidos.cpf ||
            !dadosRecebidos.nome ||
            !dadosRecebidos.sobrenome ||
            !dadosRecebidos.dataNascimento ||
            !dadosRecebidos.email ||
            !dadosRecebidos.genero
        ) {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Preencha todos os campos."
            });
        }

        await Users.create(req.body)
            .then(() => {
                return res.json({
                    erro: false,
                    mensagem: "Usuário cadastrado com sucesso!"
                });
            })
            .catch((error) => {
                console.error("Erro ao criar usuário:", error);
                return res.status(400).json({
                    erro: true,
                    mensagem: "Erro: Usuário não cadastrado!"
                });
            });
    } catch (error) {
        console.error("Erro geral na rota /cadastrar:", error);
        return res.status(500).json({
            erro: true,
            mensagem: "Erro interno do servidor."
        });
    }
});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
})
