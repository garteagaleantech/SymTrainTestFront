import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';
import { useFetch } from '@context/fetch';
import {
  Recipe,
  PaginatedResponseAttr,
  PaginatedRequest
} from '@custom-types/index';

type UsePaginatedRecipesFilters = Omit<PaginatedRequest, 'page'>;

const RECIPE_ENDPOINT = '/recipe';

const recipeKeys = {
  all: ['recipe'],
  paginatedRecipes: (filters?: Record<string, unknown>) => [
    ...recipeKeys.all,
    filters
  ]
};

const usePaginatedRecipes = (
  filters?: UsePaginatedRecipesFilters
): UseInfiniteQueryResult<PaginatedResponseAttr<Array<Recipe>>> => {
  const { authRequest } = useFetch();

  return useInfiniteQuery(
    recipeKeys.paginatedRecipes(filters),
    async ({ pageParam: page = 1 }: { pageParam?: number }) => {
      const response = await authRequest.get<
        PaginatedResponseAttr<Array<Recipe>>
      >(RECIPE_ENDPOINT, {
        params: {
          ...filters,
          page
        }
      });

      return response.data;
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        return allPages.length <
          Math.ceil(lastPage.total / (filters?.limit ?? 10))
          ? allPages.length + 1
          : undefined;
      }
    }
  );
};

export { usePaginatedRecipes };
