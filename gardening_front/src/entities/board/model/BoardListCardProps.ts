interface BoardListCardProps {
    image: string; // 대표 이미지 1장

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
    // onClick?: () => void;
}

export type { BoardListCardProps };
