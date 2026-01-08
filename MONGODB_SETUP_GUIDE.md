# 🍃 How to Get Your MongoDB Connection String (Free)

Since you are deploying to the cloud (Render), you cannot use your laptop's local database. You need a cloud database. **MongoDB Atlas** is the standard free provider.

## Step 1: Create an Account
1.  Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2.  Sign up (Google Sign-in is easiest).
3.  You might be asked to create a "Project" — just name it "Zaylo".

## Step 2: Create a Cluster
1.  Click **+ Create** (or "Build a Database").
2.  Select **M0 Free** (this is the free tier).
3.  Choose a provider (AWS) and region (closest to you, e.g., N. Virginia or Mumbai).
4.  Click **Create**.

## Step 3: Setup Security (Crucial!)
1.  **Username & Password**:
    *   Create a user, e.g., `siam` and a strong password.
    *   **WRITE DOWN THIS PASSWORD**. You will need it later.
    *   Click "Create User".
2.  **Network Access (IP Whitelist)**:
    *   This tells MongoDB who is allowed to connect.
    *   Scroll down or go to the "Network Access" tab.
    *   Click **Add IP Address**.
    *   Select **Allow Access from Anywhere** (`0.0.0.0/0`).
    *   *Why?* Because Render's servers change IPs properly, so we need to allow all.
    *   Click **Confirm**.

## Step 4: Get Key
1.  Go back to **Database** (on the left menu).
2.  Click **Connect** (the big button next to your cluster name).
3.  Click **Drivers**.
4.  You will see a string like:
    `mongodb+srv://siam:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority`
5.  **Copy this string**.

## Step 5: Finalize
1.  Paste this string into a notepad.
2.  Replace `<password>` with the **actual password** you created in Step 3.
    *   *Example*: If password is `supersecret`, connection string becomes `mongodb+srv://siam:supersecret@cluster0...`
3.  **THIS IS YOUR `MONGO_URI`**.
4.  Use this value in **Render** environment variables.
