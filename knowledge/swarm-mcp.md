# Swarm MCP Server

**Disclaimer:** This implementation is a proof-of-concept only, should not be used in production.

A Model Context Protocol (MCP) server implementation that uses Ethereum Swarm's Bee API for storing and retrieving data.

## Overview

This server implements the Model Context Protocol (MCP), a standard protocol for connecting AI systems with external tools and data sources. The Swarm MCP server provides tools to upload and download text data, storing this data on the Swarm decentralized storage network using the Bee API.

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

## MCP Tools

The server provides the following MCP tools:

### `create_postage_stamp`

Buy postage stamp batch based on size in megabytes and duration.

**Parameters:**

- `size`: The storage size in MB (Megabytes). These other size units convert like this to MB: 1 byte = 0.000001 MB, 1 KB = 0.001 MB, 1GB= 1000MB.
- `duration`: Duration for which the data should be stored. Time to live of the postage stamp batch, e.g. 1d - 1 day, 1w - 1 week, 1month - 1 month.
- `label`: (Optional) Sets label for the postage stamp batch.

**Sample prompt:**

```bash
Create new stamp with 4 days, 10 megabytes.
```

### `get_postage_stamp`

Get a specific postage stamp batch based on batch id.

**Parameters:**

- `postageBatchId`: The id of the postage stamp batch which is requested.

**Sample prompt:**

```bash
Give me the details for batch 3b3881ac37f936a4023a4562c69f1f138df8c1c24994f7b047514fbcbe9388fa.
```

### `list_postage_stamps`

List the available postage stamp batches.

**Parameters:**

- `leastUsed`: (Optional) A boolean value that tells if postage stamp batches are sorted so least used comes first.
- `limit`: (Optional) Limit is the maximum number of returned postage stamp batches.
- `minUsage`: (Optional) Only list postage stamp batches with at least this usage percentage.
- `maxUsage`: (Optional) Only list postage stamp batches with at most this usage percentage.

**Sample prompt:**

```bash
List my stamps.
```

### `extend_postage_stamp`

Increase the duration (relative to current duration) or size (in megabytes) of a postage stamp batch.

**Parameters:**

- `postageBatchId`: The id of the postage stamp batch for which extend is performed.
- `size`: (Optional) The storage size in MB (Megabytes). These other size units convert like this to MB: 1 byte = 0.000001 MB, 1 KB = 0.001 MB, 1GB= 1000MB.
- `duration`: (Optional) Duration for which the data should be stored. Time to live of the postage stamp batch, e.g. 1d - 1 day, 1w - 1 week, 1month - 1 month.

**Sample prompt:**

```bash
Extend 3b3881ac37f936a4023a4562c69f1f138df8c1c24994f7b047514fbcbe9388fa to 5 days.
```

### `upload_data`

Upload text data to Swarm.

**Parameters:**

- `data`: Arbitrary string to upload.
- `redundancyLevel`: (Optional) Redundancy level for fault tolerance: 0 - none, 1 - medium, 2 - strong, 3 - insane, 4 - paranoid (higher values provide better fault tolerance but increase storage overhead). Optional, value is 0 if not requested.
- `postageBatchId`: (Optional) The postage stamp batch ID which will be used to perform the upload, if it is provided.

**Sample prompt:**

```bash
Upload data to Swarm: Hello World!.
```

### `download_data`

Downloads immutable data from a Swarm content address hash.

**Parameters:**

- `reference`: Swarm reference hash.

**Sample prompt:**

```bash
Download data from Swarm: 76d133e2798d2b15db55b6c3de01303acd86e43998eab372e25c5a2115bf3f0b.
```

### `update_feed`

Update the feed of a given topic with new data.

**Parameters:**

- `data`: Arbitrary string to upload.
- `memoryTopic`: If provided, uploads the lastes data to a feed with this topic. It is the label of the memory that can be used later to retrieve the data instead of its content hash. If not a hex string, it will be hashed to create a feed topic.
- `postageBatchId`: (Optional) The postage stamp batch ID which will be used to perform the upload, if it is provided.

**Sample prompt:**

```bash
Update the Swarm feed of Topic1 with: Message1 using postage batch id 3b3881ac37f936a4023a4562c69f1f138df8c1c24994f7b047514fbcbe9388fa.
```

### `read_feed`

Retrieve the latest data from the feed of a given topic.

**Parameters:**

- `memoryTopic`: Feed topic.
- `owner`: (Optional) When accessing external memory or feed, ethereum address of the owner must be set..

**Sample prompt:**

```bash
Read the Swarm feed of Topic1.
```

### `upload_file`

Upload a file to Swarm.

**Parameters:**

- `data`: base64 encoded file content or file path.
- `isPath`: Wether the data parameter is a path.
- `redundancyLevel`: (Optional) Redundancy level for fault tolerance (higher values provide better fault tolerance but increase storage overhead). 0 - none, 1 - medium, 2 - strong, 3 - insane, 4 - paranoid.
- `postageBatchId`: (Optional) The postage stamp batch ID which will be used to perform the upload, if it is provided.

**Sample prompt:**

```bash
Upload to Swarm the file: uploads/file.txt.
```

### `upload_folder`

Upload a folder to Swarm.

**Parameters:**

- `folderPath`: Path to the folder to upload.
- `redundancyLevel`: (Optional) Redundancy level for fault tolerance (higher values provide better fault tolerance but increase storage overhead). 0 - none, 1 - medium, 2 - strong, 3 - insane, 4 - paranoid.
- `postageBatchId`: (Optional) The postage stamp batch ID which will be used to perform the upload, if it is provided.

**Sample prompt:**

```bash
Upload to Swarm folder: /home/conversational-agent-client/uploads.
```

### `download_files`

Download folder, files from a Swarm reference and save to file path or return file list of the reference.

**Parameters:**

- `reference`: Swarm reference hash.
- `filePath`: (Optional) Optional file path to save the downloaded content. If not provided list of files in the manifest will be returned.

**Sample prompt:**

```bash
Download from Swarm the file with reference ba35af06601ddf5ac3d71ee33da0db7537215a914fd6a5414b5597bb3d618bdb to folder downloads.
```

### `query_upload_progress`

Query upload progress for a specific upload session identified with the returned Tag ID.

**Parameters:**

- `tagId`: Tag ID returned by swarm-upload-file and swarm-upload-folder tools to track upload progress.

**Sample prompt:**

```bash
Query Swarm for upload tag with id: 1.
```
