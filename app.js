import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function checkWords(a,b) {
  console.log(a);
  console.log(b);

  if (a.length !== b.length) {
    return false;
  }

  for (let i=0; i < a.length; i++) {
    if (a[i].toUpperCase() !== b[i].toUpperCase()) {
      return false;
    }
  }
  return true;
}

class Header extends React.Component {
  render()  {
    let progress = this.props.currentWindow * 10;

    return (
      <div id="progressDiv">
        <div id="progressBar">
          <span style={{width: progress + "%"}}></span>
        </div>
      </div>
    );
  }
};

class Image extends React.Component {
  render() {
    let path = "url('img/" + this.props.currentWindow + ".png')";

    return (
      <div id="imageDiv" style={{display: "inline-block",
                                 backgroundImage: path}}>
      </div>
    );
  }
};

class Word extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    let currentWordArray = this.props.word.split("");
    let arrayLength = currentWordArray.length;

    return (
      <div id="answerDiv">
        {currentWordArray.map(function(item, i) {
          if (i===0) {
            return <label className="letter" key={i}>{currentWordArray[i]}</label>
          } else if (i === arrayLength-1) {
            return <label className="letter" key={i}>{currentWordArray[i]}</label>   // you can shorten this
          } else {
            return <input className="inputLetter" maxlength={1} key={i} />
          }
        })}
      </div>
    );
  }
};

class Footer extends React.Component {
  checkAnswer() {
    let inputLetters = document.querySelectorAll('.inputLetter');
    let firstLastLetters = document.querySelectorAll('.letter');
    let currentAnswer = firstLastLetters[0].textContent;

    for (let i=0; i<= inputLetters.length-1; i++) {
      currentAnswer = currentAnswer + inputLetters[i].value;
    }

    currentAnswer = currentAnswer + firstLastLetters[1].textContent;

    if (checkWords(currentAnswer,this.props.word)) {
      this.props.updateAnswerStatus("correct", true);
    } else {
      this.props.updateAnswerStatus("incorrect", false);
      for (let i=0; i<= inputLetters.length-1; i++) {
        inputLetters[i].value = '';
      }
    }
  }

  render() {
    return (
      <div id="buttonsDiv">
        {this.props.answerStatus === "correct" && <label id="messageCorrect">Correct!</label>}
        {this.props.answerStatus === "incorrect" && <label id="messageIncorrect">Wrong!</label>}
        {this.props.answerStatus !== "correct" && <a id="checkAnswerButton" onClick={this.checkAnswer.bind(this)}>Check answer</a>}
        <a id="skipQuestionButton" onClick={this.props.skipWord}>
          {this.props.answerStatus !== "correct" && "Skip word"}
          {this.props.answerStatus === "correct" && "Next word"}
        </a>
      </div>
    );
  }
};

class StartScreen extends React.Component {
  submitSettings() {
    let radios = document.getElementsByName("language");
    let dropDown = document.getElementsByName("wordsNumber");
    let selectedNumber = dropDown[0].value;
    let selectedLanguage = "english";

    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
          selectedLanguage = radios[i].value;
          break;
      }
    }

    this.props.updateSettings(selectedLanguage, selectedNumber);
  }

  render() { // to set default value for the radio buttons
    return (
      <div id="startScreen">
        <form>
          <label>{"Welcome to the word quiz. Before we start, please select your options below."}</label>
          <div>
            <label>{"The language you want to test:"}</label>
            <label><input type="radio" name="language" value="english" />English</label>
            <label><input type="radio" name="language" value="german" />German</label>
            <label><input type="radio" name="language" value="french" />French</label>
          </div>
          <div>
            <label>{"How many words you want to test:"}</label>
            <select name="wordsNumber" >
              <option value="5" >{"5"}</option>
              <option value="10">{"10"}</option>
              <option value="15">{"15"}</option>
              <option value="20">{"20"}</option>
            </select>
          </div>
        </form>

        <div id="buttonsDiv">
          <a id="skipQuestionButton" onClick={this.submitSettings.bind(this)}>{"Start"}</a>
        </div>
      </div>
    );
  }
}

class Window extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div id="window">
        <Header currentWindow={this.props.currentWindow}
                answerStatus={this.props.answerStatus} />
        {this.props.currentWindow !== "start" &&
         this.props.currentWindow !== "end" &&
            <Image currentWindow={this.props.currentWindow} />}
        {this.props.currentWindow !== "start" &&
         this.props.currentWindow !== "end" &&
            <Word word={this.props.words[this.props.currentWindow][this.props.currentLanguage]} />}
        {this.props.currentWindow !== "start" &&
         this.props.currentWindow !== "end" &&
            <Footer answerStatus={this.props.answerStatus}
                    word={this.props.words[this.props.currentWindow][this.props.currentLanguage]}
                    currentWindow={this.props.currentWindow}
                    skipWord={this.props.skipWord}
                    updateAnswerStatus={this.props.updateAnswerStatus} />}
        {this.props.currentWindow === "start" &&
            <StartScreen updateSettings={this.props.updateSettings} />}
      </div>
    );
  }
};

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        wordlist: [
          {
            index: 0,
            english: "apple",
            german: "apfel",
            french: "pomme",
            romanian: "măr"
          },
          {
            index: 1,
            english: "house",
            german: "haus",
            french: "maison",
            romanian: "casă"
          },
          {
            index: 2,
            english: "mushroom",
            german: "pilz",
            french: "champignon",
            romanian: "ciupearcă"
          },
          {
            index: 3,
            english: "book",
            german: "buch",
            french: "livre",
            romanian: "carte"
          },
          {
            index: 4,
            english: "bird",
            german: "vogel",
            french: "oiseau",
            romanian: "pasăre"
          },
          {
            index: 5,
            english: "flower",
            german: "blume",
            french: "fleur",
            romanian: "floare"
          }
        ],
        score: 0,
        currentWindow: "start",
        currentLanguage: "french",
        maxCounter: 5,
        answerStatus: "unanswered" // possible states: unanswered, correct, incorrect
    };
  }

  updateAnswerStatus(status, correct) {
    this.setState( { answerStatus: status } );

    if (correct) {
      let temp = this.state.score + 1; // maybe use something more elegant here?
      this.setState( { score: temp } );
    }
  }

  updateSettings(language, wordsNumber) {
    this.setState( { maxCounter: wordsNumber,
                     currentLanguage: language,
                     currentWindow: 0} );
  }

  skipWord() {
    let inputLetters = document.querySelectorAll('.inputLetter');

    if (this.state.currentWindow < this.state.maxCounter) {
      console.log("Skipping!");
      let temp = this.state.currentWindow + 1;  // maybe use something more elegant here?
      this.setState( { currentWindow: temp });
    }

    for (let i=0; i<= inputLetters.length-1; i++) {
      inputLetters[i].value = '';
    }

    this.updateAnswerStatus("unanswered", false);
  }

  render() {
    return (
      <Window score={this.state.score}
              currentWindow={this.state.currentWindow}
              currentLanguage={this.state.currentLanguage}
              words={this.state.wordlist}
              skipWord={this.skipWord.bind(this)}
              answerStatus={this.state.answerStatus}
              updateSettings={this.updateSettings.bind(this)}
              updateAnswerStatus={this.updateAnswerStatus.bind(this)} />
    );
  }

};

ReactDOM.render(<Application />, document.getElementsByTagName("main")[0]);



/*  Example of component class w/ initial state

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Hello World'
        };
    }
    render() {
        return (
            <div>
                {this.state.text}
            </div>
        );
    }
}*/
