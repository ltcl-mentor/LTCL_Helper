import React, { useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

const SelectStatus = React.memo(props => {
    const handleChangeStatus = e => {
        props.setStatus(e.target.value);
    };

    const handleItemColor = status => {
        if (status === 0) {
            return { color: "blue" };
        } else if (status === 1) {
            return { color: "green" };
        } else if (status === 3) {
            return { color: "red", fontWeight: "bold" };
        }
    };

    useEffect(() => {
        const data = {
            status: props.status
        };

        // 初回レンダリングではstatusの更新処理を行わないように条件分岐を設定
        if (props.responseStatus != undefined) {
            axios
                .post(`/questions/${props.id}/status`, data)
                .then(response => console.log(response.data.text))
                .catch(error => console.log(error));
        }
    }, [props.status]);

    return (
        <>
            <FormControl sx={{ width: 120 }}>
                <InputLabel>ステータスを選ぶ</InputLabel>
                <Select
                    onChange={e => handleChangeStatus(e)}
                    defaultValue={0}
                    value={props.status}
                    sx={handleItemColor(props.status)}
                >
                    <MenuItem value={0}>未対応</MenuItem>
                    <MenuItem value={1}>対応中</MenuItem>
                    <MenuItem value={2}>解決済み</MenuItem>
                    <MenuItem value={3}>要対応</MenuItem>
                </Select>
            </FormControl>
        </>
    );
});

export default SelectStatus;
