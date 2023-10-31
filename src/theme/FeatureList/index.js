import React from 'react'
import styles from './styles.module.css'

export function FeatureList({ children }) {
  return (
    <div className={styles.wrapper}>
      <div className="line">{children}</div>
    </div>
  )
}

export function Line({ title, children, desc }) {
  return (
    <div className={styles.line_block}>
      {title ? <h3>{title}</h3> : <p></p>}
      {desc && desc.length && <div className={styles.desc}>{desc}</div>}

      <div className={styles.line_child}>{children}</div>
    </div>
  )
}

export function Feature({ image, title, subtitle, url, highlight = false, isContacts }) {
  return (
    <div className={styles.line_flex}>
      <a
        className={isContacts ? styles.avatarContacts : styles.avatar}
        target={isContacts ? '_blank' : '_self'}
        href={url}
        style={{ backgroundColor: highlight && 'rgb(240, 255, 240)' }}
      >
        <img
          className={isContacts ? styles.avatar__photoContacts : styles.avatar__photo}
          src={image}
        />
        <div className={styles.avatar__intro}>
          <div className={isContacts ? styles.avatar__nameContacts : styles.avatar__name}>
            {title}
          </div>
          <small className={isContacts ? styles.avatar__subtitleContacts : styles.avatar__subtitle}>
            {subtitle}
          </small>
        </div>
      </a>
    </div>
  )
}
