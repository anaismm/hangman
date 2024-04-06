import React, { Component } from 'react';
import './keyboard.css';

class Keyboard extends Component {

    // POUR LE FAIRE AVEC LE CLAVIER
    componentDidMount() {
        window.addEventListener("keyup", (e) => {
            const keyPressed = e.key.toUpperCase();
            if (this.props.alphabet.indexOf(keyPressed) != -1) {
                this.props.action(e.key)
            }
        })
    }

    render(){
        return (
            <div id="keyboard">
                {
                    this.props.alphabet.map(
                        (letter, key) => {
                            return <button 
                                key={"keyboard_"+key} 
                                onClick={() => this.props.action(letter)} 
                                className={(this.props.usedLetter.indexOf(letter) !== -1 ? "used" : "")}
                                >{letter}</button>
                        }
                    )
                }
            </div>
        )
    }
}


export default Keyboard