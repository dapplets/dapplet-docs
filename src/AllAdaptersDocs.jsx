import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdapterDocs from '/src/AdapterDocs.jsx';

const url = '/json/adapters.json';
let counter = 0;

export default function AllAdaptersDocs() {
  const [adapters, getAdapters] = useState(false);
  const [currentAdapter, setCurrentAdapter] = useState('');

  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();

  const setData = async () => {
    try {
      const { data } = await axios.get(url, {
        headers: { 'Content-Type': 'application/json' },
        cancelToken: source.token,
      });
      getAdapters(data);
    } catch (err) {
      if (axios.isCancel(err)) {
        return "axios request cancelled";
      }
      return err;
    }
  };

  useEffect(() => {
    if (adapters === false) setData();
    return () => source.cancel();
  });

  const handleChoose = (choosenAdapter) => (e) => {
    e.preventDefault();
    setCurrentAdapter(choosenAdapter);
  };

  return (
    <>
      {adapters && (currentAdapter === '' ? (
        <>
          <h1>Community adapters</h1>
          <ul>
            {Object.entries(adapters).map(([name, value]) => (
              <li value={name} key={counter++}>
                <h4>{value.title}:</h4>
                <ul>
                  <li>{name}</li>
                  <li><i>versions: </i>{value.versions.map((ver) => <button
                    onClick={handleChoose({ name: name, title: value.title, currentVer: ver.version })}
                    key={counter++}
                    className="custom-btn"
                  >
                    {`${ver.version.slice(1).split('_').join('.')}`}
                  </button>)}</li>
                </ul>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <button className="custom-btn" onClick={handleChoose('')}>‹ Back to adapters list</button>
          <AdapterDocs
            name={currentAdapter.name}
            title={currentAdapter.title}
            currentVer={currentAdapter.currentVer}
          />
        </>
      ))}
    </>
  );
}
