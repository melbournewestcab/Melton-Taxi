# Deploying to Hostinger (Node.js)

This application is fully optimized for Node.js on **Hostinger Cloud/Web Hosting (hPanel)**, **Hostinger cPanel**, and **Hostinger VPS**.

---

## Option 1: Hostinger Web / Cloud Hosting (hPanel Node.js Manager)

### Step 1: Upload Files
1. In Hostinger hPanel, open **File Manager** (or connect via FTP / Git).
2. Upload all project files to your website directory (e.g., `public_html` or a dedicated app folder).

### Step 2: Configure Node.js in hPanel
1. Navigate to **Websites** > **Manage** > Search for **Node.js**.
2. Click **Create Application** (or Edit existing):
   - **Node.js version:** Select `20.x` or `18.x` (LTS recommended)
   - **Application mode:** `Production`
   - **Application root:** `/` (or path to where files are located, e.g., `public_html`)
   - **Application startup file:** `server.js` (or `server.cjs`)
   - **Application URL:** Your domain (e.g., `https://meltontaxi.com.au`)

### Step 3: Install Dependencies & Build
1. In the Node.js management panel, click **Run NPM Install** (or use the Hostinger Web Terminal / SSH):
   ```bash
   npm install
   npm run build
   ```
2. Click **Start / Restart Application**.
3. Visit your domain — your taxi app is live!

---

## Option 2: Hostinger VPS (Ubuntu / Debian + PM2)

If you have a Hostinger VPS with SSH access:

### 1. Connect via SSH & Clone/Upload
```bash
ssh root@YOUR_SERVER_IP
cd /var/www
git clone <YOUR_REPO_URL> bacchus-marsh-taxi
cd bacchus-marsh-taxi
```

### 2. Install Node.js (v20 LTS) & PM2
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
```

### 3. Install & Build
```bash
npm install
npm run build
```

### 4. Start with PM2
```bash
pm2 start server.js --name "taxi-app"
pm2 save
pm2 startup
```

### 5. Nginx Reverse Proxy Configuration (Port 3000)
Create `/etc/nginx/sites-available/taxi-app`:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Enable and reload Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/taxi-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## Environment Variables (.env)
You can configure these directly in Hostinger's Node.js Environment Variables section or in `.env`:

| Variable | Description | Default |
|---|---|---|
| `PORT` | Web server port | Assigned by Hostinger (default `3000`) |
| `NODE_ENV` | Environment mode | `production` |
| `OWNER_EMAIL` | Booking notification recipient email | `info@meltontaxi.au` |
| `EMAIL_USER` | Gmail address for dispatch notifications | `info@meltontaxi.au` |
| `EMAIL_PASS` | Google 16-character App Password | (Optional) |
| `DATABASE_URL` | PostgreSQL connection string | (Optional - in-memory fallback enabled) |
| `VISITOR_SECRET`| Access password for `/bmt-owner-panel` | `bmt-admin-2024` |
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps API key | (Optional - OpenStreetMap fallback active) |
