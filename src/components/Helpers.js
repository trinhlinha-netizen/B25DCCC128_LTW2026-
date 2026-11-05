import React from 'react';
import { MAX_LIVES } from '../data';

const Helpers = ({
    status,
    lives,
    usedHelpers,
    onUseFiftyFifty,
    onUseSkip,
    onUseExtraLife,
    }) => {
    const canUse = status === 'answering';

    return (
        <div className="helpers-bar">
        <button
            type="button"
            disabled={!canUse || usedHelpers.fiftyFifty}
            onClick={onUseFiftyFifty}
        >
            50:50
        </button>
        <button
            type="button"
            disabled={!canUse || usedHelpers.skip}
            onClick={onUseSkip}
        >
            Bỏ qua
        </button>
        <button
            type="button"
            disabled={!canUse || usedHelpers.extraLife || lives >= MAX_LIVES}
            onClick={onUseExtraLife}
        >
            Thêm 1 mạng
        </button>
        </div>
    );
};

export default Helpers;
