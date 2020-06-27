import React from 'react';
import './TrackList.css';
import { TrackListProps } from '../../typings/components';
import { Track } from '../Track/Track';

export class TrackList extends React.Component<TrackListProps> {
    render(){
        return (
            <div className='TrackList'>
                {this.props.tracks!.map(track=>{
                    return (
                        <Track 
                            key={track.id} 
                            track={track} 
                            onAdd={this.props.onAdd} 
                            onRemove={this.props.onRemove} 
                            isRemoval={this.props.isRemoval}
                            hasAlerted={this.props.hasAlerted}
                        />
                    )
                })}
            </div>
        )
    }
}