"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Deal, Stage, stages } from "../types";
import { seedDeals } from "../seedDeals";
import { useConfetti } from "../hooks/useConfetti";
import { currency } from "../utils";
import Header from "./Header";
import KPIBar from "./KPIBar";
import Modal from "./Modal";
import QuickAddForm from "./QuickAddForm";
import DealDetail from "./DealDetail";
import Column from "./Column";
import '@/app/styles/pipelinecrm.css'

export default function Board() {
  const [deals, setDeals] = useState<Deal[]>(seedDeals);
  const [dragId, setDragId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [ownerFilter, setOwnerFilter] = useState<string | "all">("all");
  const [sortKey, setSortKey] = useState<"value" | "age" | "prob">("value");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showAdd, setShowAdd] = useState(false);
  const [detail, setDetail] = useState<Deal | null>(null);
  const { canvasRef, burst } = useConfetti();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const owners = useMemo(
    () => Array.from(new Set(deals.map((d) => d.owner))),
    [deals]
  );
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = deals.filter(
      (d) =>
        (ownerFilter === "all" || d.owner === ownerFilter) &&
        (!q ||
          `${d.title} ${d.company} ${d.tags?.join(" ")}`
            .toLowerCase()
            .includes(q))
    );
    arr = arr.slice().sort((a, b) => {
      if (sortKey === "value") return b.value - a.value;
      if (sortKey === "age")
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      return b.probability - a.probability;
    });
    return arr;
  }, [deals, query, ownerFilter, sortKey]);

  const byStage = (s: Stage) => filtered.filter((d) => d.stage === s);
  const onDragStart = (id: string) => (e: React.DragEvent) => {
    setDragId(id);
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  };
  const onDrop = (stage: Stage) => (e: React.DragEvent) => {
    e.preventDefault();
    const id = dragId || e.dataTransfer.getData("text/plain");
    if (!id) return;
    setDeals((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, stage, probability: stage === "Won" ? 100 : d.probability }
          : d
      )
    );
    setDragId(null);
    if (stage === "Won") burst();
  };
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  const quickAdd = (partial: Partial<Deal>) => {
    const id = Math.random().toString(36).slice(2, 9);
    const deal: Deal = {
      id,
      title: partial.title || "Untitled Deal",
      company: partial.company || "New Co",
      owner: partial.owner || owners[0] || "Anish",
      value: partial.value ?? Math.floor(3000 + Math.random() * 90000),
      stage: (partial.stage as Stage) || "New",
      probability: partial.probability ?? 10,
      createdAt: new Date().toISOString(),
      tags: partial.tags || [],
    };
    setDeals((d) => [deal, ...d]);
  };
  const total = deals.reduce((s, d) => s + d.value, 0);
  const won = deals
    .filter((d) => d.stage === "Won")
    .reduce((s, d) => s + d.value, 0);

  return (
    <div className="app">
      {/* Confetti Canvas */}
      <canvas ref={canvasRef} className="confetti" />
      {/* Floating Orbs Background */}
      <div className="bg-orb orb1" />
      <div className="bg-orb orb2" />
      <div className="bg-orb orb3" />
      {/* Header/Controls */}
      <Header
        query={query}
        setQuery={setQuery}
        ownerFilter={ownerFilter}
        setOwnerFilter={setOwnerFilter}
        owners={owners}
        sortKey={sortKey}
        setSortKey={setSortKey}
        theme={theme}
        setTheme={setTheme}
        setShowAdd={setShowAdd}
      />
      {/* KPI Bar */}
      <KPIBar total={total} won={won} dealCount={deals.length} />
      {/* Board */}
      <main className="board">
        {stages.map((s) => (
          <Column
            key={s}
            stage={s}
            deals={byStage(s)}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragStart={onDragStart}
            onCardClick={setDetail}
          />
        ))}
      </main>
      {/* Quick Add Modal */}
      {showAdd && (
        <Modal onClose={() => setShowAdd(false)}>
          <QuickAddForm
            owners={owners}
            onCreate={(d) => {
              quickAdd(d);
              setShowAdd(false);
            }}
          />
        </Modal>
      )}
      {/* Deal Detail */}
      {detail && (
        <Modal onClose={() => setDetail(null)}>
          <DealDetail
            deal={detail}
            onMove={(s) => {
              setDeals((prev) =>
                prev.map((d) =>
                  d.id === detail.id
                    ? {
                        ...d,
                        stage: s,
                        probability: s === "Won" ? 100 : d.probability,
                      }
                    : d
                )
              );
              if (s === "Won") burst();
              setDetail(null);
            }}
          />
        </Modal>
      )}
    </div>
  );
}
