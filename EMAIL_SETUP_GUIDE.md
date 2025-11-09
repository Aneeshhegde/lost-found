# Email Notification Setup Guide

## Overview
The system now automatically sends email notifications to `lostandfoundcampusdrait@gmail.com` when:
1. A new lost item is reported
2. A new found item is reported
3. A new claim is submitted

## Setup Instructions

### Step 1: Enable Gmail App Password

Since you're using Gmail, you need to create an **App Password** (not your regular Gmail password):

1. **Go to Google Account Settings**:
   - Visit: https://myaccount.google.com/
   - Login with `lostandfoundcampusdrait@gmail.com`

2. **Enable 2-Step Verification** (if not already enabled):
   - Go to Security → 2-Step Verification
   - Follow the prompts to enable it
   - This is required to create App Passwords

3. **Create App Password**:
   - Go to Security → App passwords
   - Or visit: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it: "Lost & Found System"
   - Click "Generate"
   - **Copy the 16-character password** (it will look like: `abcd efgh ijkl mnop`)

### Step 2: Update .env File

Open `server/.env` and update the email password:

```env
# Email Configuration
EMAIL_USER=lostandfoundcampusdrait@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

Replace `abcd efgh ijkl mnop` with your actual App Password (remove spaces).

### Step 3: Restart Server

```bash
cd server
npm start
```

## Email Templates

### 1. New Item Notification

**Subject**: 🔴 New LOST Item Reported - [Item Name]
or
**Subject**: 🟢 New FOUND Item Reported - [Item Name]

**Content**:
- Item name and description
- Type (Lost/Found)
- Reporter's phone number
- Reporter's user ID
- Date and time
- Note about images (if uploaded)

### 2. New Claim Notification

**Subject**: 🎯 New Claim Submitted - [Item Name]

**Content**:
- Item details (name, type, description)
- Claimant information (name, phone, email)
- Proof of claim description
- Date and time

## Testing

### Test New Item Email:
1. Login to the app as a user
2. Go to "Raise Concern"
3. Fill in item details:
   - Item name: "Test Wallet"
   - Description: "Blue leather wallet"
   - Phone: Your number
   - Type: Lost or Found
4. Submit
5. Check `lostandfoundcampusdrait@gmail.com` inbox

### Test Claim Email:
1. Go to "All Items" or "Found Items"
2. Click "Claim" on any item
3. Fill in claim form
4. Submit
5. Check `lostandfoundcampusdrait@gmail.com` inbox

## Troubleshooting

### Issue 1: "Invalid login" or "Username and Password not accepted"

**Solution**: 
- Make sure you're using an App Password, not your regular Gmail password
- Remove any spaces from the App Password
- Ensure 2-Step Verification is enabled

### Issue 2: Emails not being received

**Check**:
1. Server console for errors
2. Look for messages like:
   - ✅ "Email sent successfully: [message-id]"
   - ❌ "Error sending email: [error]"
3. Check spam/junk folder in Gmail
4. Verify EMAIL_USER and EMAIL_PASSWORD in .env

### Issue 3: "Less secure app access" error

**Solution**:
- This is outdated. Use App Passwords instead
- App Passwords work even with "Less secure app access" disabled

### Issue 4: Connection timeout

**Solution**:
- Check your internet connection
- Verify firewall isn't blocking port 587 or 465
- Try using a different network

## Email Service Configuration

The email service uses:
- **Service**: Gmail
- **Port**: 587 (TLS) or 465 (SSL)
- **Authentication**: App Password
- **From**: lostandfoundcampusdrait@gmail.com
- **To**: lostandfoundcampusdrait@gmail.com

## Files Modified

1. ✅ `server/utils/emailService.js` - Email sending logic
2. ✅ `server/routes/itemController.js` - Sends email on item creation
3. ✅ `server/routes/claimController.js` - Sends email on claim submission
4. ✅ `server/.env` - Email credentials
5. ✅ `server/package.json` - Added nodemailer dependency

## Security Notes

⚠️ **Important**:
- Never commit `.env` file to Git
- Keep App Password secure
- Don't share App Password with anyone
- Rotate App Password periodically
- Use different App Passwords for different apps

## Alternative Email Providers

If you want to use a different email service:

### Outlook/Hotmail:
```javascript
service: 'hotmail',
auth: {
    user: 'your-email@outlook.com',
    pass: 'your-password'
}
```

### Yahoo:
```javascript
service: 'yahoo',
auth: {
    user: 'your-email@yahoo.com',
    pass: 'your-app-password'
}
```

### Custom SMTP:
```javascript
host: 'smtp.example.com',
port: 587,
secure: false,
auth: {
    user: 'your-email@example.com',
    pass: 'your-password'
}
```

## Email Notification Flow

```
User Reports Item
       ↓
Item Saved to Database
       ↓
Email Service Triggered
       ↓
Email Sent to Admin
       ↓
Admin Receives Notification
       ↓
Admin Reviews in Portal
```

## Benefits

✅ **Instant Notifications**: Admin gets notified immediately
✅ **No Manual Checking**: No need to constantly check admin portal
✅ **Detailed Information**: All item/claim details in email
✅ **Professional**: Formatted HTML emails
✅ **Reliable**: Uses Gmail's infrastructure
✅ **Asynchronous**: Doesn't slow down item submission

## Next Steps

After setup:
1. Test with a real item submission
2. Verify email is received
3. Check email formatting
4. Set up email filters/labels in Gmail for organization
5. Consider adding email notifications for:
   - Claim approvals
   - Item matches
   - Helper requests

## Support

If you encounter issues:
1. Check server console logs
2. Verify .env configuration
3. Test with a simple test script
4. Check Gmail security settings
5. Review nodemailer documentation: https://nodemailer.com/
