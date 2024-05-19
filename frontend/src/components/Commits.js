import { useState, useEffect } from 'react';
import axios from 'axios';

import { COMMITS_URL } from '../constants';

const Commits = ({ repo, branch, setError }) => {
  const [commits, setCommits] = useState([]);
  const [filename, setFilename] = useState('');
  const [fileContents, setFileContents] = useState('');
  const [commitMessage, setCommitMessage] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post(COMMITS_URL, {
        repo,
        branch,
        filename,
        fileContents,
        commitMessage,
      });
      //   setBranches((prevBranches) => {
      //     return [...prevBranches, newBranch];
      //   });
      setFilename('');
      setFileContents('');
      setCommitMessage('');
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const loadCommits = async () => {
      console.log({ repo, branch });
      if (!branch || !repo) return;
      console.log(`${COMMITS_URL}?repo=${repo}&branch=${branch}`);
      const { data } = await axios.get(
        `${COMMITS_URL}?repo=${repo}&branch=${branch}`
      );
      setCommits(data);
    };
    loadCommits();
  }, [branch]);

  return (
    <div>
      <h3>Commits</h3>
      <div>
        <div>
          <label>File name</label>
          <input
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            type="text"
          ></input>
        </div>
        <div>
          <label>File contents</label>
          <input
            value={fileContents}
            onChange={(e) => setFileContents(e.target.value)}
            type="text"
          ></input>
        </div>
        <div>
          <label>Commit message</label>
          <input
            value={commitMessage}
            onChange={(e) => setCommitMessage(e.target.value)}
            type="text"
          ></input>
        </div>
        <button onClick={handleSubmit}>submit</button>
        <div>
          Files added:
          {commits.map((commit) => {
            return <p key={commit}>{commit}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Commits;
