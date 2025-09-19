# Section 2: PostgreSQL Vector Database Implementation - Flashcard Questions

## Node.js and TypeScript Development Setup

1. What Node.js version is required by the project and why?
2. What is the recommended way to install Node.js for this project?
3. Which development dependencies are required for TypeScript database projects?
4. What production dependencies does the verification utility need?
5. How does the TypeScript configuration optimize for database development?

## Environment Configuration and Variables

6. What environment variable specifies the PostgreSQL host?
7. What is the default PostgreSQL port number?
8. Where should you copy .env.example to create your configuration?
9. What database name is used in the example configuration?
10. How does the verification utility validate environment variables?

## PostgreSQL and pgvector Installation

11. What PostgreSQL extension enables vector operations?
12. What SQL command creates the vector extension?
13. How do you verify pgvector installation in PostgreSQL?
14. What command starts PostgreSQL service on Ubuntu/Debian?
15. How do you create a PostgreSQL user with proper privileges?

## Complete verify-setup.ts Implementation

16. What are the main imports in verify-setup.ts?
17. How does the verification utility track overall success status?
18. What class is used for database connection pooling?
19. How are environment variables integrated into pool configuration?
20. What happens in the finally block of the connection handling?

## Vector Operations and Mathematics

21. What does the <-> operator calculate between vectors?
22. What is the expected distance between [1,2,3] and [1,2,4]?
23. How does the code create a test table for vector operations?
24. What vector dimensions are used in the test table?
25. How does the similarity search query work and what order does it return results?

# Section 2: PostgreSQL Vector Database Implementation - Flashcards

### **What Node.js version is required by the project and why?**

Node.js 18+ - required for ES2022 compatibility and verified automatically by the utility at src/utils/verify-setup.ts:14-21.

### **What is the recommended way to install Node.js for this project?**

NVM (Node Version Manager) for easy version switching, direct from Node.js rather than distribution repositories, avoiding permission issues.

### **Which development dependencies are required for TypeScript database projects?**

typescript, ts-node, @types/node, @types/pg - enable TypeScript compilation, direct execution, and type definitions for Node.js and PostgreSQL.

### **What production dependencies does the verification utility need?**

pg (PostgreSQL client library) and dotenv (environment variable management) for database connections and configuration.

### **How does the TypeScript configuration optimize for database development?**

ES2022 target, strict type checking, CommonJS modules for Node.js compatibility, and enhanced error detection for database operations.

### **What environment variable specifies the PostgreSQL host?**

POSTGRES_HOST - validated by verify-setup.ts lines 24-37, typically localhost for development environments.

### **What is the default PostgreSQL port number?**

5432 - used as fallback in verify-setup.ts line 230 when POSTGRES_PORT not specified in environment variables.

### **Where should you copy .env.example to create your configuration?**

Copy .env.example to .env in project root, then customize values for your PostgreSQL database setup and credentials.

### **What database name is used in the example configuration?**

rag_db - specified in .env.example as the target database for RAG (Retrieval-Augmented Generation) vector operations.

### **How does the verification utility validate environment variables?**

Array-driven validation checking each required variable (POSTGRES_HOST, PORT, DB, USER, PASSWORD) and reporting specific missing ones.

### **What PostgreSQL extension enables vector operations?**

pgvector - adds vector data type and similarity search operators like <-> for distance calculations and vector storage.

### **What SQL command creates the vector extension?**

CREATE EXTENSION IF NOT EXISTS vector; - enables pgvector functionality in the database, required before vector operations.

### **How do you verify pgvector installation in PostgreSQL?**

Query: SELECT '[1,2,3]'::vector; - tests vector type casting as implemented in verify-setup.ts lines 245-247.

### **What command starts PostgreSQL service on Ubuntu/Debian?**

sudo systemctl start postgresql - starts PostgreSQL database service, with sudo systemctl enable postgresql for automatic startup.

### **How do you create a PostgreSQL user with proper privileges?**

CREATE USER rag_user WITH PASSWORD 'password'; GRANT ALL PRIVILEGES ON DATABASE rag_db TO rag_user; for full database access.

### **What are the main imports in verify-setup.ts?**

dotenv and Pool from pg - enables environment variable loading and PostgreSQL connection pooling for efficient database access.

### **How does the verification utility track overall success status?**

allChecksPassed boolean variable - initialized true, set false when any verification check fails, determines final exit status.

### **What class is used for database connection pooling?**

Pool from pg library - configured with environment variables for efficient connection management and resource optimization.

### **How are environment variables integrated into pool configuration?**

Direct process.env access - POSTGRES_HOST, PORT, DB, USER, PASSWORD drive pool configuration with parseInt for port conversion.

### **What happens in the finally block of the connection handling?**

await pool.end() - ensures connection pool is properly terminated regardless of success or failure, preventing resource leaks.

### **What does the <-> operator calculate between vectors?**

Euclidean distance - mathematical distance between vector points in multi-dimensional space, lower values indicate higher similarity.

### **What is the expected distance between [1,2,3] and [1,2,4]?**

Distance of 1 - calculated as √[(1-1)² + (2-2)² + (3-4)²] = √[0 + 0 + 1] = 1.

### **How does the code create a test table for vector operations?**

CREATE TABLE test_vectors with VECTOR(3) column - enables vector storage and similarity testing with 3-dimensional vectors.

### **What vector dimensions are used in the test table?**

VECTOR(3) - three-dimensional vectors for predictable distance calculations and testing in the verification utility.

### **How does the similarity search query work and what order does it return results?**

SELECT with distance calculation and ORDER BY distance - ranks vectors by similarity to query vector, closest (most similar) first.