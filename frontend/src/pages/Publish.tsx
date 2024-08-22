import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      <Appbar />
      <div className="flex justify-center w-full pt-12">
        <div className="max-w-screen-lg w-full bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Publish a New Blog Post
          </h1>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mb-4"
            placeholder="Enter your blog title"
            value={title}
          />

          <TextEditor
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />

          <button
            onClick={async () => {
              setLoading(true);
              try {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/blog`,
                  {
                    title,
                    content: description,
                  },
                  {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                );
                navigate(`/blog/${response.data.message.id}`);
              } catch (error) {
                console.error("Error publishing the blog post", error);
              } finally {
                setLoading(false);
              }
            }}
            type="submit"
            className={`mt-6 inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white rounded-lg focus:ring-4 focus:ring-blue-300 hover:bg-blue-600 ${
              loading ? "bg-blue-500" : "bg-blue-700"
            } transition-all duration-200 ease-in-out`}
            disabled={loading}
          >
            {loading ? "Publishing..." : "Publish Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

function TextEditor({
  onChange,
  value,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}) {
  return (
    <div className="mt-4">
      <div className="w-full mb-4">
        <div className="border bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between px-3 py-2 border-b">
            <div className="flex space-x-1">
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              ></button>
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              ></button>
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              ></button>
            </div>
          </div>
          <div className="bg-gray-50 rounded-b-lg p-4">
            <textarea
              onChange={onChange}
              value={value}
              id="editor"
              rows={8}
              className="block w-full px-0 text-sm text-gray-800 bg-transparent border-0 focus:outline-none"
              placeholder="Write your article here..."
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}
