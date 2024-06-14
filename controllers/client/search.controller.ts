import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import unidecode from "unidecode";

// [GET] /search/result
export const result = async (req: Request, res: Response) => {
  const keyword: string = `${req.query.keyword}`;

  const unidecodeText: string = unidecode(keyword);
  const keywordSlug = unidecodeText.replace(/\s+/g, "-");
  const keyWordSlugRegex = new RegExp(keywordSlug, "i");

  const keyWordRegex = new RegExp(keyword, "i");

  let songs = [];

  if(keyword) {
    songs = await Song.find({
      $or: [
        { slug: keyWordSlugRegex },
        { title: keyWordRegex }
      ],
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
  }

  res.render("client/pages/search/result", {
    pageTitle: `Kết quả: ${keyword}`,
    keyword: keyword,
    songs: songs
  });
};