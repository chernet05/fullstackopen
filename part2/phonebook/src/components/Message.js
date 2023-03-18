import React from "react";
//takes message and color values and returns a span
export default function Message(props) {
    if (props.messages) {
        console.log("messages code", props.messages.message)
        return (<div className={props.messages.code} >{props.messages.message}</div>)
    } else {
        return ('')
    }
}

