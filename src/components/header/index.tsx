import { BASE_PATH, LOGIN_PATH, ROOT_PATH, SIGNUP_PATH } from '@app/paths';
import { Can } from '@components/can';
import { Button } from '@components/lib';
import { useLogout } from '@services/auth';
import { ItemMenu } from './item-menu';

export const Header = (): React.ReactElement => {
  const { logout } = useLogout();
  return (
    <header className="w-full shadow-md">
      <nav className="flex h-16 items-center justify-center gap-x-6">
        <Can I>
          <ItemMenu path={BASE_PATH} text="Home" />
          <Button appearance="link" onClick={() => logout()}>
            Logout
          </Button>
        </Can>
        <Can I not>
          <ItemMenu path={ROOT_PATH} text="Home" />
          <ItemMenu path={SIGNUP_PATH} text="Sign up" />
          <ItemMenu path={LOGIN_PATH} text="Login" />
        </Can>
      </nav>
    </header>
  );
};
