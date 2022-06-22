import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function Lockout() {
    return (
        <>
            <div>
                複数回連続でログインに失敗したためアカウントがロックされました。<br />
                ロックを解除するには、メンターにお問い合わせください。
            </div>
            <Link href="/login">ログインページに戻る</Link>
        </>
    );
}
