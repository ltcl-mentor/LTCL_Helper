import React from 'react';
import ReactDOM from 'react-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


class Topic extends React.Component {
    constructor(props){
        super(props);
        this.state={
            topic: 0,
        };
    }
    
    componentDidMount() {
        if(this.props.category === 0){
            this.setState({ topic: 0 });
        }else{
            this.setState({ topic: 9 });
        }
    }
    
    handleTopic(event){
        this.setState({ topic: Number(event.target.value) });
    }

    render(){
        let topicForm;

        if(this.props.category === 0){
            topicForm = (
                <div className="topic_box">
                    <FormControl component="fieldset">
                        <RadioGroup row aria-label="topic" name="topic" value={ this.state.topic } onChange={(event) => { this.handleTopic(event) }}>
                            <FormControlLabel value={0} control={<Radio />} label="AWS" />
                            <FormControlLabel value={1} control={<Radio />} label="HTML" />
                            <FormControlLabel value={2} control={<Radio />} label="CSS" />
                            <FormControlLabel value={3} control={<Radio />} label="JavaScript" />
                            <FormControlLabel value={4} control={<Radio />} label="サーバー" />
                            <FormControlLabel value={5} control={<Radio />} label="PHP" />
                            <FormControlLabel value={6} control={<Radio />} label="Laravel" />
                            <FormControlLabel value={7} control={<Radio />} label="データベース" />
                            <FormControlLabel value={8} control={<Radio />} label="Git&GitHub" />
                        </RadioGroup>
                    </FormControl>
                </div>
            );
        }else if(this.props.category === 1){
            topicForm = (
                <div  className="topic_box">
                    <FormControl component="fieldset">
                        <RadioGroup row aria-label="topic" name="topic" value={ this.state.topic } onChange={(event) => { this.handleTopic(event) }}>
                            <FormControlLabel value={9} control={<Radio />} label="環境構築" />
                            <FormControlLabel value={10} control={<Radio />} label="デプロイ" />
                            <FormControlLabel value={11} control={<Radio />} label="API" />
                            <FormControlLabel value={12} control={<Radio />} label="マイグレーション" />
                            <FormControlLabel value={13} control={<Radio />} label="リレーション" />
                        </RadioGroup>
                    </FormControl>
                </div>
            );
        }
        
        return (
            <div className="container">
                { this.props.setTopic(this.state.topic) }
                { topicForm }
            </div>
        );
    }
}

export default Topic;
