import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { SidebarContext } from '@/context';
import { store } from '@/store';

import App from './App';

import './styles/main.scss';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <SidebarContext>
        <App />
      </SidebarContext>
    </Provider>
  </React.StrictMode>
);
