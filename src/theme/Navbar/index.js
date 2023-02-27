/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useThemeConfig } from '@docusaurus/theme-common'
import useHideableNavbar from '@theme/hooks/useHideableNavbar'
import useLockBodyScroll from '@theme/hooks/useLockBodyScroll'
import useThemeContext from '@theme/hooks/useThemeContext'
import useWindowSize, { windowSizes } from '@theme/hooks/useWindowSize'
import IconMenu from '@theme/IconMenu'
import Logo from '@theme/Logo'
import NavbarItem from '@theme/NavbarItem'
import SearchBar from '@theme/SearchBar'
import Toggle from '@theme/Toggle'
import clsx from 'clsx'
import React, { useCallback, useEffect, useState } from 'react'
import { headerSocials } from '../../../config-links/header'
import SearchIcon from '../../components/icons/Search'
import styles from './styles.module.css' // retrocompatible with v1

const DefaultNavItemPosition = 'right' // If split links by left/right
// if position is unspecified, fallback to right (as v1)

function splitNavItemsByPosition(items) {
  const leftItems = items.filter((item) => (item.position ?? DefaultNavItemPosition) === 'left')
  const rightItems = items.filter((item) => (item.position ?? DefaultNavItemPosition) === 'right')
  return {
    leftItems,
    rightItems,
  }
}

function Navbar() {
  const {
    navbar: { items, hideOnScroll, style },
    colorMode: { disableSwitch: disableColorModeSwitch },
  } = useThemeConfig()
  const [sidebarShown, setSidebarShown] = useState(false)
  const [isSearchBarExpanded, setIsSearchBarExpanded] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const { isDarkTheme, setLightTheme, setDarkTheme } = useThemeContext()
  const { navbarRef, isNavbarVisible } = useHideableNavbar(hideOnScroll)
  useLockBodyScroll(sidebarShown)
  const showSidebar = useCallback(() => {
    setSidebarShown(true)
  }, [setSidebarShown])
  const hideSidebar = useCallback(() => {
    setSidebarShown(false)
  }, [setSidebarShown])
  const onToggleChange = useCallback(
    (e) => (e.target.checked ? setDarkTheme() : setLightTheme()),
    [setLightTheme, setDarkTheme]
  )
  const windowSize = useWindowSize()
  useEffect(() => {
    if (windowSize === windowSizes.desktop) {
      setSidebarShown(false)
    }
  }, [windowSize])
  const { leftItems, rightItems } = splitNavItemsByPosition(items)

  const onMouseOver = (event) => {
    if (event.target.classList.contains('home-hover-menu')) {
      setIsHover(true)
    }
  }

  const onMouseOut = (event) => {
    if (event.target.classList.contains('home-hover-menu')) {
      setIsHover(false)
    }
  }

  return (
    <nav
      ref={navbarRef}
      className={clsx('navbar', 'navbar--fixed-top', {
        'navbar--dark': style === 'dark',
        'navbar--primary': style === 'primary',
        'navbar-sidebar--show': sidebarShown,
        [styles.navbarHideable]: hideOnScroll,
        [styles.navbarHidden]: !isNavbarVisible,
        'home-hover-menu-show': isHover,
      })}
    >
      <div className="navbar__inner">
        <div className="navbar__items">
          {items != null && items.length !== 0 && (
            <div
              aria-label="Navigation bar toggle"
              className="navbar__toggle"
              role="button"
              tabIndex={0}
              onClick={showSidebar}
              onKeyDown={showSidebar}
            >
              <IconMenu />
            </div>
          )}
          <Logo
            className="navbar__brand"
            imageClassName="navbar__logo"
            titleClassName={clsx('navbar__title', {
              [styles.hideLogoText]: isSearchBarExpanded,
            })}
          />
          {leftItems.map((item, i) => (
            <NavbarItem {...item} key={i} />
          ))}
        </div>
        <div className="navbar__items navbar__items--right">
          {rightItems.map((item, i) => (
            <NavbarItem {...item} key={i} onMouseOver={onMouseOver} onMouseOut={onMouseOut} />
          ))}
          {!disableColorModeSwitch && (
            <Toggle
              className={styles.displayOnlyInLargeViewport}
              aria-label="Dark mode toggle"
              checked={isDarkTheme}
              onChange={onToggleChange}
            />
          )}
          <SearchBar
            handleSearchBarToggle={setIsSearchBarExpanded}
            isSearchBarExpanded={isSearchBarExpanded}
          />
        </div>
      </div>

      <div role="presentation" className="navbar-sidebar__backdrop" onClick={hideSidebar} />
      <div className="navbar-sidebar">
        <div className="navbar-sidebar__brand">
          <Logo
            className="navbar__brand"
            imageClassName="navbar__logo"
            titleClassName="navbar__title"
            onClick={hideSidebar}
          />
          {!disableColorModeSwitch && sidebarShown && (
            <Toggle
              aria-label="Dark mode toggle in sidebar"
              checked={isDarkTheme}
              onChange={onToggleChange}
            />
          )}
        </div>
        <div className="navbar-sidebar__items">
          <div className="menu">
            <ul className="menu__list">
              {items.map((item, i) => (
                <NavbarItem mobile {...item} onClick={hideSidebar} key={i} />
              ))}
            </ul>
          </div>
        </div>
      </div>

      <ul className="header-custom-socials">
        {headerSocials.map(({ id, component, href, title }) => {
          return (
            <li key={id} className="header-custom-social" title={title}>
              <a href={href} target="_blank" rel="noreferrer">
                {component}
              </a>
            </li>
          )
        })}
      </ul>

      <button className="header-custom-search">
        <SearchIcon />
      </button>

      {/* CUSTOM START */}
      <div className="header-custom-nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <a
              href="https://dapplets.org/under-construction.html"
              className="header__nav-link"
              target="_blank"
              rel="noreferrer"
            >
              Store
            </a>
          </li>
          <li className="header__nav-item">
            <a
              href="https://dapplets.org/developers.html"
              className="header__nav-link"
              target="_blank"
              rel="noreferrer"
            >
              Developers
            </a>
          </li>
          <li className="header__nav-item">
            <a
              href="https://dapplets.org/join-us.html"
              className="header__nav-link"
              target="_blank"
              rel="noreferrer"
            >
              Join Us
            </a>
          </li>
          <li className="header__nav-item">
            <a
              href="https://blog.dapplets.org/"
              className="header__nav-link"
              target="_blank"
              rel="noreferrer"
            >
              Blog
            </a>
          </li>
          <li className="header__nav-item">
            <a
              href="https://dapplets.org/about.html"
              className="header__nav-link"
              target="_blank"
              rel="noreferrer"
            >
              About
            </a>
          </li>
        </ul>
      </div>
      {/* CUSTOM END */}
    </nav>
  )
}

export default Navbar
