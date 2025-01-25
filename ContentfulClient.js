import { createClient } from 'contentful';
const contentfulClient = createClient({
  space: 'phv0x101y95r',
  accessToken: 'ZzosR3kHIh1S1-Pq3k5ejESow-vqsS15InahN0vWK5w',
});

console.log('Contentful Client:', contentfulClient);

export default contentfulClient;