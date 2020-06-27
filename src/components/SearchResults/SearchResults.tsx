import React from 'react';
import './SearchResults.css';
import { TrackList } from '../TrackList/TrackList';
import { SearchResultsProps } from '../../typings/components';

export class SearchResults extends React.Component<SearchResultsProps> {
    render(){
        return (
            <div className='SearchResults'>
                <h2>Results</h2>
                <TrackList 
                    tracks={this.props.searchResults} 
                    onAdd={this.props.onAdd} 
                    isRemoval={false}
                    hasAlerted={this.props.hasAlerted}
                />
            </div>
        )
    }
}

