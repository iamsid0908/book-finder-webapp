import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"; // ✅ Correct import
import axios from "axios";
import { FaHeart, FaTrashAlt } from "react-icons/fa";

import { Link } from "react-router-dom";

const fetchWishList = async () => {
  const token = localStorage.getItem("Bearer");
  const response = await axios.get(
    import.meta.env.VITE_BACKEND_BASE_URL + "/cart/get-cart",
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const deleteFromWishList = async (bookId) => {
  parseInt(bookId);
  const book_id = bookId;
  const response = await axios.delete(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/cart/cart-remove`,
    {
      withCredentials: true,
      data: { book_id: bookId },
    }
  );
  return response.data;
};

function Mywishlist() {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ["wish"],
    queryFn: fetchWishList,
  });

  const wishlistMutation = useMutation({
    mutationFn: deleteFromWishList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wish"] });
    },
  });

  const handleDelete = (e, bookId) => {
    e.preventDefault();
    wishlistMutation.mutate(bookId);
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.data.map((post) => (
          <Link to={`/book-details/${post.book_id}`} key={post.id}>
            <Card className="bg-white shadow-md hover:shadow-lg transition rounded-lg overflow-hidden">
              <CardHeader className="h-48 flex items-center justify-center bg-gray-200">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="object-cover h-full w-full"
                />
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    {post.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <FaHeart
                      className={`text-lg cursor-pointer ${
                        post.cart ? "text-red-500" : "text-gray-400"
                      }`}
                    />
                    <FaTrashAlt
                      className="text-lg text-gray-500 cursor-pointer hover:text-red-500"
                      onClick={(e) => handleDelete(e, post.book_id)}
                    />
                  </div>
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

export default Mywishlist;
