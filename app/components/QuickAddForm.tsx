"use client";
import React, { useState } from "react";
import { Deal, Stage, stages } from "../types";

type QuickAddFormProps = {
  owners: string[];
  onCreate: (d: Partial<Deal>) => void;
};

export default function QuickAddForm({ owners, onCreate }: QuickAddFormProps) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [owner, setOwner] = useState(owners[0] || "Anish");
  const [value, setValue] = useState(12000);
  const [stage, setStage] = useState<Stage>("New");
  const [prob, setProb] = useState(15);
  const [tags, setTags] = useState("");

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        onCreate({
          title,
          company,
          owner,
          value,
          stage,
          probability: prob,
          tags: tags.split(/[,\\s]+/).filter(Boolean),
        });
      }}
    >
      <h3>Quick Add Deal</h3>
      <label>
        <span>Title</span>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Business Plan"
        />
      </label>
      <label>
        <span>Company</span>
        <input
          required
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="e.g., Wayne Enterprises"
        />
      </label>
      <div className="grid2">
        <label>
          <span>Owner</span>
          <select value={owner} onChange={(e) => setOwner(e.target.value)}>
            {[owner, ...owners.filter((o) => o !== owner)].map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Value (USD)</span>
          <input
            type="number"
            min={0}
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value || "0"))}
          />
        </label>
      </div>
      <div className="grid2">
        <label>
          <span>Stage</span>
          <select
            value={stage}
            onChange={(e) => setStage(e.target.value as Stage)}
          >
            {stages.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Probability (%)</span>
          <input
            type="number"
            min={0}
            max={100}
            value={prob}
            onChange={(e) => setProb(parseInt(e.target.value || "0"))}
          />
        </label>
      </div>
      <label>
        <span>Tags</span>
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="comma or space separated"
        />
      </label>
      <div className="actions">
        <button className="btn glow" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}
