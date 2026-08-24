# Feedback Collector

## MongoDB Compass / Local MongoDB version

This version uses a **local MongoDB Server** instead of MongoDB Atlas.

> Important: MongoDB Compass is the graphical interface. The actual database service is **MongoDB Server**. Both can be installed on another computer, and Compass can connect to `mongodb://127.0.0.1:27017`.

### 1. Install MongoDB Server and MongoDB Compass
On the other computer, install:
- MongoDB Community Server
- MongoDB Compass

Start the MongoDB Server service.

### 2. Check the connection in Compass
In MongoDB Compass, connect using:

```text
mongodb://127.0.0.1:27017
```

The project database will be:

```text
feedback-collector
```

You do not need to manually create the database. MongoDB will create it when the first feedback is saved.

### 3. Run the backend

```bash
cd backend
npm install
npm start
```

Backend:

```text
http://localhost:5000
```

### 4. Run the frontend

Open another terminal:

```bash
cd frontend
npm install
npm start
```

Then open the frontend URL shown by the terminal (usually `http://localhost:3000`).

## Configuration

`backend/.env` contains:

```env
MONGO_URI=mongodb://127.0.0.1:27017/feedback-collector
PORT=5000
```

This means the project uses the MongoDB Server running on the current computer, which can be viewed/managed through MongoDB Compass.

## Important

Do not use a MongoDB Atlas `mongodb+srv://...` URI for this local version. If another computer is going to run the project, that computer needs its own MongoDB Server running locally.
