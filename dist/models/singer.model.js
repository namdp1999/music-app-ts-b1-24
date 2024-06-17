"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var singerSchema = new mongoose_1.default.Schema({
    fullName: String,
    avatar: String,
    status: String,
    slug: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
}, {
    timestamps: true,
});
var Singer = mongoose_1.default.model("Singer", singerSchema, "singers");
exports.default = Singer;
