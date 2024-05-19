import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Repositories from './components/Repositories';
import Branches from './components/Branches';
import { REPOSITORIES_URL } from './constants';

function App() {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadRepos = async () => {
      const { data } = await axios.get(REPOSITORIES_URL);
      setRepos(data);
    };

    loadRepos();
  }, []);

  return (
    <div className="App">
      <div className="Header">
        <p>Git</p>
      </div>
      {error}
      <Repositories repos={repos} setRepos={setRepos} setError={setError} />
      <Branches repos={repos} setError={setError} />
    </div>
  );
}

export default App;
