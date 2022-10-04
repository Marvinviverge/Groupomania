import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';

const layout = () => {
    return (
        <div className='Layout'>
            <Header />
            <Outlet />
        </div>
    );
};

export default layout;