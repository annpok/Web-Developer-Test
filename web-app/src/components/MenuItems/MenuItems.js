import React from 'react';
import {MENU} from '../../configuration/settings.js';
import * as Icons from '../Icons'
import { Navigation } from './styled.js';

export default function MenuItems(props) {

  return (
    <>
      <Navigation>
        {MENU.map((item, idx) => (
            <a  href={item.path} key={idx}>
               {item.icon ? ( <Icons.Basket/>) : item.title}
            </a>
        ))}
      </Navigation>
  </>
  )};
