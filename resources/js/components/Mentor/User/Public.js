import React from 'react';
import ReactDOM from 'react-dom';
import Forms from './forms';

class Public extends React.Component{
    constructor(props){
        super(props);
        this.state={
            year: '',
            month: '',
            number: '',
        };
    }
 
    setYear(event) {
        const selectedYear = event.target.value;
        this.setState({ year: selectedYear });
    }
    
    setMonth(event) {
        const selectedMonth = event.target.value;
        this.setState({ month: selectedMonth });
    }
    
    setNumber(event) {
        const selectedNumber = event.target.value;
        this.setState({ number: selectedNumber });
    }
    
    render(){
        var today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth();
        
        return (
            <div className="card-body">
                <div>
                    <select onChange={(event) => { this.setYear(event) }} required>
                        <option value="">選択してください。</option>
                        <option value={ year-1 }>{ year-1 }</option>
                        <option value={ year }>{ year }</option>
                        <option value={ year+1 }>{ year+1 }</option>
                    </select>
                    年
                    <select onChange={(event) => { this.setMonth(event) }} required>
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
                    <select onChange={(event) => { this.setNumber(event) }} require>
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
                    </select>
                    名登録する
                    <div className="empty"></div>
                </div>
                <Forms password={ 'ltcl'+this.state.year%100+('0'+this.state.month).slice(-2) } number={ this.state.number } makeForm={ this.state.makeForm }/>
            </div>
        );
    }
}

export default Public;

if (document.getElementById('Public')) {
    ReactDOM.render(<Public />, document.getElementById('Public'));
}
