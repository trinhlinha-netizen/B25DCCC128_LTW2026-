import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { LEVELS, POINTS, LETTERS, formatScore } from '../data';

const QuestionDetail = ({ questions }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const numId = Number(id);
    const question = questions.find((q) => q.id === numId);

    if (!question) {
        return (
        <div className="card">
            <p>Không tìm thấy câu hỏi</p>
            <button type="button" onClick={() => navigate(-1)}>
            Quay lại
            </button>
        </div>
        );
    }

    const prevQ = questions.find((q) => q.id === numId - 1);
    const nextQ = questions.find((q) => q.id === numId + 1);

    return (
        <div className="card">
        <h2>
            {`Câu hỏi số ${question.id} (${LEVELS[question.level]} - ${formatScore(POINTS[question.level])})`}
        </h2>
        <p className="detail-question-text">{question.question}</p>

        <div className="detail-options">
            {question.options.map((opt, idx) => {
            const isCorrect = idx === question.answer;
            return (
                <div
                key={idx}
                className={
                    isCorrect ? 'detail-option correct-option' : 'detail-option'
                }
                >
                {`${LETTERS[idx]}. ${opt}${isCorrect ? ' (Đáp án đúng)' : ''}`}
                </div>
            );
            })}
        </div>

        <div className="detail-navigation">
            <span>
            {prevQ && <Link to={`/questions/${prevQ.id}`}>← Câu trước</Link>}
            </span>
            <span>
            {nextQ && <Link to={`/questions/${nextQ.id}`}>Câu sau →</Link>}
            </span>
        </div>

        <button
            type="button"
            className="secondary-btn"
            onClick={() => navigate(-1)}
        >
            Quay lại
        </button>
        </div>
    );
};

export default QuestionDetail;
