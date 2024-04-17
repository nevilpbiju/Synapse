import { Client, Account, Databases, Storage, Avatars } from "appwrite";


export const appwriteConfig={
    projectId:import.meta.env.VITE_APPWRITE_PROJECT_ID, 
    url: import.meta.env.VITE_APPWRITE_URL,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    userCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
    postCollectionId: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
    savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
    // userCollectionId: import.meta.env.VITE_APPWRITE_PROFILE_COLLECTION_ID,
    chatCollectionId: import.meta.env.VITE_APPWRITE_CHAT_COLLECTION_ID,
    networkCollectionId: import.meta.env.VITE_APPWRITE_NETWORK_COLLECTION_ID,
    answerCollectionId: import.meta.env.VITE_APPWRITE_ANSWER_COLLECTION_ID,
    questionCollectionId: import.meta.env.VITE_APPWRITE_QUESTION_COLLECTION_ID,
    reviewCollectionId: import.meta.env.VITE_APPWRITE_REVIEW_COLLECTION_ID,
    inboxCollectionId: import.meta.env.VITE_APPWRITE_INBOX_COLLECTION_ID
}

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);