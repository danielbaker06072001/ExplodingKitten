import styled from "styled-components";
import { useContext } from "react";
import { GameContext } from "../../../context/GameProvider";
import deck from "../../../assets/img/deck.png"
import SpecialOne from "../../../assets/img/special_one.png"
import SpecialTwo from "../../../assets/img/special_two.png"
import SpecialThree from "../../../assets/img/special_three.png"
import SpecialFour from "../../../assets/img/special_four.png"
import SpecialFive from "../../../assets/img/special_five.png"
import Shuffle from "../../../assets/img/shuffle.png"
import Favor from "../../../assets/img/favor.png"
import ExplodingKitten from "../../../assets/img/explode.png"
import Skip from "../../../assets/img/skip.png"
import Attack from "../../../assets/img/attack.png"
import SeeTheFuture from "../../../assets/img/see_the_future.png"
import Nope from "../../../assets/img/nope.png"
import Defuse from "../../../assets/img/defuse.png"

const CardItem = (props) => {
    const { currentSelectedCardType, setCurrentSelectedCardType } = useContext(GameContext);
    const { currentSelectedCardIndex, setCurrentSelectedCardIndex } = useContext(GameContext);

    function activeCard(e) {
        e.target.classList.toggle("show");

        if (e.target.classList.contains("show")) {
            currentSelectedCardType.push(e.target.dataset.type);
            currentSelectedCardIndex.push(e.target.dataset.index);
        }else {
            let tempTypeArray = currentSelectedCardType;
            tempTypeArray.splice(tempTypeArray.indexOf(e.target.dataset.type), 1);

            let tempIndexArray = currentSelectedCardIndex;
            tempIndexArray.splice(tempIndexArray.indexOf(e.target.dataset.index), 1);


            setCurrentSelectedCardType(tempTypeArray);
            setCurrentSelectedCardIndex(tempIndexArray);
        }
    }

    return(
        <CardItemStyle data-index={props.index} data-type={props.type} className={props.type}  onClick = {(e) => activeCard(e)} style={{left: props.index * 50}} >
        </CardItemStyle>
    );
};

export default CardItem;

const CardItemStyle = styled.div`
    position: absolute;
    width: 138px;
    height: 199px;
    background-size: cover;
    border-radius:  5px ;

    &.DEFUSE {
        background-image: url(${Defuse});
    }

    &.SKIP {
        background-image: url(${Skip});
    }

    &.ATTACK {
        background-image: url(${Attack});
    }

    &.SEE_THE_FUTURE {
        background-image: url(${SeeTheFuture});
    }

    &.EXPLODING_KITTEN {
        background-image: url(${ExplodingKitten});
    }

    &.NOPE {
        background-image: url(${Nope});
    }

    &.SHUFFLE { 
        background-image: url(${Shuffle});
    }

    &.SPECIAL_ONE {
        background-image: url(${SpecialOne});
    }

    &.SPECIAL_TWO {
        background-image: url(${SpecialTwo});
    }

    &.SPECIAL_THREE {
        background-image: url(${SpecialThree});
    }

    &.SPECIAL_FOUR {
        background-image: url(${SpecialFour});
    }

    &.SPECIAL_FIVE {
        background-image: url(${SpecialFive});
    }

    &.FAVOR {
        background-image: url(${Favor});
    }

    &:hover, &.show {
        transition-duration: 0.3s;
        transform: scale(1.25) translate(0, -20%);
        z-index: 1;
    }
`;