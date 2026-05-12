# Full-Stack API Sample - Care Alert Service

This is a compact backend work sample based on the CareCompanion Guardian domain.
It shows how I would structure an Express API for emergency alerts, including
validation, response shape, and frontend-friendly status values.

## Example MongoDB document

```json
{
  "_id": "alert_1024",
  "patientName": "Ravi Kumar",
  "eventType": "fall_detected",
  "severity": "high",
  "status": "open",
  "location": "Bedroom",
  "confidence": 0.94,
  "caregiverPhone": "+91XXXXXXXXXX",
  "createdAt": "2026-05-12T08:30:00.000Z",
  "updatedAt": "2026-05-12T08:30:00.000Z"
}
```

## Express route sample

```js
import express from "express";

const router = express.Router();

const validStatuses = new Set(["open", "acknowledged", "resolved"]);
const validEvents = new Set(["fall_detected", "manual_help", "health_check"]);

function validateAlert(payload) {
  const errors = [];

  if (!payload.patientName || payload.patientName.trim().length < 2) {
    errors.push("patientName is required");
  }

  if (!validEvents.has(payload.eventType)) {
    errors.push("eventType is invalid");
  }

  if (typeof payload.confidence !== "number" || payload.confidence < 0 || payload.confidence > 1) {
    errors.push("confidence must be between 0 and 1");
  }

  if (!payload.caregiverPhone) {
    errors.push("caregiverPhone is required");
  }

  return errors;
}

router.post("/api/alerts", async (req, res, next) => {
  try {
    const errors = validateAlert(req.body);

    if (errors.length > 0) {
      return res.status(400).json({ message: "Invalid alert", errors });
    }

    const alert = {
      patientName: req.body.patientName.trim(),
      eventType: req.body.eventType,
      severity: req.body.severity || "medium",
      status: "open",
      location: req.body.location || "Unknown",
      confidence: req.body.confidence,
      caregiverPhone: req.body.caregiverPhone,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const savedAlert = await req.app.locals.db.collection("alerts").insertOne(alert);

    return res.status(201).json({
      id: savedAlert.insertedId,
      ...alert
    });
  } catch (error) {
    return next(error);
  }
});

router.patch("/api/alerts/:id/status", async (req, res, next) => {
  try {
    if (!validStatuses.has(req.body.status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const result = await req.app.locals.db.collection("alerts").findOneAndUpdate(
      { _id: req.params.id },
      { $set: { status: req.body.status, updatedAt: new Date() } },
      { returnDocument: "after" }
    );

    if (!result.value) {
      return res.status(404).json({ message: "Alert not found" });
    }

    return res.json(result.value);
  } catch (error) {
    return next(error);
  }
});

export default router;
```

## Frontend response contract

```json
{
  "id": "alert_1024",
  "patientName": "Ravi Kumar",
  "eventType": "fall_detected",
  "severity": "high",
  "status": "open",
  "location": "Bedroom",
  "confidence": 0.94,
  "createdAt": "2026-05-12T08:30:00.000Z"
}
```

## Why this matters for full-stack work

- The frontend receives predictable fields and status values.
- Validation protects the API from incomplete data.
- Status updates support dashboard workflows.
- The route can be extended with Twilio notifications, authentication, and tests.
