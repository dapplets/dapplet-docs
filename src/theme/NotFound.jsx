/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useHistory } from '@docusaurus/router';
import Layout from '@theme/Layout';

const NotFound = () => {
  const [isAdapter, setIsAdapter] = useState(true);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const pathname = location.pathname.includes('adapters-docs-list');

    if (pathname) return history.push('/docs/adapters-docs-list');

    setIsAdapter(false);
  }, []);

  return isAdapter
    ? null
    : (
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
    )
}

export default NotFound;