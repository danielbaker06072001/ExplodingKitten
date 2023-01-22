import ModalContent from "./modal/ModalContent";
import ModalHeader from "./modal/ModalHeader";
import ModalBody from "./modal/ModalBody";
import ModalFooter from "./modal/ModalFooter";
import { useState } from "react";

const CreateRoomModalContent  = (props) => { 
    const [username, setUsername] = useState("");
    

    function randomRoomId() { 
        return Math.floor(Math.random() * 100);
    }

    return ( 
        <ModalContent>
            <ModalHeader> 
                Create Game
            </ModalHeader>

            <ModalBody>
                <input type="text" placeholder="Enter your name:"  onChange={(e) => setUsername(e.target.value)} style = {{width: "100%", border: "1px solid black", borderRadius: "4px"}}/>
            </ModalBody>

            <ModalFooter> 
                <input type="button" value="Create" onClick={(e) => {
                    props.onWaitingButtonClickForOwner(username, randomRoomId());
                }} style = {{width: "100%"}}/>
            </ModalFooter>
        </ModalContent>
    );
}

export default CreateRoomModalContent