# Student Record System (Binary Search Tree Based)

A complete full-stack application for managing student records using a Binary Search Tree (BST) for efficient searching and sorted indexing.

## Features

- **BST Core**: Full implementation of a Binary Search Tree with Insert, Search, Delete, and Update operations.
- **FastAPI Backend**: Efficient Python backend handling tree logic and JSON persistence.
- **React Dashboard**: Modern, premium UI for managing records.
- **Visualizer**: Real-time graphical representation of the BST structure.
- **Statistics**: Dashboard showing total nodes, tree height, and leaf nodes.
- **Persistence**: Automatically saves and loads records from `storage.json`.

## Tech Stack

- **Backend**: Python 3, FastAPI, Uvicorn.
- **Frontend**: React, Vite, Axios, Lucide Icons.
- **Logic**: Custom Binary Search Tree implementation.

## Setup Instructions

### Backend Setup
1. Navigate to the project directory.
2. Ensure Python is installed.
3. Install dependencies:
   ```bash
   pip install fastapi uvicorn
   ```
4. Run the backend server:
   ```bash
   python backend/main.py
   ```
   The API will be available at `http://localhost:8000`.

### Frontend Setup
1. Open a new terminal.
2. Navigate to the `frontend` directory.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser to the local URL (usually `http://localhost:5173`).

## Project Structure

- `backend/`
  - `bst.py`: Student model and BST implementation.
  - `main.py`: FastAPI server and persistence logic.
  - `storage.json`: Persistent data storage.
  - `test_bst.py`: Unit tests for BST logic.
- `frontend/`
  - `src/components/`: UI components (Form, List, Visualizer, Stats).
  - `App.jsx`: Main application logic.
  - `App.css`: Premium design styles.

## BST Operations

For a detailed explanation of the BST algorithms used in this project, see [BST_OPERATIONS.md](./BST_OPERATIONS.md).
