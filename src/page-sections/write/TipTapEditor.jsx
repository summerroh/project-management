import "../../styles/tiptap.css";

import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Color } from "@tiptap/extension-color";
import Dropcursor from "@tiptap/extension-dropcursor";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
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
  Link as LinkIcon,
  List,
  ListOrdered,
  Redo2,
  Table2,
  Undo2,
  Unlink,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FontSize from "tiptap-extension-font-size";
import ColorPalette from "./ColorPalette";
import Dropdown from "./Dropdown";
import AppTextField from "components/input-fields/AppTextField";
import { toast } from "react-toastify";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import PreviewSlider from "components/PreviewSlider";
import LoadingScreen from "components/LoadingScreen";

const iconSize = 24;
const iconStrokeWidth = 1;

const MenuBar = ({ onFileUpload, isEditing, articleData }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const theme = useTheme();
  const [highlightColor, setHighlightColor] = useState("#ffc078");
  const [showHighlightColorPicker, setShowHighlightColorPicker] =
    useState(false);
  const [textColor, setTextColor] = useState("#ffc078");
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [postType, setPostType] = useState("sell");
  const [language, setLanguage] = useState("korean");
  const [title, setTitle] = useState("");
  const [uploadedImageIds, setUploadedImageIds] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const { editor } = useCurrentEditor();

  // Initialize state with article data if editing
  useEffect(() => {
    if (isEditing && articleData) {
      setTitle(articleData.title);
      setPostType(articleData.type);
      setLanguage(articleData.language);
      setUploadedImages(articleData.images || []);
      setUploadedImageIds(articleData.imageIds || []);
      editor.commands.setContent(articleData.content);
    }
  }, [isEditing, articleData]);

  // 글쓰기 API
  const handleArticle = async () => {
    try {
      const endpoint = isEditing
        ? `http://localhost:4000/article/${articleData._id}`
        : "http://localhost:4000/article/write";

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: postType,
          language: language,
          title: title,
          content: editor.getHTML(),
          imageIds: uploadedImageIds,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw err;
      }

      toast.success(
        isEditing ? t("toast.edit_success") : t("toast.create_success"),
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
      navigate("/forum");
    } catch (error) {
      console.error("Error:", error);
      if (error.response.status === 403) {
        toast.error(t("login_required"), {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate("/login");
      } else if (
        error.error ===
        "Articles validation failed: title: Path `title` is required."
      ) {
        console.log("제목을 입력해주세요.");
        toast.error(t("title_required"), {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error(t("error"), {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };
  //

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
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true); // Show loading screen
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch("http://localhost:4000/upload/image", {
          method: "POST",
          credentials: "include",
          body: formData,
        });

        if (!response.ok) throw new Error("Upload failed");

        const data = await response.json();

        setUploadedImageIds((prev) => [...prev, data.imageId]);
        setUploadedImages((prev) => [...prev, { path: data.imageUrl }]);
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error(t("image_upload_error"), {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } finally {
        setIsUploading(false); // Hide loading screen
      }
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

  const handlePostTypeChange = (event) => {
    setPostType(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  if (!editor) {
    return null;
  }

  return (
    <>
      {isUploading && <LoadingScreen />}
      <Box className="control-group">
        <Box
          className="button-group"
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: "10px",
            paddingLeft: "10px",
          }}
        >
          <FormControl
            component="fieldset"
            style={{ paddingLeft: "10px", paddingTop: "10px" }}
          >
            <FormLabel
              // component="legend"
              sx={{
                fontSize: "0.9rem",
                color: theme.palette.primary.dark,
              }}
            >
              {t("editor.post_type.label")}
            </FormLabel>
            <RadioGroup
              row
              aria-label="post-type"
              name="post-type"
              value={postType}
              onChange={handlePostTypeChange}
            >
              <FormControlLabel
                value="sell"
                control={<Radio size="small" />}
                label={t("editor.post_type.sell")}
              />
              <FormControlLabel
                value="buy"
                control={<Radio size="small" />}
                label={t("editor.post_type.buy")}
              />
            </RadioGroup>
          </FormControl>

          <FormControl
            component="fieldset"
            style={{ paddingLeft: "10px", paddingTop: "10px" }}
          >
            <FormLabel
              // component="legend"
              sx={{
                fontSize: "0.9rem",
                color: theme.palette.primary.dark,
              }}
            >
              {t("editor.language.label")}
            </FormLabel>
            <RadioGroup
              row
              aria-label="language"
              name="language"
              value={language}
              onChange={handleLanguageChange}
            >
              <FormControlLabel
                value="korean"
                control={<Radio size="small" />}
                label={t("editor.language.korean")}
              />
              <FormControlLabel
                value="japanese"
                control={<Radio size="small" />}
                label={t("editor.language.japanese")}
              />
              <FormControlLabel
                value="english"
                control={<Radio size="small" />}
                label={t("editor.language.english")}
              />
            </RadioGroup>
          </FormControl>

          <Box
            onClick={handleArticle}
            variant="contained"
            sx={{
              cursor: "pointer",
              // width: "50px",
              padding: "0px 20px",
              height: "40px",
              borderRadius: "10px",
              border: "1px solid #e1e1e1 !important",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.palette.primary.darkBlue,
              "&:hover": {
                backgroundColor: theme.palette.primary.darkBlueHover,
              },
            }}
          >
            {isEditing
              ? t("editor.buttons.update")
              : t("editor.buttons.publish")}
          </Box>
        </Box>
        <div
          className="button-group"
          style={{
            justifyContent: "space-between",
            paddingRight: "14px",
            paddingLeft: "14px",
          }}
        >
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
            {t("editor.buttons.copy")}
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
            {t("editor.buttons.photo")}
          </label>

          <input
            type="file"
            onChange={handleFileUpload}
            style={{ display: "none" }}
            id="file-upload"
          />
          <label htmlFor="file-upload" className="button">
            <FilePlus size={iconSize} strokeWidth={iconStrokeWidth} />
            {t("editor.buttons.file")}
          </label>

          <button
            onClick={() => setLink()}
            className={editor.isActive("link") ? "is-active" : ""}
          >
            <LinkIcon size={iconSize} strokeWidth={iconStrokeWidth} />
            {t("editor.buttons.link")}
          </button>
          <button
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editor.isActive("link")}
          >
            <Unlink size={iconSize} strokeWidth={iconStrokeWidth} />
            {t("editor.buttons.unlink")}
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
            <Table2 size={iconSize} strokeWidth={iconStrokeWidth} />
            {t("editor.buttons.table")}
          </button>

          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            <List size={iconSize} strokeWidth={iconStrokeWidth} />
            {t("editor.buttons.list1")}
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is-active" : ""}
          >
            <ListOrdered size={iconSize} strokeWidth={iconStrokeWidth} />
            {t("editor.buttons.list2")}
          </button>

          <Box>
            <Dropdown
              items={symbols}
              onSelect={insertSymbol}
              width={"70px"}
              height={"40px"}
              placeholder={t("editor.buttons.special_char")}
            />
          </Box>
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

          <Divider
            orientation="vertical"
            flexItem
            sx={{ margin: "10px 10px" }}
          />

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
            onClick={() =>
              setShowHighlightColorPicker(!showHighlightColorPicker)
            }
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
              <ColorPalette
                color={textColor}
                onChange={handleTextColorChange}
              />
            )}
          </button>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ margin: "10px 10px" }}
          />

          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={
              editor.isActive({ textAlign: "left" }) ? "is-active" : ""
            }
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
            className={
              editor.isActive({ textAlign: "right" }) ? "is-active" : ""
            }
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
        </div>

        <AppTextField
          placeholder={t("editor.title.placeholder")}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            backgroundColor: "white",
            borderRadius: "0px",
            border: "none",
            borderBottom: "1px solid #e1e1e1",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        />

        {uploadedImages.length > 0 && <PreviewSlider images={uploadedImages} />}
      </Box>
    </>
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

export default function TipTapEditor({
  isEditing = false,
  articleData = null,
}) {
  const { t } = useTranslation();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const content = t("editor.content.placeholder");

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
            onFileUpload={handleFileUpload}
            isEditing={isEditing}
            articleData={articleData}
          />
        }
        extensions={extensions}
        content={content}
      ></EditorProvider>

      {/* Existing file upload display */}
      {uploadedFiles.length > 0 && (
        <div className="uploaded-files-container">
          <h5 style={{ marginBottom: "12px" }}>
            {t("editor.uploaded_files.title")}
          </h5>
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
