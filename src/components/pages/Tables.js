"use client";
import { cn } from "@/lib/utils";
import { Input } from "@/ui/material-tailwind";
import Table from "@/components/basic/Table";
import Button from "@/components/basic/Button";
import Dialog from "@/components/basic/Dialog";
import CreateTable from "./CreateTable";
import { useState } from "react";
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
  EyeIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

export default function Tables() {
  const [search, setSearch] = useState();
  let [isOpen, setIsOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [processingData, setProcessingData] = useState({
    table: "",
    type: "",
  });

  const columns = [
    { key: "name", label: "NAME" },
    { key: "description", label: "DESCRIPTION" },
    { key: "created", label: "CREATED" },
    {
      key: "actions",
      label: "ACTIONS",
      render: (row) => (
        <span className="flex gap-x-2 text-gray-icon">
          <EyeIcon
            className="w-5 h-5 cursor-pointer"
            onClick={() => handleViewDialog(row)}
          ></EyeIcon>
          <PencilSquareIcon
            className="w-5 h-5 cursor-pointer"
            onClick={() => handleEditDialog(row)}
          ></PencilSquareIcon>
          <TrashIcon
            className="w-5 h-5 cursor-pointer text-red"
            onClick={() => handleShowDeletedDialog(row)}
          ></TrashIcon>
        </span>
      ),
    },
  ];

  const [tableData, setTableData] = useState([
    { name: "John", description: 28, created: "john@example.com" },
    { name: "John", description: 28, created: "john@example.com" },
    { name: "John", description: 29, created: "john@example.com" },
    { name: "John", description: 28, created: "john@example.com" },
    { name: "John", description: 28, created: "john@example.com" },
  ]);

  function handleShowDeletedDialog(row) {
    setProcessingData({
      table: row,
      type: "delete",
    });
    setIsOpen(true);
  }
  function handleEditDialog(row) {
    setProcessingData({
      table: row,
      type: "edit",
    });
  }
  function handleViewDialog(row) {
    setProcessingData({
      table: row,
      type: "view",
    });
  }
  function handleDeleteTable() {}

  return (
    <div className="w-full flex flex-col items-center justify-center xs:px-4">
      <div
        className={cn(
          "p-4 space-y-4 w-full md:max-w-2xl lg:max-w-5xl md:py-[40px] md:px-[50px] content-wrapper"
        )}
      >
        <div className="flex items-center justify-between">
          <span className="title text-gray font-bold text-xl">Tables</span>
          <span className="flex items-center">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={search}
              defaultValue={search}
              onChange={(e) => setSearch(e.target.value)}
            ></Input>
            <Button className="ml-2" onClick={() => setShowDialog(true)}>
              <PlusCircleIcon className="h-5 w-5" />
              <span className="ml-2">new table</span>
            </Button>
          </span>
        </div>
        <Table data={tableData} columns={columns} rowsPerPage={10} />
        <CreateTable
          showDialog={showDialog}
          onShowChange={setShowDialog}
        ></CreateTable>
        <Dialog
          open={isOpen}
          onOpenChange={setIsOpen}
          footer={
            <div className="mt-4 flex gap-x-2 justify-center">
              <Button onClick={() => handleDeleteTable()} className="bg-red">
                Yes
              </Button>
              <Button
                onClick={() => setIsOpen(false)}
                className="bg-white text-gray-input"
              >
                No
              </Button>
            </div>
          }
        >
          <div className="mt-2">
            <p>{`Are you sure you want to delete this table(${processingData.table.name})?`}</p>
          </div>
        </Dialog>
      </div>
    </div>
  );
}
