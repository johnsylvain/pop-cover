import oauth2, { config } from './util/auth';

exports.handler = (event, context, callback) => {
  const authorizationURI = oauth2.authorizationCode.authorizeURL({
    redirect_uri: config.redirectUri,
    scope: 'playlist-modify-public user-read-email',
    state: ''
  });

  callback(null, {
    statusCode: 302,
    headers: {
      Location: authorizationURI,
      'Cache-Control': 'no-cache'
    },
    body: ''
  });
};
