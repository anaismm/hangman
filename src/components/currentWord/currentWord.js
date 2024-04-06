import React from 'react';
import './currentWord.css';

const CurrentWord = ({currentWord, usedLetter, win}) => {

    return (
        <div id="current_word">
            {
                currentWord.split('').map(
                    (letter, key) => {
                        // par defaut toutes les lettres sont a trouvé
                        let status = "finded"

                        if (letter === "-") {
                            return <span key={"letter_" + key} className="finded">-</span>;
                        }

                        if (usedLetter.indexOf(letter) == -1) {
                            if (win === -1) {
                                status="lost"
                            } else {
            
                                    status="notfinded"
                                }
                            
                        }

                        return <span key={"letter_"+key} className={status}>
                            {status === "finded" || win === -1 ? letter : "_ "}</span>
                    }
                )
            }
            
        </div>
    )
}

export default CurrentWord