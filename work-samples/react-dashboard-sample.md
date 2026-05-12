# React Dashboard Sample - Alert Status Board

This sample shows how I would structure a small React dashboard for care alerts.
The component keeps filtering simple, separates display helpers, and uses
frontend-friendly status values from an API.

## Component sample

```jsx
import { useMemo, useState } from "react";

const alerts = [
  {
    id: "alert_1024",
    patientName: "Ravi Kumar",
    eventType: "fall_detected",
    severity: "high",
    status: "open",
    location: "Bedroom",
    confidence: 0.94
  },
  {
    id: "alert_1025",
    patientName: "Meera S",
    eventType: "manual_help",
    severity: "medium",
    status: "acknowledged",
    location: "Kitchen",
    confidence: 0.81
  }
];

const statusLabels = {
  open: "Open",
  acknowledged: "Acknowledged",
  resolved: "Resolved"
};

function formatPercent(value) {
  return `${Math.round(value * 100)}%`;
}

export default function AlertStatusBoard() {
  const [statusFilter, setStatusFilter] = useState("all");

  const visibleAlerts = useMemo(() => {
    if (statusFilter === "all") {
      return alerts;
    }

    return alerts.filter((alert) => alert.status === statusFilter);
  }, [statusFilter]);

  return (
    <section className="alert-board" aria-labelledby="alert-board-title">
      <header className="board-header">
        <div>
          <p className="eyebrow">Care alerts</p>
          <h2 id="alert-board-title">Emergency response board</h2>
        </div>

        <div className="segmented-control" role="group" aria-label="Filter alerts by status">
          {["all", "open", "acknowledged", "resolved"].map((status) => (
            <button
              key={status}
              className={statusFilter === status ? "active" : ""}
              type="button"
              onClick={() => setStatusFilter(status)}
            >
              {status === "all" ? "All" : statusLabels[status]}
            </button>
          ))}
        </div>
      </header>

      <div className="alert-grid">
        {visibleAlerts.map((alert) => (
          <article className="alert-card" key={alert.id}>
            <div>
              <strong>{alert.patientName}</strong>
              <span>{alert.location}</span>
            </div>
            <p>{alert.eventType.replace("_", " ")}</p>
            <dl>
              <div>
                <dt>Severity</dt>
                <dd>{alert.severity}</dd>
              </div>
              <div>
                <dt>Confidence</dt>
                <dd>{formatPercent(alert.confidence)}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{statusLabels[alert.status]}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
```

## Review points

- Uses `useMemo` so filtering logic is clear and isolated.
- Keeps API status values stable while displaying human-friendly labels.
- Uses semantic HTML for sections, buttons, articles, and definition lists.
- Can connect to `GET /api/alerts` and `PATCH /api/alerts/:id/status`.
