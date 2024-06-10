import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

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

  res.render("client/pages/songs/detail", {
    pageTitle: song.title,
    song: song,
    singer: singer,
    topic: topic
  });
};