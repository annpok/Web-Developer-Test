import styled from 'styled-components';
import Button from "../Button";

const media = {
  xs: styles => `
  @media only screen and (max-width:480px){
    ${styles}
  }
  `
}
export const Grid = styled.div`
`;

export const Row = styled.div`
display: flex;
`;

export const Col = styled.div`
 padding: 8px;
 flex: ${props=>props.size}
 ${props=> props.collapse && media[props.collaps](`display:none`)}
`;

export const ButtonWrapperBuy = styled(Button)`
    &.square-button{ 
        background: #448Aff;
        color: #fff;
        box-shadow: 0px 2px 2px 0 #d4d4d4;
        border-radius: 3px;
        padding: 0.5rem;
     &:disabled {
         background: #d4d4d4;
         cursor: default;
    }

    }
`;


