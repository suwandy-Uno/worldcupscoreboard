"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email.includes("@") || !form.message.trim()) {
      setStatus("error");
      return;
    }
    const subject = encodeURIComponent(`[worldcupscoreboard.com] ${form.subject || "Contact form"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:contact@worldcupscoreboard.com?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <>
      <PageHeader title="Contact Us" description="Questions, data corrections or feedback — we'd love to hear from you." />
      <div className="max-w-xl">
        <p className="mb-6 text-sm text-slate-400">
          Use the form below to get in touch. We typically respond within 1–2 business days. For urgent score corrections please include the match name and the correct score.
        </p>

        <form onSubmit={handleSubmit} className="card space-y-4 p-6">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-300">Your Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Smith"
              className="w-full rounded-lg border border-line bg-white/[.05] px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-300">Email Address <span className="text-rose-400">*</span></label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full rounded-lg border border-line bg-white/[.05] px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-300">Subject</label>
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full rounded-lg border border-line bg-[#0d1117] px-3 py-2 text-sm text-white outline-none focus:border-brand"
            >
              <option value="">Select a subject…</option>
              <option value="Score correction">Score correction</option>
              <option value="Data error">Data error</option>
              <option value="Advertising enquiry">Advertising enquiry</option>
              <option value="General feedback">General feedback</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-300">Message <span className="text-rose-400">*</span></label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              placeholder="Tell us what's on your mind…"
              required
              className="w-full rounded-lg border border-line bg-white/[.05] px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-brand"
            />
          </div>

          {status === "error" && (
            <p className="text-xs text-rose-400">Please fill in your email and message before submitting.</p>
          )}
          {status === "sent" && (
            <p className="text-xs text-emerald-400">Opening your mail app… Thanks for getting in touch!</p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-brand px-4 py-2.5 text-sm font-bold text-white hover:bg-brand/80"
          >
            Send Message
          </button>
        </form>
      </div>
    </>
  );
}
