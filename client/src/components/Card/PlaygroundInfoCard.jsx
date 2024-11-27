import React from "react";
import { MdPlace, MdAttachMoney } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AmusementParkIcon from "../../assets/Amusement park-amico.svg";

const PlaygroundInfoCard = ({ data }) => {
  if (!data) return null;

  const { name, address, admissionFee, imageUrl } = data;
  const navigate = useNavigate();

  return (
    <div className="w-full border rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 hover:border-green-600 bg-white">
      {/* Hình ảnh */}
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </div>
      <div className="p-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-green-600">{name}</h3>
          <p className="text-sm text-gray-500 flex items-center"
          onClick={() => navigate("/map")}>
            <MdPlace className="text-green-500 mr-2" />
            {address}
          </p>
          <p className="text-sm text-gray-500 flex items-center">
            <MdAttachMoney className="text-green-500 mr-2" />
            {admissionFee}
          </p>
        </div>

        {/* SVG bên phải */}
        <div className="ml-4 w-16 h-16">
          <img
            src={AmusementParkIcon}
            alt="Amusement Park Icon"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default PlaygroundInfoCard;
