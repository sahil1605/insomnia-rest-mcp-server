# Insomnia REST MCP Server

This server provides functionality to run Insomnia collections using the Inso CLI.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Insomnia Desktop installed
- Inso CLI installed globally (`npm install -g insomnia-inso`)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

## Usage

The server provides functionality to run Insomnia collections programmatically. Collections are stored in the `../insomnia` directory.

## Project Structure

```
mcp-server/
├── src/           # TypeScript source files
├── dist/          # Compiled JavaScript files
├── node_modules/  # Project dependencies
└── package.json   # Project configuration
```

## Development

To run the project in development mode:
```bash
npm run dev
```

## Building

To build the project:
```bash
npm run build
``` 