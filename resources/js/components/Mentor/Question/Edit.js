import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

class Edit extends React.Component{
    constructor(props){
        super(props);
        let question_id = document.getElementById('question_id').textContent;
        let question_validation = document.getElementById('question_validation').textContent;
        let comment_validation = document.getElementById('comment_validation').textContent;
        this.state={
            question_id: question_id,
            question_validation: question_validation,
            comment_validation: comment_validation,
            question_data: [],
            category: '',
            topic: '',
            question: '',
            comment: '',
            categories: ['カリキュラム','成果物'],
            topics: ['AWS', 'HTML', 'CSS', 'JavaScript', 'サーバー', 'PHP' , 'Laravel', 'DB', 'Git&GitHub', '環境構築', '設計図', 'デプロイ', 'API'],
        };
    }
    
    componentDidMount() {
        axios
            .get(`/react/question/${ this.state.question_id }`)
            .then(response => {
                this.setState({
                    question_data: response.data,
                    category: response.data.category,
                    topic: response.data.topic,
                    question: response.data.question,
                    comment: response.data.comment,
                });
 
            }).catch(error => {
                console.log(error);
            });
    }
    
    setting() {
        this.setState({ category: this.state.question_data['category'] });
    }
        
    
    handleCategory(category) {
        this.setState({ category: category });
    }
    
    handleTopic(topic) {
        this.setState({ topic: topic });
    }
    
    changeQuestion(event) {
        this.setState({ question: event.target.value });
    }
    
    changeComment(event) {
        this.setState({ comment: event.target.value });
    }
    
    render(){
        let topic;
        if(this.state.category===0){
            topic=(
                <div className="carriculum">
                    <label className="radios"><input type="radio" name="post[topic]" value="0" onClick={() => { this.handleTopic(0) }} checked={ this.state.topic === 0 }/>AWS</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="1" onClick={() => { this.handleTopic(1) }} checked={ this.state.topic === 1 }/>HTML</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="2" onClick={() => { this.handleTopic(2) }} checked={ this.state.topic === 2 }/>CSS</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="3" onClick={() => { this.handleTopic(3) }} checked={ this.state.topic === 3 }/>JavaScript</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="4" onClick={() => { this.handleTopic(4) }} checked={ this.state.topic === 4 }/>サーバー</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="5" onClick={() => { this.handleTopic(5) }} checked={ this.state.topic === 5 }/>PHP</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="6" onClick={() => { this.handleTopic(6) }} checked={ this.state.topic === 6 }/>Laravel</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="7" onClick={() => { this.handleTopic(7) }} checked={ this.state.topic === 7 }/>DB</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="8" onClick={() => { this.handleTopic(8) }} checked={ this.state.topic === 8 }/>Git&GitHub</label>
                </div>
            );
        }else{
            topic=(
                <div className="portfolio">
                    <label className="radios"><input type="radio" name="post[topic]" value="9" onClick={() => { this.handleTopic(9) }} checked={ this.state.topic === 9 }/>環境構築</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="10" onClick={() => { this.handleTopic(10) }} checked={ this.state.topic === 10 }/>設計図</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="11" onClick={() => { this.handleTopic(11) }} checked={ this.state.topic === 11 }/>デプロイ</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="12" onClick={() => { this.handleTopic(12) }} checked={ this.state.topic === 12 }/>API</label>
                </div>
            );
        }
        
        let curriculum_number;
        if(this.state.category===0){
            if(this.state.topic===0){
                curriculum_number=(
                    <select name="post[curriculum_number]" className="pulldown" required>
                        <option value={ this.state.question_data['curriculum_number'] }>{ this.state.question_data['curriculum_number'] }</option>
                        <option value="1-1-1">1-1-1</option>
                    </select>
                );
            }else if(this.state.topic===1){
                curriculum_number=(
                    <select name="post[curriculum_number]" className="pulldown" required>
                        <option value={ this.state.question_data['curriculum_number'] }>{ this.state.question_data['curriculum_number'] }</option>
                        <option value="2-1-1">2-1-1</option>
                    </select>
                );
            }else if(this.state.topic===2){
                curriculum_number=(
                    <select name="post[curriculum_number]" className="pulldown" required>
                        <option value={ this.state.question_data['curriculum_number'] }>{ this.state.question_data['curriculum_number'] }</option>
                        <option value="2-1-2">2-1-2</option>
                    </select>
                );
            }else if(this.state.topic===3){
                curriculum_number=(
                    <select name="post[curriculum_number]" className="pulldown" required>
                        <option value={ this.state.question_data['curriculum_number'] }>{ this.state.question_data['curriculum_number'] }</option>
                        <option value="2-1-3">2-1-3</option>
                    </select>
                );
            }else if(this.state.topic===4){
                curriculum_number=(
                    <select name="post[curriculum_number]" className="pulldown" required>
                        <option value={ this.state.question_data['curriculum_number'] }>{ this.state.question_data['curriculum_number'] }</option>
                        <option value="3-1-1">3-1-1</option>
                    </select>
                );
            }else if(this.state.topic===5){
                curriculum_number=(
                    <select name="post[curriculum_number]" className="pulldown" required>
                        <option value={ this.state.question_data['curriculum_number'] }>{ this.state.question_data['curriculum_number'] }</option>
                        <option value="4-1-1">4-1-1</option>
                        <option value="4-1-2">4-1-2</option>
                        <option value="4-1-3">4-1-3</option>
                        <option value="4-1-4">4-1-4</option>
                    </select>
                );
            }else if(this.state.topic===6){
                curriculum_number=(
                    <select name="post[curriculum_number]" className="pulldown" required>
                        <option value={ this.state.question_data['curriculum_number'] }>{ this.state.question_data['curriculum_number'] }</option>
                        <option value="5-1-1">5-1-1</option>
                        <option value="8-1-1">8-1-1</option>
                        <option value="8-2-1">8-2-1</option>
                        <option value="8-3-1">8-3-1</option>
                        <option value="8-4-1">8-4-1</option>
                        <option value="8-5-1">8-5-1</option>
                        <option value="8-6-1">8-6-1</option>
                    </select>
                );
            }else if(this.state.topic===7){
                curriculum_number=(
                    <select name="post[curriculum_number]" className="pulldown" required>
                        <option value={ this.state.question_data['curriculum_number'] }>{ this.state.question_data['curriculum_number'] }</option>
                        <option value="6-1-1">6-1-1</option>
                        <option value="6-2-1">6-2-1</option>
                    </select>
                );
            }else if(this.state.topic===8){
                curriculum_number=(
                    <select name="post[curriculum_number]" className="pulldown" required>
                        <option value={ this.state.question_data['curriculum_number'] }>{ this.state.question_data['curriculum_number'] }</option>
                        <option value="7-1-1">7-1-1</option>
                    </select>
                );
            }else{
                curriculum_number=(
                    <div>トピックを選択し直してください。</div>
                );
            }
            
        }else if(this.state.category===1){
            curriculum_number=(
                <select name="post[curriculum_number]" className="pulldown" required>
                    <option value="">選択してください。</option>
                    <option value="成果物">成果物</option>
                </select>
            );
        }
        
        return (
            <div className="container">
                <div className="content">
                    <h2 className="title">カテゴリーの選択</h2>
                    <p>変更前：{ this.state.categories[this.state.question_data['category']] }</p>
                    <label className="radios"><input type="radio" name="post[category]" value="0" onClick={() => { this.handleCategory(0) }} checked={ this.state.category === 0 }/>カリキュラム</label>
                    <label className="radios"><input type="radio" name="post[category]" value="1" onClick={() => { this.handleCategory(1) }} checked={ this.state.category === 1 }/>成果物</label>
                </div>
                <div className="content">
                    <h2 className="title">トピックの選択</h2>
                    <p>変更前：{ this.state.topics[this.state.question_data['topic']] }</p>
                    { topic }
                </div>
                <div className="content">
                    <h2 className="title">該当カリキュラムの選択</h2>
                    <p>変更前：{ this.state.question_data['curriculum_number'] }</p>
                    { curriculum_number }
                </div>
                <div className="content">
                    <h2 className="title">質問内容を入力</h2>
                    <p className="errorMassage">{ this.state.question_validation }</p>
                    <textarea name="post[question]" placeholder="質問内容を簡潔に入力" rows="8" value={ this.state.question } onChange={(event) => { this.changeQuestion(event) }}/>
                </div>
                <div className="content">
                    <h2 className="title">問題解決のヒントやコメントを入力してください。</h2>
                    <p className="errorMassage">{ this.state.comment_validation }</p>
                    <textarea name="post[comment]" placeholder="あくまでもヒントにとどめるようにしてください。" rows="8" value={ this.state.comment } onChange={(event) => { this.changeComment(event) }}/>
                </div>
                <div className="submit">
                    <button type="submit">登録する</button>
                </div>
            </div>
        );
    }
}

export default Edit;

if (document.getElementById('Edit')) {
    ReactDOM.render(<Edit />, document.getElementById('Edit'));
}
