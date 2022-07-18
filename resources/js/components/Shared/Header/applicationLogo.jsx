import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import { LogoImage } from '@/Styles/Shared/Header/Header';

const applicationLogo = () => {
    return (
        <div className="flex">
            <div className="shrink-0 flex items-center">
                <Link href={route('home')}>
                    <LogoImage src="/images/helper_logo.png" />
                </Link>
            </div>
        </div>
    );
}

export default applicationLogo;
