import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CreateAdapter(props) {
  const [adapterData, getData] = useState(false);
  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();

  const { url } = props;

  let counter = 0;

  const addons = {
    text: (value) => <p key={counter++}>{value}</p>,
    image: ({ link, alt }) => <img src={link} alt={alt} key={counter++} />,
    ts: (value) => <p key={counter++}>{value}</p>,
  };

  const setData = async () => {
    try {
      const { data } = await axios.get(url, {
        headers: { 'Content-Type': 'application/json' },
        cancelToken: source.token,
      });
      getData(data);
    } catch (err) {
      if (axios.isCancel(err)) {
       return "axios request cancelled";
      }
      return err;
    }
  };

  useEffect(() => {
    if (adapterData === false) setData();
    return () => source.cancel();
  });

  return (
    <>{adapterData && <>
      <h2>About the {adapterData.title}</h2>
      <p>{adapterData.about}</p>
      <h2>Widgets</h2>
      <table>
        <thead>
          <tr>
            <th>Parameters</th>
            {adapterData.widgets.names.map((name) => <th key={counter++}>{name}</th>)}
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(adapterData.widgets.parameters).map(([param, { widgets, type, description }]) => (
            <tr key={counter++}>
              <th>{param}</th>
              {widgets.map((widget) => (
                <th key={counter++}>{widget ? '✔️' : ''}</th>
              ))}
              <td>{type}</td>
              <td>{description}</td>
            </tr>
          ))}
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
            {adapterData.instPoints.table.names.map((name) => <th key={counter++}>{name}</th>)}
          </tr>
        </thead>
        <tbody>
          {Object.entries(adapterData.instPoints.table.insertion_point).map(([instPoint, widgets]) => (
            <tr key={counter++}>
              <td>{instPoint}</td>
              {widgets.map((widget) => (
                <th key={counter++}>{widget ? '✔️' : ''}</th>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {adapterData.instPoints.additions.map((addition) => addons[addition.type](addition.value))}
      <h2>Events</h2>
      {adapterData.events.map(({ subtitle, field_events }) => (
        <React.Fragment key={counter++}>
          <h4>{subtitle}</h4>
          <ul>
            {field_events.map(({ name }) => <li key={counter++}><a href={`#${subtitle.concat(name)}`}>{name}</a></li>)}
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
              {description.map(({ type, value }) => addons[type](value))}
            </li>
          ))}
          </ul>
        </React.Fragment>
      ))}
      <h2>Virtual Adapters</h2>
      <ul>
        {adapterData.virtualAdapters.map(({ name, versions }) => (
          <li key={counter++}><strong>{name}: </strong>
            {versions.map((version) => `ver. ${version}`).join(', ')}
          </li>
        ))}
      </ul>
    </>}</>
  );
}
