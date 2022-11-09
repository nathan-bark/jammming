import React from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      SearchResults: [
        { name: "name1", artist: "artist1", album: "album1", id: 1 },
        { name: "name2", artist: "artist2", album: "album2", id: 2 },
        { name: "name3", artist: "artist3", album: "album3", id: 3 },
      ],

      PlaylistName: "Playlist1",

      PlaylistTracks: [
        { name: "name01", artist: "artist01", album: "album01", id: 10 },
        { name: "name02", artist: "artist02", album: "album02", id: 20 },
        { name: "name03", artist: "artist03", album: "album03", id: 30 },
      ],
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    const tracklist = this.state.PlaylistTracks;
    if (tracklist.find((song) => song.id === track.id)) {
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
    // const trackUris = this.state.PlaylistTracks.map((track) => track.uri);
  }

  search(term){
    console.log(term);
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
