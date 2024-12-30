import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PlaygroundBreadcrumb from "./PlaygroundBreadcrumb";
import PlaygroundForm from "./PlaygroundForm";
import { getAttractions } from "../../../../../apis/playground";
import { createPlayground } from "../../../../../apis/admin";
import convertStringToTime from "../../../../../utils/convertStringToTime";

function PlaygroundAdd() {
  const navigate = useNavigate();
  const [allAttractions, setAllAttractions] = useState([]);
  console.log("allAttractions: ", allAttractions);
  const [checkedAttractions, setCheckedAttractions] = useState({});
  console.log("checkedAttractions: ", checkedAttractions);

  const fetchAllAttractions = async () => {
    try {
      const { data } = await getAttractions();
      setAllAttractions(data);
    } catch (e) {
      console.log("error fetch api getAttractions", e);
    }
  };
  const [formData, setFormData] = useState({
    name: "",
    openingTime: "",
    closingTime: "",
    admissionFee: "",
    description: "",
    imageUrl: null,
  });
  console.log("formData: ", formData);

  useEffect(() => {
    fetchAllAttractions();
  }, []);

  useEffect(() => {
    // Initialize checked state based on attractions prop
    const initialChecked = {};
    allAttractions.forEach((attr) => {
      initialChecked[attr._id] = false;
    });
    setCheckedAttractions(initialChecked);
  }, [allAttractions]);

  const handleSubmit = async () => {
    try {
      console.log("submit");
      const newPlaygroundData = {
        ...formData,
        attractions: Object.keys(checkedAttractions)?.filter(
          (id) => checkedAttractions[id]
        ),
        openingTime: convertStringToTime(formData.openingTime),
        closingTime: convertStringToTime(formData.closingTime),
        admissionFee: Number(formData.admissionFee),
        area: "バリアブンタウ",
        address: "35390 Tú Quỳnh Cliff, バリアブンタウ, ベトナム",
      };
      console.log("newPlaygroundData: ", newPlaygroundData);
      const { data } = await createPlayground(newPlaygroundData);
      console.log(" data: ", data);
      navigate("/admin/playgrounds");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[1400px] mx-auto p-6"
      >
        {/* Breadcrumb Navigation */}
        <PlaygroundBreadcrumb />

        {/* Form Section */}
        <PlaygroundForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/admin/playgrounds")}
          allAttractions={allAttractions}
          checkedAttractions={checkedAttractions}
          setCheckedAttractions={setCheckedAttractions}
        />
      </motion.div>
    </div>
  );
}

export default PlaygroundAdd;
