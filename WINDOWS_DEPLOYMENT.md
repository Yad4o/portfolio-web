# 🪟 Windows Deployment Guide

## 🔧 Windows-Specific Setup

### Prerequisites
- Windows 10/11
- Node.js 18+ (download from nodejs.org)
- Git for Windows (download from git-scm.com)
- Visual Studio Code (recommended)

### 🚀 Windows Installation Steps

#### 1. Install Node.js
```powershell
# Verify installation
node --version
npm --version
```

#### 2. Install Dependencies
```powershell
# In your portfolio directory
npm install --legacy-peer-deps
```

#### 3. Build Project
```powershell
npm run build
```

#### 4. Test Locally
```powershell
npm run dev
# Open http://localhost:5173 in browser
```

### 🐛 Common Windows Issues & Fixes

#### Issue: npm install fails with permissions
```powershell
# Fix: Run as Administrator or use legacy peer deps
npm install --legacy-peer-deps
```

#### Issue: Port 5173 blocked
```powershell
# Fix: Allow through Windows Firewall or use different port
npm run dev -- --port 3000
```

#### Issue: Git line ending problems
```powershell
# Fix: Configure Git for Windows
git config --global core.autocrlf true
git config --global core.eol lf
```

#### Issue: PowerShell execution policy
```powershell
# Fix: Allow script execution
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 📁 Windows File Paths
- Project: `C:\Users\YourUsername\portfolio\`
- Build output: `C:\Users\YourUsername\portfolio\dist\`
- Config: `C:\Users\YourUsername\portfolio\vite.config.ts`

### 🔄 Git Commands (Windows)
```powershell
# Stage all changes
git add .

# Commit with Windows-friendly message
git commit -m "Windows deployment update"

# Push to GitHub
git push origin main
```

### 🌐 Deployment Verification
1. Open PowerShell in project directory
2. Run: `npm run build`
3. Check `dist/` folder exists
4. Push changes: `git push origin main`
5. Monitor: GitHub repository → Actions tab

### 📊 Windows Performance Tips
- Use Windows Terminal for better command line experience
- Enable WSL2 for Linux-like environment
- Close unnecessary apps during build
- Use SSD for better build performance

---

**Windows deployment should work seamlessly with these steps!** 🎯
