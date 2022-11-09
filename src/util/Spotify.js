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
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}
        `;
    }
  },
};

export default Spotify;
