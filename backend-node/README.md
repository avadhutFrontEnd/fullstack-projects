# Multi-Factor Authentication Project

A secure authentication system implementing multiple factors for verification to enhance security and protect user accounts.

## Overview

This project provides a comprehensive multi-factor authentication solution that can be integrated into web applications. It supports various authentication methods including email/password, SMS verification codes, authenticator apps, and more.

## Features

- Traditional username/password authentication
- Time-based One-Time Password (TOTP) support
- SMS verification
- Email verification
- Account recovery options
- Session management
- Brute force protection

## Tech Stack

### Frontend
- React.js

### Backend
- Node.js
- Express.js
- MongoDB for data storage
- Passport.js for authentication strategies

## Dependencies

- [Passport.js](https://www.passportjs.org/packages/passport-npm/) - Authentication middleware for Node.js
- Passport strategies:
  - passport-local (username/password)
  - passport-totp (time-based one-time passwords)
- Twilio API (for SMS)
- Nodemailer (for email verification)
- bcrypt (for password hashing)
- JSON Web Tokens (for session management)

- [Speakeasy](https://www.npmjs.com/package/speakeasy) - 

- [express-session](https://www.npmjs.com/package/express-session) - 

## Installation

```bash
# Clone the repository
git clone https://github.com/avadhutrFrontEnd/fullstack-projects.git

# Navigate to the project directory
cd fullstack-projects

# Switch to the MFA project branch
git checkout Multi-Factor-Authentication

# Install dependencies
npm install
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_phone
MAIL_SERVICE=gmail
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_email_app_password
```

## Usage

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application will be available at `http://localhost:3000`

## Implementation Details

- **User Registration**: Collects basic information and sets up initial authentication factor
- **Multiple Factor Setup**: Guides users through setting up additional verification methods
- **Login Flow**: Handles multi-step verification process
- **Recovery Process**: Secure account recovery options
- **Security Measures**: Rate limiting, suspicious activity detection, etc.

## Project Structure

```
├── client/                 # Frontend code
│   ├── public/             # Static assets
│   └── src/                # Source files
│       ├── components/     # UI components
│       ├── pages/          # Application pages
│       └── services/       # API services
├── server/                 # Backend code
│   ├── config/             # Configuration files
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Database models
│   └── routes/             # API routes
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
└── README.md               # Project documentation
```

## Security Considerations

- Passwords are hashed using bcrypt
- TOTP secrets are encrypted
- Rate limiting implemented on authentication endpoints
- Brute force protection
- Session timeout and renewal policies

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request