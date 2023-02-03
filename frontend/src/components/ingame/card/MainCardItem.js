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
import Behind from "../../../assets/img/card_behind.png"
import { GlobalContext } from "../../../context/GlobalProvider";
import { useSocket } from "../../../socket";

const CardItem = (props) => {
    const socket = useSocket();
    const { currentSelectedCardType, setCurrentSelectedCardType } = useContext(GameContext);
    const { currentSelectedCardIndex, setCurrentSelectedCardIndex } = useContext(GameContext);
    const { gameData, setGameData } = useContext(GameContext);
    const { username, roomId } = useContext(GlobalContext);

    function activeCard(e) {
        let target = e.target.dataset.username;
        let index = e.target.dataset.index;
        
        if (gameData.twoComboTurn && username === gameData.currentTurnUsername) {
            if (target === username) {
                alert("You cannot steal yourself!");
                return;
            }

            socket.emit("request", {
                type:"REQUEST_TWO_KIND_COMBO",
                data:{
                    username: username,
                    roomId: roomId,
                    target: target,
                    index: index
                }
            });
            return;
        }

        if (gameData.threeComboTurn && username === gameData.currentTurnUsername) {
            if (target === username) {
                alert("You cannot steal yourself!");
                return;
            }

            socket.emit("request", {
                type:"REQUEST_THREE_KIND_COMBO",
                data:{
                    username: username,
                    roomId: roomId,
                    target: target,
                    index: index
                }
            });
            return;
        }
        
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

    if (props.hidden) {
        return(
            <CardItemStyle data-username={props.username} data-index={props.index} onClick = {(e) => activeCard(e)} style={{left: props.index * 50}} >
            </CardItemStyle>
        );
    }else {
        return(
            <CardItemStyle data-username={props.username} data-index={props.index} data-type={props.type} className={props.type}  onClick = {(e) => activeCard(e)} style={{left: props.index * 50}} >
            </CardItemStyle>
        );
    }

};

export default CardItem;

const CardItemStyle = styled.div`
    position: absolute;
    width: 138px;
    height: 199px;
    background-size: cover;
    border-radius:  5px;
    background-image: url(${Behind});

    &.DEFUSE {
        background-image: url(${Defuse}) !important;
    }

    &.SKIP {
        background-image: url(${Skip}) !important;
    }

    &.ATTACK {
        background-image: url(${Attack}) !important;
    }

    &.SEE_THE_FUTURE {
        background-image: url(${SeeTheFuture}) !important;
    }

    &.EXPLODING_KITTEN {
        background-image: url(${ExplodingKitten}) !important;
    }

    &.NOPE {
        background-image: url(${Nope}) !important;
    }

    &.SHUFFLE { 
        background-image: url(${Shuffle}) !important;
    }

    &.SPECIAL_ONE {
        background-image: url(${SpecialOne}) !important;
    }

    &.SPECIAL_TWO {
        background-image: url(${SpecialTwo}) !important;
    }

    &.SPECIAL_THREE {
        background-image: url(${SpecialThree}) !important;
    }

    &.SPECIAL_FOUR {
        background-image: url(${SpecialFour}) !important;
    }

    &.SPECIAL_FIVE {
        background-image: url(${SpecialFive}) !important;
    }

    &.FAVOR {
        background-image: url(${Favor}) !important;
    }

    &:hover, &.show {
        transition-duration: 0.3s;
        transform: scale(1.25) translate(0, -20%);
        z-index: 1;
    }
`;