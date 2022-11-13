import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type?: string;
  children?: Menu[];
}

const MENUITEMS = [
  {
    state: 'plans',
    name: 'Plans',
    type: 'link'
  },
   {
    state: 'admin',
    name: 'User Panel',
    type: 'sub',
    children: [
      {state: 'dashboard', name: 'Dashboard', type: 'link'},
      {state: 'messages', name: 'Messages', type: 'link'},
      {state: 'bookmarks', name: 'Bookmarks', type: 'link'},
      {state: 'progress', name: 'My progress', type: 'link'}
    ]
  }
];


@Injectable()
export class MenuItems {
  getAll() {
    return MENUITEMS;
  }
}
