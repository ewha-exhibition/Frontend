import usePostRequest from "./usePostRequest";

export default function usePostComment() {
  const { post, loading, error } = usePostRequest();

  const postComment = async ({ type, exhibitionId, content, token }) => {
    const endpointMap = {
      cheer: "cheers",
      question: "questions",
    };

    const endpoint = endpointMap[type];
    const url = `/${endpoint}/${exhibitionId}`;

    return await post(url, { content }, token);
  };

  return { postComment, loading, error };
}
