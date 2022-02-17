import React from 'react';
import {StyledButton} from "./styled.js";

export default function Button(props) {
  let { onAction, name, className, disabled } = props;
  return <StyledButton disabled={disabled} className={className} onClick={onAction}>{name}</StyledButton>;
}