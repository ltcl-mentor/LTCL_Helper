import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

function Home() {
    return (
        <div>OK</div>
    );
}

export default Home;

if (document.getElementById('Home')) {
    ReactDOM.render(<Home />, document.getElementById('Home'));
}