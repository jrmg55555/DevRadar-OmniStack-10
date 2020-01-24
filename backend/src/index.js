const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const http = require("http");
const { setupWebsocket } = require("./websocket");

const app = express();

const server = http.Server(app);

setupWebsocket(server);

mongoose.connect(
  "mongodb+srv://jrmg:j5r5m5g5@cluster0-ly05g.mongodb.net/teste?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(cors());
app.use(express.json());
//Métodos HTTP: GET, POST, PUT, DELETE

//Parametros de requisição:
// Query: req.query - parametros da url para filtrar ou ordenar ou paginar dados
// Route: req.params - direto na rota sem nome - para informar um recurso específico ex.: Id usuário para edição/deleção
// Body: req.body - comumente utilizado para enviar dados para criar/editar recursos (insert no banco)
app.use(routes);
server.listen(3333);
