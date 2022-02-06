import { BASE_PATH } from '@app/paths';
import { Button, Form, Input, Password } from '@components/lib';
import { Credentials } from '@custom-types/user';
import { useLogin } from '@services/auth';
import { showToast } from '@utils/helpers';
import { useNavigate } from 'react-router-dom';

export const Login = (): React.ReactElement => {
  const { mutateAsync: doSignUp, isLoading } = useLogin();
  const navigate = useNavigate();

  const onSubmit = (credentials: Credentials) => {
    const promise = doSignUp(credentials, {
      onSuccess: () => {
        navigate(BASE_PATH);
      }
    });

    showToast({
      promise,
      loading: 'Loading...',
      success: 'Welcome to our website!'
    });
  };

  return (
    <div className="mx-auto flex w-10/12 flex-col items-center rounded-xl border border-gray-200 p-5 shadow-xl lg:w-2/6">
      <h1 className="text-xl font-bold">Login</h1>
      <br />
      <Form<Credentials>
        onSubmit={onSubmit}
        className="flex w-full flex-col gap-y-3"
      >
        <Input
          aria-label="email"
          label="Email"
          name="email"
          placeholder="Email"
          rules={{ required: 'This field is required' }}
        />
        <Password
          aria-label="password"
          label="Password"
          name="password"
          placeholder="Password"
          rules={{ required: 'This field is required' }}
        />
        <br />
        <div className="flex w-full justify-center">
          <Button type="submit" isLoading={isLoading}>
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
};
