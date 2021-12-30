import fetch from "node-fetch";
import cheerio from "cheerio";

const getIcon = async (url: string) => {
  try {
    const html = await fetch(url, { follow: 20 }).then((res) => res.text());
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
