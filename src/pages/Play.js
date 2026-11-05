import React, { useState, useEffect, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { TOTAL_TIME, MAX_LIVES, LETTERS } from '../data';
import { calcScore } from '../utils';
import StatusBar from '../components/StatusBar';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import Helpers from '../components/Helpers';

const Play = ({ questions, playerName, onAddHistory }) => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [results, setResults] = useState([]);
    const [lives, setLives] = useState(MAX_LIVES);
    const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
    const [status, setStatus] = useState('answering');
    const [selectedOption, setSelectedOption] = useState(null);
    const [hiddenOptions, setHiddenOptions] = useState([]);
    const [usedHelpers, setUsedHelpers] = useState({
        fiftyFifty: false,
        skip: false,
        extraLife: false,
    });

    const { score, streak } = calcScore(results, questions);
    const currentQuestion = questions[currentIndex];

    const finishGame = useCallback(
        (finalResults, finalLives, reason) => {
        const { score: finalScore } = calcScore(finalResults, questions);
        const correctCount = finalResults.filter((r) => r === 'correct').length;
        const cleanName = playerName.trim();

        onAddHistory({
            id: Date.now(),
            name: cleanName,
            score: finalScore,
            correctCount,
            livesLeft: finalLives,
            playedAt: new Date().toLocaleString('vi-VN'),
        });

        navigate('/result', {
            replace: true,
            state: {
            name: cleanName,
            score: finalScore,
            correctCount,
            livesLeft: finalLives,
            reason,
            },
        });
        },
        [questions, playerName, onAddHistory, navigate]
    );

    useEffect(() => {
        if (!playerName.trim() || !questions.length) return undefined;
        document.title = `Câu ${currentIndex + 1}/${questions.length} – còn ${lives} mạng`;
        return () => {
        document.title = 'Thử thách 3 mạng';
        };
    }, [currentIndex, lives, questions.length, playerName]);

    useEffect(() => {
        if (!playerName.trim() || status !== 'answering' || !questions.length) {
        return undefined;
        }
        const id = setInterval(() => {
        setTimeLeft((t) => (t <= 1 ? 0 : t - 1));
        }, 1000);
        return () => clearInterval(id);
    }, [status, playerName, questions.length]);

    useEffect(() => {
        if (timeLeft === 0 && status === 'answering' && playerName.trim()) {
        finishGame(results, lives, 'timeout');
        }
    }, [timeLeft, status, results, lives, playerName, finishGame]);

    useEffect(() => {
        if (!currentQuestion) return undefined;
        let timerId;

        if (status === 'locked') {
        timerId = setTimeout(() => setStatus('revealed'), 1000);
        } else if (status === 'revealed') {
        timerId = setTimeout(() => {
            const isCorrect = selectedOption === currentQuestion.answer;
            const nextResults = [...results, isCorrect ? 'correct' : 'wrong'];
            const nextLives = isCorrect ? lives : lives - 1;

            if (nextLives === 0) {
            finishGame(nextResults, 0, 'out_of_lives');
            } else if (currentIndex === questions.length - 1) {
            const allCorrect =
                nextResults.filter((r) => r === 'correct').length ===
                questions.length;
            finishGame(nextResults, nextLives, allCorrect ? 'perfect' : 'completed');
            } else {
            setResults(nextResults);
            setLives(nextLives);
            setCurrentIndex((i) => i + 1);
            setSelectedOption(null);
            setHiddenOptions([]);
            setStatus('answering');
            }
        }, 1000);
        }

        return () => clearTimeout(timerId);
    }, [
        status,
        currentQuestion,
        selectedOption,
        results,
        lives,
        currentIndex,
        questions.length,
        finishGame,
    ]);

    const handleSelectAnswer = useCallback(
        (idx) => {
        if (status !== 'answering' || hiddenOptions.includes(idx)) return;
        setSelectedOption(idx);
        setStatus('locked');
        },
        [status, hiddenOptions]
    );

    useEffect(() => {
        if (!playerName.trim()) return undefined;
        const handleKey = (e) => {
        const idx = LETTERS.indexOf(e.key.toUpperCase());
        if (idx !== -1) handleSelectAnswer(idx);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [handleSelectAnswer, playerName]);

    if (!playerName.trim()) return <Navigate to="/" replace />;
    if (!currentQuestion) return null;

    const handleFiftyFifty = () => {
        const wrongs = [0, 1, 2, 3].filter((i) => i !== currentQuestion.answer);
        const twoWrongs = [...wrongs].sort(() => Math.random() - 0.5).slice(0, 2);
        setHiddenOptions(twoWrongs);
        setUsedHelpers((prev) => ({ ...prev, fiftyFifty: true }));
    };

    const handleSkip = () => {
        const nextResults = [...results, 'skip'];
        setUsedHelpers((prev) => ({ ...prev, skip: true }));
        if (currentIndex === questions.length - 1) {
        finishGame(nextResults, lives, 'completed');
        } else {
        setResults(nextResults);
        setCurrentIndex((i) => i + 1);
        setSelectedOption(null);
        setHiddenOptions([]);
        setStatus('answering');
        }
    };

    const handleExtraLife = () => {
        setLives((l) => Math.min(l + 1, MAX_LIVES));
        setUsedHelpers((prev) => ({ ...prev, extraLife: true }));
    };

    return (
        <div className="play-page">
        <StatusBar
            timeLeft={timeLeft}
            lives={lives}
            score={score}
            streak={streak}
        />
        <ProgressBar
            totalQuestions={questions.length}
            currentIndex={currentIndex}
            results={results}
        />
        <Helpers
            status={status}
            lives={lives}
            usedHelpers={usedHelpers}
            onUseFiftyFifty={handleFiftyFifty}
            onUseSkip={handleSkip}
            onUseExtraLife={handleExtraLife}
        />
        <QuestionCard
            question={currentQuestion}
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            status={status}
            selectedOption={selectedOption}
            hiddenOptions={hiddenOptions}
            onSelectAnswer={handleSelectAnswer}
        />
        </div>
    );
};

export default Play;
