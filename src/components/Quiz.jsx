import { useCallback, useState } from 'react';

import quizComplete from '../assets/quiz-complete.png';
import Question from './Question.jsx';
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

    const handleSkipAnswer = useCallback(() =>
        handleSelectAnswer(null), [handleSelectAnswer]);

    if (quizIsComplete) {
        return (<div id="summary">
            <img src={quizComplete} />
            <h2>Quiz is Complete</h2>
        </div>
        );
    }

    return (
        <div id="quiz">
            <div id="question">
                <Question
                    questionIndex={activeQuestionIndex}
                    //questionText={QUESTIONS[activeQuestionIndex].text}
                    //answers={QUESTIONS[activeQuestionIndex].answers}
                    onSelectAnswer={handleSelectAnswer}
                    //answerState={answerState}
                    //selectedAnswer={userAnswers[userAnswers.length - 1]}
                    onSkipAnswer={handleSkipAnswer}
                />

            </div>
        </div>
    );

}