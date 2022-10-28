import cn from 'classnames';

export const PageRedirect = ({ center, children, ...props }) => {
  const _className = cn('page-redirect', {
    'page-redirect--center': center
  });

  return <div { ...props } className={ _className }>{ children }</div>;
};
