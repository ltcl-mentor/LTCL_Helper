import React from 'react';
import Chip from '@mui/material/Chip';

const info = {
    beginner: { color: "success", label: "初心者向け" },
    amature: { color: "primary", label: "中級者向け" },
    master: { color: "secondary", label: "上級者向け" },
    all: { color: "error", label: "全員向け" }
}

/**
 * ランクチップ
 */
const rankChip = ({ rank, status }) => {
    return (
        <React.Fragment>
            {rank ?
                <Chip variant="outlined" color={info[status].color} label={info[status].label} />
            :
                ""
            }
        </React.Fragment>
    );
}

export default rankChip;
