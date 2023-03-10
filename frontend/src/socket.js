import { io } from "socket.io-client"
import { useContext } from "react";
import { GlobalContext } from "./context/GlobalProvider";
import { GameContext } from "./context/GameProvider";
import { useNavigate } from 'react-router-dom';

export const socket = io('ws://localhost:8080', { transports : ['websocket'] });

export const useSocket = (props) => {
    var navigate = useNavigate();
    const { 
        owner, setOwner, 
        username, setUsername, 
        roomId, setRoomId,
        modalType, setModalType,
        playerList, setPlayerList,
        startGame, setStartGame
    } = useContext(GlobalContext);


    const { 
        gameData, setGameData,
        currentSelectedCardType, setCurrentSelectedCardType,
        currentSelectedCardTypeIndex, setCurrentSelectedCardIndex
    } = useContext(GameContext);
    const socket = io('ws://localhost:8080', { transports : ['websocket'] });

    socket.on("response", (arg) => {
        const type = arg.type;
        const data = arg.data;

        console.log(type, data);

        switch(type) {
            case "RESPONSE_JOIN_OWNER":
                responseJoinOwner(data);
                break;
            case "RESPONSE_JOIN_PLAYER_SUCCESS":
                responseJoinPlayerSuccess(data);
                break;
            case "RESPONSE_PLAY_CARD": 
                responsePlayCard(data);
                break;
            case "RESPONSE_DRAW_CARD":
                responseDrawCard(data);
                break;
            case "RESPONSE_JOIN_PLAYER_FAIL":
                responseJoinPlayerFail(data);
                break;
            case "RESPONSE_START_GAME":
                responseStartGame(data);
                break;
            case "RESPONSE_UPDATE_GAME":
                responseUpdateGame(data);
                break;
            case "RESPONSE_PLAY_NOPE":
                responsePlayNope(data);
                break;
            case "RESPONSE_FAVOR":
                responseFavor(data);
                break;
            case "RESPONSE_GIVE_FAVOR_CARD":
                responseGiveFavorCard(data);
                break;
            case "RESPONSE_END_GAME" : 
                responseEndGame(data);
                break;
            case "RESPONSE_TWO_KIND_COMBO" : 
                responseTwoKindCombo(data);
                break;
            case "RESPONSE_THREE_KIND_COMBO" : 
                responseThreeKindCombo(data);
                break;
            default:
                break;
            }
        }
    )
        
    function responseJoinOwner(data) { 
        let gameData = data.game;

        setModalType('WAITING');
        setOwner(gameData.owner);
        setRoomId(gameData.roomId);
        setPlayerList(gameData.players);
    }

    function responseJoinPlayerSuccess(data) { 
        let gameData = data.game;
        setModalType('WAITING');
        setOwner(gameData.owner);
        setRoomId(gameData.roomId);
        setPlayerList(gameData.players);
    }

    function responseJoinPlayerFail(data) { 
        alert("No room found!");
    }

    function responseStartGame(data) { 
        let status = data.status;

        if (status === "ALREADY_START_GAME") {
            alert("Game has already started");
            return;
        }

        setGameData(data.game);
        setStartGame(true);
    };

    function responseUpdateGame(data){ 
        setGameData(data.game);   
    }

    /*
        Game DATA 
    */
    
    function responsePlayCard(data) {
        if (data.status === "INVALID") {
            alert("invalid card");
            return;
        }

        if (data.status === "YOUR_TURN") {
            setCurrentSelectedCardType([]);
            setCurrentSelectedCardIndex([]);
        }else {
            alert("Not your turn");
        }
    };

    function responseDrawCard(data) {
        if (data.status === "YOUR_TURN") {
            setGameData(data.game);
        }else {
            alert("Not your turn");
        }
    };

    function responsePlayNope(data) {
        if (data.status === "CANNOT_NOPE") {
            alert("You cannot use nope this time!");
        }else if (data.status === "SUCCESS") {
        }else if (data.status === "NO_NOPE") {
            alert("No nope card!");
        }
    };

    function responseFavor(data) {
        if (data.status === "ALREADY_SELECT_FAVOR") {
            alert("You have already chosen player");
        }
    };


    function responseGiveFavorCard(data) {
        if (data.status === "TOO_MUCH") {
            alert("You can only give single card");
        }else if (data.status === "SUCCESS") {
            console.log("CLEAR");
            setCurrentSelectedCardType([]);
            setCurrentSelectedCardIndex([]);
        }
    };

    function responseEndGame(data) { 
        let winnerPlayer = data.winnerPlayer;

        alert("The winner is " + winnerPlayer.username);

        let linkRoom = "/";

        setStartGame(false);

        navigate(linkRoom);
    }

    function responseTwoKindCombo(data) { 
        let card = data.card;
        let target = data.target;

        alert("You steal", card, "from", target, "!");
    }

    function responseThreeKindCombo(data) { 
        let card = data.card;
        let target = data.target;

        alert("You steal", card, "from", target, "!");
    }

    return socket;
};