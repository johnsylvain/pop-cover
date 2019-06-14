import React from 'react';

import { storeToken } from '../util/auth';

function getQueryStringValue(key) {
  return decodeURIComponent(
    window.location.search.replace(
      new RegExp(
        '^(?:.*[&\\?]' +
          encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') +
          '(?:\\=([^&]*))?)?.*$',
        'i'
      ),
      '$1'
    )
  );
}

export const Callback = () => {
  const token = getQueryStringValue('access_token');

  if (token) {
    window.addEventListener('message', event => {
      if (event.data === 'login') {
        event.source.postMessage(JSON.stringify({ token }), event.origin);
        window.close();
      }
    });

    window.setTimeout(() => {
      storeToken(token);
      window.close();
    }, 1500);
  }

  return <div>Logging in...</div>;
};
