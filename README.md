# Policy Holder Relationship System

This project is a React application that visualizes policy holder relationships in a tree structure. It allows users to search for policy holders, view their relationships, and navigate through the hierarchy.

## Features

- Search for policy holders by their code
- Display policy holder information in a tree structure
- Navigate up and down the hierarchy

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- pnpm (v6 or later)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/kakapo1933/customer-binary-tree.git
   cd policy-holder-app
   ```

2. Install the dependencies:
   ```
   pnpm install
   ```

## Running the Application

1. Start the mock API server:
   ```
   pnpm run start:mock
   ```
   This will start the JSON server on port 3001.

2. In a new terminal, start the development server:
   ```
   pnpm run dev
   ```
   This will start the Vite development server.

3. Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

## Building for Production

Currently, this project is not configured for production builds. The application is intended for development and demonstration purposes only. If you need to deploy this application in a production environment, additional steps and configurations would be required, including:

- Setting up proper API endpoints
- Implementing security measures
- Optimizing performance
- Configuring a production-ready server

For now, please use the development server as described in the "Running the Application" section above.

## Known Limitations

- This application is a prototype and is not suitable for production use.
- The mock API server is for demonstration purposes only and does not represent a real backend.
- Performance may be limited when dealing with large datasets.

## Future Improvements

- Implement a production-ready backend API
- Add user authentication and authorization
- Optimize tree rendering for large hierarchies
- Implement caching mechanisms for improved performance
- Add more detailed policy holder information and interactions
