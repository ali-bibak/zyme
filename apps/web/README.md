To get started

```bash
pnpm install
```

Make sure to use `pnpm` as the package manager, which is already set up in the project.

#### Scripts

This project comes with a variety of npm scripts to streamline development and production workflows. Below is a brief explanation of each script:

- **`pnpm dev`**: Starts the development server with Vite.
- **`pnpm start`**: Starts the development server and opens it in your default browser.
- **`pnpm build`**: Builds the project for production.
- **`pnpm preview`**: Previews the production build.
- **`pnpm test`**: Runs unit tests using Vitest.
- **`pnpm coverage`**: Generates a test coverage report.
- **`pnpm bundle`**: Visualizes the production bundle using `vite-bundle-visualizer`.
- **`pnpm cy`**: Opens Cypress for end-to-end testing.
- **`pnpm cyr`**: Runs Cypress end-to-end tests in headless mode.
- **`pnpm pretty`**: Formats code in the `./src` directory using Prettier.
- **`pnpm ts`**: Type-checks the project using TypeScript.
- **`pnpm lint`**: Lints the codebase using ESLint.
- **`pnpm knip`**: Analyzes the codebase for unused files and dependencies.
- **`pnpm knip:prod`**: Analyzes production code for unused files and dependencies.
- **`pnpm refresh`**: Updates dependencies to the latest versions using Taze.
- **`pnpm clean`**: Cleans up build artifacts and temporary files.

#### Development

To start the development server, run:

<pre align="center">pnpm <b>dev</b></pre>

This will start Vite's development server, and you can access your application at `http://localhost:3000`.

#### Building

To build the project for production, use:

The output will be generated in the `dist` directory. You can then preview the build with:

<pre align="center">pnpm <b>preview</b></pre>

#### Testing

This project uses Vitest for unit testing and Cypress for end-to-end testing.

- **Unit tests**: Run `pnpm test` to execute unit tests.
- **End-to-end tests**: Use `pnpm cy` to open the Cypress interface or `pnpm cyr` to run tests in headless mode.

To check test coverage, run:

<pre align="center">pnpm <b>coverage</b></pre>

#### Linting

To ensure code quality, run ESLint:

<pre align="center">pnpm <b>lint</b></pre>

This will check for any linting errors in the project.

#### Code Formatting

To format the codebase according to Prettier configurations, use:

<pre align="center">pnpm <b>pretty</b></pre>

#### License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.
