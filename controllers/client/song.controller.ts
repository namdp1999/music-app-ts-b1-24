import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favorite-song.model";

// [GET] /songs/:slugTopic
export const list = async (req: Request, res: Response) => {
  const slugTopic = req.params.slugTopic;

  const topic = await Topic.findOne({
    slug: slugTopic,
    deleted: false,
    status: "active"
  }).select("title");

  const songs = await Song.find({
    topicId: topic.id,
    deleted: false,
    status: "active"
  }).select("avatar title singerId like slug");

  for (const item of songs) {
    const singer = await Singer.findOne({
      _id: item.singerId,
      deleted: false
    }).select("fullName");

    item["singer"] = singer;
  }

  console.log(topic);
  console.log(songs);

  res.render("client/pages/songs/list", {
    pageTitle: topic.title,
    topic: topic,
    songs: songs
  });
};

// [GET] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
  const slugSong: string = req.params.slugSong;
  
  const song = await Song.findOne({
    slug: slugSong,
    deleted: false,
    status: "active"
  });

  const singer = await Singer.findOne({
    _id: song.singerId,
    deleted: false
  }).select("fullName");

  const topic = await Topic.findOne({
    _id: song.topicId,
    deleted: false
  }).select("title");

  const favoriteSong = await FavoriteSong.findOne({
    userId: "",
    songId: song.id
  });

  song["favorite"] = favoriteSong ? true : false;

  res.render("client/pages/songs/detail", {
    pageTitle: song.title,
    song: song,
    singer: singer,
    topic: topic
  });
};

// [PATCH] /songs/like/:status/:songId
export const like = async (req: Request, res: Response) => {
  const status = req.params.status;

  const song = await Song.findOne({
    _id: req.params.songId,
    deleted: false,
    status: "active"
  });

  const updateLike = status == "like" ? song.like + 1 : song.like - 1;

  await Song.updateOne({
    _id: req.params.songId,
    deleted: false,
    status: "active"
  }, {
    like: updateLike
  });

  res.json({
    code: 200,
    message: "Đã like",
    like: updateLike
  });
};

// [PATCH] /songs/favorite/:status/:songId
export const favorite = async (req: Request, res: Response) => {
  const status = req.params.status;
  const songId = req.params.songId;

  if(status == "favorite") {
    const favoriteSong = new FavoriteSong({
      userId: "",
      songId: songId
    });
    await favoriteSong.save();
  } else {
    await FavoriteSong.deleteOne({
      userId: "",
      songId: songId
    });
  }

  res.json({
    code: 200,
    message: status == "favorite" ? "Đã thêm vào yêu thích" : "Đã xóa yêu thích"
  });
};