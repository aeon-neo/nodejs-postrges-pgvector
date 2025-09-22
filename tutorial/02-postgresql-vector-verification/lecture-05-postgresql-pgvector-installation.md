# Lecture 5: PostgreSQL and pgvector Extension Installation

## Transcript

Welcome to our fifth lecture, where we set up the database infrastructure that turns our Node.js application into a working vector database system. We're installing PostgreSQL with the pgvector extension - creating the foundation for semantic search and modern AI-powered applications.

The connection pool configuration defines exactly what our application requires: a PostgreSQL database accessible via environment variables for host, port, database name, user, and password.

This demonstrates good practice database connection patterns using connection pooling for reliability and performance. Environment variables ensure sensitive credentials stay separate from source code, enabling secure deployment across development, staging, and production environments.

For Ubuntu and Debian systems: update package lists with apt update, install PostgreSQL and development headers with apt install postgresql postgresql-contrib postgresql-server-dev-all. Development headers contain the interface definitions that PostgreSQL extensions need for compilation - without them, pgvector installation fails because it cannot connect to PostgreSQL's core functionality.

Start and enable PostgreSQL with systemctl start postgresql and systemctl enable postgresql. These commands require sudo - which means system administrator privileges - to manage system services. Verify installation shows "active (running)" status.

Install the pgvector extension by cloning the GitHub repository, specifying version 0.5.1 for compatibility. Change into the pgvector directory, compile with make, then install system-wide with sudo make install.

Check which port PostgreSQL is running on using pg_lsclusters. Note that you might see PostgreSQL on port 5433 instead of the default 5432, which affects your environment configuration, perhaps because you already have another instance running on the default port.

Connect to PostgreSQL as the postgres user with sudo -u postgres psql. Create the rag_db database and a user with appropriate permissions:

CREATE DATABASE rag_db;
CREATE USER rag_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE rag_db TO rag_user;

Connect to the new database with \c rag_db, then enable the pgvector extension with CREATE EXTENSION IF NOT EXISTS vector. This makes vector data types and operations available within your specific database.

Now complete our verification utility with full database testing capabilities. Replace the basic version from lecture 4 with the complete implementation that includes PostgreSQL connectivity, pgvector validation, and comprehensive vector operations testing.

This complete verification utility adds PostgreSQL connection testing using connection pooling, pgvector extension validation, vector distance calculations, and similarity search testing with actual data.

Update your .env file with actual database credentials. Replace the placeholder password with the secure password you set for rag_user.

Run the complete verification utility with npm run verify-setup to test your entire setup. This validates every component from Node.js compatibility through vector similarity search operations.

Successful output shows Node.js version compatibility, environment variables configured, PostgreSQL connection successful, pgvector extension working, vector distance calculations, and similarity search results. This confirms your complete development environment is ready.

As usual, use Claude Code for troubleshooting. For example, "verify-setup is failing at PostgreSQL connection - analyze the error and suggest fixes."

In our next lecture, we'll conduct a comprehensive walkthrough of the verification utility code, analyzing every line of the implementation to understand PostgreSQL connection patterns, vector operations, and production-quality error handling.

## PostgreSQL Installation by Platform

## PostgreSQL + pgvector Installation

### **Ubuntu/Debian Setup**

#### Step 1: Update Package Lists

```bash
sudo apt update
sudo apt upgrade
```

#### Step 2: Install Build Tools

```bash
sudo apt install build-essential git
```

#### Step 3: Install PostgreSQL

```bash
sudo apt install postgresql postgresql-contrib postgresql-server-dev-all
```

#### Step 4: Start PostgreSQL Service

```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
sudo systemctl status postgresql  # Should show "active (running)"
```

#### Step 5: Install pgvector Extension

```bash
# Clone pgvector repository
git clone --branch v0.5.1 https://github.com/pgvector/pgvector.git
cd pgvector

# Compile and install
make
sudo make install

# Verify installation
ls /usr/lib/postgresql/*/lib/vector.so

# Clean up
cd ..
rm -rf pgvector

# Check PostgreSQL version
sudo -u postgres psql -c "SELECT version();"
```

### **macOS Setup (Homebrew)**

```bash
# Install PostgreSQL
brew install postgresql

# Install pgvector
brew install pgvector

# Start PostgreSQL service
brew services start postgresql

# Verify installation
psql postgres -c "SELECT version();"
```

### **Docker Setup (Platform Independent)**

```bash
# Pull and run PostgreSQL with pgvector
docker run --name postgres-pgvector \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=rag_db \
  -p 5432:5432 \
  -d ankane/pgvector

# Verify container is running
docker ps
```

## Database Configuration

### **Check PostgreSQL Port**

PostgreSQL might run on a different port:

```bash
# Check active PostgreSQL clusters
pg_lsclusters

# Output might show:
# Ver Cluster Port Status Owner    Data directory               Log file
# 15  main    5433 online postgres /var/lib/postgresql/15/main   /var/log/postgresql/postgresql-15-main.log
```

If PostgreSQL runs on port 5433, update your environment configuration accordingly.

### **Database and User Setup**

Connect to PostgreSQL and create database and user:

```bash
# Connect as postgres user
sudo -u postgres psql

# Or for macOS/Docker:
# psql -U postgres -h localhost
```

In the PostgreSQL prompt:

```sql
-- Create database
CREATE DATABASE rag_db;

-- Create user with password
CREATE USER rag_user WITH PASSWORD 'your_secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE rag_db TO rag_user;

-- Connect to the new database
\c rag_db

-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Verify extension installation
\dx vector

-- Test vector functionality
SELECT '[1,2,3]'::vector;

-- Exit PostgreSQL
\q
```

## Complete the Verification Utility

Now that PostgreSQL and pgvector are installed, let's complete our verification utility with full database testing capabilities. We'll replace the basic version from Lecture 4 with the complete implementation:

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

## Troubleshooting with Claude Code

Use specific prompts for effective troubleshooting:

**Installation Help:**

```
Help me install pgvector extension on Ubuntu for this Node.js project. I'm getting compilation errors during make install.
```

**Connection Issues:**

```
My verify-setup.ts is failing at PostgreSQL connection with error [paste error]. Analyze the connection configuration and suggest fixes.
```

**Extension Problems:**

```
The pgvector extension test is failing. Help me verify the extension is properly installed and enabled in my rag_db database.
```

**Environment Configuration:**

```
My environment variables are configured but the verification utility reports missing variables. Help me debug the .env file loading in verify-setup.ts.
```
