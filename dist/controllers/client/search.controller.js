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
exports.result = void 0;
var song_model_1 = __importDefault(require("../../models/song.model"));
var singer_model_1 = __importDefault(require("../../models/singer.model"));
var unidecode_1 = __importDefault(require("unidecode"));
// [GET] /search/:type
var result = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var type, keyword, unidecodeText, keywordSlug, keyWordSlugRegex, keyWordRegex, songsDetail, songs, _i, songs_1, item, singer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                type = req.params.type;
                keyword = "".concat(req.query.keyword);
                unidecodeText = (0, unidecode_1.default)(keyword);
                keywordSlug = unidecodeText.replace(/\s+/g, "-");
                keyWordSlugRegex = new RegExp(keywordSlug, "i");
                keyWordRegex = new RegExp(keyword, "i");
                songsDetail = [];
                if (!keyword) return [3 /*break*/, 5];
                return [4 /*yield*/, song_model_1.default.find({
                        $or: [
                            { slug: keyWordSlugRegex },
                            { title: keyWordRegex }
                        ],
                        deleted: false,
                        status: "active"
                    }).select("avatar title singerId like slug")];
            case 1:
                songs = _a.sent();
                _i = 0, songs_1 = songs;
                _a.label = 2;
            case 2:
                if (!(_i < songs_1.length)) return [3 /*break*/, 5];
                item = songs_1[_i];
                return [4 /*yield*/, singer_model_1.default.findOne({
                        _id: item.singerId,
                        deleted: false
                    }).select("fullName")];
            case 3:
                singer = _a.sent();
                songsDetail.push({
                    id: item.id,
                    avatar: item.avatar,
                    title: item.title,
                    like: item.like,
                    slug: item.slug,
                    singer: {
                        fullName: singer.fullName
                    },
                });
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                if (type == "result") {
                    res.render("client/pages/search/result", {
                        pageTitle: "K\u1EBFt qu\u1EA3: ".concat(keyword),
                        keyword: keyword,
                        songs: songsDetail
                    });
                }
                else {
                    res.json({
                        code: 200,
                        songs: songsDetail
                    });
                }
                return [2 /*return*/];
        }
    });
}); };
exports.result = result;
