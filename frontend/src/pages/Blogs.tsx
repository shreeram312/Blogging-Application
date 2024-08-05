import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { blogs } = useBlogs();
  return (
    <>
      <Appbar />
      <div className="my-10  h-screen md:w-3/4">
        {blogs.map((blog) => (
          <BlogCard
            id={blog.id}
            authorName={blog.author.name || "Anonymous"}
            title={blog.title}
            content={blog.content}
            publishedDate={"2nd Feb 2024"}
          />
        ))}
      </div>
    </>
  );
};
