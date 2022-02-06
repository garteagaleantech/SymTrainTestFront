import { LOGIN_PATH, ROOT_PATH, SIGNUP_PATH } from '@app/paths';
import { Can } from '@components/can';
import { Button } from '@components/lib';
import { useLogout } from '@services/auth';
import { Link } from 'react-router-dom';
import { ItemMenu } from './item-menu';

export const Header = (): React.ReactElement => {
  const { logout } = useLogout();
  return (
    <nav className="flex h-20 justify-center gap-x-6">
      <ItemMenu path={ROOT_PATH} text="Home" />
      <Can I>
        <Button appearance="link" onClick={() => logout}>
          Logout
        </Button>
      </Can>
      <Can I not>
        <ItemMenu path={SIGNUP_PATH} text="Sign up" />
        <ItemMenu path={LOGIN_PATH} text="Login" />
      </Can>
    </nav>
  );
};
