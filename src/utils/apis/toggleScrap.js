export const toggleScrap = async (fetchData, id, scraped) => {
  try {
    const method = scraped ? "DELETE" : "POST";
    const res = await fetchData(`/scraps/${id}`, method);

    console.log("res", res);

    return res?.status === 200;
  } catch (e) {
    console.error(e);
    return false;
  }
};
