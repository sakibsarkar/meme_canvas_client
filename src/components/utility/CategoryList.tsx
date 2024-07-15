"use client";
import React, { useState } from "react";
import {
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/features/category/category.api";
import CategoryForm from "./CategoryForm";
import Modal from "../shared/ModalCompo";
import Image from "next/image";
import { BsPlus } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Loading from "@/app/loading";

export type ICategory = { _id: string; label: string; value: string, image:string };

const CategoryList: React.FC = () => {
  const {
    data: categories,
    isLoading,
    isError,
  } = useGetAllCategoriesQuery(undefined);
  const [deleteCategory] = useDeleteCategoryMutation();
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("create");

  const handleEdit = (category:ICategory) => {
    setSelectedCategory(category);
    setModalType("edit");
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleCreate = () => {
    setSelectedCategory(null);
    setModalType("create");
    setIsModalOpen(true);
  };

  if (isLoading) return <div className="w-full center">
    <Loading />
  </div>;
  if (isError) return <p>Error loading categories.</p>;

  return (
    <div>
      <button
        onClick={handleCreate}
        className="mb-4 flex justify-center items-center border-2 px-4 py-2 rounded w-full md:w-[600px]"
      >
        <BsPlus size={24} /> Add
      </button>

      <ul>
        {categories?.data.map((category: ICategory) => (
          <li
            key={category._id}
            className="mb-2 p-2 border rounded flex justify-between items-center"
          >
            <div className="flex gap-[20px]">
              <p>
                <Image src={category.image} alt={category.label} width={50} height={50} />
              </p>
              <div className="">
                <p>
                  <strong>Label:</strong> {category.label}
                </p>
                <p>
                  <strong>Value:</strong> {category.value}
                </p>
              </div>
            </div>
            <div>
              <button
                onClick={() => handleEdit(category)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(category._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                <MdDelete />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <CategoryForm
            initialValues={
              selectedCategory || { label: "", value: "", image: "" }
            }
            modalType={modalType}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default CategoryList;
