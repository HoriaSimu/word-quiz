import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

var ImageDivStyles = {
  display: "inline-block",
  backgroundImage: "url('img/placeholder.png')" }; // to get rid of this variable later

const wordlist = ["apple", "horse", "spoon"];

class Header extends React.Component {
  render()  {
    return (
      <div id="progressDiv">
        <div id="progressBar">
          <span></span>
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
    let currentWordArray = this.props.word.english.split("");
    let arrayLength = currentWordArray.length;

    return (
      <div id="answerDiv">
        {currentWordArray.map(function(item, i) {
          if (i===0) {
            return <label className="letter" key={i}>{currentWordArray[i]}</label>
          } else if (i === arrayLength-1) {
            return <label className="letter" key={i}>{currentWordArray[i]}</label>   // you can shorten this
          } else {
            return <input className="inputLetter" key={i} />
          }
        })}
      </div>
    );
  }
};

class Footer extends React.Component {
  checkAnswer(e) {
    console.log("Answer has been checked", e);
  }

  render() {
    return (
      <div id="buttonsDiv">
        <label id="messageCorrect">Correct!</label>
        <a id="checkAnswerButton" onClick={this.checkAnswer}>Check answer</a>
        <a id="skipQuestionButton">Skip question</a>
      </div>
    );
  }
};

class Window extends React.Component {
  render() {
    return (
      <div id="window">
        <Header />
        <Image currentWindow={this.props.currentWindow}/>
        <Word word={this.props.words[this.props.currentWindow]} />
        <Footer />
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
            english: "",
            german: "",
            french: "",
            romanian: ""
          },
          {
            index: 3,
            english: "",
            german: "",
            french: "",
            romanian: ""
          },
          {
            index: 4,
            english: "",
            german: "",
            french: "",
            romanian: ""
          },
          {
            index: 5,
            english: "",
            german: "",
            french: "",
            romanian: ""
          }
        ],
        score: 0,
        currentWindow: 1,
        maxCounter: 5
    };
  }

  render() {
    return (
      <Window score={this.state.score} currentWindow={this.state.currentWindow} words={this.state.wordlist} />
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
