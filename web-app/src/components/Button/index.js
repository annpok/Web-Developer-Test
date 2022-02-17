import React from 'react';
import {StyledButton} from "./styled.js";

export default function Button(props) {
  let { onAction, name, className } = props;
  return <StyledButton className={className} onClick={onAction}>{name}</StyledButton>;
}