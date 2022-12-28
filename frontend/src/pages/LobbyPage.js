import '../css/style.css';
import React,  {useState, useEffect} from 'react';
import LobbyWrapper from '../components/LobbyWrapper';
import ModalWrapper from '../components/modal/ModalWrapper';
import CreateRoomModalContent from '../components/CreateRoomModalContent';
import JoinRoomModalContent from '../components/JoinRoomModalContent';
import MenuContent from '../components/MenuContent';
import MenuWrapper from '../components/MenuWrapper'
import LobbyButton from '../components/input/LobbyButton';

const LobbyPage = () => { 
    const [modalType, setModalType] = useState("");

    function onButtonClick(type) {
        setModalType(type);
        
        document.getElementById('modal-wrapper').classList.toggle("show");
    }

    let modalContent = null;
    if (modalType === 'CREATE') {
        modalContent = <CreateRoomModalContent />;
    } else if (modalType === 'JOIN') {
        modalContent = <JoinRoomModalContent />;
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