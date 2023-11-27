import { useEffect, useState } from "react";

const useToast = () => {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsShowing(false), 2500);
  }, [isShowing]);
};
