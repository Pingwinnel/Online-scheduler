import React from 'react';
import styled from "styled-components";

const DivWrapper = styled('div')`
	background-color: #2A2B2D;
	height: 36px;
	display: flex;
	align-items: center;
`;

const Header = () => {
    return (
        <DivWrapper>
            Header
        </DivWrapper>
    );
};

export default Header;