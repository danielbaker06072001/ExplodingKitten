import ModalContent from "./modal/ModalContent";
import ModalHeader from "./modal/ModalHeader";
import ModalBody from "./modal/ModalBody";
import ModalFooter from "./modal/ModalFooter";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";

const JoinRoomModalContent  = (props) => {
    let navigate = useNavigate();
    const [roomID, setRoomID] = useState("");
    const [username, setUsername] = useState("");
    
    // function routeRoom(roomID) { 
    //     let linkRoom = "/game/" + roomID;
    //     localStorage.setItem("username", username);
    //     navigate(linkRoom);
    // }

    return ( 
        <ModalContent>
            <ModalHeader> 
                Join Game
            </ModalHeader>

            <ModalBody>
                <input type="text" placeholder="Enter Username" onChange = {(e)=>{ setUsername(e.target.value)}}/>
                <input type="text" placeholder="Enter room ID number:" onChange = {(e)=>{ setRoomID(e.target.value)}}/>
            </ModalBody>

            <ModalFooter> 
                <input type="button" value="Join" onClick = {(e)=> {props.onWaitingButtonClickForPlayer(username, roomID)}}/>
            </ModalFooter>
        </ModalContent>
    );
}

export default JoinRoomModalContent