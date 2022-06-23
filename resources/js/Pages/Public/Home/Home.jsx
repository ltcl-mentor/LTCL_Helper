import React from 'react';
import Authenticated from '@/Layouts/Authenticated';

// ホーム画面
export default function Home(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <h1>Hello world!</h1>
        </Authenticated>
    );
}
