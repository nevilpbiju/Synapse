import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from "@tanstack/react-query";
import { createPost, createUserAccount, deletePost, getAnswers, getChat, getFriends, getFriends2, getFriendsRequests, getInbox, getInbox2, getPostById, getRecentPosts, getRecommendedPosts, getResultPosts, getUserById, getUserRecommendation, signInAccount, signOutAccount, updatePost, updateProfile } from "../appwrite/api";
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

export const useGetResultPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RESULT_POSTS],
    queryFn:() => getResultPosts(item),
  });
};

export const useGetRecommendedPosts = (domain) =>{
  return useQuery({
    queryKey: [QUERY_KEYS.GET_REC_POSTS, domain],
    queryFn: () => getRecommendedPosts(domain),
  });
};



export const useGetAnswers = (post) =>{
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ANSWERS, post],
    queryFn: () => getAnswers(post),
  });
}

export const useGetFriendRequests = (userId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_FRIENDS_REQUESTS, userId],
    queryFn: () => getFriendsRequests(userId),
  });
};

export const useGetUserRecommendation = (userId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_FRIENDS_REQUESTS, userId],
    queryFn: () => getUserRecommendation(userId),
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

export const useGetInbox = (userId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_INBOX, userId],
    queryFn: () => getInbox(userId),
  });
};

export const useGetInbox2 = (userId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_INBOX2, userId],
    queryFn: () => getInbox2(userId),
  });
};

export const useGetChat = (inbox) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CHAT, inbox],
    queryFn: () => getChat(inbox),
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

