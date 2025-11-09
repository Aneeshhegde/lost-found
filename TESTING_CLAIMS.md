# Testing the Claims System

## Issue Fixed
The claims were submitting successfully but not showing in the admin portal. This has been fixed by:
1. Properly managing the loading state
2. Adding console logs for debugging
3. Adding a refresh button
4. Ensuring all data loads before showing the UI

## How to Test

### Step 1: Start the Server
```bash
cd server
npm start
```
Server should start on port 5000.

### Step 2: Start the Client
```bash
cd client
npm start
```
Client should start on port 3000 or 3002.

### Step 3: Submit a Claim

1. **Create an Item First** (if you haven't):
   - Login as a user
   - Go to "Raise Concern"
   - Add a found item with:
     - Item name: "Blue Wallet"
     - Description: "Found near library"
     - Phone number: Your WhatsApp number
     - Type: "Found"
     - Upload an image
   - Submit

2. **Claim the Item**:
   - Go to "All Items" or "Found Items"
   - Find the item you just created
   - Click "Claim" button
   - Fill in the form:
     - Name: "John Doe"
     - Mobile: Your phone number
     - Hostel: "Hostel A"
     - Email: "john@example.com"
     - Proof: "This is my wallet, it has my ID card inside"
   - Click "Submit Claim"
   - You should see: "Claim submitted successfully!"

### Step 4: Check Admin Portal

1. **Access Admin Portal**:
   - Logout (if logged in as user)
   - Click "🔐 Admin" button on navbar
   - Enter password: `admin123`
   - Click "Login"

2. **View Claims**:
   - You should see 3 tabs: Items, Helper Requests, Claims
   - Click on "🎯 Claims" tab
   - You should see your claim with:
     - Status: PENDING (yellow badge)
     - Item details
     - Claimant information
     - Proof of claim

3. **If Claims Don't Show**:
   - Click the "🔄 Refresh All" button at the top right
   - Check browser console (F12) for any errors
   - Look for "Claims response:" in console to see the data

### Step 5: Approve a Claim

1. In the Claims tab, find a pending claim
2. Click "✓ Approve & Notify" button
3. Enter meeting place: "Lost & Found Office, Main Building"
4. Click OK
5. Two WhatsApp tabs will open:
   - One for the claimant
   - One for the item owner
6. The claim status will change to APPROVED (green badge)

## Debugging

### Check Console Logs

**In Browser Console (F12):**
- When submitting claim: Look for "Submitting claim with data:"
- When submitting claim: Look for "Claim response:"
- In Admin Portal: Look for "Claims response:"

**In Server Terminal:**
- Should see "Server is running on port 5000"
- When claim is submitted: Should see the POST request
- When fetching claims: Should see the GET request

### Check Database

If you have MongoDB Compass or similar:
1. Connect to: `mongodb://localhost:27017/lost-found`
2. Look for `claims` collection
3. Verify your claim is saved there

### Common Issues

1. **Claims not showing**: Click "🔄 Refresh All" button
2. **Server not running**: Check if port 5000 is in use
3. **CORS errors**: Verify server.js has your client port in CORS config
4. **Phone number missing**: Make sure items have phone numbers

## API Endpoints

- `POST /claim` - Submit a new claim
- `GET /claim` - Get all claims
- `GET /claim/pending` - Get pending claims only
- `PUT /claim/:id` - Update claim status
- `DELETE /claim/:id` - Delete claim

## Expected Flow

1. User submits claim → Saved to database
2. Admin opens portal → Fetches all claims
3. Admin sees claim in Claims tab → Status: PENDING
4. Admin approves → Status changes to APPROVED
5. WhatsApp messages sent to both parties
6. Both parties meet at specified location
