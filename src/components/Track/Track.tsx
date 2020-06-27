import React from 'react';
import './Track.css';
import { TrackProps } from '../../typings/components';
import { PlayButton } from "../PlayButton/PlayButton";


export class Track extends React.Component<TrackProps, {}> {
    constructor ( props: TrackProps ) {
        super( props );
        this.renderAction = this.renderAction.bind( this );
        this.addTrack = this.addTrack.bind( this );
        this.removeTrack = this.removeTrack.bind( this );
    }
    addTrack () {
        return this.props.onAdd ? this.props.onAdd( this.props.track ) : undefined;
    }

    removeTrack () {
        return this.props.onRemove ? this.props.onRemove( this.props.track ) : undefined;
    }
    renderAction () {
        return this.props.isRemoval ?
            <>
                <PlayButton hasAlerted={ this.props.hasAlerted }/>
                <button 
                    className='Track-action' 
                    onClick={ this.removeTrack }
                >
                    -
                </button>
            </>
            : <>
                <PlayButton hasAlerted={this.props.hasAlerted}/>
                <button 
                    className='Track-action' 
                    onClick={ this.addTrack }
                >
                    +
                </button>
            </>;
    }
    render () {
        return (
            <div className='Track'>
                
                    <div className='Track-information'>
                        <h3>
                            <a href={ `https://open.spotify.com/track/${ this.props.track.uri.split(':')[2] }` } target='_blank'>
                                { this.props.track.name }
                            </a>
                        </h3>
                        <p>
                            { this.props.track.artist } | { this.props.track.album }
                        </p>
                    </div>
                { this.renderAction() }
            </div>
        );
    }
}