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
    <Link to={`${RECIPE_PATH}/${id}`} className="flex">
      <div className="m-3 w-11/12 rounded-2xl border border-gray-300 p-4 shadow-md lg:w-56">
        <img src={image} alt={title} className="h-auto max-h-24 w-full" />
        <h1 className="text-lg font-bold">{title}</h1>
        <small className="text-sm font-normal">By: {userName}</small>

        <hr className="my-3" />
        <div className="w-full">
          <p className="text-ellipsis">{description}</p>
        </div>
      </div>
    </Link>
  );
};
