import React from "react";
import MainPlayerPosition from "./MainPlayerPosition";
import OtherPlayerPosition from './OtherPlayerPosition';

const PlayerPosition = (props) => { 
    return(
        <React.Fragment>
            <MainPlayerPosition username="caccho"> Test </MainPlayerPosition>
            <OtherPlayerPosition username="test2"> Test </OtherPlayerPosition>
            <OtherPlayerPosition username="test3"> Test </OtherPlayerPosition>
            <OtherPlayerPosition username="test4"> Test </OtherPlayerPosition>
        </React.Fragment>
    );
};  

export default PlayerPosition;