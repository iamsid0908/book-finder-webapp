import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Home from "./Home";
import { useQuery } from "react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const fetchUser = async () => {
  const token = localStorage.getItem("Bearer");
  const response = await axios.get(
    import.meta.env.VITE_BACKEND_BASE_URL + "/user/get-user-name",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
const fetchWishListCount = async () => {
  const token = localStorage.getItem("Bearer");
  const response = await axios.get(
    import.meta.env.VITE_BACKEND_BASE_URL + "/cart/cart-size",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
function Primary() {
  const navigate = useNavigate();

  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useQuery("user", fetchUser, {
    // staleTime: Infinity
  });

  const {
    data: wishListData,
    error: wishListError,
    isLoading: wishListLoading,
  } = useQuery("wishlistCount", fetchWishListCount, { staleTime: Infinity });

  const handleLogout = (e) => {
    localStorage.removeItem("Bearer");
    localStorage.removeItem("user_id");
    navigate("/");
  };
  if (userLoading || wishListLoading) return <div>Loading...</div>;
  // Handle errors
  if (userError) return <div>Error fetching user: {userError.message}</div>;
  if (wishListError)
    return <div>Error fetching wishlist: {wishListError.message}</div>;
  return (
    <>
      <div className="flex justify-end p-4 bg-gray-100">
        <DropdownMenu>
          <DropdownMenuTrigger className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none">
            Menu
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-white border border-gray-200 shadow-lg rounded-md mt-2">
            <DropdownMenuLabel className="font-bold text-gray-700">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="border-gray-200" />
            <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
              {userData.data}
            </DropdownMenuItem>
            <Link to={`/wish-list`}>
              <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer flex items-center justify-between">
                My WishList
                <span className="ml-2 px-2 py-1 text-sm font-semibold text-white bg-red-500 rounded-full">
                  {wishListData.data}
                </span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:bg-gray-100 text-red-600 cursor-pointer"
              onClick={(e) => handleLogout(e)}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Home />
    </>
  );
}

export default Primary;
