export function handleCanvasDrop(e: React.DragEvent, stageRef: any, addObject: any) {
    e.preventDefault();
    const url = e.dataTransfer.getData("image/url");
    if (!url) return;

    const pos = stageRef.current.getPointerPosition() || { x: 0, y: 0 };

    addObject({
        id: `img-${Date.now()}`,
        type: "image",
        url,
        x: pos.x,
        y: pos.y,
        width: 120,
        height: 120,
    });
}