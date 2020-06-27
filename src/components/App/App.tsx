import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { AppProps, AppState, TrackInterface } from '../../typings/components';
import { Spotify } from '../../utils/Spotify';

export class App extends React.Component<AppProps, AppState> {
  constructor ( props: AppProps ) {
    super( props );
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
      hasAlerted: false
    };
    this.addTrack = this.addTrack.bind( this );
    this.removeTrack = this.removeTrack.bind( this );
    this.updatePlaylistName = this.updatePlaylistName.bind( this );
    this.savePlaylist = this.savePlaylist.bind( this );
    this.search = this.search.bind(this);
    this.hasAlerted = this.hasAlerted.bind( this );
  }

  addTrack ( track: TrackInterface ) {
    if ( !this.state.playlistTracks.find( savedTrack => savedTrack.id === track.id ) )
    {
      this.setState( { playlistTracks: [ ...this.state.playlistTracks, track ] } );
    }
  }

  removeTrack ( track: TrackInterface ) {
    if ( this.state.playlistTracks.find( savedTrack => savedTrack.id === track.id ) )
    {
      this.setState( { playlistTracks: this.state.playlistTracks.filter( currTrack => track.id !== currTrack.id ) } );
    }
  }

  updatePlaylistName(name: string){
    this.setState({playlistName: name});
  }

  savePlaylist(){
    let trackURIs = Array<string>();
    this.state.playlistTracks.forEach(track => trackURIs.push(track.uri));
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({playlistTracks: [], playlistName: 'New Playlist'});
    return trackURIs;
  }

  async search(term: string){
    Spotify.getAccessToken();
    let results = await Spotify.search(term);
    this.setState({searchResults: results})
  }

  hasAlerted(){
    if(!this.state.hasAlerted){
      this.setState({hasAlerted: true});
      return false;
    } else {
      return true;
    }
  }
  render () {
    return (
      <div>
        <h1>Ja<span className='highlight'>mmm</span>ing</h1>
        <div className='App'>
          <SearchBar onSearch={this.search}/>
          <div className='App-playlist'>
            <SearchResults 
              searchResults={ this.state.searchResults } 
              onAdd={ this.addTrack } 
              hasAlerted={this.hasAlerted}
            />
            <Playlist 
              playlistName={ this.state.playlistName } 
              playlistTracks={ this.state.playlistTracks } 
              onAdd={ this.addTrack } 
              onRemove={this.removeTrack} 
              onNameChange={this.updatePlaylistName} 
              onSave={this.savePlaylist}
              hasAlerted={ this.hasAlerted }
            />
          </div>
        </div>
      </div>
    );
  }

}


