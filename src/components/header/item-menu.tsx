import { classNames } from '@utils/helpers';
import { Link, useLocation } from 'react-router-dom';

type ItemMenuProps = {
  path: string;
  text: string;
};

export const ItemMenu = ({ path, text }: ItemMenuProps): React.ReactElement => {
  const { pathname } = useLocation();

  return (
    <Link
      to={path}
      className={classNames(
        path === pathname ? 'font-bold' : '',
        'self-center'
      )}
    >
      {text}
    </Link>
  );
};
