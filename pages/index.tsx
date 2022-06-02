import React from 'react';
import Head from 'next/head'
import { GetStaticProps } from 'next'

import client from '../utils/client';
import { getContentData } from '../utils/extractData';

import RecipeCard from '../components/RecipeCard'

import RecipeType from '../types/Recipe';

export type HomePageProps = {
    recipes: RecipeType[];
}

const HomePage = ({ recipes = [] } : HomePageProps) => {
  return (
    <div className="container py-5">
      <Head>
        <title>Hipp Recipies</title>
        <meta name="description" content="Hipp Family Recipes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-center mb-5">
        <h1>
          <span className="display-2">Hipp <span style={{fontFamily: "'Baskerville', 'Goudy Old Style', Palatino, 'Book Antiqua', serif", fontStyle: 'italic', fontWeight: 'normal'}}>&</span> Associates</span>
          <br/>
          <span className="display-6 text-body">Family Recipes</span>
        </h1>
      </div>
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-3">
          {recipes.map((recipe) => {
            return (
              <div key={recipe.id} className="col d-flex align-items-stretch">
                <RecipeCard recipe={recipe} />
              </div>
            )
          })}
      </div>
    </div>
  )
}

// This function gets called at build time
export const getStaticProps: GetStaticProps = async ({ params = {} }) => {
    // Call an external API endpoint to get posts
    const { items: recipes = []} = await client.getEntries({
        content_type: 'recipe',
        include: 10,
        order: 'fields.name'
    })


  // By returning { props: { posts } }, the RecipePage component
  // will receive `posts` as a prop at build time
  return {
    props: {
      recipes: recipes.map(getContentData),
    },
  }
}

export default HomePage
