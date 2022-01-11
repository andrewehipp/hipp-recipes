import { createClient } from 'contentful';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CTF_ID,
  host: process.env.NEXT_PUBLIC_CTF_HOST,
  environment: process.env.NEXT_PUBLIC_CTF_ENV,
  accessToken: process.env.NEXT_PUBLIC_CTF_ACCESS_TOKEN,
  removeUnresolved: true,
});

export default client;
