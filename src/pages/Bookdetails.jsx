import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Calendar, User, BookOpen, Clock, Heart, Share2 } from "lucide-react";
import { useAuth } from "@/Context/authContext";
import toast, { Toaster } from "react-hot-toast";

const fetchBookDetails = async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/book-summary/book-detail/${id}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

function Bookdetails() {
  const params = useParams();
  const { useApiCalls } = useAuth();

  const { data, error, isLoading } = useQuery({
    queryKey: ["bookDetail", params.id],
    queryFn: () => fetchBookDetails(params.id),
    enabled: !!params.id,
  });

  const handleShare = () => {
    const url = `${window.location.origin}/book-details/${params.id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success("Link copied to clipboard!"))
      .catch((err) => console.error("Failed to copy: ", err));
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-gray-500">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-red-500">
        An error occurred: {error.message}
      </div>
    );
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div>
        <Toaster />
      </div>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Book Header */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Book Cover */}
              <div className="lg:w-1/3 relative group">
                <img
                  src={data.data.thumbnil}
                  alt={data.data.title}
                  className="w-full h-[400px] lg:h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Book Info */}
              <div className="lg:w-2/3 p-8">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                    {data.data.genre}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={handleShare}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    >
                      <Share2 className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                <h1 className="mt-4 text-3xl font-bold text-gray-900 tracking-tight">
                  {data.data.title}
                </h1>

                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    <span>
                      By{" "}
                      <span className="font-medium text-gray-900">
                        {data.data.writter_name}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      {new Date(data.data.published_date).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{data.data.reading_time}</span>
                  </div>
                </div>

                {/* Author Details */}
                <div className="mt-8">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <User className="w-5 h-5 text-primary-600" />
                    About the Author
                  </h2>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {data.data.author_details}
                  </p>
                </div>
              </div>
            </div>

            {/* Book Summary */}
            <div className="border-t border-gray-100 px-8 py-10 bg-gradient-to-b from-white to-gray-50">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-6">
                  <BookOpen className="w-5 h-5 text-primary-600" />
                  Book Summary
                </h2>
                <div className="prose prose-lg prose-primary">
                  <p className="text-gray-600 leading-relaxed">
                    {data.data.summary}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Tags Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {data.data.category.split(",").map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full"
            >
              {tag.trim()}
            </span>
          ))}
        </div>
      </div>

      {/* Related Books Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Related Books
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <img
              src="https://example.com/images/book1.jpg"
              alt="Deep Work"
              className="w-full h-40 object-cover rounded"
            />
            <p className="text-sm font-medium mt-2">Deep Work</p>
            <p className="text-xs text-gray-500">by Cal Newport</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <img
              src="https://example.com/images/book2.jpg"
              alt="The Power of Habit"
              className="w-full h-40 object-cover rounded"
            />
            <p className="text-sm font-medium mt-2">The Power of Habit</p>
            <p className="text-xs text-gray-500">by Charles Duhigg</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <img
              src="https://example.com/images/book3.jpg"
              alt="Start with Why"
              className="w-full h-40 object-cover rounded"
            />
            <p className="text-sm font-medium mt-2">Start with Why</p>
            <p className="text-xs text-gray-500">by Simon Sinek</p>
          </div>
        </div>
      </div>

      {/* Reader Reviews Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Reader Reviews
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-800">
              "This book changed my perspective on habits and productivity. A
              must-read!"
            </p>
            <p className="text-xs text-gray-500 mt-2">- Sarah J.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-800">
              "Highly recommended for anyone looking to build better habits."
            </p>
            <p className="text-xs text-gray-500 mt-2">- Michael K.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookdetails;
