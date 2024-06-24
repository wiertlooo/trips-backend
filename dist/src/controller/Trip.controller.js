"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripRouter = void 0;
var express_1 = require("express");
var service_1 = require("../service");
var authMiddleware_1 = require("../middleware/authMiddleware");
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
exports.tripRouter = (0, express_1.Router)();
exports.tripRouter.get("/", authMiddleware_1.authMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var trips, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("Request User in GET /trips:", req.user); // Dodaj logowanie użytkownika
                return [4 /*yield*/, prisma.trip.findMany({
                        where: { creatorId: req.user.userId },
                    })];
            case 1:
                trips = _a.sent();
                res.json(trips);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({ error: "Failed to fetch trips" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//get trip by id
exports.tripRouter.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, trip;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = +req.params.id;
                return [4 /*yield*/, service_1.tripService.getTripById(id)];
            case 1:
                trip = _a.sent();
                res.json(trip);
                return [2 /*return*/];
        }
    });
}); });
//get userposts endpoints
exports.tripRouter.get("/user/:userId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, trips;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = +req.user.userId;
                return [4 /*yield*/, service_1.tripService.getTripsByUserId(userId)];
            case 1:
                trips = _a.sent();
                res.json(trips);
                return [2 /*return*/];
        }
    });
}); });
//create new trip endpoint
exports.tripRouter.post("/", authMiddleware_1.authMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, description, creatorId, newTrip, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, description = _a.description;
                console.log("Request User in POST /trips:", req.user); // Dodaj logowanie użytkownika
                creatorId = req.user.userId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, service_1.tripService.createTrip({
                        title: title,
                        description: description,
                        creatorId: creatorId,
                    })];
            case 2:
                newTrip = _b.sent();
                res.status(201).json(newTrip);
                return [3 /*break*/, 4];
            case 3:
                e_1 = _b.sent();
                res.status(500).json({ error: "Failed to create trip" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//add new photo to a trip
exports.tripRouter.post("/:id/photos", authMiddleware_1.authMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tripId, url, userId, newPhoto, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tripId = parseInt(req.params.id, 10);
                url = req.body.url;
                userId = req.user.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, service_1.tripService.addPhoto({ tripId: tripId, userId: userId, url: url })];
            case 2:
                newPhoto = _a.sent();
                res.status(201).json(newPhoto);
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                res.status(500).json({ error: e_2.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//delete existing photo by photoId
exports.tripRouter.delete("/:tripId/photos/:photoId", authMiddleware_1.authMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tripId, photoId, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tripId = parseInt(req.params.tripId, 10);
                photoId = parseInt(req.params.photoId, 10);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, service_1.tripService.removePhoto(tripId, photoId)];
            case 2:
                _a.sent();
                res.status(204).send();
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                res.status(500).json({ error: e_3.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//update trip description
exports.tripRouter.patch("/:id", authMiddleware_1.authMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tripId, description, updatedTrip, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tripId = parseInt(req.params.id, 10);
                description = req.body.description;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, service_1.tripService.updateDescription(tripId, description)];
            case 2:
                updatedTrip = _a.sent();
                res.status(200).json(updatedTrip);
                return [3 /*break*/, 4];
            case 3:
                e_4 = _a.sent();
                res.status(500).json({ error: e_4.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//add new comment to a trip
exports.tripRouter.post("/:id/comments", authMiddleware_1.authMiddleware, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tripId, content, userId, newComment, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tripId = parseInt(req.params.id, 10);
                content = req.body.content;
                userId = req.user.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, service_1.tripService.addComment({
                        tripId: tripId,
                        userId: userId,
                        content: content,
                    })];
            case 2:
                newComment = _a.sent();
                res.status(201).json(newComment);
                return [3 /*break*/, 4];
            case 3:
                e_5 = _a.sent();
                res.status(500).json({ error: e_5.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
