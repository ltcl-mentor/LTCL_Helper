import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Forms from './forms';

function Public() {
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [number, setNumber] = useState('');

    const handleYear = (event) => {
        setYear(event.target.value);
    };
    
    const handleMonth = (event) => {
        setMonth(event.target.value);
    };
    
    const handleNumber = (event) => {
        setNumber(event.target.value);
    };
    
    var today = new Date();
    let thisYear = today.getFullYear();
    
    return (
        <div className="card-body">
            <div>
                <select onChange={(event) => { handleYear(event) }} required>
                    <option value="">選択してください。</option>
                    <option value={ thisYear-1 }>{ thisYear-1 }</option>
                    <option value={ thisYear }>{ thisYear }</option>
                    <option value={ thisYear+1 }>{ thisYear+1 }</option>
                </select>
                年
                <select onChange={(event) => { handleMonth(event) }} required>
                    <option value="">選択してください。</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>
                月入学者を
                <select onChange={(event) => { handleNumber(event) }} require>
                    <option value="">選択してください。</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                </select>
                名登録する
                <div className="empty"></div>
            </div>
            <Forms
                password={ 'ltcl'+year%100+('0'+month).slice(-2) }
                number={ number }
            />
        </div>
    );
}

export default Public;

if (document.getElementById('User_public_register')) {
    ReactDOM.render(<Public />, document.getElementById('User_public_register'));
}
