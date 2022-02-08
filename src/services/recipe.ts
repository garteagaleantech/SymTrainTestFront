import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult
} from 'react-query';
import { useFetch } from '@context/fetch';
import {
  Recipe,
  PaginatedResponseAttr,
  PaginatedRequest,
  ErrorResponse,
  CreateRecipe,
  UpdateRecipe
} from '@custom-types/index';

type UsePaginatedRecipesFilters = Omit<PaginatedRequest, 'page'>;

const RECIPE_ENDPOINT = '/recipe';

const recipeKeys = {
  all: ['recipe'],
  get: (id: string) => [...recipeKeys.all, id],
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

const useSaveRecipe = (): UseMutationResult<
  Recipe,
  ErrorResponse,
  CreateRecipe
> => {
  const { authRequest } = useFetch();
  const queryClient = useQueryClient();

  return useMutation(
    async (recipeData: CreateRecipe) => {
      const { data } = await authRequest.post<Recipe>(
        RECIPE_ENDPOINT,
        recipeData
      );

      return data;
    },
    {
      onSuccess: (): void => {
        void queryClient.invalidateQueries(recipeKeys.all);
      }
    }
  );
};

const useUpdateRecipe = (): UseMutationResult<
  Recipe,
  ErrorResponse,
  UpdateRecipe
> => {
  const { authRequest } = useFetch();
  const queryClient = useQueryClient();

  return useMutation(
    async (recipeData: UpdateRecipe) => {
      const { data } = await authRequest.put<Recipe>(
        RECIPE_ENDPOINT,
        recipeData
      );

      return data;
    },
    {
      onSuccess: (): void => {
        void queryClient.invalidateQueries(recipeKeys.all);
      }
    }
  );
};

const useRecipe = (id: string): UseQueryResult<Recipe, ErrorResponse> => {
  const { authRequest } = useFetch();

  return useQuery(recipeKeys.get(id), async () => {
    const { data } = await authRequest.get<Recipe>(`${RECIPE_ENDPOINT}/${id}`);

    return data;
  });
};

const useDeleteRecipe = (): UseMutationResult<
  void,
  ErrorResponse,
  { id: string }
> => {
  const { authRequest } = useFetch();
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id }: { id: string }) => {
      void (await authRequest.delete(`${RECIPE_ENDPOINT}/${id}`));
    },
    {
      onSuccess: (): void => {
        void queryClient.invalidateQueries(recipeKeys.all);
      }
    }
  );
};

export {
  usePaginatedRecipes,
  useSaveRecipe,
  useUpdateRecipe,
  useRecipe,
  useDeleteRecipe
};
