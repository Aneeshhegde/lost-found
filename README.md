# 🔍 Lost & Found Tracking System

A comprehensive web-based Lost & Found management system built with the MERN stack, designed for campus environments to help students and staff report, track, and claim lost or found items efficiently.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![Node](https://img.shields.io/badge/node-14.x-brightgreen.svg)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Admin Portal](#-admin-portal)
- [API Endpoints](#-api-endpoints)
- [Documentation](#-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎯 Core Features
- **User Authentication**: Secure signup/login with JWT tokens
- **Report Items**: Users can report lost or found items with detailed descriptions
- **Image Upload**: Upload multiple images for items (up to 5 images)
- **Search & Filter**: Advanced filtering by item type, category, date, etc.
- **Claim System**: Users can claim items with verification process
- **Email Notifications**: Automated email alerts to admin for new items and claims
- **Responsive Design**: Mobile-friendly interface with modern UI/UX

### 👤 User Features
- Personal dashboard showing reported items
- View all lost and found items
- Submit claims for items
- Track claim status
- Dark mode toggle
- Profile management

### 🔐 Admin Features
- **Admin Portal**: Secure admin dashboard (Password: `admin123`)
- View and manage all reported items
- Approve/reject claims
- Helper staff management
- Item statistics and analytics
- Bulk actions on items
- Email notification system

### 🛠️ Helper Staff Features
- Dedicated helper approval system
- Manage found items
- Assist in verification process

---

## 🛠️ Tech Stack

### Frontend
- **React** 18.2.0 - UI library
- **Redux Toolkit** - State management
- **React Router** 6.18.0 - Navigation
- **Axios** - HTTP client
- **Bootstrap** 5.3.2 - CSS framework
- **JWT Decode** - Token handling

### Backend
- **Node.js** 14.x - Runtime environment
- **Express** 4.18.2 - Web framework
- **MongoDB** - Database
- **Mongoose** 8.0.0 - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service
- **Multer** - File uploads

### Additional Tools
- **Dotenv** - Environment variables
- **CORS** - Cross-origin resource sharing
- **Express Validator** - Input validation
- **Cookie Parser** - Cookie handling

---

## 📁 Project Structure

```
Lost-Found/
├── client/                    # Frontend React application
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── netlify.toml      # Netlify deployment config
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── HomePage.js
│   │   │   ├── Navbar.js
│   │   │   ├── AdminPortal.js
│   │   │   ├── LostAndFoundForm.js
│   │   │   ├── LostFoundItems.js
│   │   │   └── ...
│   │   ├── utils/           # Redux slices and utilities
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── server/                   # Backend Node.js application
│   ├── config/
│   │   └── connectToMongo.js # MongoDB connection
│   ├── models/              # Mongoose schemas
│   │   ├── UserSchema.js
│   │   ├── ItemSchema.js
│   │   ├── ClaimSchema.js
│   │   ├── ClaimantSchema.js
│   │   └── HelperSchema.js
│   ├── routes/              # API controllers
│   │   ├── userController.js
│   │   ├── itemController.js
│   │   ├── claimController.js
│   │   ├── claimantController.js
│   │   └── helperController.js
│   ├── middleware/          # Custom middleware
│   │   ├── requireAuth.js
│   │   ├── errorHandler.js
│   │   └── validationMiddleware.js
│   ├── utils/
│   │   └── emailService.js  # Email notification service
│   ├── server.js            # Entry point
│   ├── .env.example         # Environment variables template
│   └── package.json
│
├── docs/                    # Documentation files
│   ├── ADMIN_ACCESS_GUIDE.md
│   ├── ADMIN_FEATURES.md
│   ├── DEPLOYMENT_GUIDE.md
│   ├── EMAIL_SETUP_GUIDE.md
│   ├── QUICK_EMAIL_SETUP.md
│   ├── QUICK_GITHUB_SETUP.md
│   ├── HELPER_APPROVAL_SYSTEM.md
│   ├── TESTING_CLAIMS.md
│   ├── FORM_IMPROVEMENTS.md
│   ├── DESIGN_IMPROVEMENTS.md
│   ├── DARK_MODE_FEATURE.md
│   ├── COLOR_SCHEME_GUIDE.md
│   └── ...
│
├── .gitignore
└── README.md               # This file
```

---

## 🚀 Installation

### Prerequisites
- Node.js (v14.x or higher)
- MongoDB (local or Atlas)
- npm or yarn
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/YOUR-USERNAME/lost-and-found.git
cd lost-and-found
```

### Step 2: Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd ../client
npm install
```

### Step 3: Environment Configuration

Create `.env` file in the `server` directory:

```bash
cd server
cp .env.example .env
```

Edit `.env` with your credentials:
```env
# Server Configuration
PORT=5000

# MongoDB Connection
mongoURI=mongodb://localhost:27017/lost-found
# For MongoDB Atlas: mongoURI=mongodb+srv://username:password@cluster.mongodb.net/lost-found

# JWT Secret Key
SECRETKEY=your-secret-key-here

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-digit-app-password
```

### Step 4: Setup Gmail App Password

1. Enable 2-Step Verification: https://myaccount.google.com/security
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Copy the 16-digit password to `.env`

**See detailed guide:** [`docs/EMAIL_SETUP_GUIDE.md`](docs/EMAIL_SETUP_GUIDE.md)

---

## ⚙️ Configuration

### Frontend Configuration

Update API endpoint in `client/src/components/config.js`:

```javascript
const baseURL = 'http://localhost:5000'; // Local development
// const baseURL = 'https://your-backend-url.com'; // Production

const config = {
  baseURL,
};

export default config;
```

### Admin Credentials

Default admin credentials (can be changed in `client/src/components/Navbar.js`):
- **Username:** `admin`
- **Password:** `admin123`

**⚠️ Important:** Change these credentials before deploying to production!

---

## 🎮 Usage

### Running Locally

**Terminal 1 - Start Backend:**
```bash
cd server
npm start
# Or for development with auto-reload:
npm run dev
```

Backend will run on: `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
cd client
npm start
```

Frontend will run on: `http://localhost:3000`

### User Flow

1. **Sign Up/Login**: Create an account or login
2. **Report Item**: Click "Raise Concern" to report lost/found items
3. **Browse Items**: View all lost and found items
4. **Claim Item**: Submit a claim for items you recognize
5. **Track Status**: Monitor your reported items and claims

---

## 🔐 Admin Portal

### Accessing Admin Portal

1. Click the **"🔐 Admin"** button in the navbar
2. Enter password: `admin123`
3. Access the admin dashboard

### Admin Features

- **Dashboard Overview**: View total items, claims, and helpers
- **Item Management**: 
  - View all reported items
  - Filter by type (lost/found)
  - Delete items
  - View item details and images
- **Claim Management**:
  - Review pending claims
  - Approve/reject claims
  - View claimant information
- **Helper Management**:
  - View all helper staff
  - Approve/reject helper applications
- **Email Notifications**: Automatic alerts for new items and claims

**Detailed guide:** [`docs/ADMIN_ACCESS_GUIDE.md`](docs/ADMIN_ACCESS_GUIDE.md)

---

## 📡 API Endpoints

### Authentication
```
POST   /signup              - Register new user
POST   /login               - User login
GET    /fetchuser/:id       - Get user details
```

### Items
```
GET    /fetchallitems       - Get all items
GET    /fetchitem/:id       - Get single item
POST   /additem             - Report new item (auth required)
GET    /fetchuseritems/:id  - Get user's items
DELETE /deleteitem/:id      - Delete item (auth required)
```

### Claims
```
POST   /submitclaim         - Submit item claim
GET    /fetchallclaims      - Get all claims (admin)
PUT    /updateclaim/:id     - Update claim status (admin)
DELETE /deleteclaim/:id     - Delete claim (admin)
```

### Helpers
```
POST   /addhelper           - Register as helper
GET    /fetchallhelpers     - Get all helpers (admin)
PUT    /updatehelper/:id    - Update helper status (admin)
DELETE /deletehelper/:id    - Delete helper (admin)
```

---

## 📚 Documentation

All detailed guides are available in the [`docs/`](docs/) folder:

### Setup & Configuration
- 📧 [Email Setup Guide](docs/EMAIL_SETUP_GUIDE.md) - Configure Gmail notifications
- ⚡ [Quick Email Setup](docs/QUICK_EMAIL_SETUP.md) - Fast email configuration
- 🐙 [Quick GitHub Setup](docs/QUICK_GITHUB_SETUP.md) - Git and GitHub guide
- 🚀 [Deployment Guide](docs/DEPLOYMENT_GUIDE.md) - Deploy to production

### Features & Usage
- 🔐 [Admin Access Guide](docs/ADMIN_ACCESS_GUIDE.md) - Admin portal documentation
- ⭐ [Admin Features](docs/ADMIN_FEATURES.md) - Complete admin feature list
- 👥 [Helper Approval System](docs/HELPER_APPROVAL_SYSTEM.md) - Helper staff management
- 🎯 [Testing Claims](docs/TESTING_CLAIMS.md) - How to test claim functionality

### Design & UI
- 🎨 [Design Improvements](docs/DESIGN_IMPROVEMENTS.md) - UI/UX enhancements
- 🌙 [Dark Mode Feature](docs/DARK_MODE_FEATURE.md) - Dark mode implementation
- 🎨 [Color Scheme Guide](docs/COLOR_SCHEME_GUIDE.md) - Color palette reference
- 📝 [Form Improvements](docs/FORM_IMPROVEMENTS.md) - Form enhancements

### Troubleshooting
- 🔧 [Admin Portal Fix](docs/ADMIN_PORTAL_FIX.md) - Common admin issues
- 🔒 [Privacy Update](docs/PRIVACY_UPDATE.md) - Privacy and security notes

---

## 🌐 Deployment

### Option 1: Split Deployment (Recommended)

**Frontend → Netlify (Free)**
**Backend → Render (Free)**
**Database → MongoDB Atlas (Free)**

### Quick Deployment Steps

1. **Deploy Backend to Render:**
   - Push code to GitHub
   - Connect repository to Render
   - Set environment variables
   - Deploy

2. **Deploy Frontend to Netlify:**
   - Update `config.js` with backend URL
   - Connect repository to Netlify
   - Configure build settings:
     - Base directory: `client`
     - Build command: `npm run build`
     - Publish directory: `client/build`

**Full deployment guide:** [`docs/DEPLOYMENT_GUIDE.md`](docs/DEPLOYMENT_GUIDE.md)

### Environment Variables for Production

Ensure these are set on your hosting platform:
```env
PORT=5000
mongoURI=mongodb+srv://...
SECRETKEY=strong-secret-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=app-password
```

---

## 🔒 Security Considerations

### Important Security Notes

1. **Never commit `.env` file** - Contains sensitive credentials
2. **Change default admin password** - Update before production
3. **Use strong JWT secret** - Generate random secure key
4. **Enable CORS properly** - Configure allowed origins
5. **Validate all inputs** - Use express-validator
6. **Sanitize user data** - Prevent XSS and injection attacks
7. **Use HTTPS in production** - Encrypt data in transit
8. **Rotate credentials regularly** - Update passwords periodically

### Files to Keep Private
- ❌ `.env`
- ❌ `node_modules/`
- ❌ Database files
- ❌ API keys

### Files Safe to Share
- ✅ `.env.example`
- ✅ Source code
- ✅ Documentation
- ✅ `.gitignore`

---

## 🧪 Testing

### Manual Testing

1. **User Registration/Login**
   ```bash
   # Test signup
   POST http://localhost:5000/signup
   
   # Test login
   POST http://localhost:5000/login
   ```

2. **Report Items**
   - Login as user
   - Navigate to "Raise Concern"
   - Fill form and upload images
   - Verify email notification

3. **Admin Portal**
   - Access admin portal
   - Verify all items display
   - Test claim approval/rejection

**Testing guide:** [`docs/TESTING_CLAIMS.md`](docs/TESTING_CLAIMS.md)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- Use meaningful variable names
- Comment complex logic
- Follow existing code style
- Test before submitting PR

---

## 🐛 Known Issues

- Admin credentials are hardcoded (needs database implementation)
- Image upload size limit is 5MB per image
- Email notifications require Gmail App Password setup

---

## 🔮 Future Enhancements

- [ ] Real-time notifications with WebSockets
- [ ] SMS notifications via Twilio
- [ ] Advanced search with AI/ML matching
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] QR code generation for items
- [ ] Analytics dashboard
- [ ] Export reports (PDF/Excel)
- [ ] Role-based access control (RBAC)
- [ ] Two-factor authentication (2FA)

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [documentation](docs/)
2. Review [common issues](docs/ADMIN_PORTAL_FIX.md)
3. Open an issue on GitHub
4. Contact: lostandfoundcampusdrait@gmail.com

---

## 👥 Authors

- **Shivu** - Initial work and backend development
- **Contributors** - See GitHub contributors list

---

## 📄 License

This project is licensed under the ISC License.

---

## 🙏 Acknowledgments

- MERN Stack community
- React documentation
- MongoDB documentation
- Express.js documentation
- All contributors and testers

---

## 📊 Project Stats

- **Total Lines of Code**: ~10,000+
- **Components**: 15+
- **API Endpoints**: 20+
- **Database Collections**: 5
- **Documentation Pages**: 18+

---

## 🎯 Quick Links

- [Live Demo](#) - Coming soon
- [API Documentation](#-api-endpoints)
- [Admin Guide](docs/ADMIN_ACCESS_GUIDE.md)
- [Deployment Guide](docs/DEPLOYMENT_GUIDE.md)
- [Email Setup](docs/EMAIL_SETUP_GUIDE.md)

---

**Made with ❤️ for campus communities**

*Last Updated: November 2025*
