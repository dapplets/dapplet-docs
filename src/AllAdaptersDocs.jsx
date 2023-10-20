import Link from '@docusaurus/Link'
import { useLocation } from '@docusaurus/router'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AdapterDocs from '/src/AdapterDocs.jsx'

const url = '/json/adapters.json'
let counter = 0

export const getAdapterPath = ({ name, title, currentVer }) => {
  return `/docs/adapters-docs-list#name=${name}&title=${title}&version=v${currentVer
    .slice(1)
    .split('_')
    .join('.')}`
}

export default function AllAdaptersDocs() {
  const location = useLocation()

  const [adapters, getAdapters] = useState(false)
  const [currentAdapter, setCurrentAdapter] = useState({})

  const cancelToken = axios.CancelToken
  const source = cancelToken.source()

  const setData = async () => {
    try {
      const { data } = await axios.get(url, {
        headers: { 'Content-Type': 'application/json' },
        cancelToken: source.token,
      })
      getAdapters(data)
    } catch (err) {
      if (axios.isCancel(err)) {
        return 'axios request cancelled'
      }
      return err
    }
  }

  const onLoad = () => {
    const hash = location.hash
    if (hash) {
      const hashParse = JSON.parse(
        '{"' + decodeURI(hash).replace(/"/g, '"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
      )
      const { '#name': name, title, version: currentVer } = hashParse

      setCurrentAdapter({ name, title, currentVer })
    }
  }

  useEffect(onLoad, [setCurrentAdapter])

  useEffect(() => {
    if (adapters === false) setData()
    return () => source.cancel()
  })

  const onClick = ({ name, title, currentVer }) => {
    setCurrentAdapter({ name, title, currentVer })
  }

  const cleanCurrentAdapter = () => setCurrentAdapter({})

  return (
    <React.Fragment>
      {adapters &&
        (!currentAdapter.name ? (
          <React.Fragment>
            <h1>Adapter catalog</h1>
            <ul>
              {Object.entries(adapters).map(([name, value]) => (
                <li value={name} key={counter++}>
                  <h4>{value.title}:</h4>
                  <ul>
                    <li>{name}</li>
                    <li>
                      <i>versions: </i>
                      {value.versions.map((ver) => {
                        const to = getAdapterPath({
                          name,
                          title: value.title,
                          currentVer: ver.version,
                        })
                        const config = {
                          name,
                          title: value.title,
                          currentVer: ver.version,
                        }

                        return (
                          <Link
                            to={to}
                            onClick={() => onClick(config)}
                            key={counter++}
                            className="custom-btn"
                          >
                            {`${ver.version.slice(1).split('_').join('.')}`}
                          </Link>
                        )
                      })}
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link
              to="/docs/adapters-docs-list"
              className="custom-btn"
              onClick={cleanCurrentAdapter}
            >
              ‹ Back to adapters list
            </Link>

            <AdapterDocs
              name={currentAdapter.name ?? ''}
              title={currentAdapter.title ?? ''}
              currentVer={currentAdapter.currentVer ?? ''}
            />
          </React.Fragment>
        ))}
    </React.Fragment>
  )
}
