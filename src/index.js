import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from '@/App';
import { SidebarContext } from '@/context';
import { store } from '@/store';

import './styles/main.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <SidebarContext>
        <App />
      </SidebarContext>
    </Provider>
  </React.StrictMode>
);
