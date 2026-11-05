import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { formatScore } from '../data';

const Result = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) return <Navigate to="/" replace />;

    const { name, score, correctCount, livesLeft, reason } = state;

    let title = 'Bạn đã hoàn thành thử thách';
    if (reason === 'perfect' || correctCount === 15) {
        title = 'Xuất sắc! Bạn đã trả lời đúng cả 15 câu';
    } else if (reason === 'out_of_lives') {
        title = 'Bạn đã hết mạng';
    } else if (reason === 'timeout') {
        title = 'Hết giờ!';
    }

    return (
        <div className="card">
        <h2>{title}</h2>
        <div className="result-details">
            <p>{`Người chơi: ${name}`}</p>
            <p>{`Số câu trả lời đúng: ${correctCount}`}</p>
            <p>{`Số mạng còn lại: ${livesLeft}`}</p>
            <p className="final-score">{`Điểm: ${formatScore(score)}`}</p>
        </div>
        <div className="result-actions">
            <button type="button" onClick={() => navigate('/play')}>
            Chơi lại
            </button>
            <button
            type="button"
            className="secondary-btn"
            onClick={() => navigate('/')}
            >
            Về trang chủ
            </button>
        </div>
        </div>
    );
};

export default Result;
