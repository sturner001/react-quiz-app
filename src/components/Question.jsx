import { useState } from 'react';
import QUESTIONS from '../questions.js';
import QuestionTimer from './QuestionTimer.jsx';
import Answers from './Answers';


export default function Question({
    QuestionIndex,
    //questionText,
    //answers,
    onSelectAnswer,
    //answerState,
    //selectedAnswer,
    onSkipAnswer
}) {

    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });



    function handleSelectAnswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        })

        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: QUESTIONS[QuestionIndex].answer[0] === answer
            })
            setTimeout(() => {
                onSelectAnswer(answer);
            }, 2000)
        }, 1000)
    }

    let answerState = '';
    if (answer.selectedAnswer) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    }

    return (
        <div id="question">
            <QuestionTimer timeout={10000} onTimeout={onSkipAnswer} />
            <h2>{QUESTIONS[QuestionIndex].text}</h2>
            <Answers
                answers={QUESTIONS[QuestionIndex].answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelect={handleSelectAnswer}
            />
        </div>
    );
}