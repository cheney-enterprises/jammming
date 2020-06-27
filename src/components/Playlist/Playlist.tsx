import React, { ChangeEvent } from 'react';
import './Playlist.css';
import { TrackList } from '../TrackList/TrackList';
import { PlaylistProps } from '../../typings/components';

export class Playlist extends React.Component<PlaylistProps> {
    constructor(props: PlaylistProps){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e: ChangeEvent<HTMLInputElement>){
        this.props.onNameChange(e.currentTarget.value);
    }
    render(){
        return (
            <div className='Playlist'>
                <input 
                    value={this.props.playlistName} 
                    onChange={this.handleNameChange}
                />
                <TrackList 
                    tracks={ this.props.playlistTracks } 
                    onRemove={ this.props.onRemove } 
                    isRemoval={ true }
                    hasAlerted={this.props.hasAlerted}
                />
                <button 
                    className='Playlist-save' 
                    onClick={this.props.onSave}
                >
                    SAVE TO SPOTIFY
                </button>
            </div>
        )
    }
}
