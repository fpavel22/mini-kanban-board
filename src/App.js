import { BrowserRouter } from 'react-router-dom';

import { Spinner } from '@/components';
import { SidebarContext } from '@/context';
import { useAuthStateChange } from '@/hooks';
import { Routes } from '@/routes';

const App = () => {
  const { authIsReady } = useAuthStateChange();

  return authIsReady ? (
    <SidebarContext>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </SidebarContext>
  ) : <Spinner fullPage />;
};

export default App;
