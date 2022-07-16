import React, { useState, useEffect } from 'react';

// infoのロジック
export const useShowInfo = ({ resError }) => {
    const [timeout, setTimeout] = useState(false);

    useEffect(() => {
        resError ? setTimeout(true) : setTimeout(false);
    },[resError]);

    return timeout;
};
