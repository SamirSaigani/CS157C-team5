# Project Setup Instructions

## Environment Setup (as of 05/20/2024)

### Prerequisites
Ensure you have Node.js and npm installed on your machine. You can verify this by running `node -v` and `npm -v` in your terminal. If these are not installed, download and install them from [Node.js official website](https://nodejs.org/).

### Initial Setup
Follow these steps to set up the project environment:

1. **Clone the Repository**
    ```sh
    git clone <repository-url>
    ```

2. **Set Up Backend**
    - Navigate to the backend directory:
      ```sh
      cd backend
      ```
    - Install dependencies:
      ```sh
      npm install
      ```

3. **Set Up Frontend**
    - Navigate to the frontend directory:
      ```sh
      cd ../frontend
      ```
    - Install dependencies:
      ```sh
      npm install
      ```

### Set Up Redis
Before running the application, set up Redis on your machine using either Homebrew or Docker.

#### Using Homebrew:
1. Install Redis:
    ```sh
    brew install redis
    ```
2. Start Redis:
    ```sh
    brew services start redis
    ```

#### Using Docker:
1. Run the Redis container:
    ```sh
    docker run --name redis -d -p 6379:6379 redis
    ```

## Running the Application

### Backend Server

1. Open a new terminal.
2. Navigate to the backend directory:
    ```sh
    cd backend
    ```
3. Start the backend server with:
    ```sh
    npm start
    ```
4. Keep this terminal running as it hosts the backend on port 8080.

### Frontend Client

1. Open another terminal.
2. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```
3. Start the frontend client with:
    ```sh
    npm start
    ```
4. Keep this terminal running as it serves the frontend on port 3000.

Now, both your backend server and frontend client are running and can communicate with each other. Navigate to `http://localhost:3000` in your web browser to interact with the application.
