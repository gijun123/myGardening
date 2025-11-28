import { Stage, Layer, Rect, Group, Image as KonvaImage, Transformer } from "react-konva";
import {useRef, useEffect, useState} from "react";
import { Button } from "@/shared/shadcn/components/ui/button";
import { Card, CardContent } from "@/shared/shadcn/components/ui/card";
import { attachTransformer } from "@/features/terrarium/transformObject/ObjectTransformer.tsx";
import { useCanvasStore } from "@/features/terrarium/model/useCanvasStore.ts";
import { handleCanvasDrop } from "@/features/terrarium/drag&drop/handleCanvasDrop.ts";
import { useFitStage } from "@/features/terrarium/fitToContainer/fitStageToContainer.ts";
import {Input} from "@/shared/shadcn/components/ui/input.tsx";
import {Checkbox} from "@/shared/shadcn/components/ui/checkbox.tsx";
import {TerrariumControllerApi} from "@/shared/api";

export default function TerrariumCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<any>(null);
    const transformerRef = useRef<any>(null);

    const [title, setTitle] = useState("");           // 제목 상태
    const [description, setDescription] = useState(""); // 설명 상태
    const [isPublic, setIsPublic] = useState(false);  // 공개 여부 상태

    const { objects, selectedId, setSelectedId, addObject, saveCanvas, loadCanvas } = useCanvasStore();
    const size = useFitStage(containerRef);

    const terrariumApi = new TerrariumControllerApi();


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
            <CardContent className="flex gap-2 mb-2 ">
                <Input placeholder="테라리움 제목" value={title} onChange={e => setTitle(e.target.value)} />
                <Input placeholder="설명" value={description} onChange={e => setDescription(e.target.value)} />
                <div className="flex items-center gap-2">
                    <Checkbox checked={isPublic} onCheckedChange={checked => setIsPublic(Boolean(checked))} />
                    <span>공개</span>
                </div>
                <Button
                    onClick={async () => {
                        console.log("저장버튼눌림 ㅋ")
                        const terrarium = await terrariumApi.createTerrarium({
                            title,
                            description,
                            isPublic,
                            width: size.width,
                            height: size.height,
                        });

                        const terrariumId = terrarium.data.id as number;

                        // 2️⃣ 이미지 저장
                        await saveCanvas(terrariumId);
                    }}
                >
                    저장
                </Button>
                <Button onClick={()=>loadCanvas} variant="secondary">불러오기</Button>
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