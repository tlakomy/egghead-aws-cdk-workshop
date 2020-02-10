import React from "react";
import styled from "@emotion/styled";

const Error = styled.div`
    font-size: 2.4em;
    color: red;
`;

const ErrorMessage = () => {
    return <Error>Whoops, there's no API endpoint</Error>;
};

export default ErrorMessage;
