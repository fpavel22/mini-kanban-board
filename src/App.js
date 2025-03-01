import { BrowserRouter } from 'react-router-dom';

import { Spinner } from '@/components';
import { useAuthStateChange } from '@/hooks';
import { Routes } from '@/routes';

const App = () => {
  const { authIsReady } = useAuthStateChange();

  return authIsReady ? (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  ) : <Spinner fullPage />;
};

export default App;
