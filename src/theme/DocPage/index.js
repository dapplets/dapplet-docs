/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import renderRoutes from '@docusaurus/renderRoutes'
import { matchPath } from '@docusaurus/router'
import { docVersionSearchTag } from '@docusaurus/theme-common'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { MDXProvider } from '@mdx-js/react'
import DocSidebar from '@theme/DocSidebar'
import IconArrow from '@theme/IconArrow'
import Layout from '@theme/Layout'
import MDXComponents from '@theme/MDXComponents'
import NotFound from '@theme/NotFound'
import clsx from 'clsx'
import React, { useCallback, useState } from 'react'
import styles from './styles.module.css'

function DocPageContent({ currentDocRoute, versionMetadata, children }) {
  const { siteConfig, isClient } = useDocusaurusContext()
  const { pluginId, permalinkToSidebar, docsSidebars, version } = versionMetadata
  const sidebarName = permalinkToSidebar[currentDocRoute.path]
  const sidebar = docsSidebars[sidebarName]
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false)
  const [hiddenSidebar, setHiddenSidebar] = useState(false)
  const toggleSidebar = useCallback(() => {
    if (hiddenSidebar) {
      setHiddenSidebar(false)
    }

    setHiddenSidebarContainer(!hiddenSidebarContainer)
  }, [hiddenSidebar])
  return (
    <Layout
      key={isClient}
      searchMetadatas={{
        version,
        tag: docVersionSearchTag(pluginId, version),
      }}
    >
      <div className={styles.docPage}>
        {sidebar && (
          <div
            className={clsx(styles.docSidebarContainer, {
              [styles.docSidebarContainerHidden]: hiddenSidebarContainer,
            })}
            onTransitionEnd={(e) => {
              if (!e.currentTarget.classList.contains(styles.docSidebarContainer)) {
                return
              }

              if (hiddenSidebarContainer) {
                setHiddenSidebar(true)
              }
            }}
            role="complementary"
          >
            <DocSidebar
              key={
                // Reset sidebar state on sidebar changes
                // See https://github.com/facebook/docusaurus/issues/3414
                sidebarName
              }
              sidebar={sidebar}
              path={currentDocRoute.path}
              sidebarCollapsible={siteConfig.themeConfig?.sidebarCollapsible ?? true}
              onCollapse={toggleSidebar}
              isHidden={hiddenSidebar}
            />

            {hiddenSidebar && (
              <div
                className={styles.collapsedDocSidebar}
                title="Expand sidebar"
                aria-label="Expand sidebar"
                tabIndex={0}
                role="button"
                onKeyDown={toggleSidebar}
                onClick={toggleSidebar}
              >
                <IconArrow />
              </div>
            )}
          </div>
        )}
        <main className={styles.docMainContainer}>
          <div
            className={clsx('container padding-vert--lg', styles.docItemWrapper, {
              [styles.docItemWrapperEnhanced]: hiddenSidebarContainer,
            })}
          >
            <MDXProvider components={MDXComponents}>{children}</MDXProvider>
          </div>
        </main>
      </div>
    </Layout>
  )
}

function DocPage(props) {
  const {
    route: { routes: docRoutes },
    versionMetadata,
    location,
  } = props
  const currentDocRoute = docRoutes.find((docRoute) => matchPath(location.pathname, docRoute))

  if (!currentDocRoute) {
    return <NotFound {...props} />
  }

  return (
    <DocPageContent currentDocRoute={currentDocRoute} versionMetadata={versionMetadata}>
      {renderRoutes(docRoutes)}
    </DocPageContent>
  )
}

export default DocPage
