import { Button } from '@components/lib';
import { Recipe } from '@custom-types/recipe';
import { usePaginatedRecipes } from '@services/recipe';
import { Fragment } from 'react';
import { RecipeCard } from './recipe-card';

export const Dashboard = (): React.ReactElement => {
  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
    usePaginatedRecipes();

  const recipes = data?.pages.reduce((acum: Array<Recipe>, { data }) => {
    const recipes = data.reduce(
      (acum: Array<Recipe>, recipe) => [...acum, recipe] as Array<Recipe>,
      []
    );

    return [...acum, ...recipes];
  }, []);

  const getNextPage = async (): Promise<void> => {
    await fetchNextPage();
  };

  if (!recipes) return <p>There are no recipes to show yet.</p>;

  return (
    <Fragment>
      <div className="flex flex-wrap">
        {recipes.map(({ id, title, description, image, user: { name } }) => (
          <RecipeCard
            key={`recipe${id}`}
            id={id}
            title={title}
            description={description}
            image={image}
            userName={name}
          />
        ))}
      </div>
      <div className="my-6 flex justify-center">
        <Button
          type="button"
          onClick={getNextPage}
          isLoading={isFetchingNextPage || isLoading}
          disabled={!hasNextPage}
        >
          Load more
        </Button>
      </div>
    </Fragment>
  );
};
