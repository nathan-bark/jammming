const clientID = "a30696c84375422fa3a1ee2c94f462d3";
const redirectUri = "http://localhost:3000/";

let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    //check for access token
    const accessTokenCheck = window.location.href.match(/access_token=([^&]*)/);
    const accessTokenExpires = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenCheck && accessTokenExpires) {
      accessToken = accessTokenCheck[1];
      const expiresIn = Number(accessTokenExpires[1]);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}
        `;
    }
  },

  search(term) {
    const newAccessToken = Spotify.getAccessToken();

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${newAccessToken}` },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.tracks) {
          return [];
        }

        return data.tracks.items.map((track) => {
          return {
            ID: track.id,
            Name: track.name,
            Artist: track.artists[0].name,
            Album: track.album.name,
            URI: track.uri,
          };
        });
      });
  },

  savePlaylist(playlistName, trackUris){
    if (!playlistName || !trackUris.length){
      return;
    }

      const newAccessToken = Spotify.getAccessToken();
      const headers = { Authorization: `Bearer ${newAccessToken}`};
      let userID; 

      return fetch('https://api.spotify.com/v1/me', {headers: headers})
      .then(response => response.json())
      .then(data => {
        userID = data.id
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
        {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({name: playlistName})
        })
        .then(response => response.json())
        .then(data => {
          const playlistId = data.id;
          return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistId}/tracks`,
          {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({uris: trackUris})
          })
        })
      });

  }
};

export default Spotify;
