import axios from 'axios';
import jwt from 'jsonwebtoken';

require('dotenv').config();

exports.handler = (event, context, callback) => {
  const body = JSON.parse(event.body);

  if (event.httpMethod !== 'POST') {
    return callback(null, {
      statusCode: 200,
      body: 'Invalid request method'
    });
  }

  if (!body.token || !body.image || !body.name) {
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify('missing_information')
    });
  }

  jwt.verify(body.token, process.env.JWT_SECRET, async (err, payload) => {
    try {
      if (!payload) {
        throw Error('unauthorized');
      }
      const headers = {
        Authorization: `Bearer ${payload.accessToken}`
      };

      const me = await axios.get('https://api.spotify.com/v1/me', {
        headers
      });

      const playlist = await axios.post(
        `https://api.spotify.com/v1/users/${me.data.id}/playlists`,
        {
          name: `This is ${body.name}`,
          description: `This is ${body.name}. The essential tracks, all in one playlist. (Created with www.listify.pro)`,
          public: true
        },
        { headers }
      );

      await axios.put(
        `https://api.spotify.com/v1/playlists/${playlist.data.id}/images`,
        body.image,
        {
          headers: {
            ...headers,
            'Content-Type': 'image/jpeg'
          }
        }
      );

      return callback(null, {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(playlist.data)
      });
    } catch (e) {
      return callback(null, {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: e.message })
      });
    }
  });
};
