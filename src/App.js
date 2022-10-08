import cn from 'classnames';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Button } from './components/button';
import { TextField } from './components/text-field';
import { themeSliceSelector } from './features/themeSlice';
import './styles/App.scss';

function App() {
  const darkMode = useSelector(themeSliceSelector);

  const _className = cn('app', {
    'app--dark': darkMode
  });

  return (
    <main className={ _className }>
      <Button type="primary" size="lg">Primary L</Button>
      <Button type="secondary">Secondary</Button>
      <Button type="danger">Danger</Button>
      <TextField placeholder="Enter a text..." />
      <TextField placeholder="Enter a text..." error={ true } />
    </main>
  );
}

export default App;
