import React from "react";
import { StyledHeader } from './styled.js';

export default function CartHeader(props) {
  const {title, description } = props;
  return (
    <StyledHeader>
      <div className="title">{title}</div>
      <div className="description">{description} </div>
    </StyledHeader>
  );
}
