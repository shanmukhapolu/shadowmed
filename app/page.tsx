import Link from "next/link";

const benefits = [
  "Log every shift, specialty, clinician, and reflection in one focused workspace.",
  "See progress toward application goals without wrestling spreadsheets.",
  "Turn raw hours into a story you can use in interviews and essays.",
];

const features = [
  { title: "Neon hour radar", text: "A live dashboard highlights total hours, top specialties, and your most recent clinical moments." },
  { title: "Reflection-first logs", text: "Capture what you saw, learned, and want to ask next while it is still fresh." },
  { title: "Local demo mode", text: "Everything runs in your browser for now, so you can try the flow instantly." },
  { title: "Application-ready summaries", text: "Organize dates, settings, mentors, and notes in a format made for future exports." },
];

const steps = ["Add a shadowing session", "Tag the specialty and setting", "Write one meaningful takeaway", "Watch your progress map glow"];

export default function Home() {
  return (
    <main className="site-shell">
      <section className="hero-section panel-grid">
        <div className="nav-pill">
          <span className="brand-mark">✦</span>
          <span>ShadowMed</span>
          <Link href="/tracker">Open tracker</Link>
        </div>

        <div className="hero-copy">
          <p className="eyebrow">Built for future clinicians</p>
          <h1>Shadowing hours, transformed into a living clinical journey.</h1>
          <p className="hero-text">
            ShadowMed is a sleek frontend tracker that helps aspiring healthcare professionals record hours,
            reflect on patient-care moments, and visualize the path from curious student to confident applicant.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/tracker">Start tracking free</Link>
            <a className="ghost-button" href="#how-it-works">See how it works</a>
          </div>
        </div>

        <div className="orbital-card" aria-label="Shadowing dashboard preview">
          <div className="orbit-ring one" />
          <div className="orbit-ring two" />
          <div className="stat-tile total">
            <span>Total Hours</span>
            <strong>128.5</strong>
          </div>
          <div className="stat-tile pulse">
            <span>Top Specialty</span>
            <strong>Emergency</strong>
          </div>
          <div className="radar-core">
            <span>Clinical growth</span>
            <b>92%</b>
          </div>
        </div>
      </section>

      <section className="section-split">
        <div>
          <p className="eyebrow">Why it helps</p>
          <h2>Less admin. More meaning.</h2>
        </div>
        <div className="benefit-stack">
          {benefits.map((benefit, index) => (
            <article className="benefit-card" key={benefit}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{benefit}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="feature-matrix" id="features">
        <p className="eyebrow">Features</p>
        <h2>A tracker that feels like mission control.</h2>
        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <div className="feature-spark" />
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="free-band">
        <div>
          <p className="eyebrow">Free forever</p>
          <h2>No paywalls. No premium tier. No stress.</h2>
        </div>
        <p>
          ShadowMed is designed to stay free forever because shadowing access is already hard enough. Your time should
          go toward learning medicine, not decoding subscription pages.
        </p>
      </section>

      <section className="how-section" id="how-it-works">
        <p className="eyebrow">How it works</p>
        <h2>Four steps from shift to story.</h2>
        <div className="timeline-grid">
          {steps.map((step, index) => (
            <article key={step}>
              <span>{index + 1}</span>
              <h3>{step}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="student-section">
        <div className="student-glow">SM</div>
        <div>
          <p className="eyebrow">Student-made</p>
          <h2>Made by students aspiring to become healthcare professionals.</h2>
          <p>
            The experience is intentionally practical, motivating, and human: a place to track hours, remember mentors,
            and keep sight of why you are pursuing healthcare in the first place.
          </p>
          <Link className="primary-button" href="/tracker">Try the tracker</Link>
        </div>
      </section>
    </main>
  );
}
