# Email Collection API

A Node.js API for collecting and managing email addresses, with integration capabilities for n8n automation.

## Features

- RESTful API endpoints for email management
- MongoDB database integration
- CORS enabled for cross-origin requests
- n8n integration endpoint
- Email validation and duplicate detection
- Vercel deployment ready

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

## API Endpoints

### POST /api/emails
Submit a new email address
```json
{
  "email": "example@email.com"
}
```

### GET /api/emails
Retrieve all email addresses

### GET /api/n8n/emails
Special endpoint for n8n integration, returns emails in a simplified format:
```json
{
  "emails": ["email1@example.com", "email2@example.com"]
}
```

## Setup

1. Clone the repository
```bash
git clone [your-repo-url]
cd [your-repo-name]
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

4. Start the development server
```bash
npm start
```

## Deployment

### Vercel Deployment
1. Install Vercel CLI
```bash
npm install -g vercel
```

2. Deploy to Vercel
```bash
vercel
```

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (default: 5000)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 