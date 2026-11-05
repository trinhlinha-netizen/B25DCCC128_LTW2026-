import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TOTAL_TIME, MAX_LIVES, STREAK_BONUS, formatScore } from '../data';

const Home = ({ playerName, setPlayerName, history }) => {
    const navigate = useNavigate();

    const best =
        history.length > 0
        ? [...history].sort((a, b) =>
            b.score !== a.score ? b.score - a.score : b.livesLeft - a.livesLeft
            )[0]
        : null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (playerName.trim()) navigate('/play');
    };

    return (
        <div className="card">
        <h1>Thử thách 3 mạng</h1>
        <div className="rules-box">
            <p>{`Trả lời 15 câu hỏi trong ${TOTAL_TIME} giây với ${MAX_LIVES} mạng.`}</p>
            <p>{`Đúng từ câu thứ 3 liên tiếp được thưởng thêm ${formatScore(STREAK_BONUS)}.`}</p>
            <p>Trả lời sai mất 1 mạng, chuỗi đúng về 0. Có 3 quyền trợ giúp: 50:50, Bỏ qua, Thêm 1 mạng.</p>
        </div>

        {best && (
            <p className="record-banner">
            {`Kỷ lục: ${formatScore(best.score)} – ${best.name}`}
            </p>
        )}

        <form onSubmit={handleSubmit} className="start-form">
            <input
            type="text"
            placeholder="Tên người chơi"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            />
            <button type="submit" disabled={!playerName.trim()}>
            Bắt đầu
            </button>
        </form>
        </div>
    );
    };

export default Home;
