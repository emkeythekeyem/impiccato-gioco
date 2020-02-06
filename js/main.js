class Hangman {
    constructor() {
        this.pressedLetters = [];
        this.wrongLetters = [];
        this.rightLetters = [];
        this.hangmanStatus = 0;
        this.word = "";
    }
    handleGetRandomWord() {
        let wordsFiltered = words.filter(function (element) {
            return element.length >= 5
        });
        let randomIndex = Math.floor(Math.random() * (wordsFiltered.length - 0)) + 0; //Il max è escluso e il min è incluso
        this.word = wordsFiltered[randomIndex].split("");
    }
    handleDrawHiddenWord() {
        this.pressedLetters = [];
        this.wrongLetters = [];
        this.rightLetters = [];
        this.hangmanStatus = 0;
        this.word = "";

        let wrongLettersElement = document.querySelector(".wrong-letters .letters")
        wrongLettersElement.innerHTML = "";

        let gameElement = document.querySelector(".game")
        gameElement.classList.remove("hide")

        let overlayElement = document.querySelector(".overlay")
        let overlayElementSubElementResultLose = document.querySelector(`.overlay .lose`)
        let overlayElementSubElementResultWin = document.querySelector(`.overlay .win`)
        overlayElement.classList.add("hide");
        overlayElementSubElementResultLose.classList.add("hide");
        overlayElementSubElementResultWin.classList.add("hide");

        this.handleGetRandomWord();
        let wordContainerElement = document.querySelector(".word");
        wordContainerElement.innerHTML = "";
        let wordLength = this.word.length;

        for (let index = 0; index < wordLength; index++) {
            let letterElement = document.createElement("span");
            letterElement.innerHTML = "&nbsp;";
            wordContainerElement.append(letterElement);
        }
        let _this = this;
        document.addEventListener("keypress", e => this.listenLetter(e, _this));
    }
    handleWriteLetter() {
        let letterElements = document.querySelectorAll(".word span")
        this.rightLetters.forEach((rightLetter) => {
            let foundIndexes = []
            this.word.some(function (x, i) {
                if (x.toLowerCase() === rightLetter.toLowerCase())
                    foundIndexes.push(i);
            });
            foundIndexes.forEach((index) => {
                letterElements[index].innerHTML = rightLetter;
            })
        })

        if (this.rightLetters.length === [...new Set(this.word)].length && this.hangmanStatus <= 5) {
            this.handleWin()
        }

    }
    handleDrawHangman() {
        let hangmanElement = document.querySelector(".hangman")

        switch (this.hangmanStatus) {
            case 1:
                document.querySelector(".head").classList.toggle("hide")
                break;
            case 2:
                document.querySelector(".chest").classList.toggle("hide")
                break;
            case 3:
                document.querySelector(".l-hand").classList.toggle("hide")
                break;
            case 4:
                document.querySelector(".r-hand").classList.toggle("hide")
                break;
            case 5:
                document.querySelector(".l-leg").classList.toggle("hide")
                break;
            case 6:
                document.querySelector(".r-leg").classList.toggle("hide")
                this.handleLost()
                break;
        }

    }
    handleWin() {
        let gameElement = document.querySelector(".game")
        gameElement.classList.toggle("hide")
        this.toggleOverlay("win")
    }
    handleLost() {
        let gameElement = document.querySelector(".game")
        gameElement.classList.toggle("hide");
        this.toggleOverlay("lose")
    }
    toggleOverlay(status) {
        let overlayElement = document.querySelector(".overlay")
        let overlayElementSubElementResult = document.querySelector(`.overlay .${status}`)
        overlayElement.classList.toggle("hide");
        overlayElementSubElementResult.classList.toggle("hide");
    }
    listenLetter(e, _this) {
        let wrongLettersElement = document.querySelector(".wrong-letters .letters")
        let letter = e.code.replace("Key", "");
        if (letter.charCodeAt(0) >= 65 && letter.charCodeAt(0) <= 90) {
            if (!this.pressedLetters.includes(letter)) {
                if (!this.word.includes(letter.toLowerCase())) {
                    this.hangmanStatus++
                    this.wrongLetters.push(letter)
                    wrongLettersElement.innerHTML = this.wrongLetters.join(" , ")
                    this.handleDrawHangman();
                } else {
                    this.rightLetters.push(letter)
                    this.handleWriteLetter()
                }

                this.pressedLetters.push(letter);
                this.pressedLetters = [...new Set(this.pressedLetters)];
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", event => {
    let hangman = new Hangman();
    hangman.handleDrawHiddenWord();
    document.querySelectorAll(".restart").forEach((el) => {
        el.addEventListener("click", () => {


            hangman.handleDrawHiddenWord()
        })
    })
});