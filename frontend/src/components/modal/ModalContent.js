import styled from 'styled-components';

const ModalContent = (props) => { 
    return ( 
        <ModalContentStyle> 
            {props.children}
        </ModalContentStyle>
    );
}

const ModalContentStyle = styled.div`
    gap: 0.5rem;
    width: 500px;
    padding: 1rem;
    border-radius: 5px;
    background-color: rgba(57, 54, 54, 0.85);;
    display: flex;
    flex-direction: column;
    border:none;
`

export default ModalContent;