import { describe, expect, it } from 'vitest';
import { buildWorkflow, createMimoProviderConfig } from './workflow';

describe('MiMo provider config', () => {
  it('builds an OpenAI-compatible MiMo chat completions endpoint', () => {
    const config = createMimoProviderConfig({ apiKey: 'test-key' });

    expect(config.baseUrl).toBe('https://api.xiaomimimo.com/v1');
    expect(config.chatCompletionsUrl).toBe('https://api.xiaomimimo.com/v1/chat/completions');
    expect(config.model).toBe('mimo-v2.5-pro');
    expect(config.headers.Authorization).toBe('Bearer test-key');
  });
});

describe('agent workflow builder', () => {
  it('creates a deterministic 4-stage agent pipeline for proof/demo', () => {
    const workflow = buildWorkflow('Audit my repository for production readiness');

    expect(workflow.name).toBe('OrbitFlow AI AgentOps Demo');
    expect(workflow.input).toContain('Audit my repository');
    expect(workflow.steps.map((step) => step.role)).toEqual([
      'Planner Agent',
      'Executor Agent',
      'Reviewer Agent',
      'Reporter Agent',
    ]);
    expect(workflow.steps.every((step) => step.status === 'completed')).toBe(true);
    expect(workflow.tokenEstimate).toBeGreaterThan(1000);
  });
});
