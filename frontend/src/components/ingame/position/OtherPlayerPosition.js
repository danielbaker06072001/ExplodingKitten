import styled from "styled-components";

const OtherPlayerPosition = (props) => {
    let direction = props.direction;

    return (        
        <Wrapper className={direction}>
            {props.children} {props.username}
        </Wrapper>
    );
};

const Wrapper = styled.div`
  width: 250px;
  height: 100px;
  background-color: lightblue;

  position: absolute;
  
  &.north {
      top: 0px;
      left: 50vw;
      transform: translate(-50%, 0);
  }

  &.west { 
    top: 40vh;
    left: 0px;
    transform: translate(0%, -50%);
  }

  &.east { 
    top: 40vh;
    right: 0px;
    transform: translate(0%, -50%);
  }
`

export default OtherPlayerPosition;