import { useCallback, useState } from 'react';
import quizComplete from '../assets/quiz-complete.png';
import Question from './Question.jsx';
import QUESTIONS from '../questions.js';

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const [answerState, setAnswerState] = useState('');
    const activeQuestionIndex =
        answerState === '' ? userAnswers.length : userAnswers.length - 1;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setAnswerState('answered');
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });
        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct');
            } else {
                setAnswerState('wrong');
            }
            setTimeout(() => {
                setAnswerState('');
            }, 2000);
        }, 1000);
    }, [activeQuestionIndex]);

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
                    key={activeQuestionIndex}
                    questionText={QUESTIONS[activeQuestionIndex].text}
                    answers={QUESTIONS[activeQuestionIndex].answers}
                    onSelectAnswer={handleSelectAnswer}
                    answerState={answerState}
                    selectedAnswer={userAnswers[userAnswers.length - 1]}
                    onSkipAnswer={handleSkipAnswer}
                />

            </div>
        </div>
    );

}