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

  jwt.verify(
    body.token,
    process.env.JWT_SECRET,
    async (err, { accessToken }) => {
      try {
        const {
          data: { id }
        } = await axios.get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const playlist = await axios.post(
          `https://api.spotify.com/v1/users/${id}/playlists`,
          {
            name: `This is ${body.name}`,
            description: `This is ${body.name}. The essential tracks, all in one playlist.`,
            public: true
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        const images = await axios.put(
          `https://api.spotify.com/v1/playlists/${playlist.data.id}/images`,
          body.image,
          {
            headers: {
              'Content-Type': 'image/jpeg',
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        return callback(null, {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(images.data)
        });
      } catch (e) {
        return callback(null, {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message: e.message })
        });
      }
    }
  );
};
