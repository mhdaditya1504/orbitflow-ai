# OrbitFlow AI

MiMo-ready AgentOps dashboard for designing, running, and monitoring AI-driven workflows.

## Why this exists

Autonomous AI agents are hard to debug because intermediate reasoning, tool calls, model usage, latency, and review steps are usually hidden. OrbitFlow AI makes those steps visible in a dashboard and provides an OpenAI-compatible provider adapter that can use Xiaomi MiMo API.

## MiMo integration

Xiaomi MiMo API is OpenAI-compatible:

```txt
POST https://api.xiaomimimo.com/v1/chat/completions
Authorization: Bearer $MIMO_API_KEY
Content-Type: application/json
```

Supported config:

```bash
MIMO_API_KEY=xxx
MIMO_BASE_URL=https://api.xiaomimimo.com/v1
MIMO_MODEL=mimo-v2.5-pro
```

## Agent workflow

The demo pipeline contains four stages:

1. Planner Agent — decomposes the task and selects a workflow template.
2. Executor Agent — performs the task and generates artifacts.
3. Reviewer Agent — checks quality, risks, and correctness.
4. Reporter Agent — creates final structured report and proof logs.

## Local development

```bash
npm install
npm test
npm run dev
```

Open http://localhost:3000.

## Deployment

### Vercel

```bash
npm i -g vercel
vercel
```

Add environment variables in Vercel dashboard if using real MiMo API.

### VPS

```bash
npm install
npm run build
npm run start
```

## Xiaomi MiMo Orbit application text

```txt
I built OrbitFlow AI, an AgentOps dashboard for designing, running, and monitoring AI-driven agent workflows. The project solves the problem of debugging autonomous AI agents by making each reasoning step, tool call, model response, latency, and review stage visible in a live dashboard.

The core workflow uses a multi-agent pipeline: a Planner agent decomposes the user request, an Executor agent performs the task and generates artifacts, a Reviewer agent evaluates quality and risks, and a Reporter agent generates the final structured output. Each stage is logged with status, latency, model name, token estimate, tool calls, and output preview.

OrbitFlow AI is designed around OpenAI-compatible APIs and includes a Xiaomi MiMo provider preset using https://api.xiaomimimo.com/v1/chat/completions. Once a MiMo API key is available, users can switch the provider to MiMo by setting MIMO_API_KEY and selecting mimo-v2.5-pro or mimo-v2.5. The project includes source code, a live demo-ready dashboard, tests for the provider adapter and workflow builder, and proof material showing agent workflow execution.
```
