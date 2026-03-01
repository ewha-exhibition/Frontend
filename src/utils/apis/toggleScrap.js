export const toggleScrap = async (fetchData, id, scraped) => {
  try {
    const method = scraped ? "DELETE" : "POST";
    const res = await fetchData({ url: `/scraps/${id}`, method });

    return res?.status >= 200 && res?.status < 300;
  } catch (e) {
    console.error(e);
    return false;
  }
};
