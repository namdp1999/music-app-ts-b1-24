"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var favoriteSongSchema = new mongoose_1.default.Schema({
    userId: String,
    songId: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
}, {
    timestamps: true,
});
var FavoriteSong = mongoose_1.default.model("FavoriteSong", favoriteSongSchema, "favorite-songs");
exports.default = FavoriteSong;
