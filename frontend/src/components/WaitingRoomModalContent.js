import ModalContent from "./modal/ModalContent";
import ModalHeader from "./modal/ModalHeader";
import ModalBody from "./modal/ModalBody";
import ModalFooter from "./modal/ModalFooter";
import { useState } from "react";
import { socket } from "../socket";

const WaitingRoomModalContent  = (props) => { 
    return ( 
        <ModalContent>
            <ModalHeader> 
                Waiting Players .....
            </ModalHeader>

            <ModalBody>
                <div style = {{color: "white"}}> Game Host: {props.owner}</div>
                <div style = {{color: "white"}}> Room Id: {props.roomId}</div>
                <div style = {{color: "white"}}>-------------------------------</div>
                <div style = {{display: "flex", flexDirection :"column"}}>
                        {props.playerList.map((element, index) => { 
                        return (
                            <div key={index} style = {{color: "white"}}> 
                                {element.username}
                            </div>
                        )
                     })}
                </div>
            </ModalBody>

            <ModalFooter> 
                <input type="button" value="Start" onClick = {(e) => props.requestStartGame()} style = {{width: "100%"}}/>
            </ModalFooter>
        </ModalContent>
    );
}

export default WaitingRoomModalContent;