import { Stage, Layer, Rect, Group, Image as KonvaImage, Transformer } from "react-konva";
import { useRef, useEffect } from "react";
import { Button } from "@/shared/shadcn/components/ui/button";
import { Card, CardContent } from "@/shared/shadcn/components/ui/card";
import { attachTransformer } from "@/features/terrarium/transformObject/ObjectTransformer.tsx";
import { useCanvasStore } from "@/features/terrarium/model/useCanvasStore.ts";
import { handleCanvasDrop } from "@/features/terrarium/drag&drop/handleCanvasDrop.ts";
import { useFitStage } from "@/features/terrarium/fitToContainer/fitStageToContainer.ts";

export default function TerrariumCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<any>(null);
    const transformerRef = useRef<any>(null);

    const { objects, selectedId, setSelectedId, addObject, saveCanvas, loadCanvas } = useCanvasStore();
    const size = useFitStage(containerRef);

    // Transformer 연결 로직
    useEffect(() => {
        if (!selectedId) {
            // 선택된 객체 없으면 Transformer 비움
            transformerRef.current?.nodes([]);
            transformerRef.current?.getLayer()?.batchDraw();
            return;
        }
        attachTransformer(transformerRef, stageRef, selectedId);
    }, [selectedId, objects]);

    return (
        <Card className="w-full h-full p-2 flex flex-col">
            {/* 상단 버튼 영역 */}
            <CardContent className="flex gap-2 mb-2">
                <Button onClick={saveCanvas} variant="default">저장</Button>
                <Button onClick={loadCanvas} variant="secondary">불러오기</Button>
            </CardContent>

            {/* 캔버스 영역 */}
            <div
                ref={containerRef}
                className="flex-1 border rounded-md overflow-hidden relative"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleCanvasDrop(e, stageRef, addObject)}
            >
                <Stage
                    width={size.width}
                    height={size.height}
                    ref={stageRef}
                    onMouseDown={(e) => {
                        // Stage 빈 공간 클릭 시 선택 해제
                        if (e.target === stageRef.current) {
                            setSelectedId(null);
                        }
                    }}
                >
                    {/* 배경 레이어 */}
                    <Layer>
                        <Rect x={0} y={0} width={size.width} height={size.height} fill="#f8fafc" />
                    </Layer>

                    {/* 객체 레이어 */}
                    <Layer>
                        {objects.map(o => (
                            <Group
                                key={o.id}
                                id={o.id}
                                x={o.x}
                                y={o.y}
                                draggable
                                onClick={() => setSelectedId(o.id)}
                            >
                                {o.type === "image"
                                    ? <KonvaImage
                                        image={(() => { const img = new Image(); img.src = o.url!; return img; })()}
                                        width={o.width}
                                        height={o.height}
                                    />
                                    : <Rect
                                        width={o.width}
                                        height={o.height}
                                        fill={o.fill}
                                        cornerRadius={6}
                                    />
                                }
                            </Group>
                        ))}
                        <Transformer ref={transformerRef} />
                    </Layer>
                </Stage>
            </div>
        </Card>
    );
}