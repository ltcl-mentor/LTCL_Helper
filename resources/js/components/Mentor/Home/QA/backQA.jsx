import React from "react";
import { Link } from '@inertiajs/inertia-react';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

/**
 * Q&Aページに戻る
 */
const backQA = () => {
    return (
        <Box display="flex" justifyContent="center">
            <Button>
                <Link to={route('search')}>
                    Q&Aに戻る
                </Link>
            </Button>
        </Box>
    );
};

export default backQA;
