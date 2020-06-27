export interface AppProps {
    [ index: string ]: any;
}

export interface AppState {
    searchResults: TrackInterface[] | [];
    playlistName: string;
    playlistTracks: TrackInterface[];
    hasAlerted: boolean;
}

export interface SearchResultsInterface {
    name: string;
    artists: {name:string}[];
    album: { name: string; };
    id: string;
    uri: string;
    href: string;
}

export interface TrackInterface {
    name: string;
    artist: string;
    album: string;
    id: string;
    uri: string;
    href: string;
}

export interface SearchResultsProps {
    searchResults: TrackInterface[];

    onAdd?: ( track: TrackInterface ) => void;
    hasAlerted: ()=>boolean;
}

export interface TrackProps {
    track: TrackInterface;
    isRemoval: boolean;
    onAdd?: ( track: TrackInterface ) => void;
    onRemove?: ( track: TrackInterface ) => void;
    hasAlerted: ()=>boolean;
}

export interface TrackListProps {
    tracks: TrackInterface[];
    onAdd?: ( track: TrackInterface ) => void;
    onRemove?: ( track: TrackInterface ) => void;
    isRemoval: boolean;
    hasAlerted: () => boolean;
}

export interface PlaylistProps {
    playlistName: string;
    playlistTracks: TrackInterface[];
    onAdd?: ( track: TrackInterface ) => void;
    onRemove?: ( track: TrackInterface ) => void;
    onNameChange: ( name: string ) => void
    onSave: () => string[];
    hasAlerted: () => boolean;
}

export interface SearchBarProps {
    onSearch: (term: string) => void;
    // onKeyDown?: (e: KeyboardEvent) => void;
}

export interface SearchBarState {
    term: string;
}

export interface PlayButtonProps {
    hasAlerted: ()=>boolean;
}

export interface PlayButtonState {
    isAnimating: boolean;
}