import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';

class Show extends React.Component{
    constructor(props){
        super(props);
        this.state={
            question: [],
            staffs: [],
            images: [],
            documents: [],
            related_questions: [],
            categories: ['カリキュラム', '成果物'],
            topics: ['AWS', 'HTML', 'CSS', 'JavaScript', 'サーバー', 'PHP', 'Laravel', 'DB', 'Git&GitHub', '環境構築', '設計図', 'デプロイ', 'API'],
        };
    }
    
    componentDidMount() {
        const question_id = document.getElementById('demo').getAttribute('question_id');
        axios
            .get(`/react/question/${ question_id }`)
            .then(response => {
                this.setState({
                    question: response.data
                });
                
            }).catch(error => {
                console.log(error);
            });
            
        axios
            .get("/react/all/staffs")
            .then(response => {
                this.setState({
                    staffs: response.data
                });
 
            }).catch(error => {
                console.log(error);
            });
            
        axios
            .get(`/react/images/${ question_id }`)
            .then(response => {
                this.setState({
                    images: response.data
                });
                
            }).catch(error => {
                console.log(error);
            });
            
        axios
            .get(`/react/related/documents/${ question_id }`)
            .then(response => {
                this.setState({
                    documents: response.data
                });
                
            }).catch(error => {
                console.log(error);
            });
            
        axios
            .get(`/react/search/questions?category=${ this.state.question.category }&topic=${ this.state.question.topic }`)
            .then(response => {
                this.setState({
                    related_questions: response.data
                });
                
            }).catch(error => {
                console.log(error);
            });
    }
    
    render(){
        let images;
        if(this.state.images.filter(v=>v).length === 0){
            images = ('');
        }else{
            images = (
                <div>
                    <h2 className="columns">参考画像</h2>
                    { this.state.images.map((image) => {
                        return <a href={image.image_path} data-lightbox="group"><img src={image.image_path} className="image"/></a>;
                    })}
                </div>
            );
        }
        
        let documents;
        if(this.state.documents.filter(v=>v).length === 0){
            documents = (<div className="preview_emptyMessage">関連する記事はありません。</div>);
        }else{
            documents = this.state.documents.map((document) => {
                return (
                    <div>
                        <div className="document">
                            <img className="document_img" src="/images/NotePM_Logo_Vertical.png"/>
                            <div className="document_title">{ document.title }</div>
                        </div>
                    </div>
                );
            });
        }
        
        const related_questions = this.state.related_questions.map((question) => {
            return (
                <div>
                    <Divider light />
                    <ListItem button>
                        <a href={ `/show/`+question.id } target="_blank" className="related_question">
                            <ListItemText
                                primary={ question.question }
                            />
                        </a>
                    </ListItem>
                    <Divider />
                </div>
            );
        });
        
        return (
            <div>
                <div className="box">
                    <h1 className="title">質問概要</h1>
                    <div className="question">
                        <Paper>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" component="th" scope="row">カテゴリー</TableCell>
                                        <TableCell align="center">{ this.state.categories[this.state.question.category] }</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center" component="th" scope="row">トピック</TableCell>
                                        <TableCell align="center">{ this.state.topics[this.state.question.topic] }</TableCell>
                                   </TableRow>
                                   <TableRow>
                                        <TableCell align="center" component="th" scope="row">カリキュラム番号</TableCell>
                                        <TableCell align="center">{ this.state.question.curriculum_number }</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Paper>
                    
                        <div>
                            <br/>
                            <br/>
                            <br/>
                        </div>
                    
                        <div class="wrapper">
                            <div className="cards">
                                <Card>
                                    <Avatar alt="Remy Sharp" src="/images/pose_english_shrug_man.png" />
                                    <p>受講生</p>
                                    <div>{ this.state.question.question }</div>
                                </Card>
                    
                                <div>
                                    <br/>
                                    <br/>
                                    <br/>
                                </div>
                    
                                <Card >
                                    <Avatar alt="Remy Sharp" src="/images/images.jpg" />
                                    <p>メンター</p>
                                    <div>{ this.state.question.comment }</div>
                                    { images }
                                </Card>
                                
                                <div>
                                    <h1 className="title">関連記事</h1>
                                    <div className="documents">
                                        { documents }
                                    </div>
                                </div>
                            </div>
                    
                            <List subheader={<li />} className="demolist">
                                <ListSubheader align="center">関連質問</ListSubheader>
                                { related_questions }
                            </List>
                        </div>
                    </div>
                
                </div>
            </div>
        );
    }
    
}

export default Show;

if (document.getElementById('demo')) {
    ReactDOM.render(<Show />, document.getElementById('demo'));
}

