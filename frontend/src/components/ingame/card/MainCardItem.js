import styled from "styled-components";

const CardItem = (props) => {
    function activeCard(e) { 
        e.target.classList.toggle("show");
    }

    return(
        <CardItemStyle className={props.id}  onClick = {(e) => activeCard(e)} style={{left: props.index * 50}} >
            {props.id}
        </CardItemStyle>
    );
};

export default CardItem;

const CardItemStyle = styled.div`
    position: absolute;
    height: 200px;
    width: 125px;

    &.DEFUSE {
        background-color: green;
    }

    &.SKIP {
        background-color: blue;
    }

    &.ATTACK {
        background-color: yellow;
    }

    &.SEE_THE_FUTURE {
        background-color: purple;
    }

    &.EXPLODE {
        background-color: black;
    }

    &.NOPE {
        background-color: brown;
    }

    

    &.FAVOR {
        background-color: green;
    }

    &.FAVOR {
        background-color: green;
    }

    &:hover, &.show {
        transition-duration: 0.3s;
        transform: scale(1.25) translate(0, -20%);
        z-index: 1;
    }
`;