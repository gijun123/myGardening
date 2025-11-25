
export function handleCanvasDrop(
    e: React.DragEvent,
    stageRef: React.RefObject<any>,
    addObject: (obj: any) => void
) {
    e.preventDefault();
    const url = e.dataTransfer.getData("image/url");
    if (!url) return;

    if (!stageRef.current) return;

    const stage = stageRef.current;
    const pointerPos = stage.getPointerPosition();
    if (!pointerPos) return;

    const x = pointerPos.x;
    const y = pointerPos.y;


    addObject({
        id: `img-${Date.now()}`,
        type: "image",
        url,
        x, // pointerPos.x 그대로 사용
        y, // pointerPos.y 그대로 사용
        width: 120,
        height: 120,
    });
}