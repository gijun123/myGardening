import { BoardListCard } from "@/entities/board/ui/BoardListCard";
import { BoardNoImageCard } from "@/entities/board/ui/BoardNoImageCard";
import { useState } from "react";

export default function BoardPage() {
    const [boards] = useState([
        {
            id: 1,
            title: "우리집 몬스테라 성장일기",
            content: "드디어 새 잎이 나왔어요!" +
                "드디어 새 잎이 나왔어요!" +
                "드디어 새 잎이 나왔어요!" +
                "드디어 새 잎이 나왔어요!" +
                "드디어 새 잎이 나왔어요!" +
                "드디어 새 잎이 나왔어요!" +
                "",
            images: [
                "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
                "https://images.unsplash.com/photo-1526827826797-7b05204a22ef",
                "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea",
            ],
            tags: ["실내식물", "야옹"],
        },
        {
            id: 2,
            title: "초보자 식물 추천해주세요!",
            content: "키우기 쉬운 식물 추천 부탁드려요 🌱" +
                "키우기 쉬운 식물 추천 부탁드려요 🌱" +
                "키우기 쉬운 식물 추천 부탁드려요 🌱" +
                "키우기 쉬운 식물 추천 부탁드려요 🌱" +
                "키우기 쉬운 식물 추천 부탁드려요 🌱" +
                "키우기 쉬운 식물 추천 부탁드려요 🌱" +
                "키우기 쉬운 식물 추천 부탁드려요 🌱",
            images: [
                "https://images.unsplash.com/photo-1528741254566-d718e868201f",
                "https://images.unsplash.com/photo-1543286386-713bdd548da4",
            ],
            tags: [],
        },
        {
            id: 3,
            title: "오늘은 물 주는 날",
            content: "다육이들이 엄청 건강해졌어요." +
                "다육이들이 엄청 건강해졌어요." +
                "다육이들이 엄청 건강해졌어요." +
                "다육이들이 엄청 건강해졌어요." +
                "다육이들이 엄청 건강해졌어요." +
                "다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요." +
                "다육이들이 엄청 건강해졌어요." +
                "다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요.다육이들이 엄청 건강해졌어요." +
                "" +
                "",
            images: [],
            tags: ["공기정화식물", "메롱"],
        },
        {
            id: 4,
            title: "우리집 몬스테라 성장일기",
            content: "드디어 새 잎이 나왔어요!" +
                "드디어 새 잎이 나왔어요!" +
                "드디어 새 잎이 나왔어요!" +
                "드디어 새 잎이 나왔어요!" +
                "드디어 새 잎이 나왔어요!" +
                "드디어 새 잎이 나왔어요!" +
                "",
            images: [
                "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
                "https://images.unsplash.com/photo-1526827826797-7b05204a22ef",
                "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea",
            ],
            tags: ["실내식물", "야옹"],
        },
        {
            id: 5,
            title: "우리집 몬스테라 성장일기",
            content: "드디어 새 잎이 나왔어요!" +
                "드디어 새 잎이 나왔어요!" +
                "드디어 새 잎이 나왔어요!" +
                "드디어 새 잎이 나왔어요!" +
                "드디어 새 잎이 나왔어요!" +
                "드디어 새 잎이 나왔어요!" +
                "",
            images: [
                "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
                "https://images.unsplash.com/photo-1526827826797-7b05204a22ef",
                "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea",
            ],
            tags: ["실내식물", "야옹"],
        },
    ]);

    return (
        <main className="mx-auto h-full w-full max-w-5xl px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15 p-4">
                {boards.map((item) =>
                    item.images.length > 0 ? (
                        <BoardListCard
                            key={item.id}
                            image={item.images[0]}
                            title={item.title}
                            content={item.content}
                            authorProfile="프로필사진"
                            authorNickname="닉네임"
                            authorBio="자기소개"
                            likeCount={100}
                            viewCount={5210}
                            commentCount={2132}
                            tag={item.tags[0]}
                        />
                    ) : (
                        <BoardNoImageCard
                            key={item.id}
                            title={item.title}
                            content={item.content}
                            authorProfile="프로필사진"
                            authorNickname="닉네임"
                            authorBio="자기소개"
                            likeCount={500}
                            viewCount={100}
                            commentCount={5210}
                            tag={item.tags[0]}
                        />
                    )
                )}
            </div>
        </main>
    );
}
