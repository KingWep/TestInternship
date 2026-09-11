import React, { useState } from "react";

import { Edit, Plus } from "lucide-react";

import { useTranslation } from "react-i18next";

import { useSlides } from "../hooks/useSlides";

import SlideForm from "../components/SlideForm";

import PageHeader from "../../../components/common/PageHeader";

import DataTable from "../../../components/common/DataTable";

import DataTableSkeleton from "../../../components/common/DataTableSkeleton";

import Modal from "../../../components/common/Modal";

import Pagination from "../../../components/common/Pagination";

export default function AdminSlides() {
  const { t } = useTranslation();

  const {
    currentPage,
    isModalOpen,
    editingSlide,
    paginatedSlides,
    totalPages,
    isLoading,
    setCurrentPage,
    handleSubmit,
    handleEdit,
    openAddModal,
    closeModal,
  } = useSlides();

  const columns = [
    {
      header: t("promotions.bgColor"),
      render: (row) => {
        const background = row.backgroundColor?.trim();

        return (
          <div
            className="h-10 w-20 min-w-[2.5rem] rounded-lg border border-slate-200 shadow-sm"
            style={
              background?.includes("gradient")
                ? {
                    backgroundImage: background,
                  }
                : {
                    backgroundColor: background || "#f1f5f9",
                  }
            }
            title={background || ""}
          />
        );
      },
    },
    {
      header: t("promotions.badge"),
      render: (row) => (
        <span className="inline-block whitespace-nowrap font-bold bg-slate-100 text-black/70 py-1 px-2 rounded border-2 border-slate-400">
          {row.tag}
        </span>
      ),
    },
    {
      header: t("promotions.titleLabel"),
      accessor: "title",
    },
    {
      header: t("promotions.descriptionLabel"),
      accessor: "description",
    },
    {
      header: t("promotions.discount"),
      render: (row) => (
        <span className="inline-block whitespace-nowrap font-bold bg-pink-600 text-white py-1 px-2 rounded border-2 border-slate-400">
          {row.discountPercentage || 0}%
        </span>
      ),
    },
    {
      header: t("promotions.ctaText"),
      accessor: "ctaText",
    },
    {
      header: t("promotions.status"),
      render: (row) => (
        <span
          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
            row.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.status === "Active"
            ? t("promotions.active")
            : t("promotions.inactive")}
        </span>
      ),
    },
    {
      header: t("promotions.createdAt"),
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
      header: t("common.actions"),
      align: "right",
      render: (row) => (
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => handleEdit(row)}
            className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-600 transition-colors"
            title={t("promotions.editPromotion")}
          >
            <Edit size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          editingSlide
            ? t("promotions.editPromotion")
            : t("promotions.addPromotionTitle")
        }
      >
        <SlideForm initialData={editingSlide} onSubmit={handleSubmit} />
      </Modal>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title={t("promotions.pageTitle")}
          description={t("promotions.pageDescription")}
        />

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={16} />
          {t("promotions.addPromotionTitle")}
        </button>
      </div>

      <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl">
        {isLoading ? (
          <DataTableSkeleton columns={columns.length} rows={5} />
        ) : (
          <>
            <DataTable columns={columns} data={paginatedSlides} />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
