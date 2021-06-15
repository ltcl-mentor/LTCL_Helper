import React from 'react';
import ReactDOM from 'react-dom';

class CrriculumNumber extends React.Component{
    constructor(props){
        super(props);
        this.state={
            
        };
    }
    
    render(){
        let curriculum_number;
        if(this.props.category === 0){
            if(this.props.topic === 0){
                curriculum_number = (
                    <select name="post[curriculum_number]" className="pulldown">
                        <option value={ this.props.curriculum_number }>{ this.props.curriculum_number }</option>
                        <option value="1-1-1">1-1-1</option>
                    </select>
                );
            }else if(this.props.topic === 1){
                curriculum_number = (
                    <select name="post[curriculum_number]" className="pulldown">
                        <option value={ this.props.curriculum_number }>{ this.props.curriculum_number }</option>
                        <option value="2-1-1">2-1-1</option>
                    </select>
                );
            }else if(this.props.topic === 2){
                curriculum_number = (
                    <select name="post[curriculum_number]" className="pulldown">
                        <option value={ this.props.curriculum_number }>{ this.props.curriculum_number }</option>
                        <option value="2-1-2">2-1-2</option>
                    </select>
                );
            }else if(this.props.topic === 3){
                curriculum_number = (
                    <select name="post[curriculum_number]" className="pulldown">
                        <option value={ this.props.curriculum_number }>{ this.props.curriculum_number }</option>
                        <option value="2-1-3">2-1-3</option>
                    </select>
                );
            }else if(this.props.topic === 4){
                curriculum_number = (
                    <select name="post[curriculum_number]" className="pulldown">
                        <option value={ this.props.curriculum_number }>{ this.props.curriculum_number }</option>
                        <option value="3-1-1">3-1-1</option>
                    </select>
                );
            }else if(this.props.topic === 5){
                curriculum_number = (
                    <select name="post[curriculum_number]" className="pulldown">
                        <option value={ this.props.curriculum_number }>{ this.props.curriculum_number }</option>
                        <option value="4-1-1">4-1-1</option>
                        <option value="4-1-2">4-1-2</option>
                        <option value="4-1-3">4-1-3</option>
                        <option value="4-1-4">4-1-4</option>
                    </select>
                );
            }else if(this.props.topic === 6){
                curriculum_number = (
                    <select name="post[curriculum_number]" className="pulldown">
                        <option value={ this.props.curriculum_number }>{ this.props.curriculum_number }</option>
                        <option value="5-1-1">5-1-1</option>
                        <option value="8-1-1">8-1-1</option>
                        <option value="8-2-1">8-2-1</option>
                        <option value="8-3-1">8-3-1</option>
                        <option value="8-4-1">8-4-1</option>
                        <option value="8-5-1">8-5-1</option>
                        <option value="8-6-1">8-6-1</option>
                    </select>
                );
            }else if(this.props.topic === 7){
                curriculum_number = (
                    <select name="post[curriculum_number]" className="pulldown">
                        <option value={ this.props.curriculum_number }>{ this.props.curriculum_number }</option>
                        <option value="6-1-1">6-1-1</option>
                        <option value="6-2-1">6-2-1</option>
                    </select>
                );
            }else if(this.props.topic === 8){
                curriculum_number = (
                    <select name="post[curriculum_number]" className="pulldown">
                        <option value={ this.props.curriculum_number }>{ this.props.curriculum_number }</option>
                        <option value="7-1-1">7-1-1</option>
                    </select>
                );
            }else{
                curriculum_number = (
                    <div>トピックを選択し直してください。</div>
                );
            }
            
        }else if(this.props.category === 1){
            curriculum_number = (
                <select name="post[curriculum_number]" className="pulldown">
                    <option value={ this.props.curriculum_number }>{ this.props.curriculum_number }</option>
                    <option value="成果物">成果物</option>
                </select>
            );
        }
         
        return (
            <div className="content">
                <h2 className="title">該当カリキュラムの選択</h2>
                { curriculum_number }
            </div>
        );
    }
}

export default CrriculumNumber;