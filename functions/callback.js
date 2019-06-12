import oauth2, { config } from './util/auth';

exports.handler = (event, context, callback) => {
  const code = event.queryStringParameters.code;
  const state = event.queryStringParameters.state;

  oauth2.authorizationCode
    .getToken({
      code: code,
      redirect_uri: config.redirect_uri,
      client_id: config.clientId,
      client_secret: config.clientSecret
    })
    .then(result => {
      const token = oauth2.accessToken.create(result);
      console.log('accessToken', token);
      return token;
    })
    .then(result => {
      console.log('auth token', result.token);
      console.log('user data', result.data);
      console.log('state', state);
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(result)
      });
    })
    .catch(error => {
      console.log('Access Token Error', error.message);
      console.log(error);
      return callback(null, {
        statusCode: error.statusCode || 500,
        body: JSON.stringify({
          error: error.message
        })
      });
    });
};
