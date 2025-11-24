import { useState } from "react";
import { SearchPlant } from "@/features/searchPlant/SearchPlant";
import { useSearchPlantStore } from "@/entities/searchPlant/searchPlantStore";

export default function SearchPlantPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // 🔥 사이드바 토글 상태

    const history = useSearchPlantStore((s) => s.history);
    const loadFromHistory = useSearchPlantStore((s) => s.loadFromHistory);
    const isUploading = useSearchPlantStore((s) => s.isUploading);

    return (
        <div className="flex p-6 gap-4 relative">

            {/* 🔥 히스토리 토글 버튼 */}
            <button
                onClick={() => setIsSidebarOpen(prev => !prev)}
                className="absolute right-2 top-2 z-10 bg-green-600 text-white px-3 py-1 rounded-lg shadow hover:bg-green-700 transition"
            >
                {isSidebarOpen ? "◀ 닫기" : "▶ 히스토리"}
            </button>

            {/* 검색 컴포넌트 */}
            <div className="flex-1">
                <SearchPlant />
            </div>

            {/* 히스토리 사이드바 */}
            {isSidebarOpen && (
                <div className="w-64 border-l border-gray-200 dark:border-gray-700 p-4 overflow-y-auto">
                    <h3 className="font-bold mb-4 text-gray-700 dark:text-gray-300">최근 검색 결과</h3>

                    {history.length === 0 && (
                        <p className="text-sm text-gray-500">검색 기록이 없습니다.</p>
                    )}

                    <div className="flex flex-col gap-2">
                        {history.map((item, idx) => (
                            <div
                                key={idx}
                                className={`flex items-center gap-3 p-2 rounded-lg bg-green-50 dark:bg-green-900 cursor-pointer hover:bg-green-100 dark:hover:bg-green-800
                  ${isUploading ? "pointer-events-none opacity-50" : ""}`}
                                onClick={() => {
                                    if (!isUploading) loadFromHistory(item);
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

                </div>
            )}
        </div>
    );
}
