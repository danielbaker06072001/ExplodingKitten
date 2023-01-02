import styled from 'styled-components';
import React from "react";
import MainPlayerPosition from "./MainPlayerPosition";
import OtherPlayerPosition from './OtherPlayerPosition';

const PlayerPosition = (props) => { 
    return(
        <PlayerPositionWrapper>
            <MainPlayerPosition username="test1" />
            <OtherPlayerPosition username="test2" direction="west" />
            <OtherPlayerPosition username="test3" direction="north" />
            <OtherPlayerPosition username="test4"  direction="east" />
        </PlayerPositionWrapper>
    );
};  

const PlayerPositionWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`

export default PlayerPosition;