import styled from "styled-components";
import MainCardItem from "./MainCardItem";

const MainCardList = (props) => { 
    return  (
        <CardListStyle style={{width: 75 + props.cards.length * 50}}>
            {
                props.cards.map((element, i) => {
                    return (
                        <MainCardItem key={i} type={element} data-type={element} index={i} socket = {props.socket}>  </MainCardItem>
                    )
                })
            }
        </CardListStyle>
    );
};

export default MainCardList;

const CardListStyle = styled.div ` 
    position: absolute;
    dispLay: flex;
    flex-direction: row;
    left: 50vw;
    transform: translate(-50%, 0%);
    height: 100%;
`