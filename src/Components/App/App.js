import React from "react";
import "./App.css";

import SearchBar from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      SearchResults: [],
      PlaylistName: "New Playlist",
      PlaylistTracks: [],
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  search(term) {
    Spotify.search(term).then((searchResults) => {
      this.setState({ SearchResults: searchResults });
    });
  }

  addTrack(track) {
    const tracklist = this.state.PlaylistTracks;
    if (tracklist.find((song) => song.ID === track.ID)) {
      return;
    }
    tracklist.push(track);

    this.setState({ playlistTracks: tracklist });
  }

  removeTrack(track) {
    const playlist = this.state.PlaylistTracks;
    playlist.splice(
      playlist.findIndex((song) => song.id === track.id),
      1
    );

    this.setState({ playlistTracks: playlist });
  }

  updatePlaylistName(name) {
    this.setState({ PlaylistName: name });
  }

  savePlaylist() {
    const trackUris = this.state.PlaylistTracks.map((track) => track.URI);
    Spotify.savePlaylist(this.state.PlaylistName, trackUris).then(() =>
      this.setState({
        PlaylistName: "New Playlist",
        PlaylistTracks: [],
      })
    );
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.SearchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.PlaylistName}
              playlistTracks={this.state.PlaylistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
