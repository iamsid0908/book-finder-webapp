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
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/Context/authContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User, Heart, Settings, LogOut, Menu } from "lucide-react";

const fetchWishListCount = async () => {
  const response = await axios.get(
    import.meta.env.VITE_BACKEND_BASE_URL + "/cart/cart-size",
    {
      withCredentials: true,
    }
  );
  return response.data;
};

function Primary() {
  const navigate = useNavigate();
  const { fetchUser, useApiCalls } = useAuth();
  const { userLogout } = useApiCalls();

  const queryClient = useQueryClient();

  const { data: wishlistCount, refetch } = useQuery({
    queryKey: ["wishlistCount"],
    queryFn: fetchWishListCount,
  });

  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  if (userLoading) return <div>Loading user...</div>;
  if (userError) return <div>Error fetching user: {userError.message}</div>;

  return (
    <>
      <div className="flex justify-end p-4 bg-gray-100">
        <DropdownMenu>
          <DropdownMenuTrigger className="px-4 py-2 bg-green-400 text-white rounded hover:bg-green-700 focus:outline-none flex items-center gap-2">
            <Menu className="w-5 h-5" /> Menu
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-white border border-gray-200 shadow-lg rounded-md mt-2">
            <DropdownMenuLabel className="font-bold text-gray-700 flex items-center gap-2">
              <User className="w-4 h-4" /> My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="border-gray-200" />
            <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" /> {userData.data.Name}
            </DropdownMenuItem>
            <Link to={`/wish-list`}>
              <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-gray-500" /> My WishList
                </div>
                <span className="ml-2 px-2 py-1 text-sm font-semibold text-white bg-red-500 rounded-full">
                  {wishlistCount.data}
                </span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer flex items-center gap-2">
              <Settings className="w-4 h-4 text-gray-500" /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:bg-gray-100 text-red-600 cursor-pointer flex items-center gap-2"
              onClick={userLogout}
            >
              <LogOut className="w-4 h-4" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Home />
    </>
  );
}

export default Primary;
