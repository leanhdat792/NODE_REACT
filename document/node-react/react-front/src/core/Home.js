import React from 'react';
import Posts from '../post/Posts';

const Home = () => {
    return (
        <div>
            <div className="p-5 mb-4 bg-light rounded-3">
                <h2>Home</h2>
                <p className="lead">Welcome to React Frontend</p>
            </div>
            <div className="container fluid">
                <Posts />
            </div>
        </div>
    )
}

export default Home;