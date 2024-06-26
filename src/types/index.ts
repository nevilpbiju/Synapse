export type INavLink = {
    imgURL: string;
    route: string;
    label: string;
  };
  
  export type IUpdateUser = {
    userId: string;
    name: string;
    bio: string;
    institute: string;
  };
  
  export type INewPost = {
    userId: string;
    caption: string;
    file?: File[];
    tags?: string;
  };
  
  export type IUpdatePost = {
    postId: string;
    caption: string;
    imageId: string;
    imageUrl: URL;
    file?: File[];
    tags?: string;
  };
  
  export type IUser = {
    id: string;
    name: string;
    username: string;
    email: string;
    imageUrl: string;
    bio: string;
    institute: string;
  };
  
  export type INewUser = {
    name: string;
    email: string;
    username: string;
    password: string;
  };
  
  export type IQuery = {
    id: string
    userId: string
    content: string
    domain: string
    timestamp: string
  }

  export type INewQuery = {
    UserID: string
    content: string
    domain: string
    timestamp: string
  }

  export type IUpdateQuery = {
    queryId: string;
    content: string
    domain: string
    timestamp: string
  };