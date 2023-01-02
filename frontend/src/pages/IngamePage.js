import { useParams } from "react-router-dom";
import PlayerPosition from "../components/ingame/position/PlayerPosition";
import styled from "styled-components";
import CardDeck from "../components/ingame/card/CardDeck";

const IngamePage = (props) => { 
    let { id } = useParams();
    return(
        <div style={{maxHeight: "100vh", overflow: "hidden"}}> 
            <PlayerPosition />
            <CardDeck />
        </div>
    )
};

export default IngamePage;


export const CardDeckStyle = styled.div` 
    
`