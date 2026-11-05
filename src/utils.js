import { POINTS, STREAK_BONUS } from './data';

export const calcScore = (results, questions) =>
    results.reduce(
        ({ score, streak }, res, i) => {
        if (!questions[i]) return { score, streak };
        if (res === 'correct') {
            const nextStreak = streak + 1;
            const bonus = nextStreak >= 3 ? STREAK_BONUS : 0;
            return {
            score: score + POINTS[questions[i].level] + bonus,
            streak: nextStreak,
            };
        }
        return res === 'wrong' ? { score, streak: 0 } : { score, streak };
        },
        { score: 0, streak: 0 }
    );
