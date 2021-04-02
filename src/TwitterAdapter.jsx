import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateAdapter from '/src/CreateAdapter.jsx';

const url = '/json/adapters.json';
let counter = 0;

export default function TwitterAdapter() {
  const [versions, getData] = useState([false]);
  const [ver, setVer] = useState(versions[0]);

  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();

  const setData = async () => {
    try {
      const { data } = await axios.get(url, {
        headers: { 'Content-Type': 'application/json' },
        cancelToken: source.token,
      });
      getData(data);
      setVer(data[0]);
    } catch (err) {
      if (axios.isCancel(err)) {
        return "axios request cancelled";
      }
      return err;
    }
  };

  useEffect(() => {
    if (ver === false) setData();
    return () => source.cancel();
  });

  const handleChange = (e) => {
    e.preventDefault();
    const selectedVersion = versions.find((version) => version.name === e.target.value);
    setVer(selectedVersion);
  };

  return (
    <>{ver && <>
      <select
        className="versionSelector"
        value={ver.name}
        onChange={handleChange}
      >            
        {versions.map((version) => (
          <option value={`${version.name}`} key={counter++}>
            ver. {`${version.name.slice(1).split('_').join('.')}`}
          </option>
        ))}
      </select>
      <div className={`adVersion ${ver.name}`} key={counter++}>
        <CreateAdapter url={ver.link} />
      </div>
    </>}</>
  );
}
