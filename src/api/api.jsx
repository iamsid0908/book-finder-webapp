import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/Context/authContext";

export const useApiCalls = () => {
  const queryClient = useQueryClient();
  const { initializeUser } = useAuth();

  const addToWishlist = async (bookId) => {
    const book_id = parseInt(bookId); // Assign the parsed value

    const response = await axios.post(
      import.meta.env.VITE_BACKEND_BASE_URL + "/cart/insert",
      { book_id },
      {
        withCredentials: true,
      }
    );

    // Invalidate cache to update wishlist count
    queryClient.invalidateQueries(["wishlistCount"]);

    return response.data;
  };

  const userLogout = async () => {
    console.log("logout");
    const response = await axios.get(
      import.meta.env.VITE_BACKEND_BASE_URL + "/auth/logout",
      {
        withCredentials: true,
      }
    );
    queryClient.invalidateQueries(["logout"]);
    localStorage.removeItem("user");
    initializeUser(null);
    return response.data;
  };
  return { addToWishlist, userLogout };
};
