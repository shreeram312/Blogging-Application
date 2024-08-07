import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`} className="text-decoration-none">
      <div className="p-6 border border-gray-200 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out mb-6">
        <div className="flex items-center space-x-4">
          <Avatar name={authorName} size="small" />
          <div className="flex flex-col">
            <div className="text-lg font-semibold text-gray-800">
              {authorName}
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Circle />
              <span>{publishedDate}</span>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <div className="text-2xl font-bold text-gray-900 mb-2">{title}</div>
          <p className="text-gray-700 mt-2 line-clamp-3">{content}</p>
          <div className="text-gray-500 text-sm mt-2">
            {`${Math.ceil(content.length / 100)} minute(s) read`}
          </div>
        </div>
      </div>
    </Link>
  );
};

export function Circle() {
  return <div className="h-2 w-2 rounded-full bg-gray-500"></div>;
}

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${
        size === "small" ? "w-10 h-10" : "w-16 h-16"
      }`}
    >
      <span
        className={`${
          size === "small" ? "text-base" : "text-xl"
        } font-light text-white`}
      >
        {name[0]}
      </span>
    </div>
  );
}
