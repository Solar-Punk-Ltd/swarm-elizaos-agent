# Swarm Agent on ElizaOS

ElizaOS AI agent for Swarm decentralized storage operations. Handles postage stamps, uploads/downloads, feeds via Bee node integration.

## Features

- Upload text data to Swarm.
- Download text data from Swarm.
- Upload files and folders to Swarm.
- Download files and folders from Swarm.
- Update data on a Swarm feed.
- Read latest data from a Swarm feed.
- Create postage stamp batches for storage.
- Get a postage stamp batch.
- List postage stamp batches.
- Extend storage and duration of a postage stamp batch.

## Configuration Options

| Option                              | Type    | Required                                     | Description                                                                                                                                                |
| ----------------------------------- | ------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BEE_API_URL`                       | string  | **optional** (unless using your own node)    | The URL of the Bee API endpoint. If omitted, the default Swarm Gateway will be used: `https://api.gateway.ethswarm.org`. Example: `http://localhost:1633`. |
| `BEE_FEED_PK`                       | string  | **optional** (cannot update feed without it) | The private key of the Swarm Feed to use. If not provided, Swarm Feed functionality will be disabled.                                                      |
| `AUTO_ASSIGN_STAMP`                 | boolean | **optional**                                 | Whether to automatically assign a postage stamp if none is provided. Default value is: true. Set to false to disable automatic stamp assignment.           |
| `DEFERRED_UPLOAD_SIZE_THRESHOLD_MB` | number  | **optional**                                 | Size threshold in megabytes for deferred uploads. Files larger than this size will be uploaded asynchronously. Default value is: 5 (MB).                   |
| `ANTHROPIC_API_KEY`                 | string  | **optional**                                 | API key for Antrophic. Only set it if Antrophip model is used.                                                                                             |
| `ANTHROPIC_SMALL_MODEL`             | string  | **optional**                                 | For faster, cost-effective responses. Example: `claude-3-5-haiku-20241022`.                                                                                |
| `ANTHROPIC_LARGE_MODEL`             | string  | **optional**                                 | For complex reasoning and best quality. Example: `claude-3-7-sonnet-20250219`.                                                                             |
| `OPENAI_API_KEY`                    | string  | **required**                                 | API key for OpenAi. When Anthropic is used, it is needed for text embedding fallback. In that scenario, both a valid and random value can be passed in.    |
| `OPENAI_SMALL_MODEL`                | string  | **optional**                                 | Used for simpler tasks, faster responses. Default: `gpt-4o-mini`.                                                                                          |
| `OPENAI_LARGE_MODEL`                | string  | **optional**                                 | Used for complex reasoning, better quality. Default: `gpt-4o`.                                                                                             |
| `OPENAI_EMBEDDING_MODEL`            | string  | **optional**                                 | Defines the embedding model. Default: `text-embedding-3-small`.                                                                                            |

IMPORTANT:

- when you want to use OpenAI, you need to only set `OPENAI_API_KEY` in the `.env` file
- when you want to use Anthropic you need to set both `ANTHROPIC_API_KEY` and `OPENAI_API_KEY` in this order (`OPENAI_API_KEY` is used as text embedding fallback, random value can be used in this scenario)

If not sure which models to pick and don't want to use the defaults, please check your OpenAI and Antrophic dashboards for the available options.

## Prerequisites

- `Node.js` - v23+
- `bun`
- `ElizaOS CLI`

```bash
  bun install -g @elizaos/cli
```

## Getting Started

```bash
bun start
# Note: When using 'start', you need to rebuild after changes:
# bun run build
```

## Development

```bash
# Start local development mode. If having problems with this command use:
# bun start
elizaos dev
```

Open the client UI at `http://localhost:3000` and verify interactions with the Swarm Agent. You can use Settings in the UI menu to adjust configuration values, if needed.

## Configuration

Customize your project by modifying:

- `src/index.ts` - Main entry point
- `src/character.ts` - Character definition

