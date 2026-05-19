'use client';

import { useMemo, useState } from 'react';
import { buildWorkflow, createMimoProviderConfig } from '@/lib/workflow';

const samples = [
  'Turn a messy product idea into an investor-ready launch plan with risks, MVP scope, and proof tasks.',
  'Audit my GitHub repo, find weak spots, propose fixes, and generate a deploy checklist.',
  'Research a new AI API, map integration steps, then create a working adapter plan for agents.',
];

export default function Home() {
  const [prompt, setPrompt] = useState(samples[0]);
  const [runId, setRunId] = useState(1);
  const workflow = useMemo(() => buildWorkflow(prompt), [prompt, runId]);
  const mimo = createMimoProviderConfig({ apiKey: 'MIMO_API_KEY' });
  const active = runId % workflow.steps.length;

  return (
    <main className="shell">
      <div className="noise" />
      <div className="wrap">
        <nav className="nav">
          <div className="brand"><div className="orb" /> OrbitFlow AI</div>
          <div className="navlinks">
            <a href="#lab">Live Lab</a>
            <a href="#proof">Proof</a>
            <a href="https://github.com/mhdaditya1504/orbitflow-ai">GitHub</a>
          </div>
          <div className="pill">MiMo-ready · Agentic OS</div>
        </nav>

        <section className="hero">
          <div>
            <div className="kicker pill"><span className="dot" /> Not a chatbot — an AI mission control room</div>
            <h1>Watch AI agents <span className="grad">think, act, verify, and ship.</span></h1>
            <p className="lead">
              OrbitFlow AI is a cinematic AgentOps web app: users enter an ambitious task, then see a squad of
              specialized agents decompose it, run tools, review quality, and generate an execution artifact. It is
              built to impress reviewers and demonstrate real MiMo API readiness through OpenAI-compatible routing.
            </p>
            <div className="actions">
              <a className="btn primary" href="#lab">Run the interactive demo</a>
              <a className="btn" href="#proof">Show MiMo proof</a>
            </div>
          </div>

          <div className="stage" aria-label="agent network visualization">
            <div className="stage-inner">
              <div className="grid-bg" />
              <div className="beam b1" /><div className="beam b2" /><div className="beam b3" /><div className="beam b4" />
              <div className="node n1"><b>Planner</b><span>splits vague goals into tactical missions</span></div>
              <div className="node n2"><b>Executor</b><span>calls tools, APIs, browser, terminal</span></div>
              <div className="node n3"><b>Reviewer</b><span>scores risk, quality, hallucination</span></div>
              <div className="node n4"><b>Reporter</b><span>exports proof-ready artifacts</span></div>
              <div className="brain"><div className="pulse" /><div className="pulse" /><div><b>MiMo<br/>Orbit</b><br/><span className="muted">100T-ready</span></div></div>
              <div className="terminal">
                $ orbitflow run --provider mimo --model mimo-v2.5-pro<br/>
                ✓ plan generated · ✓ tools routed · ✓ review passed · ✓ artifact exported <span className="cursor" />
              </div>
            </div>
          </div>
        </section>

        <section id="lab" className="section">
          <div className="kicker pill"><span className="dot" /> Interactive agent lab</div>
          <h2>Type a mission. OrbitFlow turns it into a visible agent operation.</h2>
          <p className="lead">This is the part that should make people stop scrolling: a fake-simple prompt box that becomes a transparent multi-agent execution map.</p>

          <div className="lab">
            <div className="panel">
              <textarea className="input" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
              <div className="actions" style={{ marginTop: 12 }}>
                <button className="btn primary" onClick={() => setRunId((n) => n + 1)}>Simulate agent run</button>
                {samples.map((s, i) => <button className="btn" key={s} onClick={() => setPrompt(s)}>Sample {i + 1}</button>)}
              </div>
              <div className="panel" style={{ marginTop: 14 }}>
                <div className="artifact-head"><span>Provider adapter</span><span>OpenAI-compatible</span></div>
                <pre style={{ whiteSpace: 'pre-wrap', color: '#b7f7ff', fontFamily: 'JetBrains Mono', fontSize: 12 }}>{`POST ${mimo.chatCompletionsUrl}\nAuthorization: Bearer $MIMO_API_KEY\nmodel: ${mimo.model}`}</pre>
              </div>
            </div>

            <div className="panel output">
              <div className="timeline">
                {workflow.steps.map((step, index) => (
                  <div className={`step ${index === active ? 'active' : ''}`} key={step.id}>
                    <div className="num">0{index + 1}</div>
                    <div>
                      <h3>{step.role}</h3>
                      <p>{step.output}</p>
                    </div>
                    <div className="badge">{index <= active ? 'live' : step.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="proof" className="section">
          <div className="kicker pill"><span className="dot" /> Reviewer-ready proof artifact</div>
          <h2>Built to win an API grant, not just look pretty.</h2>
          <div className="artifact">
            <div className="artifact-head"><span>Generated impact map</span><span>{workflow.tokenEstimate.toLocaleString()} est. tokens/run</span></div>
            <div className="artifact-body map">
              <div className="mini"><b>Core problem</b><p>Agents are powerful but opaque. OrbitFlow makes each decision, tool call, and review step visible.</p></div>
              <div className="mini"><b>Agentic logic</b><p>Planner → Executor → Reviewer → Reporter pipeline with deterministic logs and human-readable proof.</p></div>
              <div className="mini"><b>MiMo integration</b><p>OpenAI-compatible adapter targets Xiaomi MiMo chat completions endpoint and model presets.</p></div>
              <div className="mini"><b>Why it impresses</b><p>It feels like a mission-control interface rather than another generic wrapper chatbot.</p></div>
            </div>
          </div>
        </section>

        <footer className="footer">
          OrbitFlow AI · GitHub + Vercel deployed · Xiaomi MiMo Orbit 100T builder grant proof
        </footer>
      </div>
    </main>
  );
}
