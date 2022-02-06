import { LOGIN_PATH } from '@app/paths';
import { Button, Form, Input, Password } from '@components/lib';
import { CreateUser } from '@custom-types/user';
import { useSignUp } from '@services/auth';
import { showToast } from '@utils/helpers';
import { useNavigate } from 'react-router-dom';

export const SignUp = (): React.ReactElement => {
  const { mutateAsync: doSignUp, isLoading } = useSignUp();
  const navigate = useNavigate();

  const onSubmit = (user: CreateUser) => {
    const promise = doSignUp(user, {
      onSuccess: () => {
        navigate(LOGIN_PATH);
      }
    });

    showToast({
      promise,
      loading: 'Loading...',
      success: 'Account successfully created!'
    });
  };

  return (
    <div className="mx-auto flex w-10/12 flex-col items-center rounded-xl border border-gray-200 p-5 shadow-xl lg:w-2/6">
      <h1 className="text-xl font-bold">Sign up</h1>
      <p>Complete the following form to create your account.</p>
      <br />
      <Form<CreateUser>
        onSubmit={onSubmit}
        className="flex w-full flex-col gap-y-3"
      >
        <Input
          aria-label="name"
          label="Name"
          name="name"
          placeholder="Name"
          rules={{ required: 'This field is required' }}
        />
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
            Sign up
          </Button>
        </div>
      </Form>
    </div>
  );
};
