import fetch from "node-fetch";
import cheerio from "cheerio";

const getIcon = async (url: string) => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const html = await fetch(url, {
      follow: 20,
      signal: controller.signal,
    }).then((res) => {
      clearTimeout(timeout);
      return res.text();
    });
    const $ = cheerio.load(html);
    const iconEl = $(
      "link[rel='apple-touch-icon'], link[rel='apple-touch-icon-precomposed']"
    );
    const cleanURL = url.split("/");
    if (iconEl.length > 0) {
      let result = "";
      if (Array.isArray(iconEl)) {
        result = $($(iconEl)[0]).attr("href");
      }
      result = $($(iconEl)).attr("href");
      if (result.indexOf("/") !== 0) result = "/" + result;
      return cleanURL[0] + "//" + cleanURL[2] + result;
    }

    return null;
  } catch (err) {
    console.error(err);
  }
};

export default getIcon;
