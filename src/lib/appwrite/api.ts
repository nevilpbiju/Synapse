import { ID, Query } from "appwrite";
import { INewPost, INewQuery, INewUser } from "../../types";
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
    return session;
  } catch (error) {
    console.log(error);
  }
}


export async function createPost(post: INewQuery) {
  try {
    // Convert tags into array
    const domain = post.domain?.replace(/ /g, "").split(",") || [];
    console.log('domain');

    // Create post
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.questionCollectionId,
      ID.unique(),
      {
        UserID: post.UserID,
        content: post.content,
        domain: domain,
        timestamp: post.timestamp,
      }
    );

    if (!newPost) {
      throw Error;
    }

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