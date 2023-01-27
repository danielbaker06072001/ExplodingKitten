import { io } from "socket.io-client"
import { useContext } from "react";
import { GlobalContext } from "./context/GlobalProvider";
import { GameContext } from "./context/GameProvider";

export const socket = io('ws://localhost:8080', { transports : ['websocket'] });

export const useSocket = (props) => {
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
        console.log(data.cardTurnType);

        if (data.status === "YOUR_TURN") {
            alert("your turn");
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

    return socket;
};