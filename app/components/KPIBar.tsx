import React from "react";
import { currency } from "../utils";

type KPIBarProps = {
  total: number;
  won: number;
  dealCount: number;
};

export default function KPIBar({ total, won, dealCount }: KPIBarProps) {
  return (
    <section className="kpis">
      <div className="kpi">
        <div className="kpi-label">Pipeline</div>
        <div className="kpi-value">{currency(total)}</div>
      </div>
      <div className="kpi">
        <div className="kpi-label">Won (MTD)</div>
        <div className="kpi-value">{currency(won)}</div>
      </div>
      <div className="kpi">
        <div className="kpi-label">Deals</div>
        <div className="kpi-value">{dealCount}</div>
      </div>
      <div className="kpi progress">
        <div className="kpi-label">Momentum</div>
        <div className="bar">
          <span
            style={{
              width: `${Math.min(
                100,
                Math.round((won / (total || 1)) * 100) + 15
              )}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
