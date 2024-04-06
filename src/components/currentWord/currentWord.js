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

                        if (usedLetter.indexOf(letter) == -1) {
                            if (win === -1) {
                                status="lost"
                            } else {
                                if (letter === "-") {
                                    status="finded"
                                } else {
                                    status="notfinded"
                                }
                            }
                        }

                        return <span key={"letter_"+key} className={status}>
                            {status === "finded" ? letter : (win === -1 ? letter :"_ ")}</span>
                    }
                )
            }
            
        </div>
    )
}

export default CurrentWord