/* eslint-disable no-useless-return */
/* eslint-disable import/no-named-as-default */
import { BASE_PATH } from '@app/paths';
import { Form } from '@components/lib';
import { CreateRecipe } from '@custom-types/recipe';
import { useSaveRecipe, useUpdateRecipe } from '@services/recipe';
import { showToast } from '@utils/helpers';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import { RecipeForm } from './componets/recipe-form';

const thirdtyKB = 30720;

type ImageResponse = {
  content: string;
  weight: number;
};

export const Recipe = (): React.ReactElement => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { mutateAsync: createRecipe, isLoading: isCreating } = useSaveRecipe();
  const { mutateAsync: updateRecipe, isLoading: isUpdating } =
    useUpdateRecipe();

  const getImage = async (
    image: Array<File> | string
  ): Promise<ImageResponse> => {
    if (typeof image === 'string') return { content: image, weight: thirdtyKB };

    return await new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.addEventListener('load', (event): void => {
        const { target, total } = event;

        resolve({ content: target?.result as string, weight: total });
      });

      reader.addEventListener('error', (error) => reject(error));

      reader.readAsDataURL(image[0]);
    });
  };

  const onSubmit = async (data: CreateRecipe): Promise<void> => {
    const { image, title, description } = data;
    const { content, weight } = await getImage(image);

    if (weight > thirdtyKB) {
      toast.error('The image must be less than 30 KB weight.');

      return;
    }

    if (id) {
      const promise = updateRecipe(
        {
          id: parseInt(id),
          title,
          description,
          image: content
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
        image: content
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
  };

  return (
    <div className="mx-auto mt-36 flex w-10/12 flex-col items-center rounded-xl border border-gray-200 p-5 shadow-xl lg:w-2/6">
      <h1 className="text-xl font-bold">{id ? 'Update' : 'Create'} recipe</h1>
      <br />
      <Form<CreateRecipe>
        className="flex w-full flex-col gap-y-3"
        onSubmit={onSubmit}
      >
        <RecipeForm id={id} isLoading={isCreating || isUpdating} />
      </Form>
    </div>
  );
};
