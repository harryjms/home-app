import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //@ts-expect-error
  res.json(await fetch(req.query.url).then((res) => res.status));
};
