import React from 'react';
import MenuList from './MenuItems/MenuItems.js'
import * as Icons from './Icons'

export default function Top() {
  return (
    <>
        <Icons.Logo style={{ position: 'relative', margin:'0', padding: "8px",display:'inline-block' }}/>
        <MenuList />
    </>
  );
}
