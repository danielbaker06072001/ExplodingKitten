

const OtherPlayerPosition = (props) => {
    return (
        <div>
            {props.children} {props.username}
        </div>
    );
};

export default OtherPlayerPosition;