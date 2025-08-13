"use client";
import React from "react";

type HeaderProps = {
  query: string;
  setQuery: (v: string) => void;
  ownerFilter: string | "all";
  setOwnerFilter: (v: string | "all") => void;
  owners: string[];
  sortKey: "value" | "age" | "prob";
  setSortKey: (v: "value" | "age" | "prob") => void;
  theme: "dark" | "light";
  setTheme: (v: "dark" | "light") => void;
  setShowAdd: (v: boolean) => void;
};

export default function Header({
  query,
  setQuery,
  ownerFilter,
  setOwnerFilter,
  owners,
  sortKey,
  setSortKey,
  theme,
  setTheme,
  setShowAdd,
}: HeaderProps) {
  return (
    <header className="header">
      <div className="logo">
        <span className="sparkle" />
        <h1>Pipeline CRM</h1>
      </div>
      <div className="controls">
        <div className="search">
          <input
            placeholder="Search deals, companies, tags…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select
          value={ownerFilter}
          onChange={(e) => setOwnerFilter(e.target.value as string | "all")}
        >
          <option value="all">All owners</option>
          {owners.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as "value" | "age" | "prob")}
        >
          <option value="value">Sort: Value</option>
          <option value="age">Sort: Newest</option>
          <option value="prob">Sort: Probability</option>
        </select>
        <button className="btn glow" onClick={() => setShowAdd(true)}>
          + Quick Add
        </button>
        <button
          className="btn"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "Light" : "Dark"} Mode
        </button>
      </div>
    </header>
  );
}
