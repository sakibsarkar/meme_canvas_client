"use client";
import { useDeleteBrandMutation, useGetAllBrandsQuery } from "@/redux/features/brand/brand.api";
import React, { useState } from "react";
import Modal from "../shared/ModalCompo";
import BrandForm from "./BrandForm";
import Image from "next/image";
import { BsPlus } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Loading from "@/app/loading";

export type IBrand = { _id: string; label: string; value: string, image:string };


const BrandList: React.FC = () => {
  const { data: brands, isLoading, isError } = useGetAllBrandsQuery(undefined);
  const [deleteBrand] = useDeleteBrandMutation();
  const [selectedBrand, setSelectedBrand] = useState<IBrand | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("create");

  const handleEdit = (brand:IBrand) => {
    setSelectedBrand(brand);
    setModalType("edit");
    setIsModalOpen(true);
  };

  const handleDelete = async (id:string) => {
    try {
      await deleteBrand(id);
    } catch (error) {
      console.error("Failed to delete brand:", error);
    }
  };

  const handleCreate = () => {
    setSelectedBrand(null);
    setModalType("create");
    setIsModalOpen(true);
  };

  if (isLoading) return <div className="w-full center">
    <Loading />
  </div>;
  if (isError) return <p>Error loading brands.</p>;

  return (
    <div>
      <button
        onClick={handleCreate}
        className="mb-4 flex justify-center items-center border-2 px-4 py-2 rounded w-full md:w-[600px]"
      >
        <BsPlus size={24} /> Add
      </button>

      <ul>
        {brands?.data.map((brand:IBrand) => (
          <li key={brand._id} className="mb-2 p-2 border rounded flex justify-between items-center">
            <div className="flex gap-[20px]">
              <p>
                <Image src={brand.image} alt={brand.label} width={50} height={50} />
              </p>
              <div className="">
                <p>
                  <strong>Label:</strong> {brand.label}
                </p>
                <p>
                  <strong>Value:</strong> {brand.value}
                </p>
              </div>
            </div>
            <div>
              <button
                onClick={() => handleEdit(brand)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(brand._id)}
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
          <BrandForm
            initialValues={selectedBrand || { label: "", value: "", image: "" }}
            modalType={modalType}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default BrandList;
