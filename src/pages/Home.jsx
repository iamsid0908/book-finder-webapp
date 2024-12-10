import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const fetchPosts = async (searchValue = "") => {
  const token = localStorage.getItem("Bearer");

  const response = await axios.get(
    import.meta.env.VITE_BACKEND_BASE_URL +
      "/books/getall" +
      `?writter_name=${searchValue}&&title=${searchValue}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const addToWishlist = async (bookId) => {
  parseInt(bookId);
  const book_id = bookId;
  const token = localStorage.getItem("Bearer");
  const response = await axios.post(
    import.meta.env.VITE_BACKEND_BASE_URL + "/cart/insert",
    { book_id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [searchValue1, setSearchValue1] = useState("");
  const queryClient = useQueryClient();

  const { data, error, isLoading, refetch } = useQuery(
    ["posts", { searchValue }],
    () => fetchPosts(searchValue),
    {
      // staleTime: Infinity,
      // enabled: false,
    }
  );

  const wishlistMutation = useMutation(addToWishlist, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  const handleWishlist = (e, bookId) => {
    e.preventDefault();
    wishlistMutation.mutate(bookId);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(searchValue1);
    refetch();
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Book List</h1>
      <form className="flex items-center gap-4 mb-6">
        <input
          type="text"
          value={searchValue1}
          onChange={(e) => setSearchValue1(e.target.value)}
          className="w-full sm:w-96 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          placeholder="Search by title or writer name..."
        />
        <button
          className="p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
          onClick={(e) => handleSearch(e)}
        >
          Search
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.data.map((post) => (
          <Link to={`/book-details/${post.id}`}>
            <Card
              key={post.id}
              className="bg-white shadow-md hover:shadow-lg transition rounded-lg overflow-hidden"
            >
              <CardHeader className="h-48 flex items-center justify-center bg-gray-200">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="object-cover h-full w-full"
                />
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    {post.title}
                  </CardTitle>
                  <FaHeart
                    className={`ml-2 text-lg ${
                      post.cart ? "text-red-500" : "text-gray-400"
                    }`}
                    onClick={(e) => handleWishlist(e, post.id)}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {post.description || "No description available."}
                </p>
              </CardContent>
              <CardFooter className="p-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Written by {post.writter_name}
                </p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
