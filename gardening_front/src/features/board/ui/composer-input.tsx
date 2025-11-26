import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Image as ImageIcon, X, CornerDownLeft } from "lucide-react"

import { cn } from "@/shared/shadcn/lib/utils"
import { Button } from "@/shared/shadcn/components/ui/button"
import { Textarea } from "@/features/board/ui/textarea"

// uuid 대체용
const simpleId = () => Math.random().toString(36).slice(2, 11)

export interface ComposerProps {
    onSend: (data: { title: string; content: string; tags: string[]; files: File[] }) => void
}

export function ComposerInput({ onSend }: ComposerProps) {
    const [title, setTitle] = React.useState("")
    const [content, setContent] = React.useState("")
    const [tags, setTags] = React.useState<string[]>([])
    const [tagInput, setTagInput] = React.useState("")
    const [attachments, setAttachments] = React.useState<
        { id: string; file: File; preview?: string }[]
    >([])

    const fileInputRef = React.useRef<HTMLInputElement>(null)

    // 이미지 업로드 처리
    const handleFiles = (files: FileList | null) => {
        if (!files) return

        const list = Array.from(files).map((file) => ({
            id: simpleId(),
            file,
            preview: URL.createObjectURL(file)
        }))

        setAttachments((prev) => [...prev, ...list])
    }

    const removeAttachment = (id: string) => {
        setAttachments((prev) => prev.filter((a) => a.id !== id))
    }

    const addTag = () => {
        const t = tagInput.trim()
        if (!t) return
        if (tags.includes(t)) return
        setTags((prev) => [...prev, t])
        setTagInput("")
    }

    const removeTag = (t: string) => {
        setTags((prev) => prev.filter((tag) => tag !== t))
    }

    const sendHandler = () => {
        onSend({
            title,
            content,
            tags,
            files: attachments.map((a) => a.file)
        })
    }

    return (
        <div className="flex flex-col w-full rounded-xl border bg-card text-card-foreground shadow-sm">

            {/* 제목 + 이미지 버튼 (한 줄) */}
            <div className="p-3 border-b flex items-center gap-2">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목을 입력하세요"
                    className="flex-1 p-2 rounded-md border outline-none"
                />

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <ImageIcon className="h-5 w-5" />
                </Button>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    multiple
                    onChange={(e) => {
                        handleFiles(e.target.files)
                        e.target.value = ""
                    }}
                />
            </div>

            {/* 본문 */}
            <div className="p-3">
                <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="내용을 입력하세요..."
                    className="w-full min-h-[140px] border-0 p-2 focus-visible:ring-0"
                />
            </div>

            {/* 이미지 미리보기 */}
            {attachments.length > 0 && (
                <div className="px-4 pb-2">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        <AnimatePresence>
                            {attachments.map((att) => (
                                <motion.div
                                    key={att.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                                    className="relative group"
                                >
                                    <div className="aspect-square w-full rounded-md overflow-hidden bg-muted">
                                        <img
                                            src={att.preview}
                                            alt={att.file.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <button
                                        onClick={() => removeAttachment(att.id)}
                                        className="absolute -top-1 -right-1 bg-background border rounded-full p-0.5 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            )}

            {/* 태그 입력 */}
            <div className="p-3 border-t space-y-3">
                <div className="flex gap-2">
                    <input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="태그 입력"
                        className="flex-1 p-2 border rounded-md outline-none"
                    />
                    <Button onClick={addTag}>추가</Button>
                </div>

                {/* 태그 리스트 */}
                <div className="flex flex-wrap gap-2">
                    {tags.map((t) => (
                        <span
                            key={t}
                            className="bg-primary/20 px-3 py-1 rounded-full flex items-center gap-2"
                        >
              {t}
                            <X
                                className="h-4 w-4 cursor-pointer"
                                onClick={() => removeTag(t)}
                            />
            </span>
                    ))}
                </div>

                {/* 작성 버튼 */}
                <div className="flex justify-end">
                    <Button onClick={sendHandler}>
                        작성하기
                        <CornerDownLeft className="h-4 w-4 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
