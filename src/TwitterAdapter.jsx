import React, { useEffect, useState } from 'react';
import AtV050 from '/docs/at-v0.5.0.mdx';
import CreateAdapter from '/src/CreateAdapter.jsx';

let counter = 0;

const versions = [
  { name: 'v0_5_2', link: '/json/atV052.json' },
  { name: 'v0_5_1', link: '/json/atV051.json' }
];

export default function TwitterAdapter() {
  const [ver, setVer] = useState(versions[0].name);

  const handleChange = (e) => {
    e.preventDefault();
    setVer(e.target.value);
  };

  useEffect(() => {
    const versions = document.querySelectorAll('.adVersion');
    versions.forEach(v => {
      v.hidden = true;
    });
    const currentV = document.querySelector(`.${ver}`);
    currentV.hidden = false;
  }, [ver]);

  return (
    <>
      <select
        className="versionSelector"
        value={ver}
        onChange={handleChange}
      >            
        {versions.map((version) => (
          <option value={`${version.name}`} key={counter++}>
            ver. {`${version.name.slice(1).split('_').join('.')}`}
          </option>
        ))}
        <option value="atV050">ver. 0.5.0</option>
      </select>
      {versions.map((version) => (
        <div className={`adVersion ${version.name}`} hidden={true} key={counter++}>
          <CreateAdapter url={version.link} />
        </div>
      ))}
      <div className="adVersion atV050" hidden={true}>
        <AtV050/>
      </div>
    </>
  );
}
