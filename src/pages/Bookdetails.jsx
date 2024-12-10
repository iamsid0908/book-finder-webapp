import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const fetchBookDetails = async (id) => {
  const token = localStorage.getItem("Bearer");
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/book-summary/book-detail/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
// sid
function Bookdetails() {
  const params = useParams();

  const { data, error, isLoading } = useQuery(
    ["bookDetail", params.id],
    () => fetchBookDetails(params.id),
    {
      enabled: !!params.id,
      // staleTime: Infinity,
    }
  );
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
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="flex flex-col md:flex-row">
          <img
            src={data.data.thumbnil}
            alt={data.data.title}
            className="w-full md:w-1/3 h-64 object-cover"
          />
          <div className="p-6 md:w-2/3">
            <h1 className="text-2xl font-bold text-gray-800">
              {data.data.title}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Written by{" "}
              <span className="font-medium">{data.data.writter_name}</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Published on:{" "}
              <span className="font-medium">
                {new Date(data.data.published_date).toLocaleDateString()}
              </span>
            </p>
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Author Details
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                {data.data.author_details}
              </p>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-800">Summary</h2>
              <p className="text-sm text-gray-600 mt-2">{data.data.summary}</p>
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
