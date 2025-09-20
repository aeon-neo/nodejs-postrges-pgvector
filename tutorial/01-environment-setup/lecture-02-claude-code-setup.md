# Lecture 2: Claude Code Setup for PostgreSQL Vector Database Learning

## Transcript

Welcome back. Now we need to set up our AI development partner - Claude Code. This will help you understand everything we write and examine, and debug issues that arise.

Vector databases combine complex mathematical concepts with database operations. When you're working through our verification utility, you'll encounter PostgreSQL connection pooling, vector distance calculations, and error handling patterns. Claude Code becomes your tutor, explaining not just what the code does, but why specific implementation choices matter.

Claude Code explains reasoning behind implementation patterns, helps troubleshoot connection issues in context, and provides insights about production considerations. This transforms learning from reading documentation to understanding how concepts apply to real systems.

## Installing Claude Code

For this development environment, Claude Code is installed via npm. Run this command:

```bash
npm install -g @anthropic-ai/claude-code
```

This installs Claude Code globally on your system, making it available from any project directory. You'll need an Anthropic account to use Claude Code - create one at claude.ai if you don't have one already.

Once installed, you can access Claude Code directly from your terminal or integrate it with your development workflow.

## Essential Configuration

Once you have Claude Code installed and you're in your project directory, you need to initialize the project configuration. Run this command first:

```
/init
```

This creates a CLAUDE.md file in your project root with specific guidelines for PostgreSQL vector database development. The file establishes coding standards, sets guidelines for working with PostgreSQL and pgvector, and provides context that Claude Code follows when analyzing your code.

Next, configure the output style for educational explanations:

```
/output-style explanatory
```

This transforms Claude Code from providing basic responses to delivering detailed educational explanations. When we analyze our verification utility, Claude Code will explain PostgreSQL concepts and vector mathematics with educational context, reasoning behind database design decisions, and insights into TypeScript development patterns.

## Understanding Planning Mode

Claude Code has a planning mode that's valuable for complex tasks. To enter planning mode, press **Shift+Tab** when composing your request. This makes Claude Code outline the steps before executing them, helping you understand the approach and approve the plan before implementation.

Planning mode is particularly useful for database work where you want to understand the strategy before making changes to your schema or connection logic. Use Shift+Tab when asking Claude Code to implement substantial features or debug complex issues.

The CLAUDE.md file we created ensures Claude Code gives consistent assistance throughout your learning journey, with responses tailored to our specific goals and project structure.

Essential prompt patterns you'll use:

For verification utility implementation: "Analyze the PostgreSQL connection setup in src/utils/verify-setup.ts lines 44-50. Explain why connection pooling is used and how environment variables integrate." Note that you can copy the path to files and paste them in the chat. You don't need to type the file path yourself.

For debugging: "I'm getting this PostgreSQL connection error. Help me debug this based on the error handling patterns in verify-setup.ts."

For TypeScript patterns: "Review the async/await patterns in src/utils/verify-setup.ts. Explain why these patterns are important for database operations."

Test your setup by asking Claude Code: "Explain why PostgreSQL with pgvector is chosen for this project and analyze the verification approach used in src/utils/verify-setup.ts."

You should get detailed explanations of PostgreSQL benefits, analysis of our verification utility's approach, and educational insights about vector databases. If you're getting basic responses, verify explanatory mode is enabled.

Throughout this course, Claude Code serves as your database tutor, code analysis partner, debugging assistant, TypeScript mentor, and production guide. Use it to understand our verification utility, not as the final authority. Always test database operations with the actual verification utility and ask "why" questions about connection patterns.

In the next lecture, we'll examine the project structure and TypeScript configuration that makes the foundation framework of the project.
