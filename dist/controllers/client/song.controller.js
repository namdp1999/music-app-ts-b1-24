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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listenPatch = exports.favorite = exports.favoritePatch = exports.like = exports.detail = exports.list = void 0;
var topic_model_1 = __importDefault(require("../../models/topic.model"));
var song_model_1 = __importDefault(require("../../models/song.model"));
var singer_model_1 = __importDefault(require("../../models/singer.model"));
var favorite_song_model_1 = __importDefault(require("../../models/favorite-song.model"));
// [GET] /songs/:slugTopic
var list = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var slugTopic, topic, songs, _i, songs_1, item, singer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                slugTopic = req.params.slugTopic;
                return [4 /*yield*/, topic_model_1.default.findOne({
                        slug: slugTopic,
                        deleted: false,
                        status: "active"
                    }).select("title")];
            case 1:
                topic = _a.sent();
                return [4 /*yield*/, song_model_1.default.find({
                        topicId: topic.id,
                        deleted: false,
                        status: "active"
                    }).select("avatar title singerId like slug")];
            case 2:
                songs = _a.sent();
                _i = 0, songs_1 = songs;
                _a.label = 3;
            case 3:
                if (!(_i < songs_1.length)) return [3 /*break*/, 6];
                item = songs_1[_i];
                return [4 /*yield*/, singer_model_1.default.findOne({
                        _id: item.singerId,
                        deleted: false
                    }).select("fullName")];
            case 4:
                singer = _a.sent();
                item["singer"] = singer;
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6:
                console.log(topic);
                console.log(songs);
                res.render("client/pages/songs/list", {
                    pageTitle: topic.title,
                    topic: topic,
                    songs: songs
                });
                return [2 /*return*/];
        }
    });
}); };
exports.list = list;
// [GET] /songs/detail/:slugSong
var detail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var slugSong, song, singer, topic, favoriteSong;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                slugSong = req.params.slugSong;
                return [4 /*yield*/, song_model_1.default.findOne({
                        slug: slugSong,
                        deleted: false,
                        status: "active"
                    })];
            case 1:
                song = _a.sent();
                return [4 /*yield*/, singer_model_1.default.findOne({
                        _id: song.singerId,
                        deleted: false
                    }).select("fullName")];
            case 2:
                singer = _a.sent();
                return [4 /*yield*/, topic_model_1.default.findOne({
                        _id: song.topicId,
                        deleted: false
                    }).select("title")];
            case 3:
                topic = _a.sent();
                return [4 /*yield*/, favorite_song_model_1.default.findOne({
                        userId: "",
                        songId: song.id
                    })];
            case 4:
                favoriteSong = _a.sent();
                song["favorite"] = favoriteSong ? true : false;
                res.render("client/pages/songs/detail", {
                    pageTitle: song.title,
                    song: song,
                    singer: singer,
                    topic: topic
                });
                return [2 /*return*/];
        }
    });
}); };
exports.detail = detail;
// [PATCH] /songs/like/:status/:songId
var like = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var status, song, updateLike;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                status = req.params.status;
                return [4 /*yield*/, song_model_1.default.findOne({
                        _id: req.params.songId,
                        deleted: false,
                        status: "active"
                    })];
            case 1:
                song = _a.sent();
                updateLike = status == "like" ? song.like + 1 : song.like - 1;
                return [4 /*yield*/, song_model_1.default.updateOne({
                        _id: req.params.songId,
                        deleted: false,
                        status: "active"
                    }, {
                        like: updateLike
                    })];
            case 2:
                _a.sent();
                res.json({
                    code: 200,
                    message: "Đã like",
                    like: updateLike
                });
                return [2 /*return*/];
        }
    });
}); };
exports.like = like;
// [PATCH] /songs/favorite/:status/:songId
var favoritePatch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var status, songId, favoriteSong;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                status = req.params.status;
                songId = req.params.songId;
                if (!(status == "favorite")) return [3 /*break*/, 2];
                favoriteSong = new favorite_song_model_1.default({
                    userId: "",
                    songId: songId
                });
                return [4 /*yield*/, favoriteSong.save()];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, favorite_song_model_1.default.deleteOne({
                    userId: "",
                    songId: songId
                })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                res.json({
                    code: 200,
                    message: status == "favorite" ? "Đã thêm vào yêu thích" : "Đã xóa yêu thích"
                });
                return [2 /*return*/];
        }
    });
}); };
exports.favoritePatch = favoritePatch;
// [GET] /songs/favorite
var favorite = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var favoriteSongs, _i, favoriteSongs_1, item, song, singer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, favorite_song_model_1.default.find({
                    userId: ""
                })];
            case 1:
                favoriteSongs = _a.sent();
                _i = 0, favoriteSongs_1 = favoriteSongs;
                _a.label = 2;
            case 2:
                if (!(_i < favoriteSongs_1.length)) return [3 /*break*/, 6];
                item = favoriteSongs_1[_i];
                return [4 /*yield*/, song_model_1.default.findOne({
                        _id: item.songId
                    }).select("avatar title slug singerId")];
            case 3:
                song = _a.sent();
                return [4 /*yield*/, singer_model_1.default.findOne({
                        _id: song.singerId
                    }).select("fullName")];
            case 4:
                singer = _a.sent();
                item["song"] = song;
                item["singer"] = singer;
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 2];
            case 6:
                res.render("client/pages/songs/favorite", {
                    pageTitle: "Yêu thích",
                    favoriteSongs: favoriteSongs
                });
                return [2 /*return*/];
        }
    });
}); };
exports.favorite = favorite;
// [PATCH] /listen/:songId
var listenPatch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var songId, song, listenUpdate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                songId = req.params.songId;
                return [4 /*yield*/, song_model_1.default.findOne({
                        _id: songId,
                        status: "active",
                        deleted: false
                    })];
            case 1:
                song = _a.sent();
                listenUpdate = song.listen + 1;
                return [4 /*yield*/, song_model_1.default.updateOne({
                        _id: songId,
                        status: "active",
                        deleted: false
                    }, {
                        listen: listenUpdate
                    })];
            case 2:
                _a.sent();
                res.json({
                    code: 200,
                    message: "Đã cập nhật số lượt nghe!",
                    listen: listenUpdate
                });
                return [2 /*return*/];
        }
    });
}); };
exports.listenPatch = listenPatch;
