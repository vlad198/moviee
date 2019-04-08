import React from "react";

export default function Input(props) {
  return (
    <div className="ui fluid icon input">
      <input value={props.value} onChange={props.handleChange} type="text" />
      <i className="search icon" />
    </div>
  );
}
