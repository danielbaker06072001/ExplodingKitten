import { useParams } from "react-router-dom";
import PlayerPosition from "../components/ingame/position/PlayerPosition";

const IngamePage = (props) => { 
    let { id } = useParams();
    return(
        <div> 
            <PlayerPosition />
        </div>
    )
};

export default IngamePage;