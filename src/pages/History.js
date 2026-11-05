import React from 'react';
import { formatScore } from '../data';

const History = ({ history, onClearHistory }) => {
    if (history.length === 0) {
        return (
        <div className="card">
            <h2>Lịch sử các lượt chơi</h2>
            <p>Chưa có lượt chơi nào</p>
        </div>
        );
    }

    const stats = history.reduce(
        (acc, item) => ({
        count: acc.count + 1,
        maxScore: Math.max(acc.maxScore, item.score),
        totalCorrect: acc.totalCorrect + item.correctCount,
        }),
        { count: 0, maxScore: 0, totalCorrect: 0 }
    );

    const sorted = [...history].sort((a, b) =>
        b.score !== a.score ? b.score - a.score : b.livesLeft - a.livesLeft
    );

    return (
        <div className="card">
        <h2>Lịch sử các lượt chơi</h2>
        <div className="history-stats">
            <p>{`Số lượt chơi: ${stats.count}`}</p>
            <p>{`Điểm cao nhất: ${formatScore(stats.maxScore)}`}</p>
            <p>{`Tổng số câu trả lời đúng: ${stats.totalCorrect}`}</p>
        </div>
        <button type="button" className="danger-btn" onClick={onClearHistory}>
            Xóa lịch sử
        </button>
        <table className="data-table">
            <thead>
            <tr>
                <th>Người chơi</th>
                <th>Số câu đúng</th>
                <th>Mạng còn lại</th>
                <th>Điểm</th>
                <th>Thời gian</th>
            </tr>
            </thead>
            <tbody>
            {sorted.map((item) => (
                <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.correctCount}</td>
                <td>{item.livesLeft}</td>
                <td>{formatScore(item.score)}</td>
                <td>{item.playedAt}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default History;
