import oauth2, { config } from './util/auth';

exports.handler = function(event, context, callback) {
  const authorizationURI = oauth2.authorizationCode.authorizeURL({
    redirect_uri: config.redirect_uri,
    scope: 'playlist-modify-public user-read-email'
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
