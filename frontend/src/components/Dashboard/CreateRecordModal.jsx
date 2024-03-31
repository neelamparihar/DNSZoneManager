/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";

const CreateRecordModal = ({
  onClose,
  onCreate,
  formData: initialFormData = { dnsType: "A" },
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear any previous error when the user changes the input value
    setError("");
  };

  const handleCreate = (e) => {
    e.preventDefault();

    // Validate the input value based on the selected DNS type
    if (!validateInput(formData.dnsType, formData.value)) {
      setError("Invalid value for selected DNS type.");
      setShowErrorPopup(true); // Display pop-up for incorrect value
      return;
    }
    // Call onCreate callback with form data if validation passes
    onCreate(formData);
  };

  // Function to validate the input value based on DNS type
  const validateInput = (dnsType, value) => {
    switch (dnsType) {
      case "A":
        // Validate IPv4 address
        return /^(\d{1,3}\.){3}\d{1,3}$/.test(value);
      case "AAAA":
        // Validate IPv6 address
        return /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/.test(value);
      case "CNAME":
        // Validate CNAME
        return /^[a-zA-Z0-9.-]+$/.test(value);
      case "MX":
        // Validate MX record
        return /^[a-zA-Z0-9.-]+$/.test(value);
      case "NS":
        // Validate NS record
        return /^[a-zA-Z0-9.-]+$/.test(value);
      default:
        // No specific validation needed for other types
        return true;
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-2/5 shadow-lg">
        <h2 className="text-2xl mb-4 text-blue-700 font-semibold">
          Create Record
        </h2>
        <form onSubmit={handleCreate}>
          <div className="mb-4 relative">
            <label className="block mb-2 text-gray-800 font-semibold">
              DNS Type
            </label>
            <div className="relative">
              <select
                id="dnsType"
                name="dnsType"
                value={formData.dnsType || "A"} // Default value set to "A"
                onChange={handleChange}
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="A">A (IPv4 Address) Record</option>
                <option value="AAAA">AAAA (IPv6 Address) Record</option>
                <option value="CNAME">CNAME (Canonical Name) Record</option>
                <option value="MX">MX (Mail Exchange) Record</option>
                <option value="NS">NS (Name Server) Record</option>
                <option value="PTR">PTR (Pointer) Record</option>
                <option value="SOA">SOA (Start of Authority) Record</option>
                <option value="SRVA">SRV (Service) Record</option>
                <option value="TXT">TXT (Text) Record</option>
                <option value=" DNSSEC"> DNSSEC</option>
                {/* A (Address)
                Record 2. AAAA (IPv6 Address) Record 3. CNAME (Canonical Name)
                Record 4. MX (Mail Exchange) Record 5. NS (Name Server) Record
                6. PTR (Pointer) Record 7. SOA (Start of Authority) Record 8.
                SRV (Service) Record 9. TXT (Text) Record 10. DNSSEC */}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M10 12L5 7h10l-5 5z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-800 font-semibold">
              Domain Name
            </label>
            <input
              type="text"
              name="domainName"
              value={formData.domainName || ""}
              onChange={handleChange}
              className="block w-full bg-gray-100 border border-gray-400 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-gray-800 font-semibold">
              TTL (Time To Live)
            </label>
            <input
              type="text"
              name="ttl"
              value={formData.ttl || ""}
              onChange={handleChange}
              className="block w-full bg-gray-100 border border-gray-400 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Input field for the value */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-800 font-semibold">
              Value
            </label>
            <input
              type="text"
              name="value"
              value={formData.value || ""}
              onChange={handleChange}
              className="block w-full bg-gray-100 border border-gray-400 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Error pop-up for incorrect value */}
          {showErrorPopup && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <p className="text-red-500">{error}</p>
                <button
                  onClick={() => setShowErrorPopup(false)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
                >
                  OK
                </button>
              </div>
            </div>
          )}

          {/* Submit and cancel buttons */}
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

export default CreateRecordModal;