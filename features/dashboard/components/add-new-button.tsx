"use client"

import { Plus } from "lucide-react";
import React from "react";

const AddNewButton = () => {
  return (
    <button className="flex flex-row items-center gap-2 bg-[#2682d9]  hover:bg-[#56a9f7]  text-black px-3 py-2 rounded-md cursor-pointer font-mono font-medium transition-all duration-200 shadow-md ">
      <Plus size={20} />
      <span className="font-mono pt-0.5">Create</span>
    </button>
  );
};

export default AddNewButton;
