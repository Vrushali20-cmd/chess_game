const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { Chess } = require("chess.js");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socket(server);

const chess = new Chess();
let players = {};

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", { title: "Chess Game" });
});

io.on("connection", function (uniquesocket) {
    console.log("connected:", uniquesocket.id);

    if (!players.white) {
        players.white = uniquesocket.id;
        uniquesocket.emit("playerRole", "w");
        console.log("White assigned:", uniquesocket.id);
    } else if (!players.black) {
        players.black = uniquesocket.id;
        uniquesocket.emit("playerRole", "b");
        console.log("Black assigned:", uniquesocket.id);
    } else {
        uniquesocket.emit("spectatorRole");
        console.log("Spectator:", uniquesocket.id);
    }

    uniquesocket.emit("boardState", chess.fen());

    uniquesocket.on("disconnect", function () {
        if (uniquesocket.id === players.white) {
            delete players.white;
            console.log("White disconnected");
        } else if (uniquesocket.id === players.black) {
            delete players.black;
            console.log("Black disconnected");
        }
    });

    uniquesocket.on("move", (move) => {
        console.log("Move received:", move, "| Turn:", chess.turn(), "| White:", players.white, "| Black:", players.black, "| This:", uniquesocket.id);

        if (chess.turn() === "w" && uniquesocket.id !== players.white) {
            console.log("BLOCKED - not white's turn");
            return;
        }
        if (chess.turn() === "b" && uniquesocket.id !== players.black) {
            console.log("BLOCKED - not black's turn");
            return;
        }

        try {
            const result = chess.move(move);
            if (result) {
                console.log("Move success:", result.san);
                io.emit("move", move);
                io.emit("boardState", chess.fen());
            } else {
                console.log("Invalid move:", move);
                uniquesocket.emit("invalidMove", move);
            }
        } catch (err) {
            console.log("Move error:", err.message);
            uniquesocket.emit("invalidMove", move);
        }
    });
});

server.listen(3000, function () {
    console.log("Listening on port 3000");
});