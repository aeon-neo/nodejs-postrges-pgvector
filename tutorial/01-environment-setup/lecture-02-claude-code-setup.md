# Lecture 2: Claude Code Setup for PostgreSQL Vector Database Learning

## Transcript

Welcome back. Now we need to set up our AI development partner - Claude Code. This will help you understand everything we write and examine, and debug issues that arise.

As you can see, I have my code editor already open. I'm using VS Code and I've already connected to my instance of Linux, using WSL which stands for Windows Subsystem for Linux. This allows you to program in a Linux environment without having to switch out of your Windows OS.

Vector databases combine complex mathematical concepts with database operations. When you're working through our verification utility, you'll encounter PostgreSQL connection pooling, vector distance calculations, and error handling patterns. Claude Code becomes your tutor, explaining not just what the code does, but why specific implementation choices matter.

Claude Code explains reasoning behind implementation patterns, helps troubleshoot connection issues in context, and provides insights about production considerations. This transforms learning from reading documentation or following turorials like this one to understanding how concepts apply to real systems.

## Installing Claude Code

You'll need an Anthropic account to use Claude Code - create one at claude.ai if you don't have one already. Navigate to Claude Code from the home page and follow the installtion instructions. Note, this is a different billing environment from claude.ai if you use that large language model for chat.

For this Linux development environment, Claude Code is installed via npm. Run this command:

```bash
npm install -g @anthropic-ai/claude-code
```

This command installs Claude Code globally on your system, making it available from any project directory.

Once installed, you can access Claude Code directly from your terminal or integrate it with your development workflow.

## Essential Configuration

Now that you have Claude Code installed, you need to create your project directory and initialize the project configuration. Claude prefers to work in a project directory so that it knows exactly what context to consider. Conceptually, this is no different from our ultimate objective of building a RAG pipeline.

Run this command first to create the project directory:

```
mkdir rag-pipeline
```

Now, if we open the folder, we can launch Claude again in project context.

Run this command to initalize Claude.

```
/init
```

This creates a CLAUDE.md file in your project root that sets out the context for Clause to consider and also where you can eventually add specific guidelines for project and code devleopment.

Notice how Claude has already attempted to make sense of the project just from the folder name since that is all it has to go on. Typically, I would run init on an already more complete project but we can also run this one again later as the project develops or just ask Claude to update it as we make changes. For now, let's just accept this one.

I'd say it's done a pretty decent job actually. It has captured the main elements of a RAG pipeline that we will indeed eventually implement - document processing, a vector database, which is of course what we're building first, and a retrieval and generation system which we will cover in the final course of the series.

Next, let's configure the output style for educational explanations:

Type

```
/output-style
```

Then choose "explanatory".

This transforms Claude Code from providing basic responses to delivering detailed educational explanations. When we analyze our verification utility, Claude Code will explain PostgreSQL concepts and vector mathematics with educational context, reasoning behind database design decisions, and insights into TypeScript development patterns.

## Understanding Planning Mode

Claude Code has a planning mode that's valuable for complex tasks. To enter planning mode, press **Shift+Tab** when composing your message, until you see "plan mode on". This makes Claude Code outline the steps before executing them, helping you understand the approach and approve the plan before implementation.

Planning mode is particularly useful for database work where you want to understand the strategy before making changes to your schema or connection logic. Use Shift+Tab when asking Claude Code to implement substantial features or debug complex issues.

Let's have a little play with Claude. Test your setup by asking Claude Code: "Explain why PostgreSQL with pgvector is a good choice for this project"

You should get detailed explanations of PostgreSQL benefits and educational insights about vector databases like there is no need for separate systems for relational data and vector search. You can keep digging deeper and deeper with Claude, into any area where you feel you need more information, getting a tutorial that is tailopr made for you. If you're getting basic responses, check that explanatory mode is enabled.

Throughout this course, Claude Code serves as your database tutor, code analysis partner, debugging assistant, TypeScript mentor, and production guide. Use it to understand our verification utility, not as the final authority. Always test database operations with the actual verification utility and ask "why" questions about connection patterns.

In the next lecture, we'll examine the project structure and TypeScript configuration that makes the foundation framework of the project.
