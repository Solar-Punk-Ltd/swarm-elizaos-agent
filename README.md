# Project Starter

AI agent for Swarm decentralized storage operations. Handles postage stamps, uploads/downloads, feeds via Bee node integration.

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
| `OPENAI_API_KEY`                    | string  | **optional**                                 | API key for OpenAi.                                                                                                                                        |

## Getting Started

```bash
# Start development immediately
elizaos dev
```

## Development

```bash
# Start development with hot-reloading (recommended)
elizaos dev

# OR start without hot-reloading
elizaos start
# Note: When using 'start', you need to rebuild after changes:
# bun run build

# Test the project
elizaos test
```

## Testing

ElizaOS employs a dual testing strategy:

1. **Component Tests** (`src/__tests__/*.test.ts`)
   - Run with Bun's native test runner
   - Fast, isolated tests using mocks
   - Perfect for TDD and component logic

2. **E2E Tests** (`src/__tests__/e2e/*.e2e.ts`)
   - Run with ElizaOS custom test runner
   - Real runtime with actual database (PGLite)
   - Test complete user scenarios

### Test Structure

```
src/
  __tests__/              # All tests live inside src
    *.test.ts            # Component tests (use Bun test runner)
    e2e/                 # E2E tests (use ElizaOS test runner)
      project-starter.e2e.ts  # E2E test suite
      README.md          # E2E testing documentation
  index.ts               # Export tests here: tests: [ProjectStarterTestSuite]
```

### Running Tests

- `elizaos test` - Run all tests (component + e2e)
- `elizaos test component` - Run only component tests
- `elizaos test e2e` - Run only E2E tests

### Writing Tests

Component tests use bun:test:

```typescript
// Unit test example (__tests__/config.test.ts)
describe("Configuration", () => {
  it("should load configuration correctly", () => {
    expect(config.debug).toBeDefined();
  });
});

// Integration test example (__tests__/integration.test.ts)
describe("Integration: Plugin with Character", () => {
  it("should initialize character with plugins", async () => {
    // Test interactions between components
  });
});
```

E2E tests use ElizaOS test interface:

```typescript
// E2E test example (e2e/project.test.ts)
export class ProjectTestSuite implements TestSuite {
  name = "project_test_suite";
  tests = [
    {
      name: "project_initialization",
      fn: async (runtime) => {
        // Test project in a real runtime
      },
    },
  ];
}

export default new ProjectTestSuite();
```

The test utilities in `__tests__/utils/` provide helper functions to simplify writing tests.

## Configuration

Customize your project by modifying:

- `src/index.ts` - Main entry point
- `src/character.ts` - Character definition

