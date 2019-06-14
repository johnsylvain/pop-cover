import axios from '../config/axios';

class PlaylistService {
  create({ name, image, token }) {
    return axios.post('/create-playlist', {
      name,
      image,
      token
    });
  }
}

const playlistService = new PlaylistService();

export { playlistService };
