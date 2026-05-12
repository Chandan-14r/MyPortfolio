# InvestiSync - AI-Driven Financial Portfolio Tracker

## Snapshot

- Role: Lead Developer
- Type: Personal full-stack project
- Stack: MongoDB, Express.js, React.js, Node.js, Gemini API, Docker, GCP Cloud Run

## Problem

Investors need a simple way to connect market movement with news sentiment. Raw financial news is too large
to read manually, so the system uses AI sentiment analysis to help summarize market signals.

## What I built

- MERN application for stock tracking and portfolio monitoring.
- Gemini API sentiment analysis pipeline for financial news.
- MongoDB compound indexes for faster portfolio and stock-query response.
- Cloud Run deployment path using Docker.
- Dashboard-ready response structure for frontend charts and portfolio state.

## Results

- Reduced MongoDB query response time by 25% with compound indexing.
- Processed 10,000+ financial news articles daily through AI sentiment analysis.
- Designed the system to support 500+ concurrent users on GCP Cloud Run.

## Full-stack relevance

This sample shows backend performance awareness, API integration, frontend dashboard thinking, and cloud
deployment practice. It is especially useful for roles involving dashboards, analytics, or data-backed UI.

## What I would improve next

- Add Redis caching for repeated ticker lookups.
- Add scheduled jobs for market-hour news ingestion.
- Add alert rules for sentiment drops and high-volatility assets.
- Add integration tests for portfolio CRUD and news ingestion endpoints.
