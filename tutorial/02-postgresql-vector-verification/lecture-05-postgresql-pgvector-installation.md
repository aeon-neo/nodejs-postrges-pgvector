# Lecture 5: PostgreSQL and pgvector Extension Installation

## Learning Objectives

By the end of this lecture, you will:

- Install PostgreSQL database server and configure it for development
- Install and enable the pgvector extension for vector operations
- Create the database and user credentials referenced in the project
- Configure your .env file to match the verification utility requirements

## PostgreSQL Installation Requirements

The verification utility expects a running PostgreSQL server with specific configuration. Examine `src/utils/verify-setup.ts` lines 44-50 to see the connection requirements:

```typescript
const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});
```

This code shows exactly what database configuration our verification utility expects.

## PostgreSQL Installation by Platform

## PostgreSQL + pgvector Installation

### **Ubuntu/Debian Setup**

#### Step 1: Update Package Lists

```bash
# Refresh package information
sudo apt update && sudo apt upgrade -y

# Install basic build tools
sudo apt install -y wget curl git build-essential
```

#### Step 2: Install PostgreSQL

```bash
# Install PostgreSQL and development headers
sudo apt install -y postgresql postgresql-contrib postgresql-server-dev-all

# Start and enable PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Verify installation
sudo systemctl status postgresql
# Should show "active (running)"
```

#### Step 3: Install pgvector Extension

```bash
# Clone pgvector repository
git clone --branch v0.5.1 https://github.com/pgvector/pgvector.git
cd pgvector

# Compile and install extension
make
sudo make install

# Verify installation
ls /usr/lib/postgresql/*/lib/vector.so
# Should show pgvector library files
/usr/lib/postgresql/16/lib/vector.so

# Clean up
cd ..
rm -rf pgvector

# Check PostgreSQL version
psql --version
# Should show PostgreSQL 15.x or later
```

**macOS (using Homebrew):**

```bash
brew install postgresql
brew install pgvector
brew services start postgresql
```

**Docker (Platform Independent):**

```bash
docker run --name postgres-vector \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=rag_db \
  -p 5432:5432 \
  -d ankane/pgvector
```

**Using Package Managers:**

```bash
# macOS with Homebrew
brew install pgvector

# Ubuntu/Debian (if available)
sudo apt install postgresql-pgvector
```

**Docker with pgvector:**

```bash
docker run --name postgres-vector \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=rag_db \
  -p 5432:5432 \
  -d ankane/pgvector
```

## Database Configuration

### **Create Database and User**

First, check which port PostgreSQL is running on:

```bash
sudo pg_lsclusters
```

You might see output like:

```
Ver Cluster Port Status Owner    Data directory
16  main    5433 online postgres /var/lib/postgresql/16/main
```

**Connect to PostgreSQL as postgres user:**

```bash
# Connect to PostgreSQL as postgres user
sudo -u postgres psql

# Execute these commands in PostgreSQL prompt:
```

```sql
-- Create our RAG database
CREATE DATABASE rag_db;

-- Create user with password (change 'your_secure_password')
CREATE USER rag_user WITH PASSWORD 'your_secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE rag_db TO rag_user;
GRANT ALL ON SCHEMA public TO rag_user;

-- Connect to our database
\c rag_db

-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Verify extension is installed
\dx vector

-- Should show pgvector extension details like:
--  Name  | Version | Schema |      Description
-- -------+---------+--------+-----------------------
--  vector|   0.5.1 | public | vector data type and...


-- Exit PostgreSQL
\q
```

## Complete the Verification Utility

Now that PostgreSQL and pgvector are installed, let's complete our verification utility with full database testing capabilities. We'll replace the basic version from Lecture 4 with the complete 151-line implementation:

```bash
# Replace the basic verify-setup.ts with the complete version
cat > src/utils/verify-setup.ts << 'EOF'
// src/utils/verify-setup.ts
import * as dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

async function verifySetup() {
    console.log("Verifying Development Environment Setup");
    console.log("=".repeat(50));

    // Initialize tracking variable
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

    // Test PostgreSQL connection
    const pool = new Pool({
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT || "5432"),
        database: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
    });

    try {
        const client = await pool.connect();
        console.log("PostgreSQL connection successful");

        // Test pgvector extension
        const result = await client.query("SELECT version();");
        console.log(`PostgreSQL version: ${result.rows[0].version.split(" ")[1]}`);

        // Test pgvector extension availability
        try {
            await client.query("SELECT '[1,2,3]'::vector;");
            console.log("pgvector extension working");
        } catch (vectorError: any) {
            console.error("pgvector extension not found");
            console.error("   Run: CREATE EXTENSION IF NOT EXISTS vector;");
            allChecksPassed = false;

            // Skip remaining vector tests if extension not found
            client.release();
            await pool.end();

            if (!allChecksPassed) {
                console.log("\nSetup verification failed");
                console.log("Please fix the issues above and run again");
                process.exit(1);
            }
            return;
        }

        // Test vector operations - only run if pgvector is working
        try {
            // Test vector distance calculation
            const distanceResult = await client.query(`
                SELECT '[1,2,3]'::vector <-> '[1,2,4]'::vector AS distance;
            `);
            console.log(`Vector distance calculation: ${distanceResult.rows[0].distance}`);

            // Test vector operations with table
            await client.query(`
                CREATE TABLE IF NOT EXISTS test_vectors (
                  id SERIAL PRIMARY KEY,
                  content TEXT,
                  embedding VECTOR(3)
                );
            `);

            await client.query(`
                INSERT INTO test_vectors (content, embedding)
                VALUES
                  ('First document', '[1,2,3]'),
                  ('Second document', '[4,5,6]'),
                  ('Third document', '[1,2,4]');
            `);

            const similarity = await client.query(`
                SELECT content, embedding <-> '[1,2,3]' AS distance
                FROM test_vectors
                ORDER BY distance
                LIMIT 3;
            `);

            console.log("Vector similarity search working:");
            similarity.rows.forEach((row, idx) => {
                console.log(`  ${idx + 1}. "${row.content}" (distance: ${row.distance})`);
            });

            // Cleanup test table
            await client.query("DROP TABLE test_vectors;");

        } catch (operationError: any) {
            console.error("Vector operations failed:", operationError.message);
            allChecksPassed = false;
        }

        // Release the client connection
        client.release();

    } catch (error: any) {
        console.error("PostgreSQL connection failed:", error.message);
        allChecksPassed = false;
    } finally {
        // Always end the pool connection
        await pool.end();
    }

    // Final status
    if (allChecksPassed) {
        console.log("\nSetup verification complete!");
        console.log("Your PostgreSQL + pgvector environment is ready!");
    } else {
        console.log("\nSetup verification failed");
        console.log("Please fix the issues above and run again");
        process.exit(1);
    }
}

if (require.main === module) {
    verifySetup().catch(console.error);
}

export { verifySetup };
EOF
```

## Test Your Complete Setup

Update your `.env` file with your actual database credentials:

```bash
# Update .env with your database settings
cat > .env << 'EOF'
# PostgreSQL Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=rag_db
POSTGRES_USER=rag_user
POSTGRES_PASSWORD=your_secure_password
EOF
```

**Replace `your_secure_password` with the actual password you set when creating the `rag_user`.**

Now run the complete verification utility to test your entire setup:

```bash
npm run verify-setup
```

## Expected Success Output

If everything is properly configured, you should see:

```
Verifying Development Environment Setup
==================================================
Node.js version: v18.x.x
Node.js version compatible
Environment variables configured
PostgreSQL connection successful
PostgreSQL version: 15.x
pgvector extension working
Vector distance calculation: 1
Vector similarity search working:
  1. "First document" (distance: 0)
  2. "Third document" (distance: 1)
  3. "Second document" (distance: 5.196152422706632)

Setup verification complete!
Your PostgreSQL + pgvector environment is ready!
```

**What This Confirms:**
- Node.js version compatibility ✓
- Environment variables properly configured ✓
- PostgreSQL connection successful ✓
- pgvector extension installed and working ✓
- Vector distance calculations functioning ✓
- Vector similarity search operational ✓

## Common Installation Issues

**Issue 1: pgvector Extension Not Found**

```
pgvector extension not found
   Run: CREATE EXTENSION IF NOT EXISTS vector;
```

**Solution**: Install pgvector and enable the extension in your specific database

**Issue 1a: Extension Shows as Not Installed with `\dx vector`**

If `\dx vector` shows no results even after installation:

1. Ensure you're connected to the correct database (`\c rag_db`)
2. Extensions are database-specific - create it in the database you're using
3. Run `CREATE EXTENSION IF NOT EXISTS vector;` in the target database

**Issue 2: Connection Refused**

```
PostgreSQL connection failed: connect ECONNREFUSED
```

**Solution**: Ensure PostgreSQL service is running and .env configuration is correct

**Issue 3: Permission Denied**

```
permission denied for database
```

**Solution**: Grant proper privileges to your PostgreSQL user

## Claude Code Integration Examples

Use these prompts for PostgreSQL and pgvector setup:

**Installation Help:**
"Help me install pgvector extension on macOS for this Node.js project"

**Configuration Troubleshooting:**
"My verify-setup.ts is failing at PostgreSQL connection - analyze the error and suggest fixes"

**Extension Verification:**
"Explain what the pgvector tests in src/utils/verify-setup.ts lines 80-123 are validating"

## Key Takeaways

- PostgreSQL and pgvector must be properly installed and configured
- The verification utility provides real-time validation of your database setup
- Environment variables drive database connectivity and are validated automatically
- Vector operations are tested comprehensively including distance calculations and similarity search

## Next Steps

In the next lecture, we'll conduct a comprehensive walkthrough of the verification utility code, analyzing every line of the 151-line implementation to understand PostgreSQL connection patterns, vector operations, and production-quality error handling.

Ensure your PostgreSQL and pgvector installation passes the verification utility before proceeding - this validates your complete development environment setup.
