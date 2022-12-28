import styled from "styled-components";

const ModalHeader = (props) => { 
    return ( 
        <ModalHeaderStyle> 
            {props.children}
        </ModalHeaderStyle>
    );
}

const ModalHeaderStyle = styled.div`
    font-weight: 700;
    font-size: 1.6rem;
    color: white;
`

export default ModalHeader;