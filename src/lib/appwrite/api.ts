import { ID, Models, Query } from "appwrite";
import { INewPost, INewQuery, INewUser, IUpdateQuery, IUpdateUser } from "../../types";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
import { error } from "console";
import { showCaption } from "../utils";

export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
          ID.unique(),
          user.email,
          user.password,
          user.name
        );
    
        if (!newAccount) throw Error;
    
        const avatarUrl = avatars.getInitials(user.name);
    
        const newUser = await saveUserToDB({
          accountId: newAccount.$id,
          name: newAccount.name,
          email: newAccount.email,
          username: user.username,
          imageUrl: avatarUrl,
        });
    
        return newUser;
      } catch (error) {
        console.log(error);
        return error;
      }
  }

export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) {
  try {
    const newUser = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.userCollectionId, ID.unique(), user);
    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);

    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
 
    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current");
    sessionStorage.clear();
    return session;
  } catch (error) {
    console.log(error);
  }
}


export async function createPost(post: INewQuery) {
  try {
    // Convert tags into array
    const domain = post.domain?.replace(/ /g, "").split(",") || [];
    console.log(post);
    const content = post.content+'$#0&'+post.domain;

    // Create post
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.questionCollectionId,
      ID.unique(),
      {
        creator: post.UserID,
        caption: content,
        tags: domain,
        timestamp: post.timestamp,
      }
    );

    if (!newPost) {
      throw Error;
    }
    console.log(newPost);
    return newPost;
  } catch (error) {
    console.log(error);
  }
}

export async function getRecentPosts() {
  const posts = await databases.listDocuments(
    appwriteConfig.databaseId, 
    appwriteConfig.questionCollectionId,
    [Query.orderDesc('$createdAt'),Query.limit(20)]
  )

  if(!posts) throw Error;

  return posts;
}

export async function getResultPosts(item) {
  const posts = await databases.listDocuments(
    appwriteConfig.databaseId, 
    appwriteConfig.questionCollectionId,
    [Query.orderDesc('$createdAt'),Query.limit(30),Query.search('caption', item)]
  )

  if(!posts) throw Error;

  return posts;
}

export async function getRecommendedPosts(domain) {
  if(!domain){
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId, 
      appwriteConfig.questionCollectionId,
      [Query.orderDesc('$createdAt'),Query.limit(20)]
    )
    if(!posts) throw Error;
    return posts.documents;

  }else{
    const domains=domain.split(',');
    let posts;
    for (const element of domains){
      let post = await databases.listDocuments(
        appwriteConfig.databaseId, 
        appwriteConfig.questionCollectionId,
        [Query.orderDesc('$createdAt'),Query.search('caption', element)]
      )
      if(!posts){
        posts=post.documents;
      }
      console.log(posts);
      posts=posts.concat(post.documents);
    }
    
    if(!posts) throw Error;
    return posts;
  }


}

export async function getAnswers(post:string) {
  const answers = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.answerCollectionId,
    [Query.orderDesc('$createdAt'), Query.equal('postBy', post)]
  )
  if (!answers) throw Error;
  return answers;
}

export async function getFriendsRequests(user) {
  const requests= await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.networkCollectionId,
    [Query.equal('receiverId', user), Query.equal('Accepted', false)]
  )

  if(!requests) throw Error;

  return requests;
}

export async function getFriends(user) {
  console.log("G1"+user);
  const results= await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.networkCollectionId,
    [Query.equal('receiverId', user), Query.equal('Accepted', true)]
  )

  if(!results) throw Error;

  return results;
}

export async function getFriends2(user) {
  console.log("G2"+user);
  const results2= await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.networkCollectionId,
    [Query.equal('senderId', user), Query.equal('Accepted', true)]
  )

  if(!results2) throw Error;
  console.log("result"+results2);
  return results2;
}

export async function getInbox(user) {
  const results= await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.inboxCollectionId,
    [Query.equal('User1', user), Query.orderDesc('$updatedAt')]
  )
  console.log("user1=user");
  console.log(results.documents);
  return results;
}

export async function getInbox2(user) {
  const results2= await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.inboxCollectionId,
    [Query.equal('User2', user), Query.orderDesc('$updatedAt')]
  )

  console.log("user2=user");
  console.log(results2.documents);
  return results2;
}

export async function getChat(inbox) {
  const chats= await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.chatCollectionId,
    [Query.equal('inboxId', inbox)]
  )
  console.log(chats.documents);
  return chats;
}

export async function useSendChat(message, sender, receiver, inbox) {
  try{
    const chatStat= await databases.createDocument(
      appwriteConfig.databaseId,
        appwriteConfig.chatCollectionId,
        ID.unique(),
        {
          senderId: sender,
          recieverId: receiver,
          message: message,
          inbox: inbox,
          inboxId: inbox
        }
    )
    console.log(chatStat);
    return chatStat;
    
  }catch(error){
    console.log(error);
    
  } 
}

export async function userCreateInbox(u1, u2) {
  try{const res3 = await databases.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.inboxCollectionId,
    ID.unique(),{
      User1: u1,
      User2: u2,
      users1: u1,
      users2: u2,
    }
  )
  return res3;}
  catch(error){
    console.log(error);
  }
}

export async function useCheckInbox(u2, u1){
  try{
    const res = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.inboxCollectionId,
      [Query.equal('User1',u1), Query.equal('User2', u2)]
    )
    console.log("inbox return")
    if (res.documents.length==0){
      console.log(res.documents);
      const res2 = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.inboxCollectionId,
        [Query.equal('User1',u2), Query.equal('User2', u1)]
      )
      if(res2.documents.length!=0){
        console.log("return 2");
        return res2.documents.at(0);
      }else{
        console.log("Nothing to return");
      }
    }
    return res.documents.at(0);
  }catch(error){
    console.log(error);
  }
  
}

export async function useUpdateVotes(post, likes){
  try{
    const res = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.questionCollectionId,
      post,
      {
        likes: likes
      }
    );
    return res;
  }
  catch(error){
    console.log(error);
    
  }

}

export async function useUpdateAnsVotes(post, likes){
  try{
    const res = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.answerCollectionId,
      post,
      {
        likes: likes
      }
    );
    return res;
  }
  catch(error){
    console.log(error);
    
  }

}

export async function useUpdatePoints(user, points){
  try{
    const res = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      user,
      {
        points: points
      }
    );
    return res;
  }
  catch(error){
    console.log(error);
    
  }

}


// export async function useGetFriendRequests(user) {
//   const requests= await databases.listDocuments(
//     appwriteConfig.databaseId,
//     appwriteConfig.networkCollectionId,
//     [Query.equal('receiverId', user)]
//   )
//   return requests;
// }

// export async function getConnections() {
//   const posts = await databases.listDocuments(
//     appwriteConfig.databaseId, 
//     appwriteConfig.questionCollectionId,
//     [Query.select([Accepted], )]
//   )

//   if(!posts) throw Error;

//   return posts;
// }

export async function getPostById(queryId:string) {
  try{
    const query = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.questionCollectionId,
      queryId
    )
    console.log(query);
    return query;
  } catch(error){
    console.log(error);
  }
}

export async function updatePost(post: IUpdateQuery) {
  try {
    // Convert tags into array
    const domain = post.domain?.replace(/ /g, "").split(",") || [];
    const content = showCaption(post.content)+'$#0&'+post.domain;
    // Create post
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.questionCollectionId,
      post.queryId,
      {
        caption: content,
        tags: domain,
      }
    );

    if (!updatedPost) {
      throw Error;
    }

    return updatedPost || null;
  } catch (error) {
    console.log(error);
  }
}

export async function deletePost(postId?:string) {
   if (!postId) throw Error;
   try{
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.questionCollectionId,
      postId
    )
    return { status: 'ok'}
   }  catch(error){
    console.log(error);
   }
}

export async function getUserById(userId: string) {
  try {
    const user = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId
    );

    if (!user) throw Error;
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchReplies(post: string){
  try{
    console.log(post);
    const replies = await databases.listDocuments(
      appwriteConfig.databaseId, 
      appwriteConfig.answerCollectionId, 
      [Query.equal('postBy', post)]);
    return replies.documents;
  }
  catch (error){
    console.log(error);
  }
}

export async function useAddFriend(receiver:string, sender: string) {
  try{
    const newNetwork = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.networkCollectionId,
      ID.unique(),
      {
        sender: sender,
        receiver: receiver,
        senderId: sender,
        receiverId: receiver
      }
    );
    if (!newNetwork) {
      throw Error;
    }
    console.log(newNetwork);
    return newNetwork;
  }
  catch(error){
    console.error(error);
  }

}


export async function useAcceptFriend(connectionId: string) {
  try{
    const newNetwork = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.networkCollectionId,
      connectionId,{
        Accepted:true,
      }
    );
    if (!newNetwork) {
      throw Error;
    }
    console.log(newNetwork);
    return newNetwork;
  }
  catch(error){
    console.error(error);
  }

}


export async function useDeleteRequest(connectionId: string) {
  try{
    const newNetwork = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.networkCollectionId,
      connectionId
    );
    if (!newNetwork) {
      throw Error;
    }
    console.log(newNetwork);
    return newNetwork;
  }
  catch(error){
    console.error(error);
  }

}


export async function useCheckConnection(id:string, guest:string) {
  try{
    console.log("user:"+ id+" guest"+guest);
    const status = await databases.listDocuments(
      appwriteConfig.databaseId, 
      appwriteConfig.networkCollectionId,
      [Query.equal("senderId",guest), Query.equal("receiverId",id)]
    );
    if(status.documents.length==0){
      const status2 = await databases.listDocuments(
        appwriteConfig.databaseId, 
        appwriteConfig.networkCollectionId,
        [Query.equal("senderId",id), Query.equal("receiverId",guest)]
      );
      return status2.documents;
    }
    return status.documents;
  }catch(error){
    console.error(error);
  }
}


export async function updateProfile(name: string, bio: string, institute: string, userId: string) {
  try {
    console.log(userId);
    console.log(name);
    console.log(bio);
    console.log(institute);
    const updatedProfile = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      {
        name: name,
        bio: bio,
        institute: institute,
      }
    );

    if (!updatedProfile) {
      throw Error;
    }

    return updatedProfile || null;
  } catch (error) {
    console.log(error);
  }
}

export async function updateDomains(userId, bio) {
  try {
    const updatedProfile = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      {
        bio: bio,
      }
    );

    if (!updatedProfile) {
      throw Error;
    }

    return updatedProfile || null;
  } catch (error) {
    console.log(error);
  }
}

export async function uploadAnswer(user: string, ans: string, post: string) {
  try{
    const answer = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.answerCollectionId,
      ID.unique(),
      {
        creator: user,
        content: ans,
        posts: post,
        postBy: post
      }
    );

    if(!answer){
      throw Error;
    }
    console.log(answer);
    return(answer);
    
  }
  catch(error){
    console.log(error);
  }
}