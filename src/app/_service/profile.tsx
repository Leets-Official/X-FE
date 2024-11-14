import axios from "axios";

type UserProfile = {
  userId: number;
  isMyProfile: boolean;
  name: string;
  customId: string;
  followerCount: number | null;
  followingCount: number | null;
  isFollowing: boolean;
  createdAt: string;
  introduce: string;
  image: string;
};

export const fetchUserProfile = async (
  customId: string,
  myCustomId: string,
  userId: string,
  setProfileImageUrl: React.Dispatch<React.SetStateAction<string>>,
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>
) => {
  try {
    const accessToken =
      typeof window !== "undefined"
        ? localStorage.getItem("accesstoken")
        : null;

    console.log("profile.tsx", accessToken);

    const isMyProfile = customId === myCustomId;

    console.log("customId: ", customId);
    console.log("myCustomId: ", myCustomId);
    console.log("isMyProfile: ", isMyProfile);

    const targetUserId =
      isMyProfile && typeof window !== "undefined"
        ? localStorage.getItem("userId")
        : userId;

    if (!targetUserId || !accessToken) {
      console.log("userId 또는 accessToken이 없습니다.");
      return;
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile/${targetUserId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const imageUrl =
      response.data.data.profileImage?.url || "/default_profile_img.svg";
    setProfileImageUrl(imageUrl);

    const { data } = response.data;
    console.log("프로필 데이터를 조회 중: ", data);

    setUserProfile({
      userId: data.userId,
      isMyProfile: data.isMyProfile,
      name: data.name,
      customId: data.customId,
      followerCount: data.followerCount,
      followingCount: data.followingCount,
      isFollowing: data.isFollowing,
      createdAt: data.createdAt,
      introduce: data.introduce,
      image: imageUrl,
    });
  } catch (error) {
    console.error("유저 기본 프로필 조회에 오류가 생겼습니다:", error);
    alert("유저 기본 프로필 조회에 오류가 발생하였습니다.");
  }
};
