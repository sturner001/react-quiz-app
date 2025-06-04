import { useState } from 'react';
import quizComplete from '../assets/quiz-complete.png';
import QuestionTimer from './QuestionTimer.jsx';
import QUESTIONS from '../questions.js';

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });

    }

    if (quizIsComplete) {
        return <div id="summary">
            <img src={quizComplete} />
            <h2>Quiz is Complete</h2>
        </div>
    }
    const shuffleAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffleAnswers.sort(() => Math.random() - 0.5);

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer
                    timeout={10000}
                    onTimeout={() => handleSelectAnswer(null)}
                />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {QUESTIONS[activeQuestionIndex].answers.map((answer) => (
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>



                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

}