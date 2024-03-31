/* eslint-disable react/prop-types */
import CreateRecordModal from "./CreateRecordModal";
import { useState } from "react";
import axios from "axios";
const TableView = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //const [recordData, setRecordData] = useState({});
  const [hostedId, setHostedId] = useState("");
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreate = async (data) => {
    try {
      const response = await axios.post("/create-records", { data, hostedId });
      closeModal();
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };
  return (
    <div className="mb-12">
      <table className="table-auto max-w-full mx-auto bg-white shadow-md">
        <thead>
          <tr className="bg-blue-500 text-white ">
            <th className="px-4 py-3 text-lg font-semibold border-b border-blue-600">
              SL.No
            </th>
            <th className="px-4 py-3 text-lg font-semibold border-b border-blue-600">
              Hosted zone name
            </th>
            <th className="px-4 py-3 text-lg font-semibold border-b border-blue-600">
              Type
            </th>
            <th className="px-4 py-3 text-lg font-semibold border-b border-blue-600">
              Created by
            </th>
            <th className="px-4 py-3 text-lg font-semibold border-b border-blue-600">
              Record count
            </th>
            <th className="px-4 py-3 text-lg font-semibold border-b border-blue-600">
              Description
            </th>
            <th className="px-4 py-3 text-lg font-semibold border-b border-blue-600">
              Hosted zone ID
            </th>
            <th className="px-4 py-3 text-lg font-semibold border-b border-blue-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
            >
              <td className="px-4 py-3 text-lg border-b border-gray-300">
                {index + 1}
              </td>
              <td className="px-4 py-3 text-lg border-b border-gray-300">
                {item.Name.substring(0, item.Name.length - 1)}
              </td>
              <td className="px-4 py-3 text-lg border-b border-gray-300">
                {item.Config.PrivateZone ? (
                  <span className="px-2 py-1 bg-red-500 hover:bg-red-700 rounded-md text-white">
                    Private
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-green-500 hover:bg-green-700 rounded-md text-white">
                    Public
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-lg border-b border-gray-300">
                {"Route 53"}
              </td>
              <td className="px-4 py-3 text-lg border-b border-gray-300 text-center">
                {item.ResourceRecordSetCount}
              </td>
              <td className="px-4 py-3 text-lg border-b border-gray-300">
                {item.Config.Comment.length > 19
                  ? item.Config.Comment.substring(0, 16) + "..."
                  : item.Config.Comment}
              </td>
              <td className="px-4 py-3 text-lg border-b border-gray-300">
                {item.Id.substring(12)}
              </td>
              <td className="px-4 py-3 text-lg border-b border-gray-300">
                <div className="flex items-center gap-2">
                  <button
                    className="px-2 py-1 bg-green-500 hover:bg-green-700 text-white font-bold rounded-md"
                    onClick={() => {
                      setHostedId(item.Id.substring(12));
                      console.log("Hosted Id:", hostedId); // Log the value of hostedI
                      openModal();
                    }}
                  >
                    Create Records
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <CreateRecordModal onClose={closeModal} onCreate={handleCreate} />
      )}
    </div>
  );
};

export default TableView;
