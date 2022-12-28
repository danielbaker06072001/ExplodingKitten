import styled from 'styled-components';

const MenuWrapper = (props) => { 
    return ( 
        <MenuWrapperStyle> 
            {props.children}
        </MenuWrapperStyle> 
    );
}

const MenuWrapperStyle = styled.div`
    height: 100%;
`

export default MenuWrapper;