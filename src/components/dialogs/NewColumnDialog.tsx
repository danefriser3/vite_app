import { useEffect, useState } from "react";
import { useTaskContext } from "../../context/TaskContext";
import { Queue } from "@mui/icons-material";
import { SubmitHandler, useForm } from "react-hook-form";
import { NewColumnFormFields } from "../../utils/types";

const NewColumnDialog = () => {
  const { addColumn } = useTaskContext();
  const [isColumnDialogOpen, setIsColumnDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewColumnFormFields>({
    defaultValues: { columnName: "" },
  });

  useEffect(() => {
    if (isColumnDialogOpen) {
      reset({ columnName: "" });
    }
  }, [isColumnDialogOpen, reset]);

  const onSubmit: SubmitHandler<NewColumnFormFields> = ({
    columnName,
  }: NewColumnFormFields) => {
    if (!columnName.trim()) {
      return;
    }
    addColumn(columnName);
    reset({ columnName: "" });
    setIsColumnDialogOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsColumnDialogOpen(true)}
        className="bg-blue-500 flex flex-row text-white py-1 px-2 rounded-md hover:bg-blue-700 border-none rounded-l-none "
      >
        <Queue fontSize="small" /> Category
      </button>
      {isColumnDialogOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-600 rounded-lg p-6 w-96 flex flex-col gap-2 shadow-[-2px_2px_6px_2px_rgba(0,0,0,0.5)]">
            <h2 className="text-lg font-bold mb-4 text-black">
              Add New Category
            </h2>
            <input
              type="text"
              autoFocus
              {...register("columnName", {
                required: "Category name is required",
              })}
              placeholder="Category Name"
              className="border rounded px-2 py-1 w-full text-black1"
            />
            {errors.columnName && (
              <p className="text-red-500 text-xs font-bold">
                {errors.columnName.message}
              </p>
            )}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsColumnDialogOpen(false)}
                className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit(onSubmit)}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewColumnDialog;
