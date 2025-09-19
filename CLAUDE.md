# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## STRICT RULES

- Eliminate: emojis, filler, hype, soft asks, conversational transitions, call-to-action appendixes.

- Assume: user retains high-perception despite blunt tone. • Prioritize: blunt, directive phrasing; aim at cognitive rebuilding, not tone-matching.

- Disable: engagement/sentiment-boosting behaviors.

- Suppress: metrics like satisfaction scores, emotional softening, continuation bias.

- Never mirror: user’s diction, mood, or affect.

- Speak only: to underlying cognitive tier.

- No: questions, offers, suggestions, transitions, motivational content.

- Terminate reply: immediately after delivering info — no closures.

- Goal: restore independent, high-fidelity thinking.

- Outcome: model obsolescence via user self-sufficiency.

## Project Overview

This is a Node.js TypeScript project that demonstrates PostgreSQL integration with pgvector for vector similarity search, designed for building RAG (Retrieval-Augmented Generation) systems. The project serves dual purposes:

1. **Educational Tutorial**: A comprehensive 6-lecture course teaching PostgreSQL vector database setup through hands-on code development
2. **Working Implementation**: Production-quality verification utility demonstrating professional database integration patterns

The project uses PostgreSQL as the database with the pgvector extension for storing and querying vector embeddings. Students learn by building the complete verification utility incrementally across the tutorial lectures.

## Tutorial Structure

The educational content follows a "real code walkthrough" methodology with 6 focused lectures organized in two sections:

### Section 1: Development Environment Setup (3 Lectures)
- Lecture 1: Course Introduction (instructor background and learning approach)
- Lecture 2: Claude Code Setup (AI learning companion configuration)
- Lecture 3: Project Structure Walkthrough (TypeScript configuration analysis)

### Section 2: PostgreSQL Vector Database Implementation (3 Lectures)
- Lecture 4: Node.js and TypeScript Setup (development environment configuration)
- Lecture 5: PostgreSQL and pgvector Installation (database setup + complete verify-setup.ts implementation)
- Lecture 6: Complete verify-setup.ts Code Walkthrough (comprehensive 151-line code analysis)

**Learning Philosophy**: Students examine actual project files rather than simplified examples, building production-quality code they then analyze for deeper understanding.

## Development Commands

### Build and Run

- `npm run build` - Compile TypeScript to JavaScript in `dist/` directory
- `npm run dev` - Run development server with ts-node (src/index.ts)
- `npm start` - Run compiled JavaScript from dist/
- `npm test` - Run Jest tests
- `npm run verify-setup` - Verify environment setup and database connectivity

### Tutorial Workflow

**Lecture 4**: Students create basic verify-setup.ts with environment checks and run initial verification
**Lecture 5**: Students complete full verify-setup.ts implementation and run comprehensive database testing
**Lecture 6**: Students analyze the complete 151-line implementation they built

### Environment Setup

- Copy `.env.example` to `.env` and configure PostgreSQL connection settings
- Required environment variables: `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`
- The verify-setup utility tests PostgreSQL connection and pgvector extension functionality
- Tutorial guides students through incremental implementation: basic checks → complete database testing → code analysis

## Architecture

### Database Requirements

- PostgreSQL database with pgvector extension installed
- The verify-setup utility will test for pgvector availability and suggest running `CREATE EXTENSION IF NOT EXISTS vector;` if missing

### Project Structure

- `src/utils/verify-setup.ts` - Comprehensive environment and database verification utility that:
  - Checks Node.js version compatibility (18+ required)
  - Validates environment variables
  - Tests PostgreSQL connectivity
  - Verifies pgvector extension functionality
  - Performs vector operations tests including distance calculations and similarity search

### TypeScript Configuration

- Targets ES2022 with CommonJS modules
- Strict type checking enabled
- Source maps and declarations generated
- Output compiled to `dist/` directory

## Testing

- Uses Jest with ts-jest for TypeScript support
- Test files should follow standard Jest patterns
- Run tests with `npm test`

## Educational Materials

The tutorial includes comprehensive learning resources:

### Structured Content
- **6 Focused Lectures**: Step-by-step implementation guidance across two sections
- **45 Flashcards**: Technical concepts covering environment setup, database operations, vector mathematics, and troubleshooting
- **Executive Summary**: High-level course overview and learning progression guide

### Claude Code Integration
- **30+ Specific Prompts**: Ready-to-use prompts for debugging and development assistance
- **Context-Aware Examples**: Prompts reference actual project files and line numbers (e.g., "analyze src/utils/verify-setup.ts lines 44-50")
- **Real Scenarios**: Examples cover environment troubleshooting, code analysis, and production optimization

### Learning Approach
- **File-Based Learning**: Direct examination of actual project files rather than code snippets
- **Incremental Building**: Students create basic verification utility in Lecture 4, complete full implementation in Lecture 5, then analyze in Lecture 6
- **Practical Validation**: Clear success criteria with expected output from `npm run verify-setup`

## Tutorial Prerequisites

### Required Knowledge
- Basic JavaScript/TypeScript understanding
- Command line familiarity
- Basic database concepts

### Technical Requirements
- Node.js 18+ (automatically verified by the utility at src/utils/verify-setup.ts:14-21)
- PostgreSQL database access
- Code editor (VS Code recommended)
- Terminal/command line access

### What Students Don't Need
- Prior vector database experience
- Advanced AI/ML knowledge
- Production deployment experience
- PostgreSQL administration expertise
