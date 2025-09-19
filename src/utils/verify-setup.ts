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
        console.log("Ready to build advanced RAG systems!");
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