import React from 'react';
import { formatScore } from '../data';

const StatusBar = ({ timeLeft, lives, score, streak }) => (
    <div className="status-bar">
        <div className={timeLeft <= 15 ? 'time-warning' : ''}>
        {`Thời gian: ${timeLeft} giây`}
        </div>
        <div>
        {`Mạng: ${lives} `}
        {Array.from({ length: lives }).map((_, i) => (
            <span key={i}>❤️</span>
        ))}
        </div>
        <div>{`Điểm: ${formatScore(score)}`}</div>
        <div>{`Chuỗi đúng: ${streak}`}</div>
    </div>
);

export default StatusBar;
