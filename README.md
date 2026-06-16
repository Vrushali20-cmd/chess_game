# ♟️ Real-Time Multiplayer Chess

A real-time multiplayer chess game built with Node.js, Socket.io, and Chess.js — play with a friend in your browser!

---

## 🚀 Features

- ♟️ Real-time multiplayer — two players can play against each other live
- 🔄 Board flips automatically for black player
- 👀 Spectator mode — extra connections can watch the game
- ✅ Valid move enforcement — illegal moves are rejected
- 🎯 Drag and drop pieces

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Backend runtime |
| Express.js | Web server |
| Socket.io | Real-time communication |
| Chess.js | Chess logic & move validation |
| EJS | HTML templating |
| Tailwind CSS | Styling |

---

## 📦 Installation & Setup

### 1. Clone the repo
```bash
git clone https://github.com/Vrushali20-cmd/chess-game.git
cd chess-game
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the server
```bash
node app.js
```

### 4. Open in browser
```
http://localhost:3000
```

---

## 🎮 How to Play

1. Open `localhost:3000` in **one tab** → you become **White**
2. Open `localhost:3000` in **another tab** → you become **Black**
3. White always moves first
4. Drag and drop pieces to make moves
5. Any additional tabs become **Spectators**

---

## 📁 Project Structure

```
chess/
├── public/
│   └── js/
│       └── chessgame.js      # Client-side chess logic
├── views/
│   └── index.ejs             # Main HTML template
├── app.js                    # Server + Socket.io logic
├── package.json
└── README.md
```

---

## 👨‍💻 Author

**Vrushali** — [GitHub](https://github.com/Vrushali20-cmd)
