import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import ChatWidget from "../components/ChatWidget";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { blogs } = useBlogs();

  return (
    <>
      <Appbar />
      <div className="flex flex-col md:flex-row my-10">
        {/* Left Column: Blog Cards */}
        <div className="w-full md:w-2/3 px-4">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate={"2nd Feb 2024"}
            />
          ))}
        </div>

        {/* Right Column: Additional Content */}
        <div className="w-full md:w-1/3 px-4">
          <ChatWidget />
          {/* Add other components or content here */}
        </div>
      </div>
    </>
  );
};
