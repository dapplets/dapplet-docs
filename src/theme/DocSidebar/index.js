/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useThemeConfig, isSamePath } from '@docusaurus/theme-common';
import useUserPreferencesContext from '@theme/hooks/useUserPreferencesContext';
import useLockBodyScroll from '@theme/hooks/useLockBodyScroll';
import useWindowSize, { windowSizes } from '@theme/hooks/useWindowSize';
import useScrollPosition from '@theme/hooks/useScrollPosition';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import Logo from '@theme/Logo';
import IconArrow from '@theme/IconArrow';
import IconMenu from '@theme/IconMenu';
import styles from './styles.module.css';

const MOBILE_TOGGLE_SIZE = 24;

function usePrevious(value) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const isActiveSidebarItem = (item, activePath) => {
  if (item.type === 'link') {
    return isSamePath(item.href, activePath);
  }

  if (item.type === 'category') {
    return item.items.some(subItem => isActiveSidebarItem(subItem, activePath));
  }

  return false;
};

function DocSidebarItemCategory({
  item,
  onItemClick,
  collapsible,
  activePath,
  ...props
}) {
  const {
    items,
    label
  } = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const wasActive = usePrevious(isActive); // active categories are always initialized as expanded
  // the default (item.collapsed) is only used for non-active categories

  const [collapsed, setCollapsed] = useState(() => {
    if (!collapsible) {
      return false;
    }

    return isActive ? false : item.collapsed;
  });
  const menuListRef = useRef(null);
  const [menuListHeight, setMenuListHeight] = useState(undefined);

  const handleMenuListHeight = (calc = true) => {
    setMenuListHeight(calc ? `${menuListRef.current?.scrollHeight}px` : undefined);
  }; // If we navigate to a category, it should automatically expand itself


  useEffect(() => {
    const justBecameActive = isActive && !wasActive;

    if (justBecameActive && collapsed) {
      setCollapsed(false);
    }
  }, [isActive, wasActive, collapsed]);
  const handleItemClick = useCallback(e => {
    e.preventDefault();

    if (!menuListHeight) {
      handleMenuListHeight();
    }

    setTimeout(() => setCollapsed(state => !state), 100);
  }, [menuListHeight]);

  if (items.length === 0) {
    return null;
  }

  return <li className={clsx('menu__list-item', {
    'menu__list-item--collapsed': collapsed
  })} key={label}>
    <a className={clsx('menu__link', {
      'menu__link--sublist': collapsible,
      'menu__link--active': collapsible && isActive,
      [styles.menuLinkText]: !collapsible
    })} onClick={collapsible ? handleItemClick : undefined} href={collapsible ? '#!' : undefined} {...props}>
      {label}
    </a>
    <ul className="menu__list" ref={menuListRef} style={{
      height: menuListHeight
    }} onTransitionEnd={() => {
      if (!collapsed) {
        handleMenuListHeight(false);
      }
    }}>
      {items.map(childItem => <DocSidebarItem tabIndex={collapsed ? '-1' : '0'} key={childItem.label} item={childItem} onItemClick={onItemClick} collapsible={collapsible} activePath={activePath} />)}
    </ul>
  </li>;
}

function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  collapsible: _collapsible,
  ...props
}) {
  const {
    href,
    label
  } = item;
  const isActive = isActiveSidebarItem(item, activePath);
  return <li className="menu__list-item" key={label}>
    <Link className={clsx('menu__link', {
      'menu__link--active': isActive
    })} to={href} {...isInternalUrl(href) ? {
      isNavLink: true,
      exact: true,
      onClick: onItemClick
    } : {
      target: '_blank',
      rel: 'noreferrer noopener'
    }} {...props}>
      {label}
    </Link>
  </li>;
}

function DocSidebarItem(props) {
  switch (props.item.type) {
    case 'category':
      return <DocSidebarItemCategory {...props} />;

    case 'link':
    default:
      return <DocSidebarItemLink {...props} />;
  }
}

function DocSidebar({
  path,
  sidebar,
  sidebarCollapsible = true,
  onCollapse,
  isHidden
}) {
  const [showResponsiveSidebar, setShowResponsiveSidebar] = useState(false);
  const {
    navbar: {
      hideOnScroll
    },
    hideableSidebar
  } = useThemeConfig();
  const {
    isAnnouncementBarClosed
  } = useUserPreferencesContext();
  const {
    scrollY
  } = useScrollPosition();
  useLockBodyScroll(showResponsiveSidebar);
  const windowSize = useWindowSize();
  useEffect(() => {
    if (windowSize === windowSizes.desktop) {
      setShowResponsiveSidebar(false);
    }
  }, [windowSize]);
  return <div className={clsx(styles.sidebar, {
    [styles.sidebarWithHideableNavbar]: hideOnScroll,
    [styles.sidebarHidden]: isHidden
  })}>
    {hideOnScroll && <Logo tabIndex={-1} className={styles.sidebarLogo} />}
    <div className={clsx('menu', 'menu--responsive', 'thin-scrollbar', styles.menu, {
      'menu--show': showResponsiveSidebar,
      [styles.menuWithAnnouncementBar]: !isAnnouncementBarClosed && scrollY === 0
    })}>
      <button aria-label={showResponsiveSidebar ? 'Close Menu' : 'Open Menu'} aria-haspopup="true" className="button button--secondary button--sm menu__button" type="button" onClick={() => {
        setShowResponsiveSidebar(!showResponsiveSidebar);
      }}>
        {showResponsiveSidebar ? <span className={clsx(styles.sidebarMenuIcon, styles.sidebarMenuCloseIcon)}>
          &times;
        </span> : <IconMenu className={styles.sidebarMenuIcon} height={MOBILE_TOGGLE_SIZE} width={MOBILE_TOGGLE_SIZE} />}
      </button>

      <header className={styles.customHeader}>
        <Link to="/docs" className={styles.headerLink}>
          <div className={styles.headerLogo} />
        </Link>
      </header>

      <ul className="menu__list">
        {sidebar.map(item => <DocSidebarItem key={item.label} item={item} onItemClick={e => {
          e.target.blur();
          setShowResponsiveSidebar(false);
        }} collapsible={sidebarCollapsible} activePath={path} />)}

        {/* CUSTOM NAVBAR MOBILE BOTTOM */}
        <li className="custom-doc-sidebar-list">
          <div className="custom-doc-sidebar-wrapper">
            <ul className="custom-doc-sidebar-links">
              <li className="custom-doc-sidebar-links-item">
                <a href="https://dapplets.org/" target="_blank">Home</a>
              </li>
              <li className="custom-doc-sidebar-links-item">
                <a href="https://forum.dapplets.org/" target="_blank">Forum</a>
              </li>
            </ul>

            <ul className="custom-doc-sidebar-socials">
              <li className="custom-doc-sidebar-social" title="GitHub">
                <a href="https://github.com/dapplets" className="custom-doc-sidebar-social-link" target="_blank">
                  <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M15.7998 30C24.0841 30 30.7998 23.2843 30.7998 15C30.7998 6.71572 24.0841 -3.8147e-06 15.7998 -3.8147e-06C7.51553 -3.8147e-06 0.799805 6.71572 0.799805 15C0.799805 23.2843 7.51553 30 15.7998 30ZM3.79978 15C3.79978 8.37 9.16978 3 15.7998 3C22.4298 3 27.7998 8.37 27.7998 15C27.7991 17.5143 27.0099 19.9651 25.5434 22.0074C24.077 24.0497 22.007 25.5807 19.6248 26.385C19.0248 26.505 18.7998 26.13 18.7998 25.815C18.7998 25.6796 18.8015 25.4452 18.8037 25.1332C18.8081 24.5121 18.8148 23.5833 18.8148 22.515C18.8148 21.39 18.4398 20.67 18.0048 20.295C20.6748 19.995 23.4798 18.975 23.4798 14.37C23.4798 13.05 23.0148 11.985 22.2498 11.145C22.3698 10.845 22.7898 9.615 22.1298 7.965C22.1298 7.965 21.1248 7.635 18.8298 9.195C17.8698 8.925 16.8498 8.79 15.8298 8.79C14.8098 8.79 13.7898 8.925 12.8298 9.195C10.5348 7.65 9.52978 7.965 9.52978 7.965C8.86978 9.615 9.28978 10.845 9.40978 11.145C8.64478 11.985 8.17978 13.065 8.17978 14.37C8.17978 18.96 10.9698 19.995 13.6398 20.295C13.2948 20.595 12.9798 21.12 12.8748 21.9C12.1848 22.215 10.4598 22.725 9.37978 20.91C9.15478 20.55 8.47978 19.665 7.53478 19.68C6.52978 19.695 7.12978 20.25 7.54978 20.475C8.05978 20.76 8.64478 21.825 8.77978 22.17C9.01978 22.845 9.79978 24.135 12.8148 23.58C12.8148 24.2358 12.8212 24.866 12.8256 25.304C12.828 25.5372 12.8298 25.716 12.8298 25.815C12.8298 26.13 12.6048 26.49 12.0048 26.385C7.23478 24.795 3.79978 20.31 3.79978 15Z"
                      fill="#919191" />
                  </svg>
                </a>
              </li>
              <li className="custom-doc-sidebar-social" title="Discord">
                <a href="https://discord.com/invite/YcxbkcyjMV" className="custom-doc-sidebar-social-link" target="_blank">
                  <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M15.7998 30C24.0841 30 30.7998 23.2843 30.7998 15C30.7998 6.71572 24.0841 -3.8147e-06 15.7998 -3.8147e-06C7.51553 -3.8147e-06 0.799805 6.71572 0.799805 15C0.799805 23.2843 7.51553 30 15.7998 30ZM18.9458 6.75182C20.5179 7.01766 22.0213 7.48516 23.4238 8.11766C23.436 8.12253 23.4461 8.13164 23.4522 8.14332C25.9373 11.7385 27.1638 15.7957 26.7054 20.4652C26.7043 20.475 26.7012 20.4845 26.6961 20.4931C26.6911 20.5016 26.6842 20.509 26.6761 20.5147C25.0092 21.729 23.1491 22.6529 21.1743 23.2472C21.1603 23.2514 21.1455 23.2512 21.1317 23.2466C21.1179 23.242 21.1059 23.2333 21.0973 23.2216C20.682 22.6523 20.3043 22.0528 19.9743 21.4231C19.9698 21.4144 19.9673 21.4048 19.9667 21.3951C19.9662 21.3853 19.9678 21.3756 19.9713 21.3664C19.9749 21.3573 19.9804 21.3491 19.9874 21.3423C19.9944 21.3354 20.0027 21.3302 20.0119 21.3268C20.6105 21.105 21.1807 20.8382 21.7288 20.5229C21.7386 20.5171 21.7468 20.509 21.7527 20.4992C21.7585 20.4895 21.7619 20.4784 21.7624 20.4671C21.763 20.4557 21.7607 20.4444 21.7558 20.4342C21.7509 20.4239 21.7435 20.415 21.7343 20.4083C21.6179 20.3231 21.5033 20.2342 21.3933 20.1443C21.3833 20.1363 21.3711 20.1313 21.3583 20.1298C21.3455 20.1284 21.3326 20.1305 21.3209 20.1361C17.7633 21.7531 13.8648 21.7531 10.265 20.1361C10.2534 20.1308 10.2406 20.1289 10.228 20.1305C10.2153 20.1322 10.2034 20.1372 10.1935 20.1452C10.0835 20.2342 9.96801 20.3231 9.85251 20.4083C9.84343 20.4152 9.83619 20.4242 9.83144 20.4345C9.82669 20.4449 9.82459 20.4562 9.82532 20.4676C9.82604 20.4789 9.82958 20.4899 9.8356 20.4996C9.84163 20.5093 9.84996 20.5173 9.85984 20.5229C10.4099 20.8356 10.9837 21.1047 11.5758 21.3277C11.6143 21.3424 11.6327 21.3864 11.6134 21.4231C11.2908 22.0537 10.9131 22.6542 10.4896 23.2225C10.4806 23.2337 10.4685 23.242 10.4548 23.2463C10.441 23.2505 10.4263 23.2506 10.4126 23.2463C8.44115 22.6503 6.58404 21.7269 4.91901 20.5147C4.9111 20.5086 4.9045 20.501 4.89962 20.4924C4.89473 20.4837 4.89166 20.4741 4.89059 20.4642C4.50651 16.4254 5.28843 12.3352 8.14109 8.14149C8.14812 8.13044 8.15835 8.12181 8.17043 8.11674C9.57384 7.48333 11.0772 7.01582 12.6483 6.74999C12.6625 6.74774 12.6771 6.74987 12.69 6.7561C12.7029 6.76232 12.7137 6.77234 12.7208 6.78482C12.9301 7.14986 13.1189 7.52628 13.2863 7.91232C14.9537 7.66321 16.6488 7.66321 18.3161 7.91232C18.4664 7.56399 18.6809 7.12308 18.8734 6.78482C18.8806 6.77249 18.8914 6.76269 18.9044 6.75678C18.9174 6.75087 18.9318 6.74914 18.9458 6.75182ZM10.1743 15.8232C10.1743 17.0249 11.068 18.0048 12.1515 18.0048C13.2524 18.0048 14.1288 17.0258 14.1288 15.8232C14.1462 14.6287 13.2607 13.6415 12.1515 13.6415C11.0506 13.6415 10.1743 14.6205 10.1743 15.8232ZM17.4847 15.8232C17.4847 17.0249 18.3775 18.0048 19.4619 18.0048C20.572 18.0048 21.4392 17.0258 21.4392 15.8232C21.4566 14.6287 20.5711 13.6415 19.4619 13.6415C18.3601 13.6415 17.4847 14.6205 17.4847 15.8232Z"
                      fill="#919191" />
                  </svg>
                </a>
              </li>
              <li className="custom-doc-sidebar-social" title="Telegram">
                <a href="https://t.me/dapplets" className="custom-doc-sidebar-social-link" target="_blank">
                  <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M30.7998 15C30.7998 23.2837 24.0836 30 15.7998 30C7.51606 30 0.799805 23.2837 0.799805 15C0.799805 6.71625 7.51606 -3.8147e-06 15.7998 -3.8147e-06C24.0836 -3.8147e-06 30.7998 6.71625 30.7998 15ZM16.3373 11.0737C14.8786 11.68 11.9623 12.9362 7.5898 14.8412C6.87981 15.1237 6.5073 15.4 6.47355 15.67C6.41605 16.1275 6.98855 16.3075 7.76605 16.5512C7.8723 16.585 7.9823 16.6187 8.0948 16.6562C8.86105 16.905 9.89106 17.1962 10.4261 17.2075C10.9123 17.2175 11.4548 17.0175 12.0536 16.6075C16.1386 13.8487 18.2473 12.455 18.3798 12.425C18.4736 12.4037 18.6036 12.3762 18.6911 12.455C18.7786 12.5325 18.7698 12.68 18.7611 12.72C18.7036 12.9612 16.4611 15.0475 15.2986 16.1275C14.9361 16.4637 14.6798 16.7025 14.6273 16.7575C14.5098 16.8787 14.3898 16.995 14.2748 17.1062C13.5623 17.7912 13.0298 18.3062 14.3048 19.1462C14.9173 19.55 15.4073 19.8837 15.8961 20.2162C16.4298 20.58 16.9623 20.9425 17.6523 21.395C17.8273 21.51 17.9948 21.6287 18.1586 21.745C18.7798 22.1887 19.3386 22.5862 20.0286 22.5237C20.4286 22.4862 20.8436 22.11 21.0536 20.9862C21.5498 18.3287 22.5273 12.5737 22.7536 10.2012C22.7673 10.0043 22.7589 9.80636 22.7286 9.61125C22.7104 9.45366 22.6336 9.30866 22.5136 9.205C22.3348 9.05875 22.0573 9.0275 21.9323 9.03C21.3686 9.04 20.5036 9.34125 16.3373 11.0737Z"
                      fill="#919191" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </li>
        {/* CUSTOM NAVBAR MOBILE BOTTOM */}
      </ul>


    </div>
    {hideableSidebar && <button type="button" title="Collapse sidebar" aria-label="Collapse sidebar" className={clsx('button button--secondary button--outline', styles.collapseSidebarButton)} onClick={onCollapse}>
      <IconArrow className={styles.collapseSidebarButtonIcon} />
    </button>}
  </div>;
}

export default DocSidebar;