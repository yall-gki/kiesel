import algoliasearch from 'algoliasearch'
import { getAllProducts } from './sanity';

export const algoliaInit = ()=>{
   ()=> getAllProducts()
  .then((data) => data.json())
  .then((records) => {
    const client = algoliasearch(
      "JXJW22845F",
      "df7752d1b604ea0351fae5f33b28594c"
    );

    const index = client.initIndex("productIndex");

    index.saveObjects(records, { autoGenerateObjectIDIfNotExist: true });
  })
  .catch((error) => {
    console.error(error);
  });
}

