import styled from 'styled-components';

const ModelWrapper = (props) => { 
    return ( 
        <ModelWrapperStyle id="modal-wrapper"> 
            {props.children}
        </ModelWrapperStyle>
    );
}

const ModelWrapperStyle = styled.div`
    display: none;
    position: absolute;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);

    &.show {
        display: block !important;
    }
`

export default ModelWrapper;