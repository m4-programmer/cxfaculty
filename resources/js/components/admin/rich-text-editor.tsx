import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    Bold,
    Heading1,
    Heading2,
    Heading3,
    Highlighter,
    ImagePlus,
    Italic,
    Link2,
    List,
    ListOrdered,
    Quote,
    Redo,
    Strikethrough,
    Underline as UnderlineIcon,
    Undo,
} from 'lucide-react';
import { useCallback, useEffect } from 'react';
import { uploadBlogImage } from '@/lib/csrf';

type Props = {
    value: string;
    onChange: (value: string) => void;
    onUploadStateChange?: (uploading: boolean) => void;
};

function ToolbarButton({
    active,
    onClick,
    children,
    title,
}: {
    active?: boolean;
    onClick: () => void;
    children: React.ReactNode;
    title: string;
}) {
    return (
        <button
            type="button"
            title={title}
            onClick={onClick}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition ${
                active
                    ? 'bg-amber-300 text-black'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
        >
            {children}
        </button>
    );
}

export default function RichTextEditor({ value, onChange, onUploadStateChange }: Props) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] },
            }),
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
            }),
            Image.configure({ inline: false, allowBase64: false }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Placeholder.configure({ placeholder: 'Write your article here…' }),
            TextStyle,
            Color,
            Highlight.configure({ multicolor: true }),
        ],
        content: value,
        onUpdate: ({ editor: ed }) => {
            onChange(ed.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'tiptap-editor min-h-[320px] px-4 py-3 focus:outline-none',
            },
        },
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value, { emitUpdate: false });
        }
    }, [editor, value]);

    const setLink = useCallback(() => {
        if (!editor) return;
        const previousUrl = editor.getAttributes('link').href as string;
        const url = window.prompt('Enter URL', previousUrl || 'https://');
        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    const addImage = useCallback(async () => {
        if (!editor) return;
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;
            onUploadStateChange?.(true);
            try {
                const url = await uploadBlogImage(file);
                editor.chain().focus().setImage({ src: url }).run();
            } catch {
                window.alert('Image upload failed. Please try again.');
            } finally {
                onUploadStateChange?.(false);
            }
        };
        input.click();
    }, [editor, onUploadStateChange]);

    if (!editor) {
        return (
            <div className="flex min-h-[360px] items-center justify-center rounded-2xl border border-white/10 bg-white text-sm text-slate-500">
                Loading editor…
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white">
            <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 px-2 py-2">
                <ToolbarButton active={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} title="Heading 1">
                    <Heading1 className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="Heading 2">
                    <Heading2 className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} title="Heading 3">
                    <Heading3 className="h-4 w-4" />
                </ToolbarButton>

                <span className="mx-1 h-6 w-px bg-slate-200" />

                <ToolbarButton active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold">
                    <Bold className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic">
                    <Italic className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline">
                    <UnderlineIcon className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} title="Strikethrough">
                    <Strikethrough className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton active={editor.isActive('highlight')} onClick={() => editor.chain().focus().toggleHighlight().run()} title="Highlight">
                    <Highlighter className="h-4 w-4" />
                </ToolbarButton>

                <span className="mx-1 h-6 w-px bg-slate-200" />

                <ToolbarButton active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet list">
                    <List className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered list">
                    <ListOrdered className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Quote">
                    <Quote className="h-4 w-4" />
                </ToolbarButton>

                <span className="mx-1 h-6 w-px bg-slate-200" />

                <ToolbarButton active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()} title="Align left">
                    <AlignLeft className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()} title="Align center">
                    <AlignCenter className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()} title="Align right">
                    <AlignRight className="h-4 w-4" />
                </ToolbarButton>

                <span className="mx-1 h-6 w-px bg-slate-200" />

                <ToolbarButton active={editor.isActive('link')} onClick={setLink} title="Insert link">
                    <Link2 className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton onClick={addImage} title="Insert image">
                    <ImagePlus className="h-4 w-4" />
                </ToolbarButton>

                <span className="mx-1 h-6 w-px bg-slate-200" />

                <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Undo">
                    <Undo className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Redo">
                    <Redo className="h-4 w-4" />
                </ToolbarButton>
            </div>

            <EditorContent editor={editor} />
        </div>
    );
}
