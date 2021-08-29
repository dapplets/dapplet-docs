/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { useThemeConfig } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import logoFooter from '../../../static/img/logo-footer.svg';

import GitHubIcon from "../../components/icons/GitHubIcon";
import DiscordIcon from "../../components/icons/DiscordIcon";
import TelegramIcon from "../../components/icons/TelegramIcon";
import MediumIcon from "../../components/icons/MediumIcon";
import TwitterIcon from "../../components/icons/TwitterIcon";
import FacebookIcon from "../../components/icons/FacebookIcon";
import MailIcon from "../../components/icons/MailIcon";

const footerSocials = [
  { id: 0, component: <GitHubIcon />, href: '', type: 'link' },
  { id: 1, component: <DiscordIcon />, href: '', type: 'link' },
  { id: 2, component: <TelegramIcon />, href: '', type: 'link' },
  { id: 3, component: <MediumIcon />, href: '', type: 'link' },
  { id: 4, component: <TwitterIcon />, href: '', type: 'link' },
  { id: 5, component: <FacebookIcon />, href: '', type: 'link' },
  { id: 6, component: <MailIcon />, href: 'business@dapplets.org', type: 'email' },
];

function FooterLink ({
  to,
  href,
  label,
  prependBaseUrlToHref,
  ...props
}) {
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {
    forcePrependBaseUrl: true
  });
  return <Link className="footer__link-item" {...href ? {
    target: '_blank',
    rel: 'noopener noreferrer',
    href: prependBaseUrlToHref ? normalizedHref : href
  } : {
    to: toUrl
  }} {...props}>
    {label}
  </Link>;
}

const FooterLogo = ({
  url,
  alt
}) => <img className="footer__logo" alt={alt} src={url} />;

function Footer () {
  const {
    footer
  } = useThemeConfig();
  const {
    copyright,
    links = [],
    logo = {}
  } = footer || {};
  const logoUrl = useBaseUrl(logo.src);

  if (!footer) {
    return null;
  }

  return <footer className={clsx('footer', {
    'footer--dark': footer.style === 'dark'
  })}>
    <div className="container footer__wrapper">

      {/* FOOTER CUSTOM TOP */}
      <div className={styles.footerCustomTop}>
        <img src={logoFooter} alt="Dapplets" />

        <ul className={styles.footerCustomSocials}>
          {
            footerSocials.map(({ id, ...item }) => {
              return (
                <li className={styles.footerCustomSocial} key={id}>
                  <FooterBottomItem {...item} />
                </li>
              );
            })
          }
        </ul>
      </div>
      {/* FOOTER CUSTOM END */}

      <span className={styles.footerLine} />

      {links && links.length > 0 && <div className="row footer__links">
        {links.map((linkItem, i) => <div key={i} className="col footer__col">
          {linkItem.title != null ? <h4 className="footer__title">{linkItem.title}</h4> : null}
          {linkItem.items != null && Array.isArray(linkItem.items) && linkItem.items.length > 0 ?
            <ul className="footer__items">
            {linkItem.items.map((item, key) => item.html ?
              <li key={key} className="footer__item" // Developer provided the HTML, so assume it's safe.
                // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: item.html
                  }} /> : <li key={item.href || item.to} className="footer__item">
              <FooterLink {...item} />
            </li>)}
          </ul> : null}
        </div>)}
      </div>}
      {(logo || copyright) && <div className="footer__bottom text--center">
        {logo && logo.src && <div className="margin-bottom--sm">
          {logo.href ? <a href={logo.href} target="_blank" rel="noopener noreferrer" className={styles.footerLogoLink}>
            <FooterLogo alt={logo.alt} url={logoUrl} />
          </a> : <FooterLogo alt={logo.alt} url={logoUrl} />}
        </div>}
        {copyright ? <div className="footer__copyright" // Developer provided the HTML, so assume it's safe.
          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{
                            __html: copyright
                          }} /> : null}
      </div>}
    </div>

    {/* FOOTER CUSTOM BOTTOM */}
    <div className={styles.footerCustomBottom}>
      <span className={styles.footerCopyright}>
        @ 2019-{new Date().getFullYear()} Dapplets Project
      </span>

      <ul className={styles.footerCustomLinks}>
        <li className={styles.footerCustomLink}>
          <a href="#" target="_blank">Privacy Policy</a>
        </li>
        <li className={styles.footerCustomLink}>
          <a href="#" target="_blank">Terms & Conditions</a>
        </li>
      </ul>
    </div>
    {/* FOOTER CUSTOM BOTTOM END */}

  </footer>;
}

function FooterBottomItem ({ href, type, component }) {
  switch (type) {
    case 'link': {
      return (
        <a href={href} target="_blank">
          {component}
        </a>
      );
    }

    case 'email': {
      return (
        <a href={`mailto:${href}`} target="_blank">
          {component}
        </a>
      );
    }
  }
}

export default Footer;