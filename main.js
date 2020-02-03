class Hangman {
    constructor() {
        this.pressedLetters = [];
        this.wrongLetters = [];
        this.rightLetters = [];
        this.hangmanStatus = 0;
        this.word = "";
    }
    handleGetRandomWord() {
        let randomIndex = Math.floor(Math.random() * (1159 - 0)) + 0; //Il max è escluso e il min è incluso
        this.word = words[randomIndex].split("")
    }
    handleDrawHiddenWord() {
        this.handleGetRandomWord()
        let wordContainerElement = document.querySelector(".word");
        let wordLength = this.word.length;

        for (let index = 0; index < wordLength; index++) {
            let letterElement = document.createElement("span")
            letterElement.innerHTML = " _ ";
            wordContainerElement.append(letterElement)
        }

        this.listenLetter();
    }
    handleDrawHangman(pressedLetter) {
        this.wrongLetters = this.word.find((letter) => letter.toLowerCase() !== pressedLetter.toLowerCase());
        console.log(this.word)
        console.log(this.wrongLetters)
    }
    listenLetter() {
        const log = document.getElementById('log');

        document.addEventListener('keypress', (e) => {
            let letter = e.code.replace("Key", "");
            console.log(e.code.charCodeAt(0))
            if (e.code.charCodeAt(0) >= 65 && e.code.charCodeAt(0) <= 90) {
                console.log(letter)
                this.pressedLetters.push(letter)
                this.pressedLetters = [...new Set(this.pressedLetters)];
                if (this.pressedLetters.find((e) => e !== letter))
                    this.handleDrawHangman(letter);

            }
        });

    }
    handleWrong() {

    }

    handleRight() {

    }

}

document.addEventListener('DOMContentLoaded', (event) => {
    let hangman = new Hangman();
    hangman.handleDrawHiddenWord();
});