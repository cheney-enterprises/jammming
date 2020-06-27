import { SearchResultsInterface, TrackInterface } from "../typings/components";

const clientId = 'e65d7952a65a4ad88defa232a7357e84';
const appURI = "http://test-spotify-app.surge.sh";
const scopes = "playlist-read-collaborative playlist-modify-private playlist-modify-public playlist-read-private streaming";
const authUrl = (state: string) => `https://accounts.spotify.com/authorize?client_id=${request.client_id}&scope=${scopes}&response_type=token&redirect_uri=${appURI}&state=${state}`;

interface SpotifyRequestInterface {
    client_id: string;
    response_type: string;
    redirect_uri: string;
    state: string;
    scope: string;
}

interface SpotifyTokenApprovedInterface {
    access_token: string;
    token_type: string;
    expires_in: string;
    state: string;
}

interface SpotifyTokenDeniedInterface {
    error: string;
    state: string;
}

type SpotifyToken = SpotifyTokenApprovedInterface | SpotifyTokenDeniedInterface | undefined;

function getRandomInt ( arr: Uint32Array ) {
    return window.crypto.getRandomValues(arr).join('');
}

function setState(){
    if(!window.localStorage.getItem('requestState')){
        window.localStorage.setItem( 'requestState', getRandomInt( new Uint32Array( 10 ) ));
    }
    return window.localStorage.getItem('requestState')!;
}

let request: SpotifyRequestInterface = {
    client_id: clientId,
    response_type: 'token',
    redirect_uri: appURI,
    state: setState(),
    scope: ''
}


function parseUrl ( url: string ) {
    return Object.fromEntries(new URLSearchParams(url).entries());
}

let accessToken: string | undefined;

export const Spotify = {
    getAccessToken: function(){
        let params = parseUrl( window.location.hash?.split( '#' )?.[ 1 ]);
        if(accessToken){
            return accessToken;
        } else if ( ((params.access_token && params.state && params.expires_in) || (params.error && params.state)) && params.state === request.state
        ){
            if(params.error){
                return params.error;
            }

            accessToken = ( params as unknown as SpotifyTokenApprovedInterface ).access_token;

            let expiration = Number( params.expires_in );
            setTimeout(()=> {
                accessToken = undefined;
                localStorage.removeItem('requestState');
            }, Number(params.expires_in) * 1000);
            window.history.pushState('Access Token','','/');
            localStorage.removeItem('searchTerm');
            return accessToken;
        } else {
            window.location.href = authUrl(request.state);
        }

    },
    search: async function(term: string): Promise<TrackInterface[] | []>{
        this.getAccessToken();
        return (
            await fetch(
                `https://api.spotify.com/v1/search?type=track&q=${ term }`,
                {
                    headers: { Authorization: `Bearer ${ accessToken }` }
                } )
                .then( response => response.json() )
                .then( json => {
                    if ( json.error )
                    {
                        console.error( `The request to search returned with an ERROR, Status: ${ json.status }, Message: ${ json.message }` );
                        return;
                    }
                    if ( json.tracks.items.length > 0 )
                    {
                        return json.tracks.items.map( ( track: SearchResultsInterface ) => {
                            return {
                                id: track.id,
                                name: track.name,
                                artist: track.artists[ 0 ].name,
                                album: track.album.name,
                                uri: track.uri,
                                href: track.href
                            } as TrackInterface;
                        } );
                    } else
                    {
                        return [];
                    }
                } )
                .catch( err => console.error( 'The following ERROR occurred when attempting to search for tracks: ' + err ) )
        )
    },
    async savePlaylist(name: string, tracks: string[]){
        if(!name || !tracks){
            return;
        }
        const token = accessToken;
        const headers = (method?: string, body?: string) => {
            if(method && method !== 'GET'){
                return {
                    method: method.toUpperCase(),
                    body: body ?? '',
                    headers: {
                        Authorization: `Bearer ${ token }`
                    }
                }
            } else {
                return {
                    method: method?.toUpperCase() ?? 'GET',
                    headers: {
                        Authorization: `Bearer ${ token }`
                    }
                }
            }
            
        };
        let user_id;
        let playlist_id;
        await fetch('https://api.spotify.com/v1/me',headers())
            .then((response: Response) => response.json())
            .then(json => {
                if ( json.error )
                {
                    console.error( `The request to get a user ID returned with an ERROR, Status: ${ json.status }, Message: ${ json.message }` );
                    return;
                }
                user_id = json.id;
            })
            .catch( err => console.error('The following ERROR occurred when attempting to get a User ID: ' + err));
        await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`,headers('POST',JSON.stringify({
            name: name,
            description: 'Added from Jammming',
            public: false
        })))
            .then((response: Response) => response.json())
            .then(json => {
                if ( json.error )
                {
                    console.error( `The request to add a playlist returned with an ERROR, Status: ${ json.status }, Message: ${ json.message }` );
                    return;
                }
                playlist_id = json.id;
            })
            .catch(err => console.error('The following ERROR occurred when attempting to create a playlist: ' + err));
        
        await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,headers('POST',JSON.stringify({uris: tracks})))
            .then(response => response.json())
            .then(json => {
                if(json.error){
                    console.error(`The request to add a playlist returned with an ERROR, Status: ${json.status}, Message: ${json.message}`);
                    return;
                }
            })
            .catch( err => console.error( 'The following ERROR occurred when attempting to add the song(s) to the playlist: ' + err))
    }
}