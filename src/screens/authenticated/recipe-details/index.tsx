import { useDeleteRecipe, useRecipe } from '@services/recipe';
import { useParams, useNavigate } from 'react-router-dom';
import { BsDashCircleFill, BsFillPencilFill } from 'react-icons/bs';
import { BASE_PATH, RECIPE_PATH } from '@app/paths';
import { Button } from '@components/lib';
import { showToast } from '@utils/helpers';
import { useUser } from '@context/user';

export const RecipeDetails = (): React.ReactElement => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutateAsync: doDelete, isLoading } = useDeleteRecipe();
  const { user } = useUser();
  const { data: recipe } = useRecipe(id ?? '');

  const deleteRecipe = (): void => {
    if (id) {
      const promise = doDelete(
        { id },
        {
          onSuccess: (): void => {
            navigate(BASE_PATH);
          }
        }
      );

      showToast({
        promise,
        loading: 'Deleting recipe...',
        success: 'Recipe deleted!'
      });
    }
  };

  return (
    <div className="relative mx-auto mt-24 flex w-10/12 flex-col items-center rounded-xl border border-gray-200 p-5 shadow-xl lg:w-3/6">
      <h1 className="text-xl font-bold">{recipe?.title}</h1>
      <br />
      <img src={recipe?.image} alt={recipe?.title} />

      <div className="mt-3 w-full text-left">
        <p>{recipe?.description}</p>
      </div>
      <div className="absolute -top-4 -right-6 flex w-24 gap-x-3 rounded-full border border-gray-300 bg-white p-3 shadow-md">
        <Button
          appearance="link"
          onClick={deleteRecipe}
          disabled={isLoading || parseInt(recipe?.userId ?? '') !== user.id}
        >
          <BsDashCircleFill
            className="inline-block text-3xl text-red-500"
            title="Delete recipe"
          />
        </Button>
        <Button
          appearance="link"
          onClick={() => navigate(`${RECIPE_PATH}/${id ?? ''}`)}
          disabled={isLoading || parseInt(recipe?.userId ?? '') !== user.id}
        >
          <BsFillPencilFill
            className="inline-block text-3xl text-blue-500"
            title="Edit recipe"
          />
        </Button>
      </div>
    </div>
  );
};
