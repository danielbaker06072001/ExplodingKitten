import styled from 'styled-components';

const MenuContent = (props) => { 
    return ( 
        <MenuContentStyle> 
            {props.children}
        </MenuContentStyle> 
    );
}

const MenuContentStyle = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding: 5rem;
`

export default MenuContent;