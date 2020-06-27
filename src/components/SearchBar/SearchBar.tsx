import React, { KeyboardEvent, ChangeEvent, MouseEvent } from 'react';
import './SearchBar.css';
import { SearchBarProps, SearchBarState } from '../../typings/components';

export class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
    constructor ( props: SearchBarProps ) {
        super( props );
        this.state = {
            term: ''
        }
        this.enterHandler = this.enterHandler.bind( this );
        this.search = this.search.bind( this );
        this.handleTermChange = this.handleTermChange.bind( this );
        this.searchClickHandler = this.searchClickHandler.bind(this);
        if ( localStorage.getItem( 'searchTerm' ) )
        {
            this.setState( { term: localStorage.getItem( 'searchTerm' )! } );
        }
    }
    enterHandler ( e: KeyboardEvent<HTMLInputElement> ) {
        if ( e.key === 'Enter' )
        {
            const search = document.querySelector( 'Button, .SearchButton' ) as HTMLButtonElement;
            search.click();
        }
    }
    componentDidMount(){
        if ( localStorage.getItem( 'searchTerm' ) )
        {
            const search = document.querySelector( 'Button, .SearchButton' ) as HTMLButtonElement;
            search.click();
        }
        
    }
    search ( term: string ) {
        this.props.onSearch( term );
    }

    handleTermChange(e: ChangeEvent<HTMLInputElement>){
        this.setState({term: e.currentTarget.value});
        localStorage.setItem('searchTerm', e.currentTarget.value);
    }

    searchClickHandler ( e: MouseEvent<HTMLButtonElement>){
        this.search( this.state.term );
    }
    render () {
        return (
            <div className='SearchBar'>
                <input 
                    placeholder='Enter A Song, Album, or Artist' 
                    value={this.state.term} 
                    onKeyDown={ this.enterHandler } 
                    onChange={this.handleTermChange} 
                />
                <button className='SearchButton' onClick={this.searchClickHandler}>SEARCH</button>
            </div>
        );
    }
}
