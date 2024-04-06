import React from 'react';
import './lives.css';

const Lives = ({attempt}) => {
    return (
        <div id="hangman">
            <div className={`part first-gallows ${attempt >= 1 ? 'drawn' : ''}`}></div>
            <div className={`part second-gallows ${attempt >= 2 ? 'drawn' : ''}`}></div>
            <div className={`part third-gallows ${attempt >= 3 ? 'drawn' : ''}`}></div>
            <div className={`part rope ${attempt >= 4 ? 'drawn' : ''}`}></div>
            <div className={`part head ${attempt >= 5 ? 'drawn' : ''}`}></div> 
            <div className={`part body ${attempt >= 6 ? 'drawn' : ''}`}></div> 
            <div className={`part left-leg ${attempt >= 7 ? 'drawn' : ''}`}></div> 
            <div className={`part right-leg ${attempt >= 8 ? 'drawn' : ''}`}></div> 
            <div className={`part left-arm ${attempt >= 9 ? 'drawn' : ''}`}></div> 
            <div className={`part right-arm ${attempt >= 10 ? 'drawn' : ''}`}></div> 
        </div>
    )
}

export default Lives