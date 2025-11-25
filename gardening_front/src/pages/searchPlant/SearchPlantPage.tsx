"use client";

import { useState } from "react";
import { SearchPlant } from "@/features/searchPlant/SearchPlant";
import { useSearchPlantStore } from "@/entities/searchPlant/searchPlantStore";

import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/shared/shadcn/components/ui/sheet"
import { Button } from  "@/shared/shadcn/components/ui/button"

export default function SearchPlantPage() {
    const history = useSearchPlantStore((s) => s.history);
    const loadFromHistory = useSearchPlantStore((s) => s.loadFromHistory);
    const isUploading = useSearchPlantStore((s) => s.isUploading);

    const [isSheetOpen, setIsSheetOpen] = useState(false);

    return (
        <div className="flex flex-col md:flex-row p-4 md:p-6 gap-4 relative min-h-screen">

            {/* 모바일용 Sheet 토글 버튼 */}
            <div className="md:hidden fixed right-4 top-20 z-50">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <Button className="bg-green-600 hover:bg-green-700 text-white">
                            ▶ 히스토리
                        </Button>
                    </SheetTrigger>

                    {/* 📌 모바일: Sheet 슬라이드 */}
                    <SheetContent side="right" className="w-72">
                        <SheetHeader>
                            <SheetTitle>최근 검색 결과</SheetTitle>
                        </SheetHeader>

                        <div className="mt-4 space-y-2">
                            {history.length === 0 && (
                                <p className="text-sm text-gray-500">검색 기록이 없습니다.</p>
                            )}

                            {history.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`flex items-center gap-3 p-2 rounded-lg 
                  bg-green-50 dark:bg-green-900 hover:bg-green-100 dark:hover:bg-green-800 
                  cursor-pointer transition
                  ${isUploading ? "pointer-events-none opacity-50" : ""}`}
                                    onClick={() => {
                                        if (!isUploading) loadFromHistory(item);
                                        setIsSheetOpen(false); // 📌 모바일은 클릭 시 자동 닫힘
                                    }}
                                >
                                    <img
                                        src={item.filePreview}
                                        className="w-16 h-16 object-cover rounded"
                                        alt={item.plant.commonName}
                                    />
                                    <div className="flex flex-col">
                                        <p className="font-semibold">{item.plant.commonName}</p>
                                        <p className="text-xs italic text-gray-600 dark:text-gray-400">
                                            {item.plant.scientificName}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* 검색 컴포넌트 */}
            <div className="flex-1">
                <SearchPlant />
            </div>

            {/* 데스크탑 사이드바 */}
            <aside className="hidden md:block w-72 border-l border-gray-200 dark:border-gray-700 p-4 overflow-y-auto">
                <h3 className="font-bold mb-4 text-gray-700 dark:text-gray-300">
                    최근 검색 결과
                </h3>

                {history.length === 0 && (
                    <p className="text-sm text-gray-500">검색 기록이 없습니다.</p>
                )}

                <div className="flex flex-col gap-2">
                    {history.map((item, idx) => (
                        <div
                            key={idx}
                            className={`flex items-center gap-3 p-2 rounded-lg bg-green-50 dark:bg-green-900 cursor-pointer hover:bg-green-100 dark:hover:bg-green-800
              ${isUploading ? "pointer-events-none opacity-50" : ""}`}
                            onClick={() => !isUploading && loadFromHistory(item)}
                        >
                            <img
                                src={item.filePreview}
                                className="w-16 h-16 object-cover rounded"
                                alt={item.plant.commonName}
                            />
                            <div className="flex flex-col">
                                <p className="font-semibold">{item.plant.commonName}</p>
                                <p className="text-xs italic text-gray-600 dark:text-gray-400">
                                    {item.plant.scientificName}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>
        </div>
    );
}
