"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var topic_route_1 = require("./topic.route");
var song_route_1 = require("./song.route");
var search_route_1 = require("./search.route");
var clientRoutes = function (app) {
    app.use("/topics", topic_route_1.topicRoutes);
    app.use("/songs", song_route_1.songRoutes);
    app.use("/search", search_route_1.searchRoutes);
};
exports.default = clientRoutes;
