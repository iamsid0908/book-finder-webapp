import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Heart, BookOpen, ChevronRight } from "lucide-react";
import { useAuth } from "@/Context/authContext";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const fetchPosts = async (searchValue = "", page, limit) => {
  const response = await axios.get(
    import.meta.env.VITE_BACKEND_BASE_URL +
      "/books/getall" +
      `?writter_name=${searchValue}&&title=${searchValue}&&limit=${limit}&page=${page}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [searchValue1, setSearchValue1] = useState("");
  const queryClient = useQueryClient();
  const { useApiCalls } = useAuth();
  const { addToWishlist } = useApiCalls();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["posts", { searchValue }],
    queryFn: () => fetchPosts(searchValue, currentPage, limit),
    // staleTime: Infinity,
    // enabled: false,
  });

  const wishlistMutation = useMutation({
    mutationFn: (bookId) => addToWishlist(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["wishlistCount"] });
    },
  });

  const handleWishlist = async (e, bookId) => {
    e.preventDefault();
    wishlistMutation.mutate(bookId);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(searchValue1);
    refetch();
  };
  const totalPages = data?.meta?.total_pages || 1;
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    refetch();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              Discover Your Next Favorite Book
            </h1>
            <p className="text-lg text-black max-w-2xl mx-auto">
              Explore our curated collection of books from various genres
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <form
          onSubmit={handleSearch}
          className="relative bg-white rounded-xl shadow-lg p-2 transition-all duration-300 hover:shadow-xl"
        >
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-3 px-4">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchValue1}
                onChange={(e) => setSearchValue1(e.target.value)}
                className="w-full py-3 border-none focus:ring-0 text-lg placeholder-gray-400 outline-none"
                placeholder="Search by title or author name..."
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-primary-600 text-white bg-green-400 hover:bg-green-700 rounded-lg shadow-md hover:bg-primary-700 transition-colors duration-200 flex items-center gap-2"
            >
              <span>Search</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Book Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data.data.map((book) => (
            <Link
              to={`/book-details/${book.id}`}
              key={book.id}
              className="group relative bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={(e) => handleWishlist(e, book.id)}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg transition-all duration-200 hover:bg-white"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      book.cart ? "fill-red-500 text-red-500" : "text-gray-600"
                    }`}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {book.description || "No description available."}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <BookOpen className="w-4 h-4" />
                  <span>{book.writter_name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Pagination className="mt-5">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
                className={
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                }
                className={
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default Home;
