export type ProviderConfig = {
  baseUrl: string;
  chatCompletionsUrl: string;
  model: string;
  headers: Record<string, string>;
};

export type WorkflowStep = {
  id: string;
  role: string;
  status: 'completed' | 'running' | 'pending';
  model: string;
  toolCalls: string[];
  latencyMs: number;
  output: string;
};

export type Workflow = {
  name: string;
  input: string;
  provider: string;
  tokenEstimate: number;
  steps: WorkflowStep[];
};

export function createMimoProviderConfig(options: {
  apiKey?: string;
  baseUrl?: string;
  model?: string;
}): ProviderConfig {
  const baseUrl = (options.baseUrl || process.env.MIMO_BASE_URL || 'https://api.xiaomimimo.com/v1').replace(/\/$/, '');
  const model = options.model || process.env.MIMO_MODEL || 'mimo-v2.5-pro';
  const apiKey = options.apiKey || process.env.MIMO_API_KEY || '';

  return {
    baseUrl,
    chatCompletionsUrl: `${baseUrl}/chat/completions`,
    model,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  };
}

export function buildWorkflow(input: string): Workflow {
  const provider = process.env.MIMO_API_KEY ? 'Xiaomi MiMo' : 'Demo provider / MiMo-ready';
  const model = process.env.MIMO_MODEL || 'mimo-v2.5-pro';

  const steps: WorkflowStep[] = [
    {
      id: 'plan',
      role: 'Planner Agent',
      status: 'completed',
      model,
      toolCalls: ['decompose_task', 'select_workflow_template'],
      latencyMs: 820,
      output: 'Break the user request into objectives, constraints, risks, and a verifiable execution plan.',
    },
    {
      id: 'execute',
      role: 'Executor Agent',
      status: 'completed',
      model,
      toolCalls: ['run_analysis', 'generate_artifact'],
      latencyMs: 1640,
      output: 'Execute the planned workflow and produce structured intermediate artifacts for review.',
    },
    {
      id: 'review',
      role: 'Reviewer Agent',
      status: 'completed',
      model,
      toolCalls: ['quality_gate', 'risk_check'],
      latencyMs: 970,
      output: 'Validate output quality, check hallucination risks, and request revision when needed.',
    },
    {
      id: 'report',
      role: 'Reporter Agent',
      status: 'completed',
      model,
      toolCalls: ['format_report', 'export_json'],
      latencyMs: 560,
      output: 'Generate final report with logs, status, model usage, and next actions.',
    },
  ];

  return {
    name: 'OrbitFlow AI AgentOps Demo',
    input,
    provider,
    tokenEstimate: 4280,
    steps,
  };
}
