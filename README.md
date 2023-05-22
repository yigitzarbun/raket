# Raket

Raket is a platform that allows users to find tennis partners, book tennis courts, and buy tennis equipment. It aims to connect tennis enthusiasts and provide them with a seamless experience for finding partners, booking courts, and purchasing equipment.

## Features

- Find Tennis Partners: Users can search for tennis partners based on their level, gender, and location in Turkey.

- Book Tennis Courts: Users can browse through various clubs and book tennis courts for their matches or training sessions.

- Buy Tennis Equipment: Users can purchase tennis equipment directly from the Raket platform, making it convenient to get the gear they need.

## Technologies Used

- Frontend: React, HTML, CSS
- Backend: Node.js, Express.js
- Database: Sqlite
- Authentication: JWT (JSON Web Tokens)
- OpenAI: GPT-3.5 Turbo API for the chat functionality

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/yigitzarbun/raket.git
```

2. Install dependencies for both the frontend and backend:
   cd raket
   npm install

3. Set up environment variables:

Create a .env file in the root directory.

Define the following environment variables in the .env file:
PORT=5000
NODE_ENV=development
JWT_SECRET=<your_jwt_secret_key>
OPENAI_API_KEY=<your_openai_api_key>

4. Start the development server:

   For the frontend:
   npm start
   For the backend:
   npm run server

5. Open your browser and visit http://localhost:3000 to access the Raket application.

## API Endpoints
The backend server provides the following API endpoints:

/api/players - CRUD operations for players
/api/playersAuth - Player authentication
/api/clubs - CRUD operations for clubs
/api/clubsAuth - Club authentication
/api/genders - CRUD operations for genders
/api/levels - CRUD operations for levels
/api/invites - CRUD operations for invites
/api/courts - CRUD operations for courts
/api/player-payments - CRUD operations for player payments
/api/player-cards - CRUD operations for player cards
/api/bookings - CRUD operations for bookings
/api/court-types - CRUD operations for court types
/api/indoor-outdoor - CRUD operations for indoor/outdoor

For detailed documentation about the API endpoints and their usage, refer to the respective router files in the backend directory.

## Contributing

Contributions to the Raket project are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request. Make sure to follow the existing code style and guidelines.
