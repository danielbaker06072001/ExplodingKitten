import ModalContent from "./modal/ModalContent";
import ModalHeader from "./modal/ModalHeader";
import ModalBody from "./modal/ModalBody";
import ModalFooter from "./modal/ModalFooter";

const JoinRoomModalContent  = () => {
    return ( 
        <ModalContent>
            <ModalHeader> 
                Join Game
            </ModalHeader>

            <ModalBody>
                <input type="text" placeholder="Enter room ID number:"/>
            </ModalBody>

            <ModalFooter> 
                <input type="button" value="Create"/>
            </ModalFooter>
        </ModalContent>
    );
}

export default JoinRoomModalContent