import React from 'react';
import { LETTERS } from '../data';

const AnswerButton = ({
    index,
    option,
    isHidden,
    status,
    selectedOption,
    correctAnswer,
    onSelect,
    }) => {
    if (isHidden) {
        return <button type="button" className="answer-btn hidden-option" disabled />;
    }

    let cls = 'answer-btn';
    if (status === 'locked' && selectedOption === index) cls = `${cls} locked`;
    if (status === 'revealed') {
        if (index === correctAnswer) cls = `${cls} correct`;
        else if (selectedOption === index) cls = `${cls} wrong`;
    }

    return (
        <button
        type="button"
        className={cls}
        disabled={status !== 'answering'}
        onClick={() => onSelect(index)}
        >
        {`${LETTERS[index]}. ${option}`}
        </button>
    );
};

export default AnswerButton;
