# ⚡ Quick Start Guide

Get your Lost & Found application running in **10 minutes**!

---

## 🚀 Prerequisites

Make sure you have:
- ✅ Node.js (v14+) installed
- ✅ MongoDB installed (or MongoDB Atlas account)
- ✅ Gmail account (for email notifications)

---

## 📋 Step-by-Step Setup

### Step 1: Install Dependencies (2 minutes)

```bash
# Navigate to project folder
cd "Lost-Found"

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

---

### Step 2: Setup Environment Variables (3 minutes)

```bash
# Go to server folder
cd server

# Copy example file
cp .env.example .env
```

**Edit `server/.env` with your details:**

```env
PORT=5000
mongoURI=mongodb://localhost:27017/lost-found
SECRETKEY=your-secret-key-here
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

**Get Gmail App Password:**
1. Go to: https://myaccount.google.com/apppasswords
2. Generate password for "Mail"
3. Copy 16-digit password to `.env`

📖 **Detailed guide:** [`docs/QUICK_EMAIL_SETUP.md`](docs/QUICK_EMAIL_SETUP.md)

---

### Step 3: Start MongoDB (1 minute)

**Option A: Local MongoDB**
```bash
# Windows
mongod

# Mac/Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas**
- Use connection string in `.env`
- Format: `mongodb+srv://username:password@cluster.mongodb.net/lost-found`

---

### Step 4: Run the Application (1 minute)

**Open 2 terminals:**

**Terminal 1 - Backend:**
```bash
cd server
npm start
```
✅ Backend running on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```
✅ Frontend running on: http://localhost:3000

---

## 🎉 You're Ready!

### Test Your Setup:

1. **Open Browser:** http://localhost:3000
2. **Sign Up:** Create a new account
3. **Report Item:** Click "Raise Concern"
4. **Check Email:** Admin should receive notification

---

## 🔐 Admin Access

1. Click **"🔐 Admin"** button in navbar
2. Enter password: `admin123`
3. Access admin dashboard

⚠️ **Change this password before production!**

---

## 🐛 Troubleshooting

### Backend won't start?
```bash
# Check if MongoDB is running
mongo --version

# Check if port 5000 is free
netstat -ano | findstr :5000
```

### Frontend won't start?
```bash
# Clear cache and reinstall
cd client
rm -rf node_modules package-lock.json
npm install
```

### Email not working?
- Verify Gmail App Password is correct
- Check 2-Step Verification is enabled
- Review: [`docs/EMAIL_TESTING_GUIDE.md`](docs/EMAIL_TESTING_GUIDE.md)

### MongoDB connection error?
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify database name is correct

---

## 📚 Next Steps

### Learn More:
- 📖 [Full Documentation](README.md)
- 🔐 [Admin Guide](docs/ADMIN_ACCESS_GUIDE.md)
- 🚀 [Deployment Guide](docs/DEPLOYMENT_GUIDE.md)
- 📧 [Email Setup](docs/EMAIL_SETUP_GUIDE.md)

### Customize:
- Change admin password in `client/src/components/Navbar.js`
- Update colors in component styles
- Modify email templates in `server/utils/emailService.js`

### Deploy:
- Follow [`docs/DEPLOYMENT_GUIDE.md`](docs/DEPLOYMENT_GUIDE.md)
- Deploy frontend to Netlify
- Deploy backend to Render
- Use MongoDB Atlas for database

---

## 🎯 Common Tasks

### Add a new user:
1. Go to http://localhost:3000
2. Click "Sign In" → "Sign Up"
3. Fill registration form

### Report an item:
1. Login as user
2. Click "Raise Concern"
3. Fill form and upload images
4. Submit

### Approve a claim (Admin):
1. Login to admin portal
2. Go to "Claims" section
3. Review claim details
4. Click "Approve" or "Reject"

---

## 💡 Pro Tips

1. **Use nodemon for development:**
   ```bash
   cd server
   npm run dev  # Auto-restart on changes
   ```

2. **Keep terminals organized:**
   - Terminal 1: Backend (server)
   - Terminal 2: Frontend (client)
   - Terminal 3: MongoDB (if local)

3. **Check logs:**
   - Backend logs in Terminal 1
   - Frontend logs in browser console (F12)

4. **Test email locally:**
   ```bash
   cd server
   node testEmail.js
   ```

---

## 📞 Need Help?

### Quick References:
- **Main README:** [`README.md`](README.md)
- **All Docs:** [`docs/`](docs/)
- **Project Summary:** [`PROJECT_SUMMARY.md`](PROJECT_SUMMARY.md)

### Support:
- 📧 Email: lostandfoundcampusdrait@gmail.com
- 📚 Check documentation in `docs/` folder
- 🐛 Open GitHub issue

---

## ✅ Setup Checklist

- [ ] Node.js installed
- [ ] MongoDB running
- [ ] Dependencies installed (server & client)
- [ ] `.env` file configured
- [ ] Gmail App Password set
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can access http://localhost:3000
- [ ] Can sign up/login
- [ ] Email notifications working
- [ ] Admin portal accessible

---

**🎉 Happy Coding!**

*Setup time: ~10 minutes | Difficulty: Easy*

---

**Quick Links:**
- [📖 Full README](README.md)
- [📚 Documentation](docs/)
- [🔐 Admin Guide](docs/ADMIN_ACCESS_GUIDE.md)
- [🚀 Deploy Guide](docs/DEPLOYMENT_GUIDE.md)
