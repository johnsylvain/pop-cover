const simpleOauth = require('simple-oauth2');

const spotifyApi = 'https://accounts.spotify.com/authorize';
const siteUrl = process.env.URL || 'http://localhost:9000';

require('dotenv').config();

export const config = {
  appId: process.env.SPOTIFY_APP_ID,
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  tokenHost: spotifyApi,
  authorizePath: spotifyApi,
  tokenPath: `${spotifyApi}/auth/eagle/token`,
  profilePath: `${spotifyApi}/me/`,
  redirect_uri: `${siteUrl}/callback`
};

function authInstance(credentials) {
  if (!credentials.client.id) {
    throw new Error('MISSING REQUIRED ENV VARS. Please set SPOTIFY_CLIENT_ID');
  }
  if (!credentials.client.secret) {
    throw new Error(
      'MISSING REQUIRED ENV VARS. Please set SPOTIFY_CLIENT_SECRET'
    );
  }
  // return oauth instance
  return simpleOauth.create(credentials);
}

export default authInstance({
  client: {
    id: config.clientId,
    secret: config.clientSecret
  },
  auth: {
    tokenHost: config.tokenHost,
    authorizePath: config.authorizePath
  }
});
