import { useState, useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Image,
  Link,
  Quote,
  Code,
  Undo,
  Redo,
} from "lucide-react";

const ArticleEditor = ({ content, onChange }) => {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content || "";
    }
  }, [content]);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
    updateContent();
  };

  const updateContent = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertImage = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      execCommand("insertImage", url);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setUploading(true);

    // Convert image to base64
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Image = event.target.result;
      
      // Insert image into editor
      execCommand("insertImage", base64Image);
      setUploading(false);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    reader.onerror = () => {
      alert('Failed to load image');
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const triggerImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      execCommand("createLink", url);
    }
  };

  const insertCode = () => {
    const code = prompt("Enter code:");
    if (code) {
      execCommand("insertHTML", `<pre><code>${code}</code></pre><p></p>`);
    }
  };

  const ToolbarButton = ({ onClick, children, title, active = false }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded hover:bg-gray-200 transition-colors ${
        active ? "bg-gray-200 text-[#003366]" : "text-gray-700"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <ToolbarButton
            onClick={() => execCommand("undo")}
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("redo")}
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </ToolbarButton>
        </div>

        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <ToolbarButton
            onClick={() => execCommand("bold")}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("italic")}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("underline")}
            title="Underline"
          >
            <Underline className="w-4 h-4" />
          </ToolbarButton>
        </div>

        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <ToolbarButton
            onClick={() => execCommand("formatBlock", "H1")}
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("formatBlock", "H2")}
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("formatBlock", "H3")}
            title="Heading 3"
          >
            <Heading3 className="w-4 h-4" />
          </ToolbarButton>
        </div>

        <div className="flex gap-1 border-r border-gray-300 pr-2">
          <ToolbarButton
            onClick={() => execCommand("insertUnorderedList")}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("insertOrderedList")}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("formatBlock", "BLOCKQUOTE")}
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </ToolbarButton>
        </div>

        <div className="flex gap-1">
          <div className="relative">
            <ToolbarButton
              onClick={triggerImageUpload}
              title="Upload Image from Computer"
            >
              <Image className="w-4 h-4" />
            </ToolbarButton>
            {uploading && (
              <div className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          <ToolbarButton
            onClick={insertImage}
            title="Insert Image from URL"
          >
            <Image className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={insertLink}
            title="Insert Link"
          >
            <Link className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={insertCode}
            title="Insert Code"
          >
            <Code className="w-4 h-4" />
          </ToolbarButton>
        </div>
      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={updateContent}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="min-h-[400px] p-6 prose prose-lg max-w-none focus:outline-none
          prose-headings:text-[#003366] prose-headings:font-bold
          prose-p:text-gray-700 prose-p:leading-relaxed
          prose-a:text-[#FFB300]
          prose-img:rounded-lg
          blockquote:border-l-4 blockquote:border-[#FFB300] blockquote:bg-gray-50 blockquote:px-4 blockquote:py-2 blockquote:italic"
        style={{ minHeight: "400px" }}
      />

      {/* Footer with hints */}
      <div className="bg-gray-50 border-t border-gray-300 px-4 py-2 flex flex-wrap gap-4 text-xs text-gray-500">
        <span>💡 <strong>Images:</strong> Click the image icon to upload from your computer (max 5MB)</span>
        <span>📎 <strong>Tip:</strong> You can also paste images directly into the editor</span>
      </div>

      {/* Focus Indicator */}
      {!isFocused && !content && (
        <div className="absolute pointer-events-none text-gray-400 mt-[-420px] ml-3">
          Start writing your article...
        </div>
      )}
    </div>
  );
};

export default ArticleEditor;
