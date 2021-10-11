/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState, useContext } from 'react';
import Layout from '@theme/Layout';
import { VersionAdapter, VersionAdapterProvider } from '../context/VersionAdapter.context';

const NotFound = () => {
  // const [location, setLocation] = useState(window.location.href)
  // const { version } = useContext(VersionAdapter);

  // useEffect(() => {
  //   console.log('version:', version);


  //   if (location.includes('adapters-docs-list')) {
  //     // const baseUrl = '/docs/adapters-docs-list/';

  //     // window.location.href = baseUrl;

  //     // console.log(location);
  //   }

  // }, []);

  return (
    <Layout title="Page Not Found">
      <main className="container margin-vert--xl">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <h1 className="hero__title">Page Not Found</h1>
            <p>We could not find what you were looking for.</p>
            <p>
              Please contact the owner of the site that linked you to the
              original URL and let them know their link is broken.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default NotFound;