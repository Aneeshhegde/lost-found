# Quick Email Setup Guide

## Current Issue
Email notifications are not being sent because the Gmail App Password is not configured.

## Quick Fix (5 Minutes)

### Step 1: Get Gmail App Password

1. **Open Gmail Account Settings**:
   - Go to: https://myaccount.google.com/
   - Login with: `lostandfoundcampusdrait@gmail.com`

2. **Enable 2-Step Verification** (if not already enabled):
   - Click **Security** (left sidebar)
   - Scroll to **"How you sign in to Google"**
   - Click **"2-Step Verification"**
   - Follow the prompts to enable it
   - ⚠️ This is REQUIRED for App Passwords

3. **Create App Password**:
   - Go back to **Security**
   - Click **"App passwords"**
   - Or visit directly: https://myaccount.google.com/apppasswords
   - You might need to re-enter your password
   
4. **Generate Password**:
   - Select app: **Mail**
   - Select device: **Other (Custom name)**
   - Type name: **Lost & Found System**
   - Click **Generate**
   
5. **Copy the Password**:
   - You'll see a 16-character password like: `abcd efgh ijkl mnop`
   - **Copy this password** (you won't see it again!)

### Step 2: Update .env File

1. Open: `server/.env`

2. Find this line:
   ```env
   EMAIL_PASSWORD=your_app_password_here
   ```

3. Replace with your App Password (remove spaces):
   ```env
   EMAIL_PASSWORD=abcdefghijklmnop
   ```

4. Save the file

### Step 3: Test Email Configuration

Run the test script:

```bash
cd server
node testEmail.js
```

**Expected Output:**
```
=== Email Configuration Test ===

1. Checking environment variables...
   EMAIL_USER: lostandfoundcampusdrait@gmail.com
   EMAIL_PASSWORD exists: true
   EMAIL_PASSWORD length: 16
✅ Environment variables configured

2. Testing email connection...
✅ Email connection successful!

3. Sending test email...
✅ Test email sent successfully!
   Message ID: <some-id@gmail.com>

📧 Check your inbox: lostandfoundcampusdrait@gmail.com

🎉 Email system is fully configured and working!
```

### Step 4: Restart Server

```bash
cd server
npm start
```

### Step 5: Test with Real Item

1. Login to the app
2. Go to "Raise Concern"
3. Report a test item
4. Check `lostandfoundcampusdrait@gmail.com` inbox
5. You should receive an email notification!

## Troubleshooting

### Error: "Invalid login"

**Cause**: Using regular Gmail password instead of App Password

**Solution**:
1. Make sure you created an App Password (not using regular password)
2. Ensure 2-Step Verification is enabled
3. Generate a new App Password
4. Remove any spaces from the password

### Error: "Username and Password not accepted"

**Cause**: Incorrect App Password or 2-Step Verification not enabled

**Solution**:
1. Enable 2-Step Verification first
2. Generate a new App Password
3. Copy it exactly (no spaces)
4. Update .env file

### Error: "Less secure app access"

**Cause**: Outdated security setting

**Solution**:
- Ignore this message
- Use App Passwords instead
- App Passwords work regardless of this setting

### No Email Received

**Check**:
1. Spam/Junk folder
2. Server console for errors
3. Run `node testEmail.js` to verify configuration
4. Check if server restarted after .env update

## Visual Guide

### Finding App Passwords in Gmail

```
Google Account
    └── Security
        ├── 2-Step Verification (Enable this first!)
        └── App passwords (Then create here)
            └── Select app: Mail
            └── Select device: Other (Custom name)
            └── Generate
            └── Copy 16-character password
```

## Example .env File

```env
PORT=5000
mongoURI = MONGO_URL=mongodb://localhost:27017/lost-found
SECRETKEY = GROUP18DBMSPROJECT

# Email Configuration
EMAIL_USER=lostandfoundcampusdrait@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
```

⚠️ Replace `abcdefghijklmnop` with your actual App Password!

## Security Tips

✅ **DO**:
- Use App Passwords
- Keep .env file private
- Never commit .env to Git
- Rotate passwords periodically

❌ **DON'T**:
- Use regular Gmail password
- Share App Password
- Commit .env to repository
- Use same password for multiple apps

## What Happens After Setup

Once configured, you'll automatically receive emails when:

1. **New Lost Item Reported**:
   - Subject: 🔴 New LOST Item Reported - [Item Name]
   - Contains: Item details, reporter info, date

2. **New Found Item Reported**:
   - Subject: 🟢 New FOUND Item Reported - [Item Name]
   - Contains: Item details, reporter info, date

3. **New Claim Submitted**:
   - Subject: 🎯 New Claim Submitted - [Item Name]
   - Contains: Item details, claimant info, proof

## Need Help?

If you're still having issues:

1. Run the test script: `node testEmail.js`
2. Check server console for error messages
3. Verify 2-Step Verification is enabled
4. Try generating a new App Password
5. Make sure server is restarted after .env update

## Quick Checklist

- [ ] 2-Step Verification enabled on Gmail
- [ ] App Password generated
- [ ] App Password copied (16 characters)
- [ ] .env file updated with App Password
- [ ] No spaces in App Password
- [ ] Server restarted
- [ ] Test script run successfully
- [ ] Test email received in inbox

Once all checkboxes are complete, your email system is ready! 🎉
