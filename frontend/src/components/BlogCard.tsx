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
      <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-lg hover:shadow-2xl hover:bg-gray-50 transition-all duration-300 ease-in-out mb-6">
        <div className="flex items-center space-x-4">
          <Avatar name={authorName} size="small" />
          <div className="flex flex-col">
            <div className="text-lg font-semibold text-gray-800">
              {authorName}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Circle />
              <span>{publishedDate}</span>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <div className="text-2xl font-bold text-gray-900 mb-2">{title}</div>
          <p className="text-gray-700 mt-2 line-clamp-3">
            {content.slice(0, 120)}...
          </p>
          <div className="text-gray-500 text-sm mt-2">
            {`${Math.ceil(content.length / 200)} minute read`}
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
  const bgGradient = "bg-gradient-to-r from-blue-500 to-purple-600";

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden ${bgGradient} rounded-full ${
        size === "small" ? "w-10 h-10" : "w-16 h-16"
      }`}
    >
      <span
        className={`${
          size === "small" ? "text-base" : "text-xl"
        } font-light text-white`}
      >
        {name[0].toUpperCase()}
      </span>
    </div>
  );
}
