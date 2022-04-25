import React from 'react';
import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import Breadcrumbs from './Breadcrumbs';

/**
 * Routejsに記述されていないURLにアクセスがあった場合に表示
 */
const Error = () => {
    return (
        <div style={{ width: '90%', margin: '0 auto' }}>
            <Breadcrumbs page="not_found" />
            <Card sx={{ width: '90%', margin: '0 auto', backgroundColor: "#ECE9E9" }}>
                <Typography align="center" variant="h4" sx={{ fontWeight: 'bold', pb: 2 }}>
                    Not Found
                </Typography>
                <Typography align="center">
                    お探しのページは見つかりませんでした。<br/>
                    以下のリンクからHOMEへお戻り下さい。
                </Typography>
                <Typography component="div" align="center" sx={{ pt: 2 }}>
                    <Link to="/">HOMEに戻る</Link>
                </Typography>
            </Card>
        </div>
    );
};

export default Error;