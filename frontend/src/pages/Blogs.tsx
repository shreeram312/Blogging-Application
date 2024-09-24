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
            {[...Array(blogs.length + 2)].map((_, index) => (
              <BlogSkeleton key={index} />
            ))}
          </div>
          <div className="w-full md:w-1/3 px-4"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Appbar />
      <div className="flex flex-col md:flex-row my-10">
        <div className="w-full md:w-2/3 px-4">
          {blogs.length === 0 ? (
            <div className="flex justify-center items-center text-2xl font-bold">
              <p className="text-red-400">No Blogs Yet</p>
            </div>
          ) : null}
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

        <div className="w-full md:w-1/3 px-4 space-y-8">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Featured Blog
            </h2>
            {blogs.length > 0 && (
              <BlogCard
                id={blogs[0].id}
                authorName={blogs[0].author.name || "Anonymous"}
                title={blogs[0].title}
                content={blogs[0].content.slice(0, 100) + "..."} // Shortened content
                publishedDate={"2nd Feb 2024"}
              />
            )}
          </div>

          {/* Categories Section */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Categories
            </h2>
            <ul className="space-y-2">
              <li className="text-blue-600 hover:underline cursor-pointer">
                Technology
              </li>
              <li className="text-blue-600 hover:underline cursor-pointer">
                Health
              </li>
              <li className="text-blue-600 hover:underline cursor-pointer">
                Lifestyle
              </li>
              <li className="text-blue-600 hover:underline cursor-pointer">
                Business
              </li>
              <li className="text-blue-600 hover:underline cursor-pointer">
                Travel
              </li>
            </ul>
          </div>

          {/* Recent Posts Section */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Posts
            </h2>
            <ul className="space-y-3">
              {blogs.slice(0, 5).map((blog) => (
                <li key={blog.id}>
                  <a
                    href={`/blog/${blog.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {blog.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8"></div>
        </div>
      </div>
    </>
  );
};
