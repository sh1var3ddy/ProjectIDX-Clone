import { FaJs, FaCss3, FaHtml5, FaPython, FaReact, FaFileAlt, FaGitAlt } from "react-icons/fa";

const IconStyle = {
    height: "15px",
    width: "15px"
}

const iconMap = {
    js: <FaJs color="yellow" style={IconStyle} />,
    css: <FaCss3 color="blue" style={IconStyle} />,
    html: <FaHtml5 color="green" style={IconStyle} />,
    py: <FaPython color="purple" style={IconStyle} />,
    jsx: <FaReact color="orange" style={IconStyle} />,
    tsx: <FaReact color="blue" style={IconStyle} />,
    gitignore: <FaGitAlt color="orange" style={IconStyle} />,
};

export const FileIcon = ({ extension }) => {
    if (!extension) return <FaFileAlt style={IconStyle} />;

    return iconMap[extension.toLowerCase()] ?? (
        <FaFileAlt style={IconStyle} />
    );
}