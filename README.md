# 🚀 EncodeFlow – Distributed Video Transcoding System


<div align="center">

```
███████╗███╗   ██╗ ██████╗ ██████╗ ██████╗ ███████╗███████╗██╗      ██████╗ ██╗    ██╗
██╔════╝████╗  ██║██╔════╝██╔═══██╗██╔══██╗██╔════╝██╔════╝██║     ██╔═══██╗██║    ██║
█████╗  ██╔██╗ ██║██║     ██║   ██║██║  ██║█████╗  █████╗  ██║     ██║   ██║██║ █╗ ██║
██╔══╝  ██║╚██╗██║██║     ██║   ██║██║  ██║██╔══╝  ██╔══╝  ██║     ██║   ██║██║███╗██║
███████╗██║ ╚████║╚██████╗╚██████╔╝██████╔╝███████╗██║     ███████╗╚██████╔╝╚███╔███╔╝
╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝╚═╝     ╚══════╝ ╚═════╝  ╚══╝╚══╝
```

**A scalable, production-grade distributed video transcoding platform**

[![Turborepo](https://img.shields.io/badge/Built%20with-Turborepo-EF4444?style=flat-square&logo=turborepo)](https://turbo.build/)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![BullMQ](https://img.shields.io/badge/BullMQ-Queue-FF4B4B?style=flat-square)](https://bullmq.io/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://prisma.io/)
[![Prometheus](https://img.shields.io/badge/Prometheus-Metrics-E6522C?style=flat-square&logo=prometheus)](https://prometheus.io/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker)](https://docker.com/)
[![FFmpeg](https://img.shields.io/badge/FFmpeg-Transcode-007808?style=flat-square&logo=ffmpeg)](https://ffmpeg.org/)

</div>

![Dashboard](/asset/dashboard.png)

## 📌 Overview

EncodeFlow is a **distributed video processing platform** designed to handle large-scale transcoding workloads efficiently.

It enables:
- Direct uploads to S3 (no backend bottleneck)
- Asynchronous job processing via distributed workers
- Real-time job + worker monitoring
- Production-grade observability using Prometheus
```
Upload → S3 → API (job queue) → BullMQ → Worker → S3 (output)
                                              ↕
                              Real-time updates via Redis
                                              ↕
                              Live dashboard on the Web UI
```
---

## Architecture


```
                        ┌─────────────┐         ┌───────────────────┐
                        │   Browser   │─────────▶│     AWS S3        │
                        │  (Next.js)  │ pre-sign │  Video storage    │
                        └──────┬──────┘   PUT    └────────▲──────────┘
                               │                          │ upload output
                    POST job + │                          │ (worker → S3)
                    video info │                          │
                               ▼                          │
                        ┌─────────────────────┐           │
                        │     API Server      │───sign───▶│
                        │  Express · Clerk    │   URLs    │
                        └──┬──────────────────┘
                           │ enqueue        │ read jobs
                           ▼                ▼
               ┌──────────────────┐  ┌──────────────┐
               │   BullMQ Queue   │  │  PostgreSQL   │
               │  (Redis-backed)  │  │  Prisma ORM   │
               └────────┬─────────┘  └──────▲────────┘
                        │ pick job           │ progress / status
                        ▼                   │
               ┌────────────────────────────┴──┐
               │           Worker              │
               │   BullMQ · FFmpeg · Prom      │
               └──┬─────────────────────────────┘
                  │ spawn
                  ▼
            ┌──────────┐    ┌───────────────┐
            │  FFmpeg  │    │   Prometheus  │
            │ Transcode│    │  (scrapes API │
            │  engine  │    │   + worker)   │
            └──────────┘    └───────────────┘

  ─────  request / data flow
  - - -  async / background
  Redis  real-time worker heartbeat & metrics (separate channel)
```
---

### Monorepo Structure

```
encodeflow/
├── apps/
│   ├── api/          → Express REST API (auth, jobs, metrics, S3 URLs)
│   ├── web/          → Next.js dashboard (upload, jobs, workers, metrics)
│   └── worker/       → BullMQ + FFmpeg video processing engine
│
├── packages/
│   ├── bullq/        → BullMQ queue factory + IORedis connection
│   ├── db/           → Prisma ORM client + schema
│   ├── s3/           → AWS S3 client factory
│   └── types/        → Shared TypeScript types (job, video, worker, metrics)
│
├── Docker/
│   ├── app/          → Dockerfile for API
│   └── worker/       → Dockerfile for Worker (includes FFmpeg)
│
├── prometheus/
│   ├── prometheus.yml          → Local Prometheus config
│   └── prometheus.ecs.yml      → ECS Prometheus config
│
└── docker-compose.yml          → Full local stack
```
---

## How It Works

```
┌─────────────┐        ┌──────────────────────────────────────────────┐
│   Browser   │        │                   AWS S3                     │
│  (Next.js)  │──────▶ │ 1. Get signed upload URL from /api/s3/uploadurl │
└──────┬──────┘        │  2. PUT video file directly to S3            │
       │               └──────────────────────────────────────────────┘
       │ 3. POST create new job to /api/jobs/createJob (video details + output config)
       ▼
┌─────────────┐        ┌───────────────┐        ┌───────────────────┐
│  Express    │──────▶ │   BullMQ      │──────▶ │     Worker        │
│  API Server │  add   │   (Redis)     │  pick  │  (processVideo)   │
└──────┬──────┘  job   └───────────────┘   job  └────────┬──────────┘
       │                                                  │
       │ 5. Poll /api/jobs/active                            │ 4. Update
       │    (progress, status) of all active jobs            │    progress
       ▼                                                  ▼
┌─────────────┐                                  ┌───────────────────┐
│    Web UI   │                                  │    PostgreSQL     │
│  Dashboard  │◀────────────────────────────────│    (via Prisma)   │
└─────────────┘         DB polling               └───────────────────┘
```

---



## ⚙️ Core Components

### Apps

#### 🧩 API (Express)

The central backend server. Handles authentication via **Clerk**, rate limiting, job management, S3 URL generation, and Prometheus metric exposition.

##### Routes

| Prefix | Route                            | Description                              |
| ------ | -------------------------------- | ---------------------------------------- |
| `GET`  | `/health`                        | Health check                             |
| `GET`  | `/metrics`                       | Prometheus scrape endpoint               |
| `POST` | `/api/jobs/createjob`            | Create a new transcode job               |
| `GET`  | `/api/jobs/all`                  | List all jobs                            |
| `GET`  | `/api/jobs/active`               | Active jobs                              |
| `GET`  | `/api/jobs/recent`               | Recent jobs                              |
| `GET`  | `/api/videos/all`                | List all videos                          |
| `GET`  | `/api/workers/all`               | All worker statuses (Redis real-time)    |
| `GET`  | `/api/workers/metricdata`        | Worker metric overview (Redis real-time) |
| `GET`  | `/api/workers/workerdetails/:id` | Single worker detail (Redis real-time)   |
| `GET`  | `/api/s3/uploadurl`              | Get pre-signed S3 upload URL             |
| `GET`  | `/api/s3/downloadurl`            | Get pre-signed S3 download URL           |
| `GET`  | `/api/metrics/api/cpu`           | API CPU usage (Prometheus)               |
| `GET`  | `/api/metrics/api/mem`           | API memory usage (Prometheus)            |
| `GET`  | `/api/metrics/api/kpi`           | API KPI summary (Prometheus)             |
| `GET`  | `/api/metrics/worker/all/cpu`    | All workers CPU (Prometheus)             |
| `GET`  | `/api/metrics/worker/all/mem`    | All workers memory (Prometheus)          |
| `GET`  | `/api/metrics/worker/:id/cpu`    | Per-worker CPU (Prometheus)              |
| `GET`  | `/api/metrics/worker/:id/mem`    | Per-worker memory (Prometheus)           |

#### 🌐 Web (Next.js)

##### Pages

| Route           | Description                                 |
| --------------- | ------------------------------------------- |
| `/`             | Landing page                                |
| `/dashboard`    | Overview & summary                          |
| `/upload-video` | Upload video + configure output             |
| `/jobs`         | All transcode jobs with live status         |
| `/workers`      | Worker cards + table (real-time Redis data) |
| `/metrics`      | Charts powered by Prometheus data           |
| `/storage`      | S3 storage browser                          |
| `/settings`     | User & app settings                         |

**Stack:** Next.js App Router · Tailwind CSS · shadcn/ui · TanStack Query · TanStack Table · Recharts

#### 🧵 Worker (BullMQ + FFmpeg)

The distributed video processing engine, powered by **FFmpeg** under the hood.

- **`index.ts`** — BullMQ Worker instance; picks jobs from the queue and calls `processVideo`
- **`processVideo`** — Core transcoding function; reads the job's `outputConfig` (resolution, format, audio inclusion, etc.), spawns an FFmpeg child process with the appropriate flags, streams progress events back to the DB, and uploads the finished output file to S3
- **`/server`** — Lightweight Express server exposing `/health` and `/metrics` for Prometheus scraping
- **`/services/db`** — DB interaction class (Prisma wrapper)
- **`/services/monitor`** — Redis-based real-time worker heartbeat & metric push
- **`/metrics/jobMetrics`** — BullMQ job counters, histograms (duration, queue wait time)
- **`/metrics/workerMetrics`** — Worker CPU, memory, active job gauge (Prometheus)

### FFmpeg Transcoding

The worker uses **FFmpeg** as its transcoding engine. Each job's `outputConfig` (stored as JSON on the `Job` model) drives the FFmpeg command — including target resolution, output format, codec, and whether to include audio.

FFmpeg will be installed in the worker using `ffmpeg-static` package so the container is self-contained and ready to process jobs out of the box.

Supported transcode targets (driven by `outputConfig`):

| Field          | Examples                        |
| -------------- | ------------------------------- |
| `resolution`   | `1080p`, `720p`, `480p`, `360p` |
| `format`       | `mp4`, `webm`, `hevc`           |
| `includeAudio` | `true` / `false`                |

FFmpeg progress is parsed from stderr and continuously written to the `Job.progress` field in PostgreSQL, which the web UI polls to render live progress bars.


## Packages

### `packages/bullq`
Exports a reusable BullMQ **Queue factory** and a shared **IORedis** connection instance. Used by both the API (to enqueue jobs) and the worker (to process them).

### `packages/db`
Prisma ORM setup with two core models:

- Video — stores uploaded video metadata
- Job — tracks each transcode job

### `packages/s3`
Creates and exports a configured **AWS S3 client** instance — used by the API to generate pre-signed upload/download URLs.

### `packages/types`
Shared TypeScript types used across all apps and packages: job configs, worker status payloads, metric shapes, video DTOs, and more.

---

## 📊 Monitoring & Observability

EncodeFlow ships with first-class Prometheus observability across both the API and every worker instance.

### Metrics Collected

**Worker metrics** (per instance):
- `worker_cpu_usage` — CPU utilization gauge
- `worker_memory_usage_ratio` — Memory usage gauge
- `worker_job_duration_seconds` — Job duration histogram
- `workers_jobs_processed_total`— Counters (status = "success", "failed")

**API metrics:**
- `api_http_request_total` — request total counter
- `api_http_request_duration_seconds` — request duration histogram
- `api_active_request` — active request gauge
- `api_jobs_created_total`— Counter ("format", "resolution", "includeAudio")
- other default metrics

### Prometheus Config

- **Local:** `prometheus/prometheus.yml`
- **ECS/Production:** `prometheus/prometheus.ecs.yml` for ecs deployment
---

## Local Development

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- pnpm

### Getting Started

```bash 
# Clone the repo
git clone https://github.com/muditkalra/EncodeFlow.git
cd EncodeFlow
```

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
cp apps/worker/.env.example apps/worker/.env

# Start infrastructure (Postgres, Redis, RedisInsight, Prometheus)
docker compose up -d postgres redis redisinsight prometheus

# migrate and generate DB schema
pnpm run db:generate 
pnpm run db:migrate

# Start all apps in dev mode
pnpm dev
```


<div align="center">
    OR
</div>


```bash
# Start full stack with Docker Compose
docker compose up -d
```

### Docker Compose Services

| Service        | Description              | Port   |
| -------------- | ------------------------ | ------ |
| `api`          | Express API server       | `8000` |
| `worker`       | BullMQ transcode worker  | `9100` |
| `postgres`     | PostgreSQL database      | `5432` |
| `redis`        | Redis (queue + realtime) | `6379` |
| `redisinsight` | Redis GUI                | `5540` |
| `prometheus`   | Metrics collection       | `9090` |
---


## Project Structure — Full Tree

```
encodeflow/
├── apps/
│   ├── api/
│   │   ├── src/
│   │   │   ├── index.ts               # Entry, middleware setup
│   │   │   ├── routes/
│   │   │   │   ├── jobs.ts
│   │   │   │   ├── videos.ts
│   │   │   │   ├── workers.ts
│   │   │   │   ├── s3.ts
│   │   │   │   └── metrics.ts
│   │   └── package.json
│   │
│   ├── web/
│   │   ├── app/
│   │   │   ├── (home)/                # Landing page
│   │   │   └── (dashboard)/
│   │   │       ├── dashboard/
│   │   │       ├── upload-video/
│   │   │       ├── jobs/
│   │   │       ├── workers/
│   │   │       ├── metrics/
│   │   │       ├── storage/
│   │   │       └── settings/
│   │   ├── components/
│   │   │   └── ui/                    # shadcn components
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── package.json
│   │
│   └── worker/
│       ├── src/
│       │   ├── index.ts               # BullMQ worker entry
│       │   ├── server/                # Health + metrics Express server
│       │   ├── services/
│       │   │   ├── db/                # Prisma DB class
│       │   │   └── monitor/           # Redis realtime monitor
│       │   └── metrics/
│       │       ├── jobMetrics.ts
│       │       └── workerMetrics.ts
│       └── package.json
│
├── packages/
│   ├── bullq/                         # Queue factory + Redis connection
│   ├── db/                            # Prisma client + schema
│   ├── s3/                            # S3 client factory
│   └── types/                         # Shared TypeScript types
│
├── Docker/
│   ├── app/Dockerfile
│   └── worker/Dockerfile
│
├── prometheus/
│   ├── prometheus.yml
│   └── prometheus.ecs.yml
│
├── docker-compose.yml
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## 📈 Scaling Strategy

### 🔹 Horizontal Worker Scaling
- Workers are **stateless**
- Can scale horizontally using:
  - AWS ECS / Kubernetes
  - Auto Scaling Groups

### 🔹 Queue-Based Load Distribution
- BullMQ ensures:
  - Fair job distribution
  - Backpressure handling
  - Retry mechanisms

### 🔹 Bottleneck Handling
- CPU-heavy FFmpeg jobs → scale workers independently
- API remains lightweight (I/O bound)

### 🔹 Future Scaling Enhancements
- Auto-scale workers based on:
  - Queue length
  - CPU usage
- Multi-region workers

---

## ⚖️ Design Decisions & Tradeoffs

### ✅ Direct S3 Upload
**Decision :** Upload directly to S3 using signed URLs  
**Why :** Avoids API bottleneck  
**Tradeoff :** Slightly more complex client logic

---

### ✅ Polling over WebSockets
**Decision:** UI polls API for updates  
**Why:** Simpler implementation  
**Tradeoff:** Higher network usage vs WebSockets and Issues at scale

---

### ✅ BullMQ + Redis
**Decision:** Use Redis-backed queue  
**Why:** Reliable, battle-tested, easy scaling  
**Tradeoff:** Requires Redis infra

---

### ✅ Separate Worker Service
**Decision:** Dedicated worker service  
**Why:** Independent scaling of CPU-heavy tasks  
**Tradeoff:** Increased system complexity

---

### ✅ Prometheus for Metrics
**Decision:** Use Prometheus over custom logging  
**Why:** Standardized monitoring   
**Tradeoff:** Requires setup and configuration

---

## ✨ Highlights

- Distributed architecture
- FFmpeg-based transcoding
- Real-time monitoring
- Scalable worker system
- Production-ready observability

## 🔮 Future Improvements

- WebSockets (real-time updates)
- HLS/DASH streaming
- Auto-scaling workers
- Dead-letter queues
- Grafana dashboards

> ⭐ **Star this repo** if you find anything Useful!