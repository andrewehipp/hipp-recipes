import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next'

import client from '../../utils/client';
import { getContentData } from '../../utils/extractData';

import Markdown from '../../components/Markdown'
import Picture from '../../components/Picture'

import RecipeType from '../../types/Recipe';

export type RecipePageProps = {
    recipe: RecipeType;
}

function RecipePage({
    recipe: {
        name,
        description = '',
        ingredients = '',
        estimatedTime = '',
        servings = '',
        cooks = [],
        steps = [],
        images = [],
        images: [
            featuredImage = {},
        ] = [],
    } = {}
}: RecipePageProps) {
    return (
        <>
            {featuredImage.url ? (
                <Picture
                    src={featuredImage.url}
                    title={featuredImage.title}
                    width={800}
                    height={800}
                    fit="thumb"
                    className="d-block ratio ratio-1x1 d-md-none"
                    imgClassName="img-fluid"
                />    
            ) : (
                <div className="ratio ratio-1x1 bg-light d-sm-none" />
            )}

            <div className="container" style={{ maxWidth: 1000 }}>
                <div className="row row-cols-1 row-cols-md-2">
                    <div className="col py-3 py-sm-5">
                        <h1 className="display-5 mb-1 lh-1">{name}</h1>
                        <Markdown className="lead mb-5">{description}</Markdown>

                        <div className="mb-5">
                            {estimatedTime ? (
                                <>
                                    <h5 className="mb-1">Estimated Time</h5>
                                    <Markdown>{estimatedTime}</Markdown>
                                </>
                            ) : null}

                            {servings ? (
                                <>
                                    <h5 className="mb-1">Servings</h5>
                                    <p>{servings}</p>
                                </>
                            ) : null}

                            {ingredients ? (
                                <>
                                    <h5 className="mb-2">Ingredients</h5>
                                    <Markdown>{ingredients}</Markdown>
                                </>
                            ) : null}
                        </div>

                        {steps.length ? steps.map(({
                            id: stepId,
                            title: stepTitle,
                            description: stepDescription,
                            images: stepImages = []
                        }, index) => {
                            return (
                                <div key={stepId}>
                                    {index !== 0 ? <hr /> : null}

                                    <h5>{stepTitle}</h5>
                                    {stepDescription ? <Markdown>{stepDescription}</Markdown> : null}
                                    {stepImages.length ? stepImages.map(({
                                        id: stepImageId,
                                        url: stepImageUrl,
                                        title: stepImageTitle,
                                    }) => {
                                        return (
                                            <Picture
                                                key={stepImageId}
                                                src={stepImageUrl}
                                                title={stepImageTitle}
                                                width={200}
                                            />    
                                        )
                                    }) : null}
                                </div>
                            )
                        }) : null}
                    </div>
                    <div className="col">
                        {images.length ? images.map(({
                            id: imageId,
                            url: imageUrl,
                            title: imageTitle,
                            }) => {
                            return (
                                <Picture
                                    key={imageId}
                                    src={imageUrl}
                                    title={imageTitle}
                                    width={800}
                                    height={800}
                                    fit="thumb"
                                    imgClassName="img-fluid"
                                />    
                            )
                        }) : null}
                    </div>
                </div>
            </div>
        </>
    )
}

// Render posts...
export const getStaticPaths: GetStaticPaths = async () => {
  // Call an external API endpoint to get posts
  const { items } = await client.getEntries({
    content_type: 'recipe',
    select: 'fields.slug',
  })

  // Get the paths we want to pre-render based on posts
  const paths = items
        .map(getContentData)
        .map(({ slug }: RecipeType) => ({
            params: { slug },
        }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}


// This function gets called at build time
export const getStaticProps: GetStaticProps = async ({ params = {} }) => {
    
    // Call an external API endpoint to get posts
    const { items: [ recipe ] = []} = await client.getEntries({
        content_type: 'recipe',
        'fields.slug[in]': params.slug,
        limit: 1,
        include: 10,
    })


  // By returning { props: { posts } }, the RecipePage component
  // will receive `posts` as a prop at build time
  return {
    props: {
      recipe: getContentData(recipe),
    },
  }
}

export default RecipePage
