"use client";
import React, { useState } from "react";
import Modal from "../shared/ModalCompo";
import Image from "next/image";
import { BsPlus } from "react-icons/bs";
import { useDeleteTagMutation, useGetAllTagsQuery } from "@/redux/features/tag.api";
import TagForm from "./TagForm";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Loading from "@/app/loading";

export type ITag = { _id: string; label: string; value: string, image: string };

const TagList: React.FC = () => {
  const { data: tags, isLoading, isError } = useGetAllTagsQuery(undefined);
  const [deleteTag] = useDeleteTagMutation();
  const [selectedTag, setSelectedTag] = useState<ITag | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("create");

  const handleEdit = (tag: ITag) => {
    setSelectedTag(tag);
    setModalType("edit");
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTag(id);
    } catch (error) {
      console.error("Failed to delete tag:", error);
    }
  };

  const handleCreate = () => {
    setSelectedTag(null);
    setModalType("create");
    setIsModalOpen(true);
  };

  if (isLoading) return <div className="w-full center">
    <Loading />
  </div>;
  if (isError) return <p>Error loading tags.</p>;

  return (
    <div>
      <button
        onClick={handleCreate}
        className="mb-4 flex justify-center items-center border-2 px-4 py-2 rounded w-full md:w-[600px]"
      >
        <BsPlus size={24} /> Add
      </button>

      <ul>
        {tags?.data.map((tag: ITag) => (
          <li key={tag._id} className="mb-2 p-2 border rounded flex justify-between items-center">
            <div className="flex gap-[20px]">
              <p>
                <Image src={tag.image} alt={tag.label} width={50} height={50} />
              </p>
              <div className="">
                <p>
                  <strong>Label:</strong> {tag.label}
                </p>
                <p>
                  <strong>Value:</strong> {tag.value}
                </p>
              </div>
            </div>
            <div>
              <button
                onClick={() => handleEdit(tag)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(tag._id)}
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
          <TagForm
            initialValues={selectedTag || { label: "", value: "", image: "" }}
            modalType={modalType}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default TagList;
