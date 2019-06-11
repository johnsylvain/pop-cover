exports.handler = function(event, context, callback) {
  callback(null, {
    statusCode: 200,
    headers: {
      Location: 'https://accounts.spotify.com/authorize',
      'Cache-Control': 'no-cache'
    },
    body: 'nice'
  });
};
