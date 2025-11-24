interface BoardNoImageCardProps {
    title: string;
    content: string;

    // 작성자 정보
    authorProfile?: string;
    authorNickname: string;
    authorBio: string;

    likeCount: number;
    viewCount: number;
    commentCount: number;

    tag?: string;
}

export type { BoardNoImageCardProps };