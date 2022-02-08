/* eslint-disable no-useless-return */
/* eslint-disable import/no-named-as-default */
import { BASE_PATH } from '@app/paths';
import { Button, Form, Input } from '@components/lib';
import { CreateRecipe } from '@custom-types/recipe';
import { useSaveRecipe, useUpdateRecipe, useRecipe } from '@services/recipe';
import { showToast } from '@utils/helpers';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

const thirdtyKB = 30720;

export const Recipe = (): React.ReactElement => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: recipe } = useRecipe(id ?? '');
  const { mutateAsync: createRecipe, isLoading: isCreating } = useSaveRecipe();
  const { mutateAsync: updateRecipe, isLoading: isUpdating } =
    useUpdateRecipe();

  const onSubmit = (data: CreateRecipe): void => {
    const { image, title, description } = data;
    const files = image as unknown as Array<File>;

    const reader = new FileReader();

    reader.addEventListener('load', (event): void => {
      const { target, total } = event;

      if (total > thirdtyKB) {
        toast.error('The image must be less than 30 KB weight.');

        return;
      }

      if (id) {
        const promise = updateRecipe(
          {
            id: parseInt(id),
            title,
            description,
            image: (target?.result as string) ?? ''
          },
          {
            onSuccess: (): void => {
              navigate(BASE_PATH);
            }
          }
        );

        showToast({
          promise,
          loading: 'Loading...',
          success: 'Recipe updated!'
        });

        return;
      }

      const promise = createRecipe(
        {
          title,
          description,
          image: (target?.result as string) ?? ''
        },
        {
          onSuccess: (): void => {
            navigate(BASE_PATH);
          }
        }
      );

      showToast({
        promise,
        loading: 'Loading...',
        success: 'Recipe created!'
      });
    });

    reader.readAsDataURL(files[0]);
  };

  const { setValue } = useForm<CreateRecipe>();

  useEffect(() => {
    if (recipe) {
      setValue('title', recipe.title);
      setValue('description', recipe.description);
    }
  }, [recipe, setValue]);

  return (
    <div className="mx-auto mt-36 flex w-10/12 flex-col items-center rounded-xl border border-gray-200 p-5 shadow-xl lg:w-2/6">
      <h1 className="text-xl font-bold">{id ? 'Update' : 'Create'} recipe</h1>
      <br />
      <Form<CreateRecipe>
        className="flex w-full flex-col gap-y-3"
        onSubmit={onSubmit}
      >
        <Input
          aria-label="title"
          name="title"
          label="Title"
          placeholder="Title"
          rules={{ required: 'This field is required' }}
        />
        <Input
          aria-label="description"
          name="description"
          label="Description"
          placeholder="Description"
          rules={{ required: 'This field is required' }}
        />
        <Input
          aria-label="image"
          name="image"
          label="Image"
          placeholder="Image"
          type="file"
          rules={{ required: 'This field is required' }}
        />
        <br />
        <div className="flex w-full justify-center">
          <Button type="submit" isLoading={isCreating || isUpdating}>
            {id ? 'Update' : 'Create'} recipe
          </Button>
        </div>
      </Form>
    </div>
  );
};
