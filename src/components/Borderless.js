import React from 'react';
import {Menu} from 'semantic-ui-react';

export default function Borderless(props) {
  return (
    <Menu borderless>
    <Menu.Item name='1' />
    <Menu.Item name='2' />
    <Menu.Item name='3' />
    <Menu.Item name='4' />
    <Menu.Item name='5' />
    <Menu.Item name='6' />
  </Menu>
  )
}
