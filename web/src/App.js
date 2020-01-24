import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import "./Main.css";
import "./global.css";
import "./App.css";
import api from "./services/api";
import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";

//Componente - é uma função/classe que retorna conteudo html/css/js para interface
//bloco isolado de código que não interfere o restante da aplicação
//Propriedade - Informações que um componente PAI passa para o componente FILHO
//vê-se no código semelhante aos atributos do html
//Estado - Informações mantidas pelo componente (Lembrar do conceito de imutabilidade);

//!!navigator.geolocation.getCurrentPosition!!

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("devs");
      setDevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post("/devs", data);

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
