import { useEffect, useState } from "react";
import { useTaskContext } from "../../context/TaskContext";
import { Queue } from "@mui/icons-material";

const NewColumnDialog = () => {
  const { addColumn } = useTaskContext();
  const [columnName, setColumnName] = useState("");
  const [isColumnDialogOpen, setIsColumnDialogOpen] = useState(false);

  useEffect(() => {
    if (isColumnDialogOpen) {
      setColumnName("");
    }
  }, [isColumnDialogOpen]);

  const handleAddColumn = () => {
    if (!columnName.trim()) {
      return;
    }
    addColumn(columnName);
    setColumnName("");
    setIsColumnDialogOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsColumnDialogOpen(true)}
        className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-700 border-none rounded-l-none "
      >
        <Queue fontSize="small" /> Category
      </button>
      {isColumnDialogOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-600 rounded-lg p-6 w-96  shadow-[-2px_2px_6px_2px_rgba(0,0,0,0.5)]">
            <h2 className="text-lg font-bold mb-4 text-black">
              Add New Category
            </h2>
            <input
              type="text"
              autoFocus
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
              placeholder="Category Name"
              className="border rounded px-2 py-1 w-full mb-4 text-black1"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsColumnDialogOpen(false)}
                className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddColumn}
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
