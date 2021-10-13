import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdapterDocVersion from '/src/AdapterDocVersion.jsx';

const url = '/json/adapters.json';
let counter = 0;

export default function AdapterDocs(props) {
  const [versions, getVersions] = useState([false]);
  const [currentVer, setCurrentVer] = useState(versions[0]);

  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();

  const setData = async () => {
    try {
      const { data } = await axios.get(url, {
        headers: { 'Content-Type': 'application/json' },
        cancelToken: source.token,
      });
      getVersions(data[props.name].versions);
      const curVer = props.currentVer
        ? data[props.name].versions.find((v) => v.version === props.currentVer)
        : data[props.name].versions[0];
      setCurrentVer(curVer);
    } catch (err) {
      if (axios.isCancel(err)) {
        return "axios request cancelled";
      }
      return err;
    }
  };

  useEffect(() => {
    if (currentVer === false) setData();

    return () => {
      source.cancel();
    };
  });

  const handleChange = (e) => {
    e.preventDefault();
    const selectedVersion = versions.find((ver) => ver.version === e.target.value);
    setCurrentVer(selectedVersion);
  };

  return (
    <>{currentVer && <>
      <h1>{props.title}</h1>
      <select
        className="custom-btn selector-btn"
        value={currentVer.version}
        onChange={handleChange}
      >
        {versions.map((ver) => (
          <option value={`${ver.version}`} key={counter++}>
            ver. {`${ver.version.slice(1).split('_').join('.')}`}
          </option>
        ))}
      </select>
      <div className={`adVersion ${currentVer.version}`} key={counter++}>
        <AdapterDocVersion url={currentVer.link} />
      </div>
    </>}</>
  );
}
