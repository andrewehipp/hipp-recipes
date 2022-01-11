import React from 'react';
import Link from 'next/link';

import Picture from '../Picture';

import RecipeType from '../../types/Recipe';

const RecipeCard: React.FC<{
    recipe: RecipeType
}> = ({
    recipe: {
        images: [
            image = {},
        ] = [],
        slug = '',
        name = '',
        description = ''
    } = {}
}) => {
  return (
        <div className="card w-100">
            {image.url ? (
                <Picture className="ratio ratio-1x1 bg-light card-img-top" src={image.url} alt={image.title} width={300} height={300} fit="thumb" />
            ) : (
                <div className="ratio ratio-1x1 bg-light" />
            )}

            <div className="card-body">
                <h5 className="card-title">
                    <Link href={`/recipe/${slug}`}>
                        <a className="stretched-link">{name}</a>
                    </Link>
                </h5>
                <p className="card-text text-truncate">
                    {description}
                </p>
            </div>
        </div>
    )
};

export default React.memo(RecipeCard);
