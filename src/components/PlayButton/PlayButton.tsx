import React, { MouseEvent, SVGAttributes } from "react";
import './PlayButton.css';
import { PlayButtonProps , PlayButtonState } from "../../typings/components";

export class PlayButton extends React.Component<PlayButtonProps,PlayButtonState> {
    constructor(props: PlayButtonProps){
        super(props);
        this.state = {
            isAnimating: false,
            
        }
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler ( e: React.MouseEvent<SVGCircleElement, globalThis.MouseEvent>){
        const play = e.currentTarget!.previousElementSibling!.previousElementSibling as SVGPolygonElement;
        const pause = e.currentTarget.previousElementSibling as SVGLineElement;
        if ( !this.state.isAnimating ){
            e.currentTarget.style.animation = `rotate 5s linear 1 running`;
            play.style.display = 'none';
            pause.style.display = '';
            this.setState({isAnimating: true});
        }

        else
        {
            e.currentTarget.style.animation = `rotate 5s linear 1 paused`;
            play.style.display = '';
            pause.style.display = 'none';
            this.setState( { isAnimating: false } );
        }
        if(!this.props.hasAlerted()){
            window.alert('This will not play, as of yet. Feel free to click on the song title, and it will bring you directly to the spotify page for the song.');
        }
        
    }

    render(){
        return (
            <div className="play-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                    <polygon className="play-icon" stroke-linejoin="round" stroke-width="17" points="43,37 43,63 63,50"
                        style={ { fill: '#fff', stroke:'#fff'}}/>
                    Sorry, your browser does not support inline SVG.
                    <g className="pause-icon" style={{display:'none'}}>
                        <line x1="40" y1="35" x2="40" y2="65"
                            style={{
                                fill: '#fff', 
                                stroke: '#fff', 
                                strokeWidth: '15',
                                strokeLinecap: 'round'
                            }} />
                        <line x1="40" y1="35" x2="40" y2="65"
                            style={ {
                                fill: '#fff',
                                stroke: '#fff',
                                strokeWidth: '15',
                                strokeLinecap: 'round',
                                transform: 'translate(20%,0)'
                            } } />
                    </g>
                    <circle onClick={this.clickHandler} className="circle" cx="50" cy="50" r="43" />
                </svg>
            </div>
        );
    }
}