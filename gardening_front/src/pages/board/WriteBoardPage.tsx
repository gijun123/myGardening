// demo.tsx


import {type Attachment, ComposerInput} from "@/features/board/ui/composer-input.tsx"
import {toast} from "sonner"; // Adjust path as needed

// Sample attachments for the demo
const sampleAttachments: Attachment[] = [
    {
        id: '1',
        fileName: 'Project-Brief.pdf',
        fileType: 'document',
    },
    {
        id: '2',
        fileName: 'UI-Mockup.png',
        fileType: 'image',
        thumbnailUrl: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=200',
    },
    {
        id: '3',
        fileName: 'Design-Assets.zip',
        fileType: 'document',
    }
];

export default function WriteBoardPage() {
    const handleSend = (message: string, attachments: Attachment[]) => {
        // In a real app, this function would send the data to an API
        console.log("Sending message:", message)
        console.log("With attachments:", attachments)

        // Use sonner to show a success toast
        toast.success("Message Sent!", {
            description: `Your message and ${attachments.length} attachments have been sent.`,
            duration: 3000,
        })
    }

    return (
        <div className="w-full max-w-2xl mx-auto p-4 flex flex-col items-center justify-center min-h-[400px]">
            <h2 className="text-2xl font-bold mb-4">글 남기기 🌿</h2>
            <ComposerInput
                onSend={handleSend}
                initialAttachments={sampleAttachments}
                placeholder="Share your thoughts or attach a file..."
                aria-label="Comment composer"
            />
        </div>
    )
}