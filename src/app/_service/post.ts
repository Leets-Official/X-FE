import axios from "axios";

const accessToken = localStorage.getItem("accesstoken");
// 전체 게시물 조회 (추천탭)
export const getAllPosts = async () => {
  try {
    // 토큰이 없으면 에러 처리
    if (!accessToken) {
      throw new Error("Access token is missing");
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/all`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("게시물 전체 조회", response.data.data);

    return response.data.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// 전체 게시물 조회 (팔로잉)
export const getFollowingPosts = async () => {
  try {
    // 토큰이 없으면 에러 처리
    if (!accessToken) {
      throw new Error("Access token is missing");
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/following`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("팔로잉 전체 조회", response.data.data);

    return response.data.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// 상세 게시물 조회
export const getPostDetails = async (postId: number) => {
  try {
    console.log("postId:", postId);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    // console.log('게시물 상세 조회',response.data.data);

    return response.data.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// 게시물 생성
export const createPost = async (content: string, file: File) => {
  try {
    // FormData 객체 생성
    const formData = new FormData();

    // postRequestDTO 추가 (JSON 형식)
    const postRequestDTO = {
      content: content,
    };
    formData.append("postRequestDTO", JSON.stringify(postRequestDTO));

    // 파일 추가
    formData.append("files", file);

    // API 요청
    const accessToken = localStorage.getItem("accesstoken");

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/post`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("게시물 생성 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("게시물 생성 실패:", error);
    throw error;
  }
};

export const postLiked = async (postId: number, isLikedByUser: boolean) => {
  try {
    console.log("postId:", postId);
    console.log("isLikedByUser: ", isLikedByUser);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error like: ", error);
    throw error;
  }
};

export const postDeleteLiked = async (
  postId: number,
  isLikedByUser: boolean
) => {
  try {
    console.log("postId: ", postId);
    console.log("isLikedByUser: ", isLikedByUser);

    const response = await axios.delete(
      `
      ${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/like`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error delete like: ", error);
    throw error;
  }
};
