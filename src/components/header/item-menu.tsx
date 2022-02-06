import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

type ItemMenuProps = {
  path: string;
  text: string;
};

export const ItemMenu = ({ path, text }: ItemMenuProps): React.ReactElement => {
  const { pathname } = useLocation();

  return (
    <Link to={path} className={path === pathname ? 'font-bold' : ''}>
      {text}
    </Link>
  );
};
