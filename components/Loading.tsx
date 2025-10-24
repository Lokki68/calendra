"use client";

import { Mosaic } from "react-loading-indicators";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center animate-fade-in pt-16 ">
      <Mosaic
        color={["#32CD32", "#327FCD", "#CD32CD", "#CD8032"]}
        size="large"
        text="Loading..."
        textColor="black"
      />
    </div>
  );
}
