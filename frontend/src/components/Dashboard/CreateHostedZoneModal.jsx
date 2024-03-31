import React from "react";

const CreateHostedZoneModal = ({
  onClose,
  formData,
  handleChange,
  handleSubmit,
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-2/5 shadow-lg">
        <h2 className="text-2xl mb-4 text-blue-700 font-semibold">
          Create Hosted Zone
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="Name"
              className="block mb-2 text-gray-800 font-semibold"
              placeholder="example.com"
            >
              Domain Name
            </label>
            <input
              type="text"
              id="Name"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          {/* <div className="mb-4">
            <label
              htmlFor="CallerReference"
              className="block mb-2 text-gray-800 font-semibold"
            >
              Caller Reference
            </label>
            <input
              type="text"
              id="CallerReference"
              name="CallerReference"
              value={formData.CallerReference}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div> */}
          <div className="mb-4">
            <label
              htmlFor="Comment"
              className="block mb-2 text-gray-800 font-semibold"
            >
              Description
            </label>
            <input
              type="text"
              id="Comment"
              name="Comment"
              value={formData.Comment}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4 flex items-center gap-2">
            <label
              htmlFor="PrivateZone"
              className="block mb-2 text-gray-800 font-semibold "
            >
              Private Zone
            </label>
            <input
              type="checkbox"
              id="PrivateZone"
              name="PrivateZone"
              checked={formData.PrivateZone}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-5 h-5"
            />
          </div>
          {/* Add more form fields as needed */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
          >
            Create
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHostedZoneModal;
