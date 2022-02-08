import { Button, Input, Textarea } from '@components/lib';
import { useRecipe } from '@services/recipe';
import { Fragment, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { BsDashCircleFill } from 'react-icons/bs';

type RecipeFormProps = {
  id?: string;
  isLoading: boolean;
};

export const RecipeForm = ({
  id,
  isLoading
}: RecipeFormProps): React.ReactElement => {
  const { data } = useRecipe(id ?? '');
  const { setValue } = useFormContext();
  const [showFileInput, setShowFileInput] = useState(!id);

  const deleteImage = (): void => {
    setShowFileInput(true);
  };

  useEffect(() => {
    if (data) {
      setValue('title', data.title);
      setValue('description', data.description);
      setValue('image', data.image);
    }
  }, [data, setValue]);

  return (
    <Fragment>
      <Input
        aria-label="title"
        name="title"
        label="Title"
        placeholder="Title"
        rules={{ required: 'This field is required' }}
      />
      <Textarea
        rows={5}
        aria-label="description"
        name="description"
        label="Description"
        placeholder="Description"
        rules={{ required: 'This field is required' }}
      />

      {id && data && !showFileInput ? (
        <div className="pb-3 text-center">
          <div className="relative inline-block">
            <img src={data.image} alt={data.title} className="max-w-full" />
            <Button appearance="link" onClick={deleteImage}>
              <BsDashCircleFill
                className="absolute -top-3 -right-3 text-3xl text-red-500"
                title="Delete image"
              />
            </Button>
          </div>
        </div>
      ) : null}
      {showFileInput ? (
        <Input
          aria-label="image"
          name="image"
          label="Image"
          placeholder="Image"
          type="file"
          rules={{ required: 'This field is required' }}
        />
      ) : null}
      <br />
      <div className="flex w-full justify-center">
        <Button type="submit" isLoading={isLoading}>
          {id ? 'Update' : 'Create'} recipe
        </Button>
      </div>
    </Fragment>
  );
};
