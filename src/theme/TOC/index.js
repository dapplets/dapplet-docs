/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import useTOCHighlight from '@theme/hooks/useTOCHighlight';
import styles from './styles.module.css';
const LINK_CLASS_NAME = 'table-of-contents__link';
const ACTIVE_LINK_CLASS_NAME = 'table-of-contents__link--active';
const TOP_OFFSET = 100;
/* eslint-disable jsx-a11y/control-has-associated-label */

function Headings({
  toc,
  isChild
}) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, { threshold: 0.5 });
    if (toc.length >= 1) startObserver(observer)

    return () => {
      disconnectObserver(observer);
    }
  }, [toc.length]);

  const startObserver = useCallback((observer) => {
    const footer = document.querySelector('footer');
    observer.observe(footer);
  }, [])

  function observerCallback(entries) {
    entries.forEach(isIntersecting);
  }

  function isIntersecting(entry) {
    if (entry.isIntersecting) setHide(true);
    else setHide(false);
  }

  function disconnectObserver(observer) {
    observer.disconnect();
  }

  if (!toc.length) {
    return null;
  }

  return (
    <div className={clsx(styles.TOCBlock, 'custom-toc-block', { [styles.hide]: hide })}>
      <p className={styles.contentTitle}>Contents</p>

      <ul className={isChild ? '' : 'table-of-contents table-of-contents__left-border'}>
        {toc.map(heading => <li key={heading.id}>
          <a href={`#${heading.id}`} className={LINK_CLASS_NAME} // Developer provided the HTML, so assume it's safe.
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: heading.value
            }} />
          <Headings isChild toc={heading.children} />
        </li>)}
      </ul>
    </div>
  )
}

function TOC({
  toc
}) {
  useTOCHighlight(LINK_CLASS_NAME, ACTIVE_LINK_CLASS_NAME, TOP_OFFSET);
  return <div className={clsx(styles.tableOfContents, 'thin-scrollbar')}>
    <Headings toc={toc} />
  </div>;
}

export default TOC;