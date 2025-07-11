import "../../styles/tiptap.css";

import { useEffect, useState, useCallback } from "react";
import { Button, Divider } from "@mui/material";
import { Color } from "@tiptap/extension-color";
import Dropcursor from "@tiptap/extension-dropcursor";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import ListItem from "@tiptap/extension-list-item";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Clipboard,
  FilePlus,
  ImageIcon,
  List,
  ListOrdered,
  Redo2,
  Table2,
  Undo2,
  Link as LinkIcon,
  Unlink,
  Languages,
  SpellCheck,
  X,
} from "lucide-react";
import FontSize from "tiptap-extension-font-size";
import ColorPicker from "./ColorPicker";
import Dropdown from "./Dropdown";
import ColorPalette from "./ColorPalette";

const iconSize = 24;
const iconStrokeWidth = 1;

const MenuBar = ({
  showButton,
  setRightPanel,
  setTextTobeTranslated,
  onFileUpload,
}) => {
  const [highlightColor, setHighlightColor] = useState("#ffc078");
  const [showHighlightColorPicker, setShowHighlightColorPicker] =
    useState(false);
  const [textColor, setTextColor] = useState("#ffc078");
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [fontSize, setFontSize] = useState("16px");
  const [selectedText, setSelectedText] = useState("");

  const { editor } = useCurrentEditor();

  const getSelectedText = () => {
    const { from, to } = editor.state.selection;
    return editor.state.doc.textBetween(from, to, " ");
  };

  useEffect(() => {
    setSelectedText(getSelectedText());
  }, [editor.state.selection, setSelectedText]);

  // 복사 기능
  const copySelectedContent = () => {
    navigator.clipboard
      .writeText(selectedText)
      .then(() => console.log("Text copied successfully"))
      .catch((err) => console.error("Failed to copy:", err));
  };

  //   사진 업로드 기능
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target.result;
        editor.chain().focus().setImage({ src }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  // 파일 업로드 기능
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  // 텍스트 하이라이트 색상 변경 기능
  const handleHighlightColorChange = (color) => {
    setHighlightColor(color);
    editor.chain().focus().toggleHighlight({ color: color }).run();
  };

  // 텍스트 색상 변경 기능
  const handleTextColorChange = (color) => {
    setTextColor(color);
    editor.chain().focus().setColor(color).run();
  };

  // 링크 기능
  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL을 입력하세요", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  // Symbols to be inserted
  const symbols = ["©", "®", "™", "✓", "✗", "★", "☆", "♥", "♦", "♣", "♠"];

  // Function to insert symbol
  const insertSymbol = (symbol) => {
    editor.chain().focus().insertContent(symbol).run();
  };

  // Font sizes
  const fontSizes = [
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "24px",
    "28px",
    "32px",
    "36px",
    "48px",
  ];

  // Function to change font size
  const changeFontSize = (size) => {
    editor.chain().focus().setFontSize(size).run();
  };

  // Font families
  const fontFamilies = ["Pretendard", "Noto Sans KR"];

  // Function to change font family
  const changeFontFamily = (family) => {
    editor.chain().focus().setFontFamily(family).run();
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="control-group">
      <div className="button-group" style={{ gap: "22px" }}>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo2 size={iconSize} strokeWidth={iconStrokeWidth} />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo2 size={iconSize} strokeWidth={iconStrokeWidth} />
        </button>

        <button onClick={copySelectedContent}>
          <Clipboard size={iconSize} strokeWidth={iconStrokeWidth} />
          복사
        </button>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
          id="image-upload"
        />
        <label htmlFor="image-upload" className="button">
          <ImageIcon size={iconSize} strokeWidth={iconStrokeWidth} />
          사진
        </label>

        <input
          type="file"
          onChange={handleFileUpload}
          style={{ display: "none" }}
          id="file-upload"
        />
        <label htmlFor="file-upload" className="button">
          <FilePlus size={iconSize} strokeWidth={iconStrokeWidth} />
          파일
        </label>

        <button
          onClick={() => setLink()}
          className={editor.isActive("link") ? "is-active" : ""}
        >
          <LinkIcon size={iconSize} strokeWidth={iconStrokeWidth} />
          링크
        </button>
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
        >
          <Unlink size={iconSize} strokeWidth={iconStrokeWidth} />
          링크 해제
        </button>

        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          <Table2 size={iconSize} strokeWidth={iconStrokeWidth} />표
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <List size={iconSize} strokeWidth={iconStrokeWidth} />
          목록 1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <ListOrdered size={iconSize} strokeWidth={iconStrokeWidth} />
          목록 2
        </button>

        <Dropdown
          items={symbols}
          onSelect={insertSymbol}
          width={"70px"}
          height={"40px"}
          placeholder="특문"
        />

        {showButton && (
          <Button
            variant="outlined"
            sx={{
              width: "50px",
              height: "40px",
              borderRadius: "10px",
              border: "1px solid #e1e1e1 !important",
            }}
          >
            완료
          </Button>
        )}
      </div>
      <div className="button-group">
        <Dropdown
          defaultValue={fontFamilies[0]}
          items={fontFamilies}
          onSelect={changeFontFamily}
          width={"140px"}
          height={"40px"}
          placeholder="Font Family"
        />

        <Dropdown
          defaultValue={fontSizes[0]}
          items={fontSizes}
          onSelect={changeFontSize}
          width={"80px"}
          height={"40px"}
          placeholder="Font Size"
        />

        <Divider orientation="vertical" flexItem sx={{ margin: "10px 10px" }} />

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <img src="/static/editor/bold.svg" alt="bold" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <img src="/static/editor/italic.svg" alt="italic" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <img src="/static/editor/strike.svg" alt="strike" />
        </button>
        <button
          onClick={() => setShowHighlightColorPicker(!showHighlightColorPicker)}
          className={editor.isActive("highlight") ? "is-active" : ""}
          style={{ position: "relative" }}
        >
          <img src="/static/editor/highlight.svg" alt="highlight" />
          {showHighlightColorPicker && (
            <ColorPalette
              color={highlightColor}
              onChange={handleHighlightColorChange}
            />
          )}
        </button>

        <button
          onClick={() => setShowTextColorPicker(!showTextColorPicker)}
          className={
            editor.isActive("textStyle", { color: textColor })
              ? "is-active"
              : ""
          }
          style={{ position: "relative" }}
        >
          <img src="/static/editor/textColor.svg" alt="textColor" />
          {showTextColorPicker && (
            <ColorPalette color={textColor} onChange={handleTextColorChange} />
          )}
        </button>

        <Divider orientation="vertical" flexItem sx={{ margin: "10px 10px" }} />

        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
        >
          <AlignLeft size={iconSize} strokeWidth={iconStrokeWidth} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" }) ? "is-active" : ""
          }
        >
          <AlignCenter size={iconSize} strokeWidth={iconStrokeWidth} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
        >
          <AlignRight size={iconSize} strokeWidth={iconStrokeWidth} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={
            editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
          }
        >
          <AlignJustify size={iconSize} strokeWidth={iconStrokeWidth} />
        </button>

        <Divider orientation="vertical" flexItem sx={{ margin: "10px 10px" }} />

        <button
          onClick={() => {
            setRightPanel("translation");
            setTextTobeTranslated(selectedText);
          }}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <Languages size={iconSize} strokeWidth={iconStrokeWidth} />
          번역
        </button>

        <button
          onClick={() => {
            setRightPanel("spellcheck");
            setTextTobeTranslated(selectedText);
          }}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <SpellCheck size={iconSize} strokeWidth={iconStrokeWidth} />
          맞춤법
        </button>
      </div>
    </div>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  Image,
  Dropcursor,
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
  Highlight.configure({ multicolor: true }),
  FontSize.configure(),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  FontFamily.configure(),
  Link.configure({
    openOnClick: true,
    linkOnPaste: true,
    autolink: true,
    defaultProtocol: "https",
    HTMLAttributes: {
      target: "_blank",
      rel: "noopener noreferrer",
    },
  }),
];

const content = `
<p>
  안녕하세요 반갑습니다 👏
</p>
`;

export default function TipTapEditor({
  showButton = false,
  setRightPanel,
  setTextTobeTranslated,
}) {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (file) => {
    setUploadedFiles((prevFiles) => [...prevFiles, file]);
  };

  const removeFile = (indexToRemove) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };
  return (
    <div>
      <EditorProvider
        slotBefore={
          <MenuBar
            showButton={showButton}
            setRightPanel={setRightPanel}
            setTextTobeTranslated={setTextTobeTranslated}
            onFileUpload={handleFileUpload}
          />
        }
        extensions={extensions}
        content={content}
      ></EditorProvider>
      {uploadedFiles.length > 0 && (
        <div className="uploaded-files-container">
          <h5 style={{ marginBottom: "12px" }}>업로드된 파일들</h5>
          <div className="file-list">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="file-item">
                <span className="file-name">{file.name}</span>
                <button
                  className="remove-file"
                  onClick={() => removeFile(index)}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
