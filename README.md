![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-2025-blueviolet?style=flat-square&logo=github)

# 🎮 CodeProjekt Ventures - Game Merch & Collectibles Store

Welcome to the official repository for **CodeProjekt Ventures**, a modern e-commerce web application for selling game-inspired merchandise and collectibles like T-shirts, action figures, stickers, and posters.

---

## 🛠️ Tech Stack

| Tech        | Purpose                              |
|-------------|------------------------------------- |
| Next.js     | Frontend, Routing, SSR               |
| Firebase    | Authentication, Storage              |
| MongoDB     | Product & order database             |
| TailwindCSS | Styling                              |
| Netlify     | Deployment                           |

---

# 🧬 Branching Strategy – CodeProjekt

We follow a clear and consistent branching strategy to maintain code across different environments, ensuring clean development, testing, and deployment cycles.

---

## 🧵 Main Branches

| Branch | Purpose |
|--------|---------|
| `main` | Production branch (live site: [codeprojekt.shop](https://codeprojekt.shop)) |
| `stage` | Staging branch for finalized features |
| `dev` | Experimental branch for compliance and core fixes |

---

## 🌿 Workflow

### 🔧 Feature Development
1. Create a new branch from `stage`.
2. Develop your feature.
3. Raise a Pull Request (PR) to `stage`.

### 🧪 Compliance Fixes or Experimental Features
1. Create a new branch from `dev`.
2. Work on your changes.
3. Raise a PR to `dev`.
4. After testing, sync `dev` with `main` if necessary.

---

## 🛡️ Merge Guidelines

- ✅ All merges to `main` must come **from `stage`**.
- ✅ All merges to `stage` must come **via feature branches**.
- ✅ All compliance or experimental work must go **through `dev`**.

---

## 💡 Why This Structure?

This branching model ensures:
- A **clean separation** between production-ready features, staging tests, and experimental code.
- **Safe deployments** to production.
- **Isolated environments** for development, staging, and testing.

---

## 🏢 About the Business

**CodeProjekt Ventures** is a legally registered sole proprietorship based in **India**, specialized in:
- Physical & digital delivery of game-themed products.
- Fast, secure shopping experience.
- Transparent policies and fair pricing.

---

## 🚀 Features

- 🛒 Browse game merchandise by category
- 🔐 Secure user authentication
- 📦 Physical & digital product handling
- 📱 Mobile-friendly responsive UI
- 🧾 Admin panel for managing products & orders

---



