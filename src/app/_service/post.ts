import axios from 'axios';

const accessToken = localStorage.getItem('accesstoken');
// 전체 게시물 조회 (추천탭)
export const getAllPosts = async () => {
  try {

    // 토큰이 없으면 에러 처리
    if (!accessToken) {
      throw new Error('Access token is missing');
    }

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/all`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('게시물 전체 조회',response.data.data);

    return response.data.data; 
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error; 
  }
};

// 상세 게시물 조회
export const getPostDetails = async ( postId : number ) =>{
  try{
    console.log('postId:',postId);
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}`,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });
    console.log('게시물 상세 조회',response.data.data);

    return response.data.data; 
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error; 
  }
}