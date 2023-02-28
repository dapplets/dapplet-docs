import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import gfm from 'remark-gfm'

const renderers = {
  code: ({ language, value }) => {
    return <SyntaxHighlighter style={tomorrow} language={language} children={value} />
  },
}

const tsJsonParse = (value) => `

~~~ts
${value.join('\n')}
~~~

`

export default function AdapterDocVersion(props) {
  const [adapterData, getData] = useState(false)
  const [docType, setDocType] = useState('')
  const cancelToken = axios.CancelToken
  const source = cancelToken.source()

  const { url } = props

  let counter = 0

  const addElOfType = {
    text: (value, elClass) => (
      <ReactMarkdown plugins={[gfm]} key={counter++} className={elClass}>
        {value}
      </ReactMarkdown>
    ),
    image: ({ link, alt }) => <img src={link} alt={alt} key={counter++} />,
    ts: (value) => (
      <ReactMarkdown renderers={renderers} plugins={[gfm]} key={counter++}>
        {tsJsonParse(value)}
      </ReactMarkdown>
    ),
  }

  const docTypes = {
    md: 'text/markdown',
    json: 'application/json',
  }

  const setData = async () => {
    const tmp = url.split('.')
    setDocType(tmp[tmp.length - 1])
    try {
      const { data } = await axios.get(url, {
        headers: { 'Content-Type': `${docTypes[docType]}` },
        cancelToken: source.token,
      })
      getData(data)
    } catch (err) {
      if (axios.isCancel(err)) {
        return 'axios request cancelled'
      }
      return err
    }
  }

  useEffect(() => {
    if (adapterData === false) setData()
    return () => source.cancel()
  })

  const createElementOfType = {
    md: () => (
      <ReactMarkdown renderers={renderers} plugins={[gfm]}>
        {adapterData}
      </ReactMarkdown>
    ),
    json: () => (
      <>
        <h2>Name to connect:</h2>
        <ul>
          <li>{addElOfType.text(`\`${adapterData.name_to_connect}\``)}</li>
        </ul>
        <h2>About the {adapterData.title}</h2>
        {addElOfType.text(adapterData.about)}
        <h2>Widgets</h2>
        <table>
          <thead>
            <tr>
              <th>Parameters</th>
              {adapterData.widgets.names.map((name) => (
                <th key={counter++}>{name}</th>
              ))}
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(adapterData.widgets.parameters).map(
              ([param, { widgets, type, description }]) => (
                <tr key={counter++}>
                  <th>{addElOfType.text(`\`${param}\``, 'table-left')}</th>
                  {widgets.map((widget) => (
                    <th key={counter++}>{widget ? '✔️' : ''}</th>
                  ))}
                  <td>{addElOfType.text(`\`${type}\``, 'table-center')}</td>
                  <td>{description}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <h2>Insertion points</h2>
        {adapterData.instPoints.fields.map(({ subtitle, image }) => (
          <React.Fragment key={counter++}>
            <h3>▪ {subtitle}</h3>
            <img src={image.link} alt={image.alt} />
          </React.Fragment>
        ))}
        <h3>▪ Insertion point / Widget table</h3>
        <table>
          <thead>
            <tr>
              <th>Insertion point</th>
              {adapterData.instPoints.table.names.map((name) => (
                <th key={counter++}>{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(adapterData.instPoints.table.insertion_point).map(
              ([instPoint, widgets]) => (
                <tr key={counter++}>
                  <td>{addElOfType.text(`\`${instPoint}\``, 'table-left')}</td>
                  {widgets.map((widget) => (
                    <th key={counter++}>{widget ? '✔️' : ''}</th>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
        {adapterData.instPoints.additions.map((addition) =>
          addElOfType[addition.type](addition.value)
        )}
        <h2>Events</h2>
        {adapterData.events.map(({ subtitle, field_events }) => (
          <React.Fragment key={counter++}>
            <h4>{subtitle}</h4>
            <ul>
              {field_events.map(({ name }) => (
                <li key={counter++}>
                  <a href={`#${subtitle.concat(name)}`}>{name}</a>
                </li>
              ))}
            </ul>
          </React.Fragment>
        ))}
        {adapterData.events.map(({ subtitle, field_events }) => (
          <React.Fragment key={counter++}>
            <h3>▪ {subtitle}:</h3>
            <ul>
              {field_events.map(({ name, description }) => (
                <li key={counter++}>
                  <h4 id={subtitle.concat(name)}>{name}</h4>
                  {description.map(({ type, value }) => addElOfType[type](value))}
                </li>
              ))}
            </ul>
          </React.Fragment>
        ))}
        <h2>Virtual Adapters</h2>
        <ul>
          {adapterData.virtualAdapters.map(({ name, versions }) => (
            <li key={counter++}>
              {addElOfType.text(
                `\`${name}\`: `.concat(versions.map((version) => `ver. ${version}`).join(', '))
              )}
            </li>
          ))}
        </ul>
      </>
    ),
  }

  return <>{adapterData && createElementOfType[docType]()}</>
}
