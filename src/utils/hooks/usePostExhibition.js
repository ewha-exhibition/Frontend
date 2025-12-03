import usePostRequest from "./usePostRequest";

export default function usePostExhibition() {
  const { post, loading, error } = usePostRequest();

  const createExhibition = async ({ exhibition, club, images, token }) => {
    const url = "/exhibitions";

    const body = {
      exhibition,
      club,
      images,
    };

    return await post(url, body, token);
  };

  return { createExhibition, loading, error };
}
