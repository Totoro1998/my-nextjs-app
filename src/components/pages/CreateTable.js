// import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Input, Select, Option } from "@/ui/material-tailwind";
import { TrashIcon } from "@heroicons/react/24/outline";
import Switch from "@/components/basic/Switch";
import Button from "@/components/basic/Button";
import Textarea from "@/components/basic/Textarea";
import Dialog from "@/components/basic/Dialog";
import { DDL_LABEL, DDL_PLACEHOLDER } from "@/const/tables";

const dataTypes = [
  { value: "mysql", text: "MySQL" },
  { value: "postgresql", text: "PostgreSQL" },
  { value: "clickhouse", text: "ClickHouse" },
];

function Fields({ control, watch }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });
  const watchFieldArray = watch("columns");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });
  return (
    <div className="space-y-2">
      <div className="space-y-2">
        {controlledFields.map((item, index) => {
          return (
            <div className="flex items-center gap-x-2" key={item.id}>
              <Controller
                name={`columns.${index}.name`}
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field, fieldState }) => (
                  <>
                    <Input label="Column name" {...field} required></Input>
                    {fieldState.error ? fieldState.error.message : null}
                  </>
                )}
              ></Controller>
              <Controller
                name={`columns.${index}.datatype`}
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Select label="Select data type" {...field} required>
                    {dataTypes.map((item) => {
                      return (
                        <Option key={item.value} value={item.value}>
                          {item.text}
                        </Option>
                      );
                    })}
                  </Select>
                )}
              ></Controller>
              <Controller
                name={`columns.${index}.comment`}
                control={control}
                render={({ field }) => (
                  <Input label="Comment" {...field}></Input>
                )}
              ></Controller>
              <div>
                <TrashIcon
                  className="w-5 h-5 text-red cursor-pointer"
                  onClick={() => remove(index)}
                ></TrashIcon>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-end text-primary text-sm cursor-pointer">
        <button
          type="button"
          onClick={() => {
            append({ name: "", datatype: "", comment: "" });
          }}
        >
          + Add column
        </button>
      </div>
    </div>
  );
}

export default function CreateTable({ showDialog, onShowChange }) {
  const [open, setOpen] = useState(showDialog);
  const [ddl, setDdl] = useState("");
  const defaultValues = {
    table_name: "",
    table_desc: "",
    columns: [
      { name: "", datatype: "", comment: "" },
      { name: "", datatype: "", comment: "" },
      { name: "", datatype: "", comment: "" },
    ],
  };
  const [useDDL, setUseDDL] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
  });
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  function closeModal() {
    setOpen(false);
    onShowChange(false);
  }

  useEffect(() => {
    setOpen(showDialog);
  }, [showDialog]);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      title="Create New Table"
      footer={
        <div className="mt-4 flex justify-end gap-x-2">
          <Button onClick={closeModal} className="bg-white text-gray text-sm">
            CANCEL
          </Button>
          <Button onClick={closeModal} className="text-sm">
            SAVE
          </Button>
        </div>
      }
    >
      <div className="space-y-4 mt-4">
        <div className="flex gap-x-2">
          <Controller
            name="table_name"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field, fieldState }) => (
              <>
                <Input label="Table name" {...field} required></Input>
                {fieldState.error ? fieldState.error.message : null}
              </>
            )}
          />
          <Controller
            name="table_name"
            control={control}
            render={({ field }) => (
              <>
                <Input label="Table description" {...field} required></Input>
              </>
            )}
          />
        </div>
        <div>
          <span className="flex items-center">
            <Switch
              checked={useDDL}
              onCheckedChange={(e) => {
                setUseDDL(e);
              }}
            ></Switch>
            <span className="ml-3 text-gray font-medium text-base">
              Use data definition language(DDL){" "}
            </span>
          </span>
        </div>
        {useDDL ? (
          <div>
            <label
              htmlFor="ddl"
              className="text-base font-medium text-primary-medium flex justify-between w-full cursor-pointer"
            >
              <span>{DDL_LABEL}</span>
            </label>
            <div className="w-full mt-2">
              <Textarea
                name="ddl"
                id="ddl"
                value={ddl}
                onChange={setDdl}
                className="textarea-content-card"
                placeholder={DDL_PLACEHOLDER}
              />
            </div>
          </div>
        ) : (
          <div className="mt-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Fields
                {...{
                  control,
                  register,
                  watch,
                  errors,
                }}
              />
            </form>
          </div>
        )}
      </div>
    </Dialog>
  );
}
