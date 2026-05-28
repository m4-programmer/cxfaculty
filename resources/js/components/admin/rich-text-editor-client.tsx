import { useEffect, useState, type ComponentType } from 'react';

type EditorProps = {
    value: string;
    onChange: (value: string) => void;
    onUploadStateChange?: (uploading: boolean) => void;
};

export default function RichTextEditorClient(props: EditorProps) {
    const [Editor, setEditor] = useState<ComponentType<EditorProps> | null>(null);

    useEffect(() => {
        void import('./rich-text-editor').then((module) => {
            setEditor(() => module.default);
        });
    }, []);

    if (!Editor) {
        return (
            <div className="flex min-h-[360px] items-center justify-center rounded-2xl border border-border bg-background text-sm text-muted-foreground">
                Loading editor…
            </div>
        );
    }

    return <Editor {...props} />;
}
