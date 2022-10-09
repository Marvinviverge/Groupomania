import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Home } from '@/pages/Public';

import Error from '@/_utils/Error';

const PublicRouter = () => {
    return (
        <Routes>
            <Route path='home' element={<Home />} />
            <Route path='*' element={<Error />} />
        </Routes>
    );
};

export default PublicRouter;