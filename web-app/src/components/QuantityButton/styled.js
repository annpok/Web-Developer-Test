import styled from 'styled-components';

export const QuantityBox = styled.div`
  display: inline-block;
  padding: 2px 10px;
  max-width: 64px;
  border: 1px solid #448AFF;
  border-radius: 3px;

    input, Button {
    display: inline;
    padding: 0px 0px;
    text-align: center;
    background: transparent;
    border: 0;
  }
  
  Button {
    color: #448AFF;
    width: 15%;
    padding: 0px 0px;
    cursor: pointer;
  }
  
  input {
    width: 50%;
  }
`;
