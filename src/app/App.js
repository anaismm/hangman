import React, {Component} from 'react';
import './App.css';
import './game.css';
import Keyboard from '../components/keyboard/keyboard';
import CurrentWord from '../components/currentWord/currentWord';
import Lives from '../components/lives/lives';

class App extends Component {

    state = {
        currentWord: null, 
        alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''),
        usedLetter:[],
        win:0, // 0 etat neutre | -1 perdu | 1 gagné
        attempt:0, //le nombre de tentaives
        maxAttempt: 10,
        locale: 'fr-FR',
        errorMessage: null
    }
    
    // UNE FOIS CHAQUE LETTRE CLIQUEE
    clickLetter = (letter) => {
        letter = letter.toUpperCase();

        if ( this.state.usedLetter.indexOf(letter) === -1) {

            let attempt = this.state.attempt
            const usedLetter =[letter, ... this.state.usedLetter]

            if (this.state.currentWord.indexOf(letter) === -1) {
                attempt = this.state.attempt + 1;
            }

            let win = 1
            for (let i = 0; i < this.state.currentWord.length; i++) {
                if (usedLetter.indexOf(this.state.currentWord[i]) === -1 && this.state.currentWord[i] !== '-') {
                    win = 0;
                    break; 
                }
            }

            if (attempt >= this.state.maxAttempt && win === 0) {
                win = -1
            }

            this.setState({usedLetter, attempt, win})
        }

    }

    // CHANGER LA LANGUE
    changeLocale = async (locale) => {
        try {
            await this.setState({locale }); 
            await this.initGame();
             
        } catch (error) {
            console.error('Erreur lors du changement de locale:', error);
        }
    }

    // CHOISIR UN NOUVEAU MOT DE L'API
    pickNewWord = async (locale) => {
        const formBody = [
            `locale=${locale}`
        ];

        try {
            const response = await fetch('https://node-hangman-api-production.up.railway.app/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: formBody
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch data from the API');
            }
    
            const data = await response.json();
            console.log(data.word);

            const currentWord = data.word.toUpperCase(); 
            return currentWord;
    
        } catch (error) {
            console.error("Échec lors de la récupération des données de l'API:", error);
            this.setState({ errorMessage: "Échec lors de la récupération des données de l'API. Veuillez réessayer plus tard." });
            return "WORD";
        }
    }
    
    // INITIALISER LE JEU
    initGame = async () => {
        try {
            const currentWord = await this.pickNewWord(this.state.locale);
            this.setState({
                currentWord: currentWord,
                usedLetter: [],
                win: 0,
                attempt: 0
            });
    
        } catch (error) {
            console.error('Erreur lors du lacement du jeu:', error);
        }
    }
    

    // LE RENDU SUR LA PAGE
    render() {
        return(
           <div id="wrapper" className={this.state.currentWord ? "game-started" : ""}>
                <h1>Jeu du pendu</h1>
                <div className="game">
                    <div className="languages">
                        <button onClick={() => this.changeLocale('fr-FR')} disabled={this.state.locale === 'fr-FR'}>Français</button>
                        <button onClick={() => this.changeLocale('en-GB')} disabled={this.state.locale === 'en-GB'}>English</button>
                    </div>
                   

                    {
                        (this.state.currentWord !== null) &&
                            <Lives 
                                attempt= {this.state.attempt}
                                maxAttempt={this.state.maxAttempt}
                            />
                    }

                    {
                        (this.state.currentWord !== null) &&
                            <CurrentWord 
                                currentWord={this.state.currentWord}
                                usedLetter={this.state.usedLetter}
                                win={this.state.win}
                            />
                    }

                    {
                        this.state.win == 0 && this.state.currentWord !== null && 
                        <Keyboard 
                        alphabet={this.state.alphabet} 
                        usedLetter={this.state.usedLetter}
                        action={this.clickLetter}
                        />
                    }

                    {
                        this.state.win === 1 &&
                            <p className="result">GAGNÉ !!!</p>
                    }

                    {
                        this.state.win === -1 &&
                            <p className="result">PERDU ...</p>
                    }


                    {
                        (this.state.currentWord === null || this.state.win !== 0) &&
                        <button onClick={() => this.initGame()}>Nouvelle partie</button>
                    }

                    {    this.state.errorMessage && (
                            <div className="error-message">{this.state.errorMessage}</div>
                        )
                    }

            
                </div>
            </div>
            
        )
    }
}

export default App;
