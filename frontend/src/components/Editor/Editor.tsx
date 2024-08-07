import ReactQuill from "react-quill";

import DescriptionInterface from "../../interfaces/DescriptionInterface";

import "react-quill/dist/quill.snow.css";

const toolbarOptions = [
  ["bold", "italic", "strike"],
  [{ size: ["small", false, "large", "huge"] }],
  ["blockquote", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }],
];

const Editor: React.FC<DescriptionInterface> = ({ description, setDescription }) => {
  return (
    <ReactQuill theme="snow" value={description} onChange={setDescription} modules={{ toolbar: toolbarOptions }} />
  );
};

export default Editor;
