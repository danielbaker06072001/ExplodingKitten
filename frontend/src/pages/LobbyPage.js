import '../css/style.css';
import React,  {useState, useEffect, useContext} from 'react';
import LobbyWrapper from '../components/LobbyWrapper';
import ModalWrapper from '../components/modal/ModalWrapper';
import CreateRoomModalContent from '../components/CreateRoomModalContent';
import JoinRoomModalContent from '../components/JoinRoomModalContent';
import MenuContent from '../components/MenuContent';
import MenuWrapper from '../components/MenuWrapper'
import LobbyButton from '../components/input/LobbyButton';
import WaitingRoomModalContent from '../components/WaitingRoomModalContent';
import { GlobalContext } from '../context/GlobalProvider';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../socket';

const LobbyPage = () => { 
    const navigate = useNavigate();
    const socket = useSocket();
    const { 
        owner, setOwner, 
        username, setUsername,
        roomId, setRoomId,
        modalType, setModalType,
        playerList, setPlayerList,
        startGame, setStartGame,
    } = useContext(GlobalContext);

    useEffect(() =>  {
        return () => { 
            let linkRoom = "/game/" + roomId;
            navigate(linkRoom);
        }
    }, [startGame]);
    

    function onButtonClick(type) {
        setModalType(type);
        
        document.getElementById('modal-wrapper').classList.toggle("show");
    }

    function onWaitingButtonClickForOwner(owner, roomId) {
        socket.emit("request", {
            type: "REQUEST_JOIN_OWNER",
            data: {
                roomId: roomId,
                owner: owner
            }
        });

        setUsername(owner);
        setRoomId(roomId);
    }

    function onWaitingButtonClickForPlayer(player, roomId) {
        socket.emit("request", {
            type: "REQUEST_JOIN_PLAYER",
            data: {
                roomId: roomId,
                player: player
            }
        });

        setUsername(player);
        setRoomId(roomId);
    }

    function requestStartGame() {
        socket.emit("request", {
            type: "REQUEST_START_GAME",
            data: {
                roomId: roomId
            }
        });
    }

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