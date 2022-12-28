import styled from "styled-components";

const LobbyButton = (props) => { 
    return (
        <LobbyButtonStyle onClick = {props.onClick}>{props.children}</LobbyButtonStyle>
    );
};

const LobbyButtonStyle = styled.button`
    width: 250px;
    height: 60px;
    border-radius: 10px;

    font-size: 20px;

    margin-bottom: 15px;
    cursor: pointer;

    box-shadow: 0 6px #999;

    &:hover{ 
        background-color: #A3BB98;
    }

    &:active { 
        transform: translateY(4px);
        box-shadow: 0 5px #666;
        background-color: #F0ECCF;
    }
`

export default LobbyButton;