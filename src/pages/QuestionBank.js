import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LEVELS, POINTS, formatScore } from '../data';

const QuestionBank = ({ questions }) => {
    const [level, setLevel] = useState('all');
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const filtered = questions.filter((q) => {
        const matchLevel = level === 'all' || q.level === Number(level);
        const matchText = q.question
        .toLowerCase()
        .includes(keyword.trim().toLowerCase());
        return matchLevel && matchText;
    });

    const handleRandom = () => {
        if (!filtered.length) return;
        const randomQ = filtered[Math.floor(Math.random() * filtered.length)];
        navigate(`/questions/${randomQ.id}`);
    };

    return (
        <div className="card">
        <h2>Ngân hàng câu hỏi</h2>
        <div className="filter-bar">
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="all">Tất cả</option>
            <option value="1">Dễ</option>
            <option value="2">Trung bình</option>
            <option value="3">Khó</option>
            </select>
            <input
            type="text"
            placeholder="Tìm kiếm câu hỏi..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            />
            <button
            type="button"
            disabled={!filtered.length}
            onClick={handleRandom}
            >
            Câu ngẫu nhiên
            </button>
        </div>

        <p className="question-count">{`Có ${filtered.length} câu hỏi`}</p>

        <table className="data-table">
            <thead>
            <tr>
                <th>STT</th>
                <th>Mức độ</th>
                <th>Điểm</th>
                <th>Câu hỏi</th>
            </tr>
            </thead>
            <tbody>
            {filtered.map((q, idx) => (
                <tr key={q.id}>
                <td>{idx + 1}</td>
                <td>{LEVELS[q.level]}</td>
                <td>{formatScore(POINTS[q.level])}</td>
                <td>
                    <Link to={`/questions/${q.id}`}>{q.question}</Link>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default QuestionBank;
