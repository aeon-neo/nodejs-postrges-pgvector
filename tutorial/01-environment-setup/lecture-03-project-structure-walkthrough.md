# Lecture 3: Project Structure and TypeScript Configuration Walkthrough

## Transcript

Now that Claude Code is configured, let's examine our project structure and TypeScript configuration to see how it's organized.

For this lecture, we're jumping ahead to the final project so you'll need to get that from my Github repo. The link is in the resources.

Now, in a new window in your code editor, after connecting to WSL, in the terminal enter this git command:

```
git clone git@github.com:aeon-neo/nodejs-postgres-pgvector.git
```

to clone the repo.

If you've already cloned, like I have, you'll get this error.

Otherwise, the next step is to open the folder where you just cloned the project.

Here, you can see a nice clean, well-organised structure that will be easy to maintain yourself or by someone else.

The project root contains our configuration files:

- .env.example that you'll' change to .env like I already have. This is where we store envrionment variables for security.
- CLAUDE.md which we created in the previous lecture, where we store useful infromation and instructions for our AI assistant.
- package.json where we specify our dependencies and scripts.
- and finally tsconfig.json for our TypeScript configuration.

Inside the src directory, we have a utils folder that, at the moment, only contains our verification utility called verify-setup.ts. The ts there denotes that this is a TypeScript file.

The tutorial directory contains our course materials.

---

Configuration files live at the root for easy access and deployment automation.

So now, let's take a look at tsconfig.json. This file determines how TypeScript compiles our code and enforces type safety for database operations.

Fundamentally, NodeJS only executes JavaScript. It doesn't understand TypeScript. So we have to compile our TypeScript source code into pure JavaScript before NodeJS can run it.

TypeScript is "typed" which means we declare what kind of data each variable holds. For example, we specify that a database port must be a number, or a username must be a string. JavaScript doesn't have this. In JavaScript, a variable can hold any type of data at any time, which inevitably leads to bugs that only show up when your code is already running.

TypeScript catches these "type" errors during compilation, before the code ever runs. That's critical for applications like this database where passing the wrong type to a connection pool, for example, might crash your server or something like that.

NodeJS executes JavaScript outside the browser for server-side applications like this one. It means we can use JavaScript for both backend and frontend, via TypeScript, which has JavaScript under the hood.

Our Typescript target version is ES2022. This gives us modern JavaScript features while maintaining compatibility with NodeJS. For example, we get async operations that are essential for database work.

When TypeScript compiles, it does two things. It strips out all the type annotations to create pure JavaScript, and converts our module format. We write using modern ES module syntax like "import" statements, and TypeScript converts this to CommonJS format with "require" calls that NodeJS expects.

If we take a brief look at verify-setup you'll see what I mean.

Here you can see, we have "import" syntax at the top. TypeScript strips the types and converts the module format when it compiles, in this case to a "require" call.

The module setting is commonjs - the traditional NodeJS format. The esModuleInterop setting makes the module conversion work smoothly between our ES module source code and CommonJS libraries like pg that we need for our vector database.

Our output directory for compiled JavaScript is "dist". The root directory for source code is "src". This gives us clean separation between the source code and compiled output.

Finally, "strict" mode enforces rigorous type checking. This is what makes TypeScript valuable - catching errors at compile time instead of runtime.

---

Package.json defines our development workflow. The verify-setup script runs our verification utility directly using ts-node, allowing TypeScript execution without compilation. The build script compiles TypeScript to JavaScript. The start script runs compiled JavaScript from the dist folder for production deployment.

The dev script references src/index.ts, which doesn't yet exist. This is future-proofing for the rest of the project. This part of the project focuses on verification utilities rather than a full application - we're building foundational tools first.

Production dependencies include dotenv for environment variable management and pg for PostgreSQL connectivity. These are minimal requirements for database operations. Development dependencies include TypeScript, ts-node, and type definitions for Node.js and PostgreSQL.

The .env.example file documents required environment variables: database host, port, database name, username, and password. These are validated in our verification utility.

Environment configuration demonstrates security best practices - sensitive information like passwords never appears in source code. Applications read configuration from environment variables, enabling different settings for development, staging, and production.

Our source code organization currently has a single file - src/utils/verify-setup.ts. This validates environment setup, tests database connectivity, verifies pgvector functionality, and demonstrates proper error handling patterns.

Don't forget you can always ask Claude for further explanations about these confirgurations and libraries.

So, to recap, TypeScript configuration is optimized for Node.js database applications with strict type checking. Environment variables drive database connectivity. The current codebase focuses on verification utilities rather than full applications. Package.json scripts support a verification-focused workflow.

In our next lecture, we'll set up the Node.js and TypeScript development environment, building on this foundation to create the technical infrastructure needed for PostgreSQL database applications.

## Project Files Overview

```
nodejs-postgres-pgvector/
├── .env.example                    # Environment configuration template
├── package.json                    # Project dependencies and scripts
├── tsconfig.json                   # TypeScript compiler configuration
├── src/
│   └── utils/
│       └── verify-setup.ts         # Our core verification utility
└── tutorial/                       # Course materials and documentation
```

### Configuration Files

- **tsconfig.json**: TypeScript compiler settings optimized for database development
- **package.json**: Dependencies and scripts for development workflow
- **.env.example**: Template for environment variables

### Source Code Structure

- **src/utils/verify-setup.ts**: Core verification utility (151 lines)
- Clean separation between utilities and application code
- Professional organization following Node.js best practices

## TypeScript Configuration Analysis

### Compiler Options

- **Target**: ES2022 for modern features with Node.js 18+ compatibility
- **Module**: CommonJS for Node.js ecosystem compatibility
- **Strict**: Enabled for maximum type safety in database operations

### Development Benefits

- Type checking prevents database-related runtime errors
- Source maps enable debugging in production
- Declarations support library usage patterns

## Environment Configuration

The project separates configuration from code:

### Required Variables

- `POSTGRES_HOST` - Database server location
- `POSTGRES_PORT` - Connection port (default 5432)
- `POSTGRES_DB` - Target database name
- `POSTGRES_USER` - Authentication username
- `POSTGRES_PASSWORD` - Authentication credentials

### Security Approach

- No credentials in source code
- Environment-based configuration
- Validation in verification utility

## Development Workflow

### Scripts Available

- `npm run verify-setup` - Run verification utility
- `npm run build` - Compile TypeScript
- `npm start` - Run compiled JavaScript

### Current Limitations

The `dev` script points to `src/index.ts` which doesn't exist. This means the project is currently set up for verification only, not full application development.
