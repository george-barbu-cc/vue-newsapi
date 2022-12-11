const cors = import.meta.env.VITE_CORS_HEADER ?? "";
const url = `${cors}https://newsapi.org/v2/everything`;

export async function searchPosts(term, pageSize, page) {
  const data = await fetch(
    `${url}?q=${term ?? "news"}&pageSize=${pageSize ?? 10}&page=${page ?? 1}`,
    {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "X-Api-Key": `${import.meta.env.VITE_NEWSAPI_KEY}`,
      },
    }
  )
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });

  return data;
}
