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
    return (
      <div id="imageDiv" style={ImageDivStyles}></div>
    );
  }
};

class Word extends React.Component {
  render() {
    return (
      <div id="answerDiv">
        <label id="firstLine">c is for...</label>
        <label className="letter">c</label>
        <input className="inputLetter" />
        <input className="inputLetter" />
        <input className="inputLetter" />
        <input className="inputLetter" />
        <input className="inputLetter" />
        <input className="inputLetter" />
        <label className="letter">r</label>
      </div>
    );
  }
};

Word.propTypes = {
  word: PropTypes.string.isRequired
};

class Footer extends React.Component {
  render() {
    return (
      <div id="buttonsDiv">
        <label id="messageCorrect">Correct!</label>
        <a id="checkAnswerButton">Check answer</a>
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
        <Image />
        <Word word={"Placeholder"}/>
        <Footer />
      </div>
    );
  }
};

function Application(props) {
  return (
    <Window />
  );
};

Application.propTypes = {
  words: PropTypes.array.isRequired
};

Application.defaultProps = {

};

ReactDOM.render(<Application words={wordlist}/>, document.getElementsByTagName("main")[0]);
