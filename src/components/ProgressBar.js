import React from 'react';

const ProgressBar = ({ totalQuestions, currentIndex, results }) => (
    <div className="progress-bar">
        {Array.from({ length: totalQuestions }).map((_, i) => {
        const res = results[i];
        let cls = 'progress-step';
        if (res === 'correct') cls = `${cls} step-correct`;
        else if (res === 'wrong') cls = `${cls} step-wrong`;
        else if (res === 'skip') cls = `${cls} step-skip`;
        else if (i > currentIndex) cls = `${cls} step-upcoming`;

        if (i === currentIndex) cls = `${cls} step-current`;

        return (
            <div key={i} className={cls}>
            {i + 1}
            </div>
        );
        })}
    </div>
);

export default ProgressBar;
