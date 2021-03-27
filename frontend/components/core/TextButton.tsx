import { useState } from "react";

import styled from "styled-components";

const TextButtonContainer = styled.div`
    cursor: pointer;
    transition: all 0.1s ease-out;
    user-select: none;
`;

const TextUnderline = styled.div`
    background-color: black;
    height: 2px;
    margin-top: 2px;
    transition: all 0.1s ease-out;
`;

export const TextButton: React.FC<React.HTMLAttributes<HTMLElement>> = ({ children, color, ...props }) => {
const [isHovered, setIsHovered] = useState(false);

return (
    <div style={{ position: "relative", width: "fit-content", }} {...props}>
        <TextButtonContainer 
            onMouseOver={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)} 
        >
            {children}
        </TextButtonContainer>
        <TextUnderline color={color} style={{ width: isHovered ? "100%" : "0%", }}/>
    </div>
);
}