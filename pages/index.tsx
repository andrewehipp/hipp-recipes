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

      <div className="row gy-5">
        <div className="col-12 text-center">
          <h1>
            <span className="display-2">Hipp <span style={{fontFamily: "'Baskerville', 'Goudy Old Style', Palatino, 'Book Antiqua', serif", fontStyle: 'italic', fontWeight: 'normal'}}>&</span> Associates</span>
            <br/>
            <span className="display-6 text-body">Family Recipes</span>
          </h1>
        </div>
          {recipes.map((recipe) => {
            return (
              <RecipeCard key={recipe.id} recipe={recipe} />
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
