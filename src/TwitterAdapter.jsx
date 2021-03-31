import React, { useEffect, useState } from 'react';
import AtV050 from '/docs/at-v0.5.0.mdx';
import CreateAdapter from '/src/CreateAdapter.jsx';

export default function TwitterAdapter() {
  const [ver, setVer] = useState('atV051');

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
        <option value="atV051">ver. 0.5.1</option>
        <option value="atV050">ver. 0.5.0</option>
      </select>

      <div className="adVersion atV051" hidden={true}>
        <CreateAdapter url="/src/atV051.json" />
      </div>
      <div className="adVersion atV050" hidden={true}>
        <AtV050/>
      </div>
    </>
  );
}
