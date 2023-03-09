export interface signupModel {
    username: String;
    email: String;
    password: String;
}



export interface jsonFormat {
    success: boolean,
    message: String,
    token?: String,
    username?: string
}

export interface imgUploadRes {
    success: boolean,
    message: String,
}

export interface cookieMessage {
    success: boolean,
}

export interface allVideos {
    success: boolean,
    videos: []
}

export interface userVideo {
    user: string,
    video: string,
    videoId: string,
    comments: []
}