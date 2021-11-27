import React from 'react';
import {Link} from 'react-router-dom';

function Error() {
    return (
        <div>
            <p>対象のページが存在しません。以下のリンクからHOMEへお戻りください。</p>
            <Link to="/">HOMEに戻る</Link>
        </div>
    );
}

export default Error;