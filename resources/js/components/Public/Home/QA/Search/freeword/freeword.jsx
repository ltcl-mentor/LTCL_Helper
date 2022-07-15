import React from 'react';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Result from './result/result';
import SearchBox from './searchBox/searchBox';
import { Bold, Explain, ExplainText, RadioButtons } from '@/Styles/Public/Home/QA/Search/freeword/freeword';
import { useFreeword } from '@/Logics/Home/QA/Search/freeword/freeword';

/**
 * フリーワード検索
 */
const freeword = () => {
    const [{ searchType, freeword }, { handleSearchType, handleFreeword }] = useFreeword();
    return (
        <React.Fragment>
            {/* 検索フォーム */}
            <Explain>
                <ExplainText>
                    複数のワードを入力する際はスペース（半角・全角どちらでも可）で分けてください。<br/>
                    <Bold>OR検索</Bold>：（複数のワード検索時）いずれかの検索ワードにヒットする検索結果を表示<br/>
                    <Bold>AND検索</Bold>：（複数のワード検索時）すべての検索ワードにヒットする検索結果を表示
                </ExplainText>
            </Explain>

            <RadioButtons>
                <FormControl>
                    <RadioGroup row onChange={(event) => handleSearchType(event)} defaultValue="OR">
                        <FormControlLabel value="OR" control={<Radio />} label="OR検索" />
                        <FormControlLabel value="AND" control={<Radio />} label="AND検索" />
                    </RadioGroup>
                </FormControl>
            </RadioButtons>

            <SearchBox handleFreeword={handleFreeword} />

            {/* 検索結果 */}
            {/* 先頭が空白の時(/)に全データを持ってきてしまうため条件に追加 */}
            {(freeword.length > 0 && freeword != "/") &&
                <Result searchType={searchType} freeword={freeword} />
            }
        </React.Fragment>
    );
};

export default freeword;
