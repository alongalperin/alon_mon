import { useState, useEffect } from 'react';
import axios from 'axios';

import { REPOSITORIES_URL } from '../constants';

const Repositories = ({ repos, setRepos, setError }) => {
  const [newRepo, setNewRepo] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post(REPOSITORIES_URL, {
        name: newRepo,
      });
      setNewRepo((prevRepos) => {
        return [...prevRepos, newRepo];
      });
      setNewRepo('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h3>Repositories</h3>
      <div>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          type="text"
        ></input>
        <button onClick={handleSubmit}>submit</button>
      </div>
      {repos.map((repo) => (
        <p key={repo}>{repo}</p>
      ))}
    </div>
  );
};

export default Repositories;
