# Lecture 2: Claude Code Setup for PostgreSQL Vector Database Learning

## Instructor Script

Welcome back. Now we need to configure our AI development partner - Claude Code. This will help you understand everything we write and examine, and how you debug issues.

Claude Code configuration matters because coding and vector database work can be complex. When you're working through our verification utility, you'll encounter PostgreSQL connection pooling, vector distance calculations, and error handling patterns. You can use Claude Code as your tutor, explaining not just what the code does, but why specific implementation choices matter, if I have not covered them to your exact level of requirement.

Claude Code has direct access to your code and explains the reasoning behind implementation patterns, helps you troubleshoot connection issues in context, and provides insights about production considerations. This transforms learning from reading documentation to understanding how concepts apply to real systems.

to get Claude Code, navigate to claude.ai/code and sign in to your Anthropic account. If you don't have an account, create one and follow the instructions.

Once you're in the Claude Code interface, configure the output style for educational explanations. This is the most important configuration step. Type this command: /output-style explanatory

This transforms Claude Code from providing basic responses to delivering detailed educational explanations. When we analyze our verification utility, Claude Code will explain PostgreSQL concepts and vector mathematics with educational context, reasoning behind database design decisions, and insights into TypeScript development patterns.

Our project includes a CLAUDE.md file that establishes specific guidelines for PostgreSQL vector database development. This ensures Claude Code gives consistent assistance throughout your learning journey, with responses tailored to our specific goals and project structure.

Essential prompt patterns you'll use:

For verification utility implementation: "Analyze the PostgreSQL connection setup in src/utils/verify-setup.ts lines 44-50. Explain why connection pooling is used and how environment variables integrate."

For vector mathematics: "Explain the vector distance calculation in verify-setup.ts lines 83-86. Help me understand why vectors [1,2,3] and [1,2,4] return a distance of 1."

For debugging: "I'm getting this PostgreSQL connection error. Help me debug this based on the error handling patterns in verify-setup.ts."

For TypeScript patterns: "Review the async/await patterns in src/utils/verify-setup.ts. Explain why these patterns are important for database operations."

Test your setup by asking Claude Code: "Explain why PostgreSQL with pgvector is chosen for this project and analyze the verification approach used in src/utils/verify-setup.ts."

You should get detailed explanations of PostgreSQL benefits, analysis of our verification utility's approach, and educational insights about vector databases. If you're getting basic responses, verify explanatory mode is enabled.

Throughout this course, Claude Code serves as your database tutor, code analysis partner, debugging assistant, TypeScript mentor, and production guide. Use it to understand our verification utility, not as the final authority. Always test database operations with the actual verification utility and ask "why" questions about connection patterns.

When asking Claude Code about database operations, reference the verification utility output: "I see this output from the verification utility. Help me understand what each step accomplishes and how the vector similarity search works."

Your Claude Code setup is ready when explanatory output style is enabled, you can ask questions about src/utils/verify-setup.ts and receive detailed analysis, Claude Code provides educational insights about PostgreSQL and vector operations, and you understand how to reference specific files and line numbers.

In our next lecture, we'll examine the project structure and TypeScript configuration that makes everything possible.

## Step 3: Understanding Our Project Context

Our project already has a CLAUDE.md file with specific rules for PostgreSQL vector database development. This file:

- Establishes coding standards for TypeScript database applications
- Sets guidelines for working with PostgreSQL and pgvector
- Provides context that Claude Code follows when analyzing our verification utility
- Ensures consistent assistance throughout your learning journey
