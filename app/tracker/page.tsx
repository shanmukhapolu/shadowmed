"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";

type Session = {
  id: string;
  date: string;
  specialty: string;
  clinician: string;
  setting: string;
  hours: number;
  reflection: string;
};

const starterSessions: Session[] = [
  {
    id: "demo-1",
    date: "2026-05-12",
    specialty: "Emergency Medicine",
    clinician: "Dr. Rivera",
    setting: "Urban ED",
    hours: 6,
    reflection: "Saw how calm communication steadied a crowded trauma bay.",
  },
  {
    id: "demo-2",
    date: "2026-05-20",
    specialty: "Pediatrics",
    clinician: "PA Chen",
    setting: "Community clinic",
    hours: 4.5,
    reflection: "Learned how play can become part of a physical exam.",
  },
];

const emptyForm = {
  date: "",
  specialty: "",
  clinician: "",
  setting: "",
  hours: "",
  reflection: "",
};

export default function TrackerPage() {
  const [sessions, setSessions] = useState<Session[]>(starterSessions);
  const [form, setForm] = useState(emptyForm);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("shadowmed-sessions");
    if (saved) {
      setSessions(JSON.parse(saved) as Session[]);
    }
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      window.localStorage.setItem("shadowmed-sessions", JSON.stringify(sessions));
    }
  }, [hasLoaded, sessions]);

  const totals = useMemo(() => {
    const hours = sessions.reduce((sum, session) => sum + session.hours, 0);
    const specialties = new Set(sessions.map((session) => session.specialty));
    const topSpecialty = sessions.reduce<Record<string, number>>((acc, session) => {
      acc[session.specialty] = (acc[session.specialty] ?? 0) + session.hours;
      return acc;
    }, {});
    const favorite = Object.entries(topSpecialty).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "None yet";

    return { hours, specialties: specialties.size, favorite };
  }, [sessions]);

  function addSession(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.date || !form.specialty || !form.hours) return;

    setSessions((current) => [
      {
        id: crypto.randomUUID(),
        date: form.date,
        specialty: form.specialty,
        clinician: form.clinician || "Mentor not listed",
        setting: form.setting || "Clinical setting",
        hours: Number(form.hours),
        reflection: form.reflection || "Reflection coming soon.",
      },
      ...current,
    ]);
    setForm(emptyForm);
  }

  function removeSession(id: string) {
    setSessions((current) => current.filter((session) => session.id !== id));
  }

  return (
    <main className="tracker-shell">
      <nav className="tracker-nav">
        <Link href="/">← Home</Link>
        <span>ShadowMed Tracker</span>
      </nav>

      <section className="tracker-hero">
        <div>
          <p className="eyebrow">Frontend demo</p>
          <h1>Your shadowing command center.</h1>
          <p>
            Track every clinical observation, mentor, setting, and takeaway in a polished local-first dashboard.
          </p>
        </div>
        <div className="glass-meter">
          <span>Application readiness</span>
          <strong>{Math.min(Math.round((totals.hours / 150) * 100), 100)}%</strong>
          <div>
            <i style={{ width: `${Math.min((totals.hours / 150) * 100, 100)}%` }} />
          </div>
        </div>
      </section>

      <section className="metric-grid">
        <article>
          <span>Total hours</span>
          <strong>{totals.hours.toFixed(1)}</strong>
        </article>
        <article>
          <span>Specialties</span>
          <strong>{totals.specialties}</strong>
        </article>
        <article>
          <span>Strongest area</span>
          <strong>{totals.favorite}</strong>
        </article>
      </section>

      <section className="tracker-layout">
        <form className="session-form" onSubmit={addSession}>
          <p className="eyebrow">New session</p>
          <h2>Log shadowing hours</h2>
          <label>
            Date
            <input
              type="date"
              value={form.date}
              onChange={(event) => setForm({ ...form, date: event.target.value })}
            />
          </label>
          <label>
            Specialty
            <input
              placeholder="Cardiology, family medicine..."
              value={form.specialty}
              onChange={(event) => setForm({ ...form, specialty: event.target.value })}
            />
          </label>
          <label>
            Clinician / mentor
            <input
              placeholder="Dr. Patel"
              value={form.clinician}
              onChange={(event) => setForm({ ...form, clinician: event.target.value })}
            />
          </label>
          <label>
            Setting
            <input
              placeholder="Clinic, OR, ED..."
              value={form.setting}
              onChange={(event) => setForm({ ...form, setting: event.target.value })}
            />
          </label>
          <label>
            Hours
            <input
              min="0"
              step="0.25"
              type="number"
              placeholder="3.5"
              value={form.hours}
              onChange={(event) => setForm({ ...form, hours: event.target.value })}
            />
          </label>
          <label>
            Reflection
            <textarea
              placeholder="What did you learn?"
              value={form.reflection}
              onChange={(event) => setForm({ ...form, reflection: event.target.value })}
            />
          </label>
          <button type="submit">Add session</button>
        </form>

        <div className="session-list">
          <div className="list-heading">
            <p className="eyebrow">Timeline</p>
            <h2>Recent experiences</h2>
          </div>
          {sessions.map((session) => (
            <article className="session-card" key={session.id}>
              <div>
                <span>{session.date}</span>
                <h3>{session.specialty}</h3>
                <p>{session.reflection}</p>
              </div>
              <aside>
                <strong>{session.hours}h</strong>
                <small>{session.clinician}</small>
                <small>{session.setting}</small>
                <button type="button" onClick={() => removeSession(session.id)}>
                  Remove
                </button>
              </aside>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
