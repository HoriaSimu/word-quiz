import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

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
            return <input className="inputLetter" maxlength={1} key={i} />
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
        <a id="skipQuestionButton" onClick={this.props.skipWord}>Skip question</a>
      </div>
    );
  }
};

class Window extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        answerStatus : "unanswered"
        // possible states: unanswered, correct, incorrect
    };
  }

  render() {
    return (
      <div id="window">
        <Header currentWindow={this.props.currentWindow}
                answerStatus={this.state.answerStatus} />
        <Image currentWindow={this.props.currentWindow}/>
        <Word word={this.props.words[this.props.currentWindow]} />
        <Footer answerStatus={this.state.answerStatus}
                currentWindow={this.state.currentWindow}
                skipWord={this.props.skipWord} />
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
        currentWindow: 1,
        maxCounter: 5
    };
  }

  skipWord() {
    if (this.state.currentWindow < this.state.maxCounter) {
      console.log("Skipping!");
      let temp = this.state.currentWindow + 1;  // maybe use something more elegant here?
      this.setState( { currentWindow: temp });
    }
  }

  render() {
    return (
      <Window score={this.state.score}
              currentWindow={this.state.currentWindow}
              words={this.state.wordlist}
              skipWord={this.skipWord.bind(this)} />
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
