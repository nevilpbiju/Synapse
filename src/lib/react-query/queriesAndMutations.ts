import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from "@tanstack/react-query";
import { createPost, createUserAccount, deletePost, getFriends, getFriends2, getFriendsRequests, getPostById, getRecentPosts, getUserById, signInAccount, signOutAccount, updatePost, updateProfile } from "../appwrite/api";
import { INewPost, INewQuery, INewUser, IUpdateQuery, IUpdateUser } from "../../types";
import { QUERY_KEYS } from "./queryKeys";
import { profile } from "console";


export const useCreateUserAccount = () =>{
    return useMutation({
         mutationFn: (user: INewUser) => createUserAccount(user),
    });
};

export const useSignInAccount = () =>{
    return useMutation({
         mutationFn: (user: {
            email: string;
            password: string;
         }) => signInAccount(user),
    });
};

export const useSignOutAccount = () => {
    return useMutation({
      mutationFn: signOutAccount,
    });
  };


export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewQuery) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
};

export const useGetFriendRequests = (userId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_FRIENDS_REQUESTS, userId],
    queryFn: () => getFriendsRequests(userId),
  });
};


export const useGetFriends = (userId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_FRIENDS, userId],
    queryFn: () => getFriends(userId),
  });
};

export const useGetFriends2 = (userId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_FRIENDS2, userId],
    queryFn: () => getFriends2(userId),
  });
};



export const useGetPostById = (queryId: string)=>{
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, queryId],
     queryFn: ()=> getPostById(queryId),
     enabled: !!queryId
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: IUpdateQuery) => updatePost(post),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({postId }: { postId?: string}) =>
      deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};


export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
};

export const useUpdateProfile= () =>{
  const queryClient = useQueryClient();
  // console.log(profile);
  return useMutation({
    mutationFn: (profile: IUpdateUser) => updateProfile(profile),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id],
      });
    },
  });
}