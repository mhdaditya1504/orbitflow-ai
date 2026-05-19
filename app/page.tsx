import { buildWorkflow, createMimoProviderConfig } from '@/lib/workflow';

const workflow = buildWorkflow('Audit my repository for production readiness and generate an actionable report.');
const mimo = createMimoProviderConfig({ apiKey: 'MIMO_API_KEY' });

export default function Home() {
  return (
    <main className="container">
      <nav className="nav">
        <div className="brand">OrbitFlow AI</div>
        <div className="pill">Xiaomi MiMo-ready · OpenAI-compatible</div>
      </nav>

      <section className="hero">
        <div>
          <h1 className="h1">AgentOps dashboard for AI builders.</h1>
          <p className="lead">
            OrbitFlow AI turns black-box autonomous agent runs into visible workflows: planner, executor,
            reviewer, reporter, tool calls, latency, model usage, and proof logs. Built for MiMo API grants
            and ready for <b>mimo-v2.5-pro</b> through Xiaomi&apos;s OpenAI-compatible endpoint.
          </p>
          <div className="buttons">
            <a className="btn" href="#dashboard">View live workflow</a>
            <a className="btn secondary" href="#proof">Proof for MiMo application</a>
          </div>
        </div>
        <div className="card">
          <div className="muted">Provider preset</div>
          <h2>MiMo API Gateway</h2>
          <pre className="code">{`POST ${mimo.chatCompletionsUrl}\nAuthorization: Bearer $MIMO_API_KEY\nmodel: ${mimo.model}`}</pre>
          <p className="muted">
            Switch from demo mode to MiMo by setting MIMO_API_KEY. No code changes required.
          </p>
        </div>
      </section>

      <section className="grid">
        <div className="metric"><b>4</b><span>agent stages</span></div>
        <div className="metric"><b>{workflow.tokenEstimate.toLocaleString()}</b><span>estimated tokens/run</span></div>
        <div className="metric"><b>100%</b><span>OpenAI-compatible adapter</span></div>
      </section>

      <section id="dashboard" className="section card">
        <div className="muted">Live demo workflow</div>
        <h2>{workflow.name}</h2>
        <p className="lead">Input: {workflow.input}</p>
        {workflow.steps.map((step) => (
          <div className="step" key={step.id}>
            <div>
              <div className="role">{step.role}</div>
              <div className="status">{step.status}</div>
              <div className="muted">{step.latencyMs}ms · {step.model}</div>
            </div>
            <div>
              <p>{step.output}</p>
              {step.toolCalls.map((tool) => <span className="tag" key={tool}>{tool}</span>)}
            </div>
          </div>
        ))}
      </section>

      <section id="proof" className="section cols">
        <div className="card">
          <div className="muted">Application proof</div>
          <h2>What this proves</h2>
          <ul>
            <li>Multi-agent collaboration: planner → executor → reviewer → reporter.</li>
            <li>Long-chain reasoning workflow with visible intermediate artifacts.</li>
            <li>OpenAI-compatible MiMo integration using Xiaomi endpoint.</li>
            <li>Reusable developer tool for debugging autonomous AI workflows.</li>
          </ul>
        </div>
        <div className="card">
          <div className="muted">MiMo environment</div>
          <h2>Configuration</h2>
          <pre className="code">{`MIMO_API_KEY=xxx\nMIMO_BASE_URL=https://api.xiaomimimo.com/v1\nMIMO_MODEL=mimo-v2.5-pro`}</pre>
        </div>
      </section>

      <footer className="footer">
        Built as a Xiaomi MiMo Orbit 100T builder grant proof project. © OrbitFlow AI
      </footer>
    </main>
  );
}
