import styled from "styled-components";

const CardDeskList = (props) => {
    return(
        <CardDeskListStyle>
            <CardStyle> 
                {props.size}
            </CardStyle>
        </CardDeskListStyle>
    );
}

const CardDeskListStyle = styled.div`
    display: flex;
`

const CardStyle = styled.div`
    width: 125px;
    height: 200px;
    background-color: red;
`

export default CardDeskList;