import React from 'react';
import { LEVELS, POINTS, formatScore } from '../data';
import AnswerButton from './AnswerButton';

const QuestionCard = ({
    question,
    currentIndex,
    totalQuestions,
    status,
    selectedOption,
    hiddenOptions,
    onSelectAnswer,
    }) => (
    <div className="question-card">
        <p className="question-meta">
        {`Câu ${currentIndex + 1}/${totalQuestions} – ${LEVELS[question.level]} – ${formatScore(POINTS[question.level])}`}
        </p>
        <h3 className="question-title">{question.question}</h3>
        <div className="answers-grid">
        {question.options.map((opt, idx) => (
            <AnswerButton
            key={idx}
            index={idx}
            option={opt}
            isHidden={hiddenOptions.includes(idx)}
            status={status}
            selectedOption={selectedOption}
            correctAnswer={question.answer}
            onSelect={onSelectAnswer}
            />
        ))}
        </div>
    </div>
);

export default QuestionCard;
