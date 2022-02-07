import { LOGIN_PATH, SIGNUP_PATH } from '@app/paths';
import { Button } from '@components/lib';
import { useNavigate } from 'react-router-dom';

export const Home = (): React.ReactElement => {
  const navigate = useNavigate();

  return (
    <div className="w-full text-center">
      <h1 className="text-xl font-bold">Welcome to Recipes!</h1>
      <br />
      <div className="mx-auto w-10/12 lg:w-2/6">
        <p className="text-left">
          We have the most delicious recipes in the hole world, create your
          account and log in, you will see all the recipes we have. Besides, You
          can create your own recipe!.
        </p>
        <br />
        <div className="flex justify-center gap-x-3">
          <Button appearance="primary" onClick={() => navigate(SIGNUP_PATH)}>
            Sign up
          </Button>
          <Button appearance="secondary" onClick={() => navigate(LOGIN_PATH)}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};
