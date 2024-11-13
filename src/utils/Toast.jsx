// utils/toast.js
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/**
 * Shows toast messge using Props
 */

export const showToast = (
  type = "",
  message,
  position = "top-right",
  options = {},
) => {
  switch (type) {
    case "success":
      toast.success(message, { ...options, position });
      break;
    case "error":
      toast.error(message, { ...options, position });
      break;
    case "info":
      toast.info(message, { ...options, position });
      break;
    case "warning":
      toast.warning(message, { ...options, position });
      break;
    case "promise":
      // For async/await usage
      return toast.promise(
        message.promise, // Expect a promise in the message argument
        {
          pending: message.pending || "Loading...",
          success: message.success || "Success!",
          error: message.error || "Something went wrong!",
        },
        { ...options, position },
      );
    default:
      toast(message, { ...options, position }); // Default toast if type is not specified
      break;
  }
};
