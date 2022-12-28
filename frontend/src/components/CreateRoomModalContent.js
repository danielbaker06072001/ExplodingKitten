import ModalContent from "./modal/ModalContent";
import ModalHeader from "./modal/ModalHeader";
import ModalBody from "./modal/ModalBody";
import ModalFooter from "./modal/ModalFooter";

const CreateRoomModalContent  = () => { 
    return ( 
        <ModalContent>
            <ModalHeader> 
                Create Game
            </ModalHeader>

            <ModalBody>
                <input type="text" placeholder="Enter your name:" style = {{width: "100%", border: "1px solid black", borderRadius: "4px"}}/>
            </ModalBody>

            <ModalFooter> 
                <input type="button" value="Create" style = {{width: "100%"}}/>
            </ModalFooter>
        </ModalContent>
    );
}

export default CreateRoomModalContent