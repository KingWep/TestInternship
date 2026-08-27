import React, { useState } from "react";
import { Edit } from "lucide-react";
import { useSlides } from "../hooks/useSlides";
import SlideForm from "../components/SlideForm";
import PageHeader from "../../../components/common/PageHeader";
import DataTable from "../../../components/common/DataTable";
import Modal from "../../../components/common/Modal";
import Pagination from "../../../components/common/Pagination";

export default function AdminSlides() {
  const {
    currentPage,
    isModalOpen,
    editingSlide,
    paginatedSlides,
    totalPages,
    setCurrentPage,
    handleSubmit,
    handleEdit,
    closeModal,
  } = useSlides();

  const columns = [
    {
      header: "ពណ៌ (Background)",
      render: (row) => (
        <div
          className="h-10 w-20 min-w-[2.5rem] rounded-lg border border-slate-200 shadow-sm"
          style={{ backgroundColor: row.backgroundColor || "#FF5733" }}
          title={row.backgroundColor}
        />
      ),
    },
    {
      header: "ស្លាក",
      render: (row) => (
        <span className="inline-block whitespace-nowrap font-bold bg-slate-100 text-black/70 py-1 px-2 rounded border-2 border-slate-400">
          {row.tag}
        </span>
      ),
    },
    { header: "ចំណងជើង", accessor: "title" },
    { header: "ការពិពណ៌នា", accessor: "description" },
    {
      header: "បញ្ចុះតម្លៃ (%)",
      render: (row) => (
        <span className="inline-block whitespace-nowrap font-bold bg-pink-600 text-white py-1 px-2 rounded border-2 border-slate-400">
          {row.discountPercentage || 0}%
        </span>
      ),
    },
    { header: "អត្ថបទប៊ូតុង", accessor: "ctaText" },
    {
      header: "ស្ថានភាព",
      render: (row) => (
        <span
          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
            row.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.status === "Active" ? "សកម្ម" : "អសកម្ម"}
        </span>
      ),
    },
    {
      header: "កាលបរិច្ឆេទបង្កើត",
      render: (row) => (
        <span className="text-sm text-slate-600">
          {row.createdAt
            ? new Date(row.createdAt).toLocaleString("km-KH", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "—"}
        </span>
      ),
    },
    {
      header: "សកម្មភាព",
      align: "right",
      render: (row) => (
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => handleEdit(row)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-amber-500 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-600 transition-all"
            title="កែប្រែស្លាយ"
          >
            <Edit size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingSlide ? "កែប្រែស្លាយ" : "បន្ថែមស្លាយថ្មី"}
      >
        <SlideForm initialData={editingSlide} onSubmit={handleSubmit} />
      </Modal>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="បដាស្លាយ"
          description="គ្រប់គ្រងស្លាយ និងក្រាហ្វិកផ្សព្វផ្សាយ។"
        />
      </div>
      <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl">
        <DataTable columns={columns} data={paginatedSlides} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
