const ModelWrapper = (props, action_type, visible) => { 
    return ( 
        <div id = "modal"> 
            {props.children}
        </div>
    );
}

export default ModelWrapper;