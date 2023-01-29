import styled from "styled-components";
import { GameContext } from "../../../context/GameProvider";
import { useContext } from "react";
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
import React from "react";
import { GlobalContext } from "../../../context/GlobalProvider";

const CardSTF = (props) => {
    const { 
        username, setUsername, 
    } = useContext(GlobalContext);

    const { gameData } = useContext(GameContext);

    if (!gameData.seeTheFuture || username !== gameData.currentTurnUsername) {
        return (
            <React.Fragment></React.Fragment>
        )
    }

    let lastTurn = gameData.desk[gameData.desk.length - 1];
    let lastThreeCard = gameData.desk.slice(gameData.desk.length -3 , gameData.desk.length).reverse();

    if (lastTurn == null) {
        lastTurn = [];
    }

    return(
        <CardListStyle style={{width: 75 + lastThreeCard.length * 25}}>
            {
                lastThreeCard.map((element, index) => {
                    return (
                        <CardItemStyle key={index} data-index={index} data-type={element} className={element} style={{left: index * 50}} >
                            {props.type}
                        </CardItemStyle>
                    )
                })
            }
        </CardListStyle>
    );
};

export default CardSTF;

const CardListStyle = styled.div ` 
    position: absolute;
    dispLay: flex;
    flex-direction: row;
    align-items: center;
    left: -30px;
    transform: translate(-50%, 0%);
    height: 100%;
`

const CardItemStyle = styled.div`
    position: absolute;
    width: 138px;
    height: 199px;
    background-size: cover;

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
`;