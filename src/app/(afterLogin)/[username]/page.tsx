//username의 page
"use client";

import {
  Main,
  BackgroundImage,
  Header,
  HeaderTitle,
  UserZone,
  ProfileHeader,
  UserImage,
  UserName,
  Nickname,
  UserId,
  Message,
  FollowButton,
  PostList,
  UserStats,
  EditProfileButton,
  StatButton,
  BoldText,
  Divider,
  ButtonGroup,
  MessageButton,
} from "./styles";
import BackButton from "../_component/BackButton";
import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";
import Post from "../_component/Post";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { followUser, unfollowUser } from "./api/follow";
import { getFollowingPosts } from "@/_service/post";
import MessageIcon from "../../../../public/ic_message.svg";

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

export default function Profile() {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    userId: 0,
    isMyProfile: false,
    name: "",
    customId: "",
    followerCount: 0,
    followingCount: 0,
    isFollowing: false,
    createdAt: "",
    introduce: "",
    image: "",
  });

  const [error, setError] = useState<string | null>(null);

  //const [userId, setUserId] = useState("");

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const accessToken = localStorage.getItem("accesstoken") || "";

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getFollowingPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false); // API 요청이 완료되면 loading 상태를 false로 변경
      }
    };

    if (loading) {
      getPosts();
    }
  }, [loading]); // loading 상태에 의존하여 다시 호출되지 않도록 수정

  const params = useParams();
  const customId = params.username;
  console.log("커스텀 아이디", customId);
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");

  const fetchUserProfile = async () => {
    try {
      // console.log("커아",customId,"내아",localStorage.getItem("customId"));

      if (!customId || !accessToken) {
        console.log(
          `userId:${customId} 또는 accessToken:${accessToken}이 없습니다.`
        );
        return;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile/${customId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const { data } = response.data;

      // 프로필 이미지 URL 설정
      const imageUrl = data.profileImage?.url || "/default_profile_img.svg";
      setProfileImageUrl(imageUrl);

      // `setUserProfile`에 객체 전달
      setUserProfile({
        userId: data.userId,
        isMyProfile: data.isMyProfile,
        name: data.name,
        customId: data.customId,
        followerCount: data.followerCount || 0,
        followingCount: data.followingCount || 0,
        isFollowing: data.isFollowing,
        createdAt: data.createdAt,
        introduce: data.introduce || "소개가 없습니다.",
        image: imageUrl,
      });
    } catch (error) {
      console.log("유저 기본 프로필 조회에 오류가 생겼습니다.", error);
      setError("유저 기본 프로필 조회에 오류가 발생하였습니다.");
      console.log(error);
    }
  };

  console.log("imageUrl: ", profileImageUrl);

  const user = {
    // image: "/default_profile_img.svg",
    backgroundImage: "/backgroundImage.jpg",
  };

  const router = useRouter();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const onClickFollow = async () => {
    if (!userProfile || !userProfile.userId) {
      console.log("userProfile 또는 userProfile.userId가 없습니다.");
      return;
    }

    const result = userProfile.isFollowing
      ? await unfollowUser(userProfile.userId.toString(), accessToken)
      : await followUser(userProfile.userId.toString(), accessToken);

    if (result.success) {
      setUserProfile((prevProfile) => ({
        ...prevProfile,
        isFollowing: !prevProfile.isFollowing,
        followerCount: prevProfile.isFollowing
          ? (prevProfile.followerCount ?? 0) - 1
          : (prevProfile.followerCount ?? 0) + 1,
      }));
      alert(result.message);
    } else {
      const { errorCode, errorMessage } = result;
      if (errorCode === 404) {
        alert("존재하지 않는 유저입니다.");
      } else if (errorCode === 400) {
        alert(errorMessage || "요청에 오류가 발생했습니다.");
      } else {
        alert(errorMessage || "알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const onClickFollowing = () => {
    router.push(`/${userProfile.customId}/following`);
  };

  const onClickFollowers = () => {
    router.push(`/${userProfile.customId}/followers`);
  };

  const onEditProfile = () => {
    router.push(`/settings/profile`);
  };

  return (
    <TabProvider>
      <Main>
        <Header>
          <BackButton />
          <HeaderTitle>{userProfile?.name}</HeaderTitle>
        </Header>
        <BackgroundImage src={user.backgroundImage} alt="Background Image" />
        <UserZone>
          <ProfileHeader>
            <UserImage>
              <img src={profileImageUrl} alt={userProfile?.image} />
            </UserImage>
            {userProfile?.isMyProfile ? (
              <EditProfileButton onClick={onEditProfile}>
                Edit profile
              </EditProfileButton>
            ) : (
              <ButtonGroup>
                <MessageButton>
                  <MessageIcon />
                </MessageButton>
                <FollowButton onClick={onClickFollow}>
                  {userProfile?.isFollowing ? "Unfollow" : "Follow"}
                </FollowButton>
              </ButtonGroup>
            )}
          </ProfileHeader>
          <UserName>
            <Nickname>{userProfile?.name}</Nickname>
            <UserId>@{userProfile?.customId}</UserId>
          </UserName>
          <Message>{userProfile?.introduce}</Message>
          <UserStats>
            <StatButton onClick={onClickFollowing}>
              <BoldText>{userProfile?.followingCount}</BoldText> Following
            </StatButton>
            <StatButton onClick={onClickFollowers}>
              <BoldText>{userProfile?.followerCount}</BoldText> Followers
            </StatButton>
          </UserStats>
        </UserZone>
        <Tab />
        <Divider />
        <PostList>
          {posts.length > 0 ? (
            posts.map((post, index) => <Post key={index} post={post} />)
          ) : (
            <div> </div>
          )}
        </PostList>
      </Main>
    </TabProvider>
  );
}
