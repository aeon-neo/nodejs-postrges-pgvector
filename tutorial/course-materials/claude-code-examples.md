# Claude Code Examples Guide

This guide provides specific prompts for using Claude Code effectively with PostgreSQL vector database development, based on the actual verification utility implementation at `src/utils/verify-setup.ts`.

## Environment Setup and Configuration

### Development Environment Troubleshooting

**Node.js Version Issues:**
```
My verify-setup utility is reporting Node.js version compatibility issues. Help me analyze the version check at src/utils/verify-setup.ts lines 14-21 and resolve the problem.
```

**TypeScript Configuration Analysis:**
```
Analyze the TypeScript configuration in tsconfig.json and explain why these compiler options are chosen for a PostgreSQL vector database project. Focus on the target, strict mode, and module settings.
```

**Environment Variable Configuration:**
```
I'm getting missing environment variable errors from verify-setup.ts. Help me set up the .env file correctly based on the validation at lines 24-37 and the .env.example template.
```

### Package Management and Dependencies

**Dependency Analysis:**
```
Examine the package.json dependencies and explain why these specific versions of pg, dotenv, and TypeScript packages are chosen for the vector database project.
```

**Build Process Optimization:**
```
Help me optimize the npm scripts in package.json for development and production workflows. Analyze the current scripts and suggest improvements.
```

## Database Connection and Pooling

### Connection Troubleshooting

**Pool Configuration Issues:**
```
My PostgreSQL connection is failing in verify-setup.ts at the pool configuration (lines 44-50). Help me debug the connection parameters and environment variable integration.
```

**Connection Performance Analysis:**
```
Analyze the connection pooling implementation in src/utils/verify-setup.ts and suggest optimizations for production use. Focus on the Pool configuration and client lifecycle management.
```

**Resource Management Issues:**
```
Help me understand the resource cleanup patterns in verify-setup.ts, particularly the client.release() and pool.end() calls. How can I ensure proper resource management?
```

### Error Handling Optimization

**Error Pattern Analysis:**
```
Examine the error handling strategy in src/utils/verify-setup.ts lines 128-134 and help me implement similar patterns for my database operations.
```

**Early Exit Strategy:**
```
Analyze the early exit pattern for pgvector extension failures at lines 69-78 in verify-setup.ts. Help me implement similar error recovery strategies.
```

## pgvector and Vector Operations

### Extension Installation and Setup

**pgvector Installation Help:**
```
I'm getting "pgvector extension not found" errors from verify-setup.ts. Help me install and configure the pgvector extension based on the verification code at lines 60-66.
```

**Extension Verification Debugging:**
```
My pgvector extension test is failing at the vector type casting in verify-setup.ts line 61. Help me diagnose and fix the extension installation.
```

### Vector Mathematics and Operations

**Distance Calculation Analysis:**
```
Explain the vector distance calculation in src/utils/verify-setup.ts lines 83-86. Help me understand why '[1,2,3]' and '[1,2,4]' return a distance of 1.
```

**Similarity Search Implementation:**
```
Analyze the vector similarity search query in verify-setup.ts lines 105-110. Help me understand the ORDER BY distance pattern and adapt it for my use case.
```

**Vector Table Design:**
```
Help me understand the test_vectors table structure in verify-setup.ts lines 89-95. How should I design vector tables for production applications?
```

## Code Analysis and Learning

### Code Pattern Understanding

**Async/Await Patterns:**
```
Analyze the async/await usage throughout src/utils/verify-setup.ts and help me understand the proper patterns for database operations in TypeScript.
```

**Module Design Analysis:**
```
Examine the module structure of verify-setup.ts, particularly the export pattern at lines 147-151. Help me design similar utilities for my project.
```

**Status Tracking Implementation:**
```
Analyze the allChecksPassed tracking pattern in verify-setup.ts and help me implement similar status management in my verification utilities.
```

### Testing and Validation Strategies

**Verification Logic Review:**
```
Review the complete verification logic in src/utils/verify-setup.ts and help me design similar verification utilities for my database applications.
```

**Test Data Management:**
```
Analyze the test data creation and cleanup in verify-setup.ts lines 97-118. Help me implement similar patterns for testing vector operations.
```

## Production Deployment and Optimization

### Production Readiness

**Health Check Implementation:**
```
Help me convert the verification patterns in src/utils/verify-setup.ts into a production health check endpoint for my application.
```

**Monitoring and Alerting:**
```
Based on the verification checks in verify-setup.ts, help me design monitoring and alerting strategies for PostgreSQL vector database applications.
```

**Configuration Management:**
```
Analyze the environment variable handling in verify-setup.ts and help me implement secure configuration management for production deployments.
```

### Performance Optimization

**Connection Pool Tuning:**
```
Help me optimize the PostgreSQL connection pool configuration based on the patterns in verify-setup.ts for high-traffic production applications.
```

**TypeScript Build Optimization:**
```
Analyze the TypeScript configuration and build process. Help me optimize compilation and runtime performance for production deployment.
```

## Debugging and Troubleshooting

### Systematic Debugging

**Verification Failure Analysis:**
```
My verify-setup utility is failing at [specific step]. Help me systematically debug the issue using the verification logic and error handling patterns.
```

**Log Analysis Help:**
```
Help me interpret the output from npm run verify-setup and identify the root cause of configuration or connection issues.
```

**Performance Issue Diagnosis:**
```
The verification utility is running slowly. Help me profile and optimize the database operations and connection handling.
```

### Error Recovery

**Connection Recovery Strategies:**
```
Based on the error handling in verify-setup.ts, help me implement automated recovery strategies for database connection failures.
```

**Extension Dependency Management:**
```
Help me design robust dependency checking and recovery based on the pgvector extension verification patterns in verify-setup.ts.
```

## Advanced Use Cases

### Scaling and Architecture

**Modular Verification Design:**
```
Help me refactor the monolithic verify-setup.ts into modular verification components for larger applications.
```

**Multi-Environment Support:**
```
Based on the environment variable patterns in verify-setup.ts, help me design configuration management for development, staging, and production environments.
```

### Integration Patterns

**CI/CD Integration:**
```
Help me integrate the verification utility patterns into CI/CD pipelines for automated environment validation and deployment verification.
```

**Container Deployment:**
```
Based on the verification patterns, help me design Docker container health checks and initialization scripts for PostgreSQL vector database applications.
```

## Usage Guidelines

### Effective Prompting Tips

1. **Reference Specific Lines**: Always include file paths and line numbers when discussing code
2. **Provide Context**: Mention the specific error messages or behavior you're experiencing
3. **Include Environment Details**: Specify your operating system, Node.js version, and PostgreSQL setup
4. **Attach Relevant Code**: Share your current implementation when asking for improvements

### Best Practices

- Use the verification utility as a template for your own database utilities
- Apply the error handling patterns to your production applications
- Leverage the modular design principles for scalable verification systems
- Follow the resource management patterns to prevent memory leaks