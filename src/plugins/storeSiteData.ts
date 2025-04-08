import fs from 'fs';

/**
 * Docusarus plugin to index some site data in a handful of files for easy reference
 *
 * Note that the `postBuild()` only runs in production mode (`npm run build`).
 */
export default function (context, options) {
    return {
      name: 'storeSiteDataPlugin',
      async postBuild({siteConfig = {}, routesPaths = [], outDir}) {
        const dataDir = `${outDir}/../site-data`;
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir);
        }

        // write tags.txt, stripping out the /tags/ part
        const tags = routesPaths
          .filter((route) => route.startsWith('/tags/'))
          .map((route) => route.replace('/tags/', ''))
          .sort((a, b) => a.localeCompare(b));
        const tagsFile = `${dataDir}/tags.txt`;
        fs.writeFileSync(tagsFile, tags.join('\n'), 'utf8');
        console.log(`Wrote ${tags.length} tags to ${tagsFile}`);
        
        // write terms.txt, stripping out the /terms/ part
        const terms = routesPaths
          .filter((route) => route.startsWith('/terms/'))
          .map((route) => route.replace('/terms/', ''))
          .sort((a, b) => a.localeCompare(b));
        const termsFile = `${dataDir}/terms.txt`;
        fs.writeFileSync(termsFile, terms.join('\n'), 'utf8');
        console.log(`Wrote ${terms.length} tags to ${termsFile}`);
        
        // write strategy-categories.txt, stripping out the /strategies/ part
        // strip out anything after the first /
        const strategyCategories = routesPaths
          .filter((route) => route.startsWith('/strategies/'))
          .map((route) => route.replace('/strategies/', ''))
          .map((route) => route.split('/')[0])
          .sort((a, b) => a.localeCompare(b));
        const uniqueStrategyCategories = [...new Set(strategyCategories)];
        const strategyCategoriesFile = `${dataDir}/strategy-categories.txt`;
        fs.writeFileSync(strategyCategoriesFile, uniqueStrategyCategories.join('\n'), 'utf8');
        console.log(`Wrote ${uniqueStrategyCategories.length} strategy categories to ${strategyCategoriesFile}`);

        // wrtite strategies.txt
        // include the category for context. strip out anything after the second /
        const strategies = routesPaths
          .filter((route) => route.startsWith('/strategies/'))
          .map((route) => route.replace('/strategies/', ''))
          .map((route) => route.split('/'))
          .map((route) => {
            return {
              category: route[0],
              strategy: route[1],
            };
          })
          .filter((route) => route.category && route.strategy)
          .sort((a, b) => a.category.localeCompare(b.category) || a.strategy.localeCompare(b.strategy));
        const uniqueStrategies = [...new Set(strategies.map((strategy) => `/${strategy.category}/${strategy.strategy}`))];
        const strategiesFile = `${dataDir}/strategy-paths.txt`;
        fs.writeFileSync(strategiesFile, uniqueStrategies.join('\n'), 'utf8');
        console.log(`Wrote ${uniqueStrategies.length} strategies to ${strategiesFile}`);


      },
    };
  }