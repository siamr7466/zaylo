# 🚀 Zaylo Deployment Guide

To get your app online, we will use two free services. This is the **standard modern way** to host full-stack apps.

## 1. Why two services?
*   **Vercel** is the best place for your **Frontend** (Next.js). It makes your site super fast.
*   **Render** is the best place for your **Backend** (Node.js/Express). It keeps your server running 24/7.

---

## Part 1: Deploy Backend (Render)
*This runs your API and connects to the Database.*

1.  Create an account at [Render.com](https://render.com/).
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repo (`zaylo`).
4.  **Settings**:
    *   **Name**: `zaylo-server`
    *   **Root Directory**: `server` (Important!)
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `node server.js`
5.  **Environment Variables** (Add these under "Advanced"):
    *   `MONGO_URI`: (Your MongoDB Connection String)
    *   `JWT_SECRET`: (Any random secret password)
    *   `ADMIN_EMAIL`: `siamrofficial76@gmail.com`
    *   `SMTP_EMAIL`, `SMTP_PASSWORD`: (Your email details)
6.  Click **Create Web Service**.
7.  **Copy the URL**: Once done, Render will give you a URL like `https://zaylo-server.onrender.com`. **Copy this!**

---

## Part 2: Deploy Frontend (Vercel)
*This is what users will see.*

1.  Create an account at [Vercel.com](https://vercel.com/).
2.  Click **Add New** -> **Project**.
3.  Import your GitHub repo (`zaylo`).
4.  **Project Settings**:
    *   **Framework Preset**: Next.js (Should pick it up automatically).
    *   **Root Directory**: Click "Edit" and select `client`.
5.  **Environment Variables**:
    *   **Name**: `NEXT_PUBLIC_API_URL`
    *   **Value**: `https://zaylo-server.onrender.com` (The URL you copied from Render).
    *   *(Note: Do NOT add a trailing slash `/` at the end)*
6.  Click **Deploy**.

---

## 🎉 Done!
Your app is now live!
- **Frontend**: `https://zaylo.vercel.app` (Share this one!)
- **Backend**: `https://zaylo-server.onrender.com` (Backend Use Only)
