import React from 'react';
import ReactDOM from 'react-dom';

var ImageDivStyles = {
  display: "inline-block",
  backgroundImage: "url('img/placeholder.png')" }; // to get rid of this variable later

function Application() {
  return (
    <div id="window">
      <div id="progressDiv">
        <div id="progressBar">
          <span></span>
        </div>
      </div>
      <div id="imageDiv" style={ImageDivStyles}></div>
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
      <div id="buttonsDiv">
        <label id="messageCorrect">Correct!</label>
        <a id="checkAnswerButton">Check answer</a>
        <a id="skipQuestionButton">Skip question</a>
      </div>
    </div>
  );
};

ReactDOM.render(<Application />, document.getElementsByTagName("main")[0]);
