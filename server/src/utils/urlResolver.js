/**
 * URL Resolver Utility
 * Resolves shortened Google Maps links (maps.app.goo.gl) to their full versions.
 */
const resolveMapUrl = async (shortUrl) => {
  if (!shortUrl || !shortUrl.includes("maps.app.goo.gl")) {
    return shortUrl;
  }

  try {
    const response = await fetch(shortUrl, {
      method: "HEAD",
      redirect: "follow",
    });
    return response.url;
  } catch (error) {
    console.error("URL Resolution Failed:", error);
    return shortUrl; // Fallback to original
  }
};

module.exports = { resolveMapUrl };
