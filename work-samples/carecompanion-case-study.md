# CareCompanion Guardian - Elderly AI Care Assistant

## Context

CareCompanion Guardian is an academic capstone project focused on elderly care,
emergency response, and AI-assisted monitoring. The system combines a
conversational assistant, fall-detection model, REST APIs, and SMS notifications.

## Role and stack

- Role: AI Developer
- Stack: Python, TensorFlow, NLP, REST APIs, React Native, Twilio, Docker
- Domain: Elder care, emergency assistance, mobile-first monitoring

## Problem

Elderly users may need quick help during falls or emergency events. A useful
assistant should reduce response time, avoid unnecessary alerts, and provide a
simple communication path for caregivers.

## Solution

The project used an NLP-driven conversational assistant to understand basic
support requests and route emergency cases. Fall detection was handled with a
TensorFlow module, while Twilio SMS notifications triggered emergency messages to
care contacts.

## Key features

- NLP-based conversational support for care-related requests.
- Emergency response routing to reduce alert latency.
- TensorFlow-based fall detection with 94% reported accuracy.
- Twilio SMS notification flow for emergency events.
- REST API layer for integrating mobile UI and backend services.
- Docker-based packaging for a cleaner development and deployment workflow.

## Results

- Reduced emergency response latency by 30%.
- Achieved 94% accuracy on the TensorFlow fall-detection module.
- Built an alert workflow that can notify caregivers through automated SMS.

## Full-stack relevance

This project demonstrates API thinking, model integration, mobile-client
integration, notification workflows, and deployable service design. For a
full-stack internship, the strongest parts to discuss are the REST API boundary,
data flow from detection to alert, and how the frontend would display risk state,
alert history, and caregiver response status.

## What I would improve next

- Add a caregiver dashboard with alert history and acknowledgement status.
- Add authentication and role-based access for patient, caregiver, and admin
  views.
- Store alert records in MongoDB for timeline analysis.
- Add API tests for emergency routing and notification edge cases.
- Add cloud deployment with environment-based secrets and monitoring.
