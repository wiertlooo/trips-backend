"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var authMiddleware = function (req, res, next) {
    var authHeader = req.headers["authorization"];
    var token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        console.log("Token not provided");
        return res.sendStatus(401);
    }
    var secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
        console.error("ACCESS_TOKEN_SECRET is not defined");
        return res.sendStatus(500);
    }
    jsonwebtoken_1.default.verify(token, secret, function (err, user) {
        if (err) {
            console.log("Token verification failed:", err);
            return res.sendStatus(403);
        }
        req.user = user;
        console.log("Middleware User:", req.user); // Dodaj logowanie użytkownika
        next();
    });
};
exports.authMiddleware = authMiddleware;
