import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import ChatWidget from "../components/ChatWidget";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { blogs, loading } = useBlogs();

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex flex-col md:flex-row my-10">
          <div className="w-full md:w-2/3 px-4">
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
          <div className="w-full md:w-1/3 px-4">
            <ChatWidget />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Appbar />
      <div className="flex flex-col md:flex-row my-10">
        <div className="w-full md:w-1/2 px-4">
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
        <div className="w-full md:w-1/3 px-4">
          <ChatWidget />
        </div>
      </div>
    </>
  );
};
