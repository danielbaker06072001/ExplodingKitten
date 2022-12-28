import styled from 'styled-components';

const MainPlayerPosition = (props) => { 
    return (
        <Wrapper>
            {props.children} {props.username}
        </Wrapper>
    );
};

const Wrapper = styled.div`
  width: 300px;
  height: 300px;
  background-color: red
`

export default MainPlayerPosition;