import React, { useState, useEffect } from "react";
const { uuid } = require("uuidv4");

import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepository(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const repository = {
      id: uuid(),
      title: "Desafio sobre conceitos de ReactJS do Bootcamp GoStack",
      url: "https://github.com/FabianoVilela/desafio-conceitos-reactjs",
      techs: ["ReactJS", "Javascript"],
    };

    const response = await api.post("/repositories", repository);

    setRepository([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepository(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
