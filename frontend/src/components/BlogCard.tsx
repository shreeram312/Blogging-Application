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
    <Link to={`/blog/${id}`} className="text-decoration-none ">
      <div className="p-6 border-b m-10 border-gray-300 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out max-w-3xl mb-4">
        <div className="flex items-center space-x-4">
          <Avatar name={authorName} />
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
          <div className="text-2xl font-bold text-gray-900">{title}</div>
          <p className="text-gray-700 mt-2">
            {content.slice(0, 150)}
            {content.length > 150 && "..."}
          </p>
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
        size === "small" ? "w-8 h-8" : "w-12 h-12"
      }`}
    >
      <span
        className={`${
          size === "small" ? "text-sm" : "text-lg"
        } font-light text-white`}
      >
        {name[0]}
      </span>
    </div>
  );
}
