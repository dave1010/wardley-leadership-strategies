# [Wardley Leadership Strategies](https://www.wardleyleadershipstrategies.com)

The Compendium of Wardley Mapping Leadership Gameplays and Strategies.

If you landed here accidentally, this is the source behind the site.
You can view the live site at [`wardleyleadershipstrategies.com`](https://www.wardleyleadershipstrategies.com).

## Contributing

Contributions welcome.

You can easily add and edit content from Github, without cloning the repo or running any code.

Browse the Markdown files in [`./docs/strategies`](./docs/strategies) and click the edit button.

## Development

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```bash
npm install
```

### Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

The `main` branch is deployed live with Vercel. This typically takes 1 or 2 minutes.

## Running Tests

This project uses [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for unit and component testing.

Test files are located alongside the components they test (e.g., `src/components/MyComponent/MyComponent.test.tsx`).

To run the tests:

```bash
npm test
```

Or, to run tests in watch mode:

```bash
npm run test:watch
```

You can also use `yarn test` or `yarn test:watch` if you prefer Yarn.

**Note:** CSS module imports are mocked during testing, so tests do not rely on actual styles.
