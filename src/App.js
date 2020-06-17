import React, { useState, useEffect } from 'react';

import './styles.css';
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  const newRepository = {
    title: 'Desafio GoStack',
    techs: ['Node.js', 'ReactJS', 'React Native'],
    url: 'https://github.com/akruel/desafio-gostack-conceitos-nodejs',
  };

  useEffect(() => {
    api
      .get('repositories')
      .then((response) => {
        const repositories = response.data;
        console.log(repositories);
        setRepositories(repositories);
      })
      .catch((error) => console.error(error));
  }, []);

  async function handleAddRepository() {
    api
      .post('repositories', newRepository)
      .then((response) => {
        console.log(response);
        if (response.status) {
          setRepositories([...repositories, response.data]);
        }
      })
      .catch((error) => console.error(error));
  }

  async function handleRemoveRepository(id) {
    api
      .delete(`repositories/${id}`)
      .then((response) => {
        if (response.status) {
          const newRepositories = repositories.filter(
            (repository) => repository.id !== id,
          );
          setRepositories(newRepositories);
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
