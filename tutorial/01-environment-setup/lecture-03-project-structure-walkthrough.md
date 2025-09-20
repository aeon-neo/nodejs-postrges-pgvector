# Lecture 3: Project Structure and TypeScript Configuration Walkthrough

## Instructor Script

Now that Claude Code is configured, let's examine our project structure and TypeScript configuration. You'll understand how professional database applications are organized for reliability, maintainability, and type safety.

Open your code editor and navigate to the project root directory. You'll see a clean structure that demonstrates professional Node.js database application organization.

The project root contains configuration files: .env.example for environment setup, package.json for dependencies and scripts, and tsconfig.json for TypeScript compilation. Inside the src directory, we have utils containing our verify-setup.ts verification utility. The tutorial directory contains our course materials.

Configuration files live at the root for easy access and deployment automation. Source code is organized by purpose - utilities in the utils directory. The separation between source code and tutorial materials keeps the implementation clean and focused.

Our TypeScript configuration in tsconfig.json determines how TypeScript compiles our code and enforces type safety for database operations. These choices directly impact the reliability and maintainability of our PostgreSQL integration.

We're targeting ES2022 for modern JavaScript features while maintaining compatibility with Node.js 18 and higher. This gives us access to advanced async operations and error handling patterns essential for database work.

The module system is set to commonjs for Node.js and PostgreSQL library compatibility. The output directory is dist for compiled JavaScript files. The root directory is src, establishing clear separation between TypeScript source and compiled output.

Strict mode enforces rigorous type checking - crucial for database applications where type errors can lead to runtime failures, connection issues, or data corruption. TypeScript prevents common mistakes like passing incorrect types to the PostgreSQL connection pool.

The configuration enables source maps and declarations, supporting debugging and type information for applications that might import our utilities.

Package.json defines our development workflow. The verify-setup script runs our verification utility directly using ts-node, allowing TypeScript execution without compilation. The build script compiles TypeScript to JavaScript. The start script runs compiled JavaScript from dist for production deployment.

The dev script references src/index.ts, which doesn't exist. This means the project focuses on verification utilities rather than a full application - we're building foundational tools first.

Production dependencies include dotenv for environment variable management and pg for PostgreSQL connectivity. These are minimal requirements for database operations. Development dependencies include TypeScript, ts-node, and type definitions for Node.js and PostgreSQL.

The .env.example file documents required environment variables: database host, port, database name, username, and password. These are validated in our verification utility at lines 24 through 37.

Environment configuration demonstrates security best practices - sensitive information like passwords never appears in source code. Applications read configuration from environment variables, enabling different settings for development, staging, and production.

Our source code organization currently has a single file - src/utils/verify-setup.ts with 151 lines of verification logic. This validates environment setup, tests database connectivity, verifies pgvector functionality, and demonstrates proper error handling patterns.

The development workflow: copy .env.example to .env and configure database settings, run npm run verify-setup to test connections, use npm run build to compile TypeScript for production.

The dev script limitation points to src/index.ts which doesn't exist, meaning the project is currently configured for verification only. This is intentional - we're focusing on understanding database integration before building complete applications.

For Claude Code assistance: "Explain the purpose of each file in this Node.js TypeScript project structure" or "Help me understand why these TypeScript compiler options are chosen for a PostgreSQL project."

Key insights: TypeScript configuration is optimized for Node.js database applications with strict type checking. Environment variables drive database connectivity. The current codebase focuses on verification utilities rather than full applications. Package.json scripts support a verification-focused workflow.

In our next lecture, we'll set up your Node.js and TypeScript development environment, building on this foundation to create the technical infrastructure needed for PostgreSQL database applications.

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

## Project Files Overview

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