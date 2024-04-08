import { ID, Query } from "appwrite";
import { INewPost, INewQuery, INewUser, IUpdateQuery, IUpdateUser } from "../../types";
import { account, appwriteConfig, avatars, databases, storage } from "./config";

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

    // Create post
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.questionCollectionId,
      ID.unique(),
      {
        creator: post.UserID,
        caption: post.content,
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
    // Create post
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.questionCollectionId,
      post.queryId,
      {
        caption: post.content,
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