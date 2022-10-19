import { Link } from 'react-router-dom';
import './page-not-found.scss';

export const PageNotFound = () => {
  return (
    <div className="page--not-found">
      <div className="grid__wrapper">
        <div className="grid-item">4</div>
        <div className="grid-item">4</div>
        <div className="grid-item">0</div>
        <div className="grid-item highlighted">4</div>
        <div className="grid-item highlighted">0</div>
        <div className="grid-item highlighted">4</div>
        <div className="grid-item">0</div>
        <div className="grid-item">4</div>
        <div className="grid-item">0</div>
      </div>
      <div className="not-found__content">
        <p>Page not found, <Link to="/">go back</Link>.</p>
      </div>
    </div>
  );
}
