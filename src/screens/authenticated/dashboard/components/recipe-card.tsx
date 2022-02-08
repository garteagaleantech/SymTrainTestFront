import { RECIPE_PATH } from '@app/paths';
import { Link } from 'react-router-dom';

type RecipeCardProps = {
  id: number;
  title: string;
  description: string;
  image: string;
  userName: string;
};

export const RecipeCard = ({
  id,
  title,
  description,
  image,
  userName
}: RecipeCardProps): React.ReactElement => {
  return (
    <Link to={`${RECIPE_PATH}/details/${id}`} className="flex">
      <div className="m-3 w-11/12 rounded-2xl border border-gray-300 p-4 shadow-md lg:w-56">
        <img src={image} alt={title} className="h-auto max-h-24 w-full" />
        <h1 className="text-lg font-bold">{title}</h1>
        <small className="text-sm font-normal italic">By: {userName}</small>
        <div className="mt-3 w-full border-t border-gray-300 pt-3">
          <p className="truncate">{description}</p>
        </div>
      </div>
    </Link>
  );
};
