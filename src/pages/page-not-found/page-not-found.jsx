import { Link } from 'react-router-dom';

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
    <div className="page-redirect page-redirect--center">
      <span>
        Page not found,
        {' '}
        <Link to="/">go back.</Link>
      </span>
    </div>
  </div>
);
