"use client";

import styled from "styled-components";
import PostForm from "./_component/PostForm";
import Tab from "./_component/Tab";
import Post from "../_component/Post";
import { getAllPosts, getFollowingPosts } from "@/_service/post";
import { useEffect, useState } from "react";

const StyledMain = styled.main`
  width: 600px;
  border-color: ${(props) => props.theme.linecolor};
  border-right-width: 1px;
  border-left-width: 1px;
  border-left-style: solid;
  border-right-style: solid;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  @media (min-width: 687px) {
    width: 600px;
  }

  @media (prefers-color-scheme: dark) {
    border-color: rgb(47, 51, 54);
  }
`;

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 
  const [tab, setTab] = useState<'rec' | 'fol'>('rec');

  useEffect(() => {
    const getPosts = async () => {
      let data;
      try {
        if(tab === 'rec'){
          data = await getAllPosts(); 
        }
        else{
          data = await getFollowingPosts(); 
        }
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [tab]);

  const refreshPosts = async () => {
    let data;
    try {
      if(tab === 'rec'){
        data = await getAllPosts(); 
      }
      else{
        data = await getFollowingPosts(); 
      }
      setPosts(data);
    } catch (error) {
      console.error('Error refreshing posts:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <StyledMain>
      <Tab tab={tab} setTab={setTab} /> 
      <PostForm refreshPosts={refreshPosts} />
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <Post key={index} post={post} />
        ))
      ) : (
        <div> </div>
      )}
    </StyledMain>
  );
}
