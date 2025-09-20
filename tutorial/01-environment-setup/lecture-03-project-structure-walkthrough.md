# Lecture 3: Project Structure and TypeScript Configuration Walkthrough

## Transcript

Now that Claude Code is configured, let's examine our project structure and TypeScript configuration. You'll understand how professional database applications are organized for reliability, maintainability, and type safety.

Open your code editor and navigate to the project root directory. You'll see a clean structure that demonstrates professional Node.js database application organization.

The project root contains configuration files: .env for environment setup, package.json for dependencies and scripts, and tsconfig.json for TypeScript compilation. Inside the src directory, we have utils containing our verification utility - verify-setup. The tutorial directory contains our course materials.

Configuration files live at the root for easy access and deployment automation. Source code is organized by purpose.

Our TypeScript configuration in tsconfig.json determines how TypeScript compiles our code and enforces type safety for database operations. These choices directly impact the reliability and maintainability of our PostgreSQL integration.

We're targeting ES2022 for modern JavaScript features while maintaining compatibility with Node.js18 and higher. This gives us access to advanced async operations and error handling patterns essential for database work.

The module system is set to commonjs - this is the traditional Node.js module format using require() to import libraries and module.exports to share code between files, which ensures compatibility with the PostgreSQL pg library and most Node.js packages. The output directory is dist for compiled JavaScript files. The root directory is src, establishing clear separation between TypeScript source and compiled output.

Strict mode enforces rigorous type checking - crucial for database applications where type errors can lead to runtime failures, connection issues, or data corruption. TypeScript prevents common mistakes like passing incorrect types to the PostgreSQL connection pool.

The configuration enables source maps and declarations, supporting debugging and type information for applications that might import our utilities.

Package.json defines our development workflow. The verify-setup script runs our verification utility directly using ts-node, allowing TypeScript execution without compilation. The build script compiles TypeScript to JavaScript. The start script runs compiled JavaScript from the dist folder for production deployment.

The dev script references src/index.ts, which doesn't yet exist. This is future-proofing for the rest of the project. This part of the project focuses on verification utilities rather than a full application - we're building foundational tools first.

Production dependencies include dotenv for environment variable management and pg for PostgreSQL connectivity. These are minimal requirements for database operations. Development dependencies include TypeScript, ts-node, and type definitions for Node.js and PostgreSQL.

The .env.example file documents required environment variables: database host, port, database name, username, and password. These are validated in our verification utility.

Environment configuration demonstrates security best practices - sensitive information like passwords never appears in source code. Applications read configuration from environment variables, enabling different settings for development, staging, and production.

Our source code organization currently has a single file - src/utils/verify-setup.ts. This validates environment setup, tests database connectivity, verifies pgvector functionality, and demonstrates proper error handling patterns.

For Claude Code assistance: "Explain the purpose of each file in this Node.js TypeScript project structure" or "Help me understand why these TypeScript compiler options are chosen for a PostgreSQL project."

Just to recap, yypeScript configuration is optimized for Node.js database applications with strict type checking. Environment variables drive database connectivity. The current codebase focuses on verification utilities rather than full applications. Package.json scripts support a verification-focused workflow.

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
