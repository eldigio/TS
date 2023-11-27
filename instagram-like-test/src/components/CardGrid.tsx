import React from "react";

type CardGridProps = {
  children: React.ReactNode;
};

const CardGrid = ({ children }: CardGridProps) => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-3 gap-x-5 my-5">{children}</div>
    </div>
  );
};

export default CardGrid;
