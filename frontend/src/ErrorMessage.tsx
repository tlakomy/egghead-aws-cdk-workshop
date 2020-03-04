import React from "react";
import styled from "@emotion/styled";

const Error = styled.div`
    font-size: 2.4em;
    text-align: center;
    color: red;
`;

const ErrorMessage = () => {
    return (
        <Error>
            Whoops, something is broken - check the console for details
        </Error>
    );
};

export default ErrorMessage;
