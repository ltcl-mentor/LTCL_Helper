import React from 'react';
import ReactDOM from 'react-dom';

class Create extends React.Component{
    constructor(props){
        super(props);
        let question_validation = document.getElementById('question_validation').textContent;
        let question_old = document.getElementById('question_old').textContent;
        let comment_validation = document.getElementById('comment_validation').textContent;
        let comment_old = document.getElementById('comment_old').textContent;
        this.state={
            category: 0,
            topic: 0,
            question_validation: question_validation,
            comment_validation: comment_validation,
            question_old: question_old,
            comment_old: comment_old,
        };
    }
    
    handleCategory(number)
    {
        this.setState({ category: number });
    }
    
    handleTopic(number)
    {
        this.setState({ topic: number });
    }
    
    changeQuestion(event) {
        this.setState({ question_old: event.target.value });
    }
    
    changeComment(event) {
        this.setState({ comment_old: event.target.value });
    }
    
    render(){
        let topic;
        if(this.state.category===0){
            topic=(
                <div className="carriculum">
                    <label className="radios"><input type="radio" name="post[topic]" value="0" onClick={() => { this.handleTopic(0) }}/>AWS</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="1" onClick={() => { this.handleTopic(1) }}/>HTML</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="2" onClick={() => { this.handleTopic(2) }}/>CSS</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="3" onClick={() => { this.handleTopic(3) }}/>JavaScript</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="4" onClick={() => { this.handleTopic(4) }}/>PHP</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="5" onClick={() => { this.handleTopic(5) }}/>Laravel</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="6" onClick={() => { this.handleTopic(6) }}/>DB</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="7" onClick={() => { this.handleTopic(7) }}/>Git&GitHub</label>
                </div>
            );
        }else{
            topic=(
                <div className="portfolio">
                    <label className="radios"><input type="radio" name="post[topic]" value="8" onClick={() => { this.handleTopic(8) }}/>環境構築</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="9" onClick={() => { this.handleTopic(9) }}/>設計図</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="10" onClick={() => { this.handleTopic(10) }}/>デプロイ</label>
                    <label className="radios"><input type="radio" name="post[topic]" value="11" onClick={() => { this.handleTopic(11) }}/>API</label>
                </div>
            );
        }
        
        let curriculum_number;
        if(this.state.category===0){
            if(this.state.topic===0){
                curriculum_number=(
                    <select name="post[curriculum_number]" className="pulldown" required>
                        <option value="">選択してください。</option>
                        <option value="1-1-1">1-1-1</option>
                    </select>
                );
            }else if(this.state.topic===1){
                curriculum_number=(
                    <select name="post[curriculum_number]" className="pulldown" required>
                        <option value="">選択してください。</option>
                        <option value="2-1-1">2-1-1</option>
                        <option value="2-1-2">2-1-2</option>
                        <option value="2-1-3">2-1-3</option>
                    </select>
                );
            }else if(this.state.topic===2){
                curriculum_number=(
                    <select name="post[curriculum_number]" className="pulldown" required>
                        <option value="">選択してください。</option>
                        <option value="3-1-1">3-1-1</option>
                    </select>
                );
            }else if(this.state.topic===3){
                curriculum_number=(
                    <select name="post[curriculum_number]" className="pulldown" required>
                        <option value="">選択してください。</option>
                        <option value="4-1-1">4-1-1</option>
                        <option value="4-1-2">4-1-2</option>
                        <option value="4-1-3">4-1-3</option>
                        <option value="4-1-4">4-1-4</option>
                    </select>
                );
            }else if(this.state.topic===4){
                curriculum_number=(
                    <select name="post[curriculum_number]" className="pulldown" required>
                        <option value="">選択してください。</option>
                        <option value="5-1-1">5-1-1</option>
                    </select>
                );
            }else if(this.state.topic===5){
                curriculum_number=(
                    <select name="post[curriculum_number]" className="pulldown" required>
                        <option value="">選択してください。</option>
                        <option value="6-1-1">6-1-1</option>
                        <option value="6-2-1">6-2-1</option>
                    </select>
                );
            }else if(this.state.topic===6){
                curriculum_number=(
                    <select name="post[curriculum_number]" className="pulldown" required>
                        <option value="">選択してください。</option>
                        <option value="7-1-1">7-1-1</option>
                    </select>
                );
            }else if(this.state.topic===7){
                curriculum_number=(
                    <select name="post[curriculum_number]" className="pulldown" required>
                        <option value="">選択してください。</option>
                        <option value="8-1-1">8-1-1</option>
                        <option value="8-2-1">8-2-1</option>
                        <option value="8-3-1">8-3-1</option>
                        <option value="8-4-1">8-4-1</option>
                        <option value="8-5-1">8-5-1</option>
                        <option value="8-6-1">8-6-1</option>
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
                    <label className="radios"><input type="radio" name="post[category]" value="0" onClick={() => { this.handleCategory(0) }}/>カリキュラム</label>
                    <label className="radios"><input type="radio" name="post[category]" value="1" onClick={() => { this.handleCategory(1) }}/>成果物</label>
                </div>
                <div className="content">
                    <h2 className="title">トピックの選択</h2>
                    { topic }
                </div>
                <div className="content">
                    <h2 className="title">該当カリキュラムの選択</h2>
                    { curriculum_number }
                </div>
                <div className="content">
                    <h2 className="title">質問内容を入力</h2>
                    <p className="errorMassage">{ this.state.question_validation }</p>
                    <textarea name="post[question]" placeholder="質問内容を簡潔に入力" rows="8" value={ this.state.question_old } onChange={(event) => { this.changeQuestion(event) }}/>
                </div>
                <div className="content">
                    <h2 className="title">問題解決のヒントやコメントを入力してください。</h2>
                    <p className="errorMassage">{ this.state.comment_validation }</p>
                    <textarea name="post[comment]" placeholder="あくまでもヒントにとどめるようにしてください。" rows="8" value={ this.state.comment_old } onChange={(event) => { this.changeComment(event) }}/>
                </div>
                <div className="submit">
                    <button type="submit">登録する</button>
                </div>
            </div>
        );
    }
}

export default Create;

if (document.getElementById('Create')) {
    ReactDOM.render(<Create />, document.getElementById('Create'));
}
