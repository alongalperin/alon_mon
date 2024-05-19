import { useState, useEffect } from 'react';
import axios from 'axios';
import Commits from './Commits';

import { BRANCHES_URL } from '../constants';

const Branches = ({ repos, setError }) => {
  const [newBranch, setNewBranch] = useState('');
  const [branches, setBranches] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');

  const handleChangeRepo = (e) => {
    const repo = e.target.value;
    setSelectedRepo(repo);
  };

  const handleBranchClick = (branch) => {
    setSelectedBranch(branch);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${BRANCHES_URL}/${selectedRepo}`, {
        branch: newBranch,
      });
      setBranches((prevBranches) => {
        return [...prevBranches, newBranch];
      });
      setNewBranch('');
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const loadBranches = async () => {
      if (!selectedRepo || selectedRepo === 'Select Repo') {
        setBranches([]);
        return;
      }

      const { data } = await axios.get(`${BRANCHES_URL}/${selectedRepo}`);
      setBranches(data);
    };
    loadBranches();
  }, [selectedRepo]);

  return (
    <div>
      <h3>Branches</h3>
      <div>
        <input
          value={newBranch}
          onChange={(e) => setNewBranch(e.target.value)}
          type="text"
        ></input>
        <button onClick={handleSubmit}>submit</button>
      </div>
      <select value={selectedRepo} onChange={handleChangeRepo}>
        <option key="select-repo">Select Repo</option>
        {repos.map((repo) => {
          return <option key={repo}>{repo}</option>;
        })}
      </select>
      {branches.map((branch) => {
        return (
          <p
            key={branch}
            onClick={() => {
              handleBranchClick(branch);
            }}
            className={branch === selectedBranch ? 'selected-branch' : null}
          >
            {branch}
          </p>
        );
      })}
      <Commits
        repo={selectedRepo}
        branch={selectedBranch}
        setError={setError}
      />
    </div>
  );
};

export default Branches;
