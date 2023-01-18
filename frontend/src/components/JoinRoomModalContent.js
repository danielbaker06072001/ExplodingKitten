import ModalContent from "./modal/ModalContent";
import ModalHeader from "./modal/ModalHeader";
import ModalBody from "./modal/ModalBody";
import ModalFooter from "./modal/ModalFooter";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinRoomModalContent  = () => {
    let navigate = useNavigate();
    const [roomID, setRoomID] = useState("");

    function routeRoom(roomID) { 
        console.log(roomID);
        let linkRoom = "/game/" + roomID;
        navigate(linkRoom);
    }
    return ( 
        <ModalContent>
            <ModalHeader> 
                Join Game
            </ModalHeader>

            <ModalBody>
                <input type="text" placeholder="Enter room ID number:" onChange = {(e)=>{ setRoomID(e.target.value) ; console.log(e.target.value)}}/>
            </ModalBody>

            <ModalFooter> 
                <input type="button" value="Create" onClick = {(e)=>routeRoom(roomID)}/>
            </ModalFooter>
        </ModalContent>
    );
}

export default JoinRoomModalContent