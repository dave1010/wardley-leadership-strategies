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

**Note:** If you encounter issues with the faster build (e.g., on `android-arm64` environments), you can disable it by setting the `DISABLE_FASTER_BUILD` environment variable:

```bash
DISABLE_FASTER_BUILD=true npm run build
```

### Deployment

The `main` branch is deployed live with Vercel. This typically takes 1 or 2 minutes.

## Running Tests

### Python

These tests check the content of the site rather than the code. They verify things like reciprocal strategy links and required headings in markdown files.

```bash
python -m pytest tests
```

### Node

We use [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for unit and component testing. Test files are located alongside the components they cover (e.g., `src/components/MyComponent/MyComponent.test.tsx`).

Run the Node tests with:

```bash
npm test
```

Or run them in watch mode:

```bash
npm run test:watch
```

**Note:** CSS module imports are mocked during testing, so tests do not rely on actual styles.
