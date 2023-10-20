/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import AnnouncementBar from '@theme/AnnouncementBar'
import Footer from '@theme/Footer'
import useKeyboardNavigation from '@theme/hooks/useKeyboardNavigation'
import LayoutProviders from '@theme/LayoutProviders'
import LayoutHead from '@theme/LayoutHead'
import Navbar from '@theme/Navbar'
import SkipToContent from '@theme/SkipToContent'
import clsx from 'clsx'
import React from 'react'
import './styles.css'

function Layout(props) {
  const { children, noFooter, wrapperClassName } = props
  useKeyboardNavigation()
  return (
    <LayoutProviders>
      <Navbar />
      <LayoutHead {...props} />
      <SkipToContent />
      <AnnouncementBar />
      <div className={clsx('main-wrapper', wrapperClassName)}>{children}</div>
      {!noFooter && <Footer />}
    </LayoutProviders>
  )
}

export default Layout
