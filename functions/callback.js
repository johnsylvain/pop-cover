import oauth, { config } from './util/auth';
import jwt from 'jsonwebtoken';
import querystring from 'querystring';

require('dotenv').config();

const { redirectUri, clientId, clientSecret, siteUrl } = config;

exports.handler = async (event, context, callback) => {
  if (!event.queryStringParameters) {
    return callback(null, {
      statusCode: 401,
      body: JSON.stringify({
        error: 'Not authorized'
      })
    });
  }

  const code = event.queryStringParameters.code;

  try {
    const authorizationToken = await oauth.authorizationCode.getToken({
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret
    });

    let authResult = oauth.accessToken.create(authorizationToken);
    const token = jwt.sign(
      { accessToken: authResult.token.access_token },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return callback(null, {
      statusCode: 302,
      headers: {
        Location: `http://localhost:1234/callback?access_token=${token}`
      },
      body: ''
    });
  } catch (e) {
    return callback(null, {
      statusCode: 401,
      body: JSON.stringify({
        error: e.message
      })
    });
  }
};
