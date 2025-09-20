# Lecture 4: Node.js and TypeScript Development Setup

## Instructor Script

Welcome to our fourth lecture, where we build the technical foundation for PostgreSQL vector database development. We're setting up Node.js and TypeScript - configuring a professional development environment that supports type-safe database operations.

Our verification utility includes automatic version checking at lines 14-21 because Node.js compatibility directly impacts database operation reliability. We require Node.js 18 or higher for modern JavaScript features and because our TypeScript configuration targeting ES2022 depends on specific Node.js capabilities.

Check if you already have Node.js installed: run node --version and npm --version. This tells us if Node.js is installed and whether we need to upgrade. The verification utility validates this same requirement automatically.

If you need to install or upgrade Node.js, I recommend Node Version Manager (NVM) rather than system package managers. NVM provides version control for different projects, installs directly from Node.js rather than distribution repositories, avoids permission issues, and ensures compatibility with our verification utility requirements.

Install NVM with curl, source your bash configuration, then install the latest LTS version with nvm install --lts and nvm use --lts. Verify the installation shows version 18 or higher.

Our TypeScript configuration targets ES2022, visible in tsconfig.json at line 3. This requires Node.js 18 or higher for optimal compatibility. The verification utility validates this requirement automatically.

Since you're building this project from scratch, let's create the complete project structure and install dependencies. Create the project directory with mkdir nodejs-postgres-pgvector, change into it, and initialize package.json with npm init -y.

Install production dependencies for PostgreSQL connectivity and environment configuration. Install pg at version 8.16.3 (the PostgreSQL client library referenced at line 3 of our verification utility) and dotenv at version 17.2.2 for environment variable management. These are minimal dependencies for database operations.

Install development dependencies for TypeScript development: typescript at version 5.9.2, ts-node at version 10.9.2, type definitions with @types/node at version 24.5.2 and @types/pg at version 8.15.5. These ensure TypeScript understands the APIs we're using.

The pg library enables database connections and query execution. Dotenv handles .env file configuration, keeping sensitive credentials separate from source code. TypeScript provides compile-time type checking, preventing database errors before production. ts-node enables direct TypeScript execution without compilation steps.

Create the project structure with mkdir -p src/utils and configuration files with touch tsconfig.json and touch .env.example. This follows professional Node.js organization.

Create the TypeScript configuration optimized for database development. Set target to ES2022 for modern features, module to commonjs for Node.js compatibility, and enable strict type checking essential for database operations. Set outDir to dist and rootDir to src.

Strict mode prevents common mistakes like passing incorrect types to the PostgreSQL connection pool. esModuleInterop ensures compatibility with the pg library. sourceMap enables debugging support.

Update package.json scripts: build script to tsc, dev script to ts-node src/index.ts, start script to node dist/index.js, and verify-setup script to ts-node src/utils/verify-setup.ts. These define our development workflow.

Create the environment configuration documenting required database connection parameters: POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_USER, and POSTGRES_PASSWORD. These are validated in our verification utility at lines 24-37.

Create an initial verification utility that tests environment setup. This begins with environment variable validation and Node.js version checking, providing the foundation for the complete verification system we'll build.

Test your environment by running npm run verify-setup. If properly configured, you'll see Node.js version compatibility and environment variable status. Issues will show specific error messages indicating what needs fixing.

The development workflow: verify-setup script uses ts-node for immediate execution, build script compiles TypeScript for production, start script executes compiled code. This supports both development speed and production reliability.

Common setup issues: "Node.js 18+ required" indicates need for upgrade via NVM. TypeScript compilation errors are caught by strict configuration. Missing dependencies are resolved with npm install.

For Claude Code troubleshooting: "My Node.js version check in verify-setup.ts is failing" or "Explain why this tsconfig.json configuration is optimal for a PostgreSQL Node.js project."

Setup is correct when: Node.js version 18+ is installed and verified, all packages installed via npm install, TypeScript compilation working, and npm run verify-setup shows Node.js compatibility.

Key insights: Node.js 18+ is required and validated by our verification utility. TypeScript configuration optimizes for database development with strict type checking. Project dependencies are minimal and focused on PostgreSQL integration. ts-node enables rapid development and testing.

In our next lecture, we'll install and configure PostgreSQL with the pgvector extension, setting up the database infrastructure our verification utility requires.

### Install NVM (Node Version Manager) - Recommended Approach

**Why NVM is better than system package managers:**

- **Version Control**: Easy switching between Node.js versions
- **Always Up-to-Date**: Direct from Node.js, not distribution repositories
- **No Permission Issues**: Installs in home directory, avoiding sudo complications
- **Easy Management**: Simple commands for version management

**Installation:**

```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload bash configuration
source ~/.bashrc

# Install latest LTS Node.js
nvm install --lts
nvm use --lts

# Verify installation
node --version  # Should show v18.x.x or higher
npm --version
```

## Project Setup From Scratch

### 1. Create Project Directory

```bash
mkdir nodejs-postgres-pgvector
cd nodejs-postgres-pgvector
npm init -y
```

### 2. Install Dependencies

**Production Dependencies:**
```bash
npm install pg@8.16.3 dotenv@17.2.2
```

**Development Dependencies:**
```bash
npm install --save-dev typescript@5.9.2 ts-node@10.9.2 @types/node@24.5.2 @types/pg@8.15.5
```

### 3. Create Project Structure

```bash
mkdir -p src/utils
touch tsconfig.json
touch .env.example
```

### 4. Configure TypeScript (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "sourceMap": true,
    "declaration": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 5. Update Package.json Scripts

```json
{
  "scripts": {
    "build": "tsc",
    "dev": "ts-node src/index.ts",
    "start": "node dist/index.js",
    "verify-setup": "ts-node src/utils/verify-setup.ts"
  }
}
```

### 6. Create Environment Template (.env.example)

```bash
# Copy this file to .env and fill in your actual values

# PostgreSQL Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=rag_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
```

## Initial Verification Utility

Create a basic verification utility to test your environment:

```typescript
// src/utils/verify-setup.ts
import * as dotenv from "dotenv";

dotenv.config();

async function verifySetup() {
    console.log("Verifying Development Environment Setup");
    console.log("=".repeat(50));

    let allChecksPassed = true;

    // Check Node.js version
    console.log(`Node.js version: ${process.version}`);
    if (parseInt(process.version.slice(1)) < 18) {
        console.error("Node.js 18+ required");
        allChecksPassed = false;
    } else {
        console.log("Node.js version compatible");
    }

    // Check environment variables
    const requiredEnvVars = [
        "POSTGRES_HOST",
        "POSTGRES_PORT",
        "POSTGRES_DB",
        "POSTGRES_USER",
        "POSTGRES_PASSWORD",
    ];

    for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
            console.error(`Missing environment variable: ${envVar}`);
            allChecksPassed = false;
        }
    }

    if (allChecksPassed) {
        console.log("Environment variables configured");
    }

    if (allChecksPassed) {
        console.log("\nBasic setup verification complete!");
        console.log("Ready for PostgreSQL and pgvector setup!");
    } else {
        console.log("\nSetup verification failed");
        console.log("Please fix the issues above and run again");
    }
}

if (require.main === module) {
    verifySetup().catch(console.error);
}

export { verifySetup };
```

### Test Your Setup

```bash
npm run verify-setup
```

**Expected Output:**
```
Verifying Development Environment Setup
==================================================
Node.js version: v18.x.x
Node.js version compatible
Environment variables configured

Basic setup verification complete!
Ready for PostgreSQL and pgvector setup!
```

## Troubleshooting Common Issues

### Node.js Version Issues
- **Problem**: "Node.js 18+ required"
- **Solution**: Install Node.js 18+ using NVM (recommended) or direct download

### TypeScript Compilation Errors
- **Problem**: TypeScript compilation fails
- **Solution**: Verify tsconfig.json configuration and installed dependencies

### Permission Issues
- **Problem**: npm permission errors
- **Solution**: Use NVM instead of system-installed Node.js

### Module Resolution Issues
- **Problem**: Cannot find module errors
- **Solution**: Ensure all dependencies installed with `npm install`