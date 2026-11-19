# React + Vite

## Getting Started

### Prerequisites

Make sure you have **Node.js** (v18+ recommended) and **npm** installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/guer0157/sticky-notes-app.git
   cd sticky-notes-app
   ```

2. Install dependecies:
   ```bash
   npm install
   ```
3. Start the project:
   ```bash
   npm run dev
   ```

# Assumptions

- Only one user at a time
- There is no need to resize the board size
-

# Architechture

Lifted state architecture was used to ensure there's a single source of truth from which all NOTE states and actions like "Drag" or "Resize" is handles. Rather than passing data up and downt he tree. "App.tsx" passed note data and event callbacks to NoteBoard and Note components using functional state setters to overrite stale state.

React "refs" were used to avoid unecessary re-renders while keeping track of properties such as note ids and coordinated, this allowed me to have them readily available to make the necessary calculations for dragOffset, Drag, and resize.

The Note component focuses on styling and dynamic rendering of the properties passed by its parent component. It features isolated hit tarjets, renders position data passed down from App such as y and y coordinates as well as width and height.
