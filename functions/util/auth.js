const simpleOauth = require('simple-oauth2');

const spotifyAuthBase = 'https://accounts.spotify.com';
const spotifyAuthCode = `${spotifyAuthBase}/authorize`;
const spotifyAuthToken = `${spotifyAuthBase}/api/token`;
const siteUrl = process.env.URL
  ? `${process.env.URL}/.netlify/functions`
  : 'http://localhost:9000';

require('dotenv').config();

export const config = {
  siteUrl,
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  tokenHost: spotifyAuthToken,
  tokenPath: spotifyAuthToken,
  authorizePath: spotifyAuthCode,
  redirectUri: `${siteUrl}/callback`
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
  return simpleOauth.create(credentials);
}

export default authInstance({
  client: {
    id: config.clientId,
    secret: config.clientSecret
  },
  auth: {
    tokenHost: config.tokenHost,
    tokenPath: config.tokenPath,
    authorizePath: config.authorizePath
  }
});
