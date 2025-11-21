import {Stage, Layer, Rect, Group, Image as KonvaImage, Transformer} from "react-konva";
import { useRef, useState, useEffect } from "react";
import {attachTransformer} from "@/features/terrarium/transformObject/ObjectTransformer.tsx";
import {useCanvasStore} from "@/features/terrarium/model/useCanvasStore.ts";
import {handleCanvasDrop} from "@/features/terrarium/drag&drop/handleCanvasDrop.ts";


export default function TerrariumCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<any>(null);
    const transformerRef = useRef<any>(null);

    const { objects, selectedId, setSelectedId, addObject, saveCanvas, loadCanvas } = useCanvasStore()

    const [size, setSize] = useState({ width: 800, height: 600 });

    useEffect(() => attachTransformer(transformerRef, stageRef, selectedId), [selectedId, objects]);

    useEffect(() => {
        function fitToContainer() {
            const el = containerRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            setSize({ width: rect.width, height: rect.height });
        }

        fitToContainer();
        window.addEventListener("resize", fitToContainer);
        return () => window.removeEventListener("resize", fitToContainer);
    }, []);

    return (
        <div className="flex flex-col w-full h-full">
            <div className="mb-2 space-x-2">
                <button onClick={saveCanvas}>저장</button>
                <button onClick={loadCanvas}>불러오기</button>
            </div>

            <div
                ref={containerRef}
                className="w-full h-full border"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleCanvasDrop(e, stageRef, addObject)}
            >
                <Stage
                    width={size.width}
                    height={size.height}
                    ref={stageRef}
                    onMouseDown={(e) => e.target === stageRef.current && setSelectedId(null)}
                >
                    <Layer>
                        <Rect x={0} y={0} width={size.width} height={size.height} fill="#f8fafc" />
                    </Layer>

                    <Layer>
                        {objects.map(o => (
                            <Group key={o.id} id={o.id} x={o.x} y={o.y} draggable onClick={() => setSelectedId(o.id)}>
                                {o.type === "image"
                                    ? <KonvaImage image={(() => { const img = new Image(); img.src = o.url!; return img; })()} width={o.width} height={o.height}/>
                                    : <Rect width={o.width} height={o.height} fill={o.fill} cornerRadius={6}/>
                                }
                            </Group>
                        ))}
                        <Transformer ref={transformerRef} />
                    </Layer>
                </Stage>
            </div>
        </div>
    );
}