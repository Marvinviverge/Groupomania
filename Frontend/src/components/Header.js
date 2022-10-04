import React from 'react';
import { Link } from 'react-router-dom';

const header = () => {
    return (
        <div className='Header'>
            <header>
                <nav>
                    <ul>
                        <li><Link to="/Home">Accueil</Link></li>
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default header;