import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    res.json(
      //@ts-expect-error
      await fetch(req.query.url, { signal: controller.signal }).then((res) => {
        clearTimeout(timeout);
        return res.status;
      })
    );
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};
