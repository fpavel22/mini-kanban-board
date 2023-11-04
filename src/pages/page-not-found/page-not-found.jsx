import { Link } from 'react-router-dom';
import { PageRedirect } from '@/components';

export const PageNotFound = () => (
  <div className="not__found">
    <div className="grid__nums-container">
      <div className="grid-num">4</div>
      <div className="grid-num">4</div>
      <div className="grid-num">0</div>
      <div className="grid-num highlighted">4</div>
      <div className="grid-num highlighted">0</div>
      <div className="grid-num highlighted">4</div>
      <div className="grid-num">0</div>
      <div className="grid-num">4</div>
      <div className="grid-num">0</div>
    </div>
    <PageRedirect center={ true }>
      <span>
        Page not found,
        {' '}
        <Link to="/">go back.</Link>
      </span>
    </PageRedirect>
  </div>
);
