import React from 'react';

const Home = ({ token }) => {
    return (
        <div>
            <h1>Bienvenido al Sistema de Pañol</h1>
            <p>Token: {token}</p>
        </div>
    );
};

export default Home;
