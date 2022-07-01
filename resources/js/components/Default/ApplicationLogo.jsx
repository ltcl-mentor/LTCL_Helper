import React from 'react';
import { Link } from '@inertiajs/inertia-react';

const ApplicationLogo = () => {
    return (
        <div className="flex">
            <div className="shrink-0 flex items-center">
                <Link href={route('home')}>
                    <img src="/images/helper_logo.png" className="w-40 h-12" />
                </Link>
            </div>
        </div>
    );
}

export default ApplicationLogo;
