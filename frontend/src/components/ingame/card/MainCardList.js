import styled from "styled-components";
import MainCardItem from "./MainCardItem";

const MainCardList = (props) => { 
    let style = {
        width: 75 + props.cards.length * 50,
        position: 'absolute',
        dispLay: 'flex',
        flexDirection: 'row',
        transform: "translate(0%, 0%)",
        height: '100%',
    };
    
    if (!props.direction) {
        style.transform = 'translate(-50%, 0%)';
        style.left = '50vw';
    }

    if (props.direction === "east") {
        style.right = "0px";
    }

    return  (
        <div style={style}>
            {
                props.cards.map((element, i) => {
                    return (
                        <MainCardItem username={props.username} key={i} type={element} data-type={element} index={i} socket = {props.socket} hidden = {props.hidden}>  </MainCardItem>
                    )
                })
            }

            {props.children}
        </div>
    );

};

export default MainCardList;