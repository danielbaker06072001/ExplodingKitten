import '../css/style.css';
import React,  {useState, useEffect} from 'react';
import LobbyWrapper from '../components/LobbyWrapper';
import ModalWrapper from '../components/modal/ModalWrapper';
import CreateRoomModalContent from '../components/CreateRoomModalContent';
import JoinRoomModalContent from '../components/JoinRoomModalContent';
import MenuContent from '../components/MenuContent';
import MenuWrapper from '../components/MenuWrapper'
import LobbyButton from '../components/input/LobbyButton';
import WaitingRoomModalContent from '../components/WaitingRoomModalContent';
import { socket } from '../socket';
import { useNavigate } from 'react-router-dom';

const LobbyPage = () => { 
    const navigate = useNavigate();
    const [modalType, setModalType] = useState("");
    const [owner, setOwner] = useState(null);
    const [roomId, setRoomId] = useState(null);
    const [playerList, setPlayerList] = useState([]);

    function onButtonClick(type) {
        setModalType(type);
        
        document.getElementById('modal-wrapper').classList.toggle("show");
    }

    function onWaitingButtonClickForOwner(owner, roomId) {
        socket.emit("requestJoinOwner", {
            roomId: roomId,
            owner: owner
        });

        localStorage.setItem("username", owner);
        localStorage.setItem("roomId", roomId);
    }

    function onWaitingButtonClickForPlayer(player, roomId) {
        socket.emit("requestJoinPlayer", {
            roomId: roomId,
            player: player
        });

        localStorage.setItem("username", player);
        localStorage.setItem("roomId", roomId);
    }

    socket.on("responseJoinOwner", (arg) => { 
        let gameData = arg;

        setModalType('WAITING');
        setOwner(gameData.owner);
        setRoomId(gameData.id);
        setPlayerList(gameData.players);
    });

    socket.on("responseJoinPlayerSuccess", (arg) => { 
        let game = arg;

        setModalType('WAITING');
        setOwner(game.owner);
        setRoomId(game.id);
        setPlayerList(game.players);
    });

    socket.on("responseJoinPlayerFail", (arg) => { 
        alert("No room found!");

        localStorage.removeItem("username");
    });


    function requestStartGame() {
        socket.emit("requestStartGame", roomId);
    }
    
    socket.on("responseStartGame", (arg) => { 
        let linkRoom = "/game/" + roomId;
        navigate(linkRoom);
    });

    let modalContent = null;
    if (modalType === 'CREATE') {
        modalContent = <CreateRoomModalContent onWaitingButtonClickForOwner={onWaitingButtonClickForOwner} />;
    } else if (modalType === 'WAITING') {
        modalContent = <WaitingRoomModalContent owner={owner} roomId={roomId} playerList={playerList} requestStartGame = {requestStartGame}/>;
    } else if (modalType === 'JOIN') {
        modalContent = <JoinRoomModalContent onWaitingButtonClickForPlayer = {onWaitingButtonClickForPlayer}/>;
    } else if (modalType === 'MATCH_MAKING') {
        
    }
    
    return ( 
        <LobbyWrapper>
            <ModalWrapper>
                {modalContent}
            </ModalWrapper>

            <MenuWrapper>
                <MenuContent> 
                    <LobbyButton onClick = {(e) => onButtonClick("CREATE")}> Create Game </LobbyButton>
                    <LobbyButton onClick = {(e) => onButtonClick("JOIN")}> Join Game </LobbyButton>
                    <LobbyButton> Match Making </LobbyButton>
                </MenuContent>
            </MenuWrapper>
        </LobbyWrapper>
    );

};

export default LobbyPage;