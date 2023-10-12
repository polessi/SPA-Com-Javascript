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
    console.log("Dados recebidos:", req.body);
    
    // // Processar os dados e inseri-los no banco de dados, se necessário.
    
    // // Retornar uma resposta de sucesso, por exemplo:
    // res.status(200).json({
    //     message: "Dados recebidos com sucesso!"
    // });
//   await Users.create(req.body)
//     .then(() => {
//         return res.json({
//             erro: false,
//             mensagem: "Usuário cadastrado com sucesso!"
//         })
//     }).catch(() => {
//         return res.status(400).json({
//             erro: true,
//             mensagem: "Erro: Usuário não cadastrado!"
//         })
//     })

});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
})
