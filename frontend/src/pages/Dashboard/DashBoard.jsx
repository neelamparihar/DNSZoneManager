import { useEffect, useState } from "react";
import axios from "axios";
import TableView from "../../components/Dashboard/TableView";
import CreateHostedZoneModal from "../../components/Dashboard/CreateHostedZoneModal";

const Dashboard = () => {
  const [hostedZones, setHostedZones] = useState([]);
  useEffect(() => {
    const fetchHostedZones = async () => {
      try {
        const response = await axios.get("/list-hosted-zones");
        setHostedZones(response.data);
        console.log(hostedZones);
      } catch (error) {
        console.error("Error fetching hosted zones:", error);
      }
    };
    fetchHostedZones();
  }, []);
  //--------------------------------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    Name: "",
    CallerReference: "",
    Comment: "",
    PrivateZone: false,
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? e.target.checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/create-hosted-zone", formData);
      console.log("Response from backend:", response.data);

      closeModal(); // Close modal after successful submission
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  //============================================
  return (
    <div className="mt-28">
      <button
        onClick={() => {
          openModal();
          setFormData({
            Name: "",
            CallerReference: "",
            Comment: "",
            PrivateZone: false,
          });
        }}
        className="flex mx-auto my-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md "
      >
        Create Hosted Zone
      </button>

      {isModalOpen && (
        <CreateHostedZoneModal
          onClose={closeModal}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        ></CreateHostedZoneModal>
      )}
      <TableView data={hostedZones} />
    </div>
  );
};

export default Dashboard;
