import styled from "styled-components";

const LobbyWrapper = (props) => { 
    return ( 
        <LobbyWrapperStyle> 
            {props.children}
        </LobbyWrapperStyle>
    );
}

const LobbyWrapperStyle = styled.div`
    height: 100vh;
    background : url("https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/en_US/games/switch/e/exploding-kittens-switch/hero");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;

export default LobbyWrapper