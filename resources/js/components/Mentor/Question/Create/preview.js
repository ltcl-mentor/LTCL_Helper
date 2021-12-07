import React,{useState} from 'react';
import Typography from '@material-ui/core/Typography';

function Preview(props) {
    
    let preview;
    if (props.question.length > 0) {
        // 箇条書きがなくコードブロックしかない場合に最後の文が認識されないのを防止する
        const question = props.question + "\n";
        
        // コードブロックがある場合
        if (question.indexOf('```\n') !== -1) {
            // " ```\n（改行） "の記号で文章全体を分割
            // 以下分割した文章を”block（ブロック）”と呼称
            const blocks = props.question.split('```\n');
            
            blocks.forEach((block_content, block_number) => {
                // ブロックに"\n（改行）"があった場合
                if (blocks[block_number].indexOf('\n') !== -1) {
                    // ブロックを”\n（改行）”で分割
                    // 以下分割した各文を"paragraph（パラグラフ）"と呼称
                    const paragraphs = blocks[block_number].split('\n');
                    
                    paragraphs.forEach((paragraph_content, paragraph_number) => {
                        // パラグラフの先頭に"* （アスタリスクとスペース）"の記号が含まれてた場合
                        if (paragraphs[paragraph_number].slice(0, 2) === '* ') {
                            // パラグラフの先頭の"* "を"・"に置き換え
                            paragraphs[paragraph_number] = '・' + paragraph_content.slice(2);
                        }
                    });
                    
                    // 箇条書きのために分解したブロックを再構成
                    // "\n"で連結
                    blocks[block_number] = paragraphs.join('\n');
                }
            });
        // if (props.question.indexOf('\n') !== -1) {
        //     const paragraphs = props.question.split('\n');
        //     paragraphs.forEach((paragraph_content, paragraph_number) => {
        //         if (paragraphs[paragraph_number].slice(0, 2) === '* ') {
        //             paragraphs[paragraph_number] = '・' + paragraph_content.slice(2);
                    
        //             // if (paragraphs.length > paragraph_number + 1) {
        //             //     if(list && paragraphs[paragraph_number + 1] === '') {
        //             //         paragraphs[paragraph_number] = '* ';
        //             //     }
        //             // }
        //         }
                
                
        //             if (block_start < 0 && block_start < block_end) {
                        
        //             }
                    
        //             let block_count = 0;
        //             paragraphs[paragraph_number] = code_block_parts.map((block) => {
        //                 if (block_count%2 === 0) {
        //                     return (
        //                         <div>
        //                             { block }
        //                         </div>
        //                     );
        //                 } else {
        //                     return (
        //                         <Typography
        //                             component="div"
        //                             sx={{
        //                                 width: "90%",
        //                                 marginTop: 1,
        //                                 marginLeft: "5%",
        //                                 backgroundColor: "blue",
        //                             }}
        //                         >
        //                             { block }
        //                         </Typography>
        //                     );
        //                 }
        //             });
        //     });
            // let block_count = 3;
            
            // 表示内容の設定
            preview = blocks.map((block, block_number) => {
                // コードブロック以外
                if (block_number%2 === 0) {
                    return (
                        <div key={ block_number }>
                            { block }
                        </div>
                    );
                
                // コードブロック
                } else {
                    return (
                        <Typography
                            key={ block_number }
                            component="div"
                            sx={{
                                width: "100%",
                                marginTop: 1,
                                marginBottom: 1,
                                padding: 2,
                                backgroundColor: "#DDDDDD",
                                borderRadius: "3px",
                            }}
                        >
                            { block }
                        </Typography>
                    );
                }
            });
        
        // コードブロックがなく箇条書きがある場合
        } else if (question.indexOf('\n') !== -1) {
            // ブロックを”\n（改行）”で分割
            // 以下分割した各文を"paragraph（パラグラフ）"と呼称
            const paragraphs = question.split('\n');
            
            paragraphs.forEach((paragraph_content, paragraph_number) => {
                // パラグラフの先頭に"* （アスタリスクとスペース）"の記号が含まれてた場合
                if (paragraphs[paragraph_number].slice(0, 2) === '* ') {
                    // パラグラフの先頭の"* "を"・"に置き換え
                    paragraphs[paragraph_number] = '・' + paragraph_content.slice(2);
                }
            });
            
            // 表示内容の設定
            // パラグラフは元々改行で区切られていた文章なのでdivタグにそのまま挿入
            preview = paragraphs.map((paragraph, paragraph_number) => {
                return (
                    <div key={ paragraph_number }>
                        { paragraph }
                    </div>
                );
            });
        } else {
            // 表示内容の設定
            // 入力内容をそのまま挿入
            preview = (<div>{ props.question }</div>);
        }
    }
    
    return (
        <Typography
            component="div"
            sx={{
                width: "80%",
                minHeight: "350px",
                marginLeft: "10%",
                paddingLeft: 1,
                paddingRight: 1,
                border: "1px solid",
            }}
        >
            { preview }
        </Typography>
    );
}

export default Preview;