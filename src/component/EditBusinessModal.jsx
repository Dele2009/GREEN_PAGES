import {
  FaBuilding,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaUsers,
  FaFlag,
  FaCity,
  FaChartLine,
  FaUserCircle,
  FaSave,
  FaTimes,
  FaRegEdit,
  FaEye,
  FaEdit,
} from "react-icons/fa";

import { Modal, Button, Label, Select, TextInput } from "flowbite-react";
import { AiOutlineLoading, AiOutlineStop } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { localGovernmentAreas } from "../utils/stateandlocalgovnt";
import { useAppContext } from "../contexts/AppContext";
import DropdownInput from "../utils/DropdownInput";

const EditBusinessModal = ({
  isOpen,
  closeModal,
  details,
  onTextFieldChange,
  isViewing = true,
  toggleMode = () => {},
  onFileFieldChange = () => {},
  onSaveChanges = () => {},
  imagePreview = {},
  isSaving = false,
}) => {
  const { businessCategories, states } = useAppContext();

  const [localGovtOptions, setLocalGovtOptions] = useState([]);
  const formRef = useRef(null);
  useEffect(() => {
    if (details.state) {
      const options = localGovernmentAreas[details.state];
      setLocalGovtOptions(options);
    } else {
      setLocalGovtOptions([]);
    }
  }, [details.state]);

  const hanleSubmit = (e) => {
    e.preventDefault();
    if (formRef.current.checkValidity()) {
      onSaveChanges();
    } else {
      formRef.current.reportValidity();
    }
  };
  return (
    <Modal position="center" show={isOpen} size="5xl" onClose={closeModal}>
      <Modal.Header className="bg-gray-100 border-b border-gray-200 text-lg  font-semibold text-gray-700 ">
        <div className="flex items-center space-x-2">
          {isViewing ? (
            <>
              <FaEye className="text-main_color" />
              <span>Viewing Business Details</span>
            </>
          ) : (
            <>
              <FaEdit className="text-yellow-300" />
              <span>Editing Business Details</span>
            </>
          )}
        </div>
      </Modal.Header>
      <Modal.Body className="bg-gray-50 p-6 space-y-6">
        <form onSubmit={hanleSubmit} ref={formRef}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Owner Name */}
            {/* <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <FaUserCircle className="text-main_color" />
                <span>Owner Name</span>
              </label>
              <TextInput
                type="text"
                name="owner_name"
                required
                disabled
                value={details.owner_name || ""}
                onChange={onTextFieldChange}
                color=""
              />
            </div> */}

            {/* Company Name */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <FaBuilding className="text-main_color" />
                <span>Company Name</span>
              </label>
              <TextInput
                type="text"
                name="companyname"
                required
                disabled={isViewing}
                value={details.companyname || ""}
                onChange={onTextFieldChange}
                color=""
              />
            </div>

            {/* Address */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <FaMapMarkerAlt className="text-main_color" />
                <span>Address</span>
              </label>
              <TextInput
                type="text"
                name="address"
                required
                disabled={isViewing}
                value={details.address || ""}
                onChange={onTextFieldChange}
                color=""
              />
            </div>

            {/* State */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <FaFlag className="text-main_color" />
                <span>State</span>
              </label>
              {/* <TextInput
                 type="text"
                 name="state"
                 value={details.state || ""}
                 onChange={onTextFieldChange}
                 color=""
               /> */}
              <Select
                name="state"
                value={details.state || ""}
                onChange={onTextFieldChange}
                required
                disabled={isViewing}
                color=""
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Select>
            </div>

            {/* Local Government */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <FaFlag className="text-main_color" />
                <span>Local Government</span>
              </label>
              {/* <TextInput
                 type="text"
                 name="localgovernment"
                 value={details.localgovernment || ""}
                 onChange={onTextFieldChange}
                 color=""
               /> */}

              <Select
                name="localgovernment"
                value={details.localgovernment || ""}
                onChange={onTextFieldChange}
                required
                disabled={isViewing}
                color=""
              >
                <option value="">
                  {localGovtOptions.length === 0
                    ? "Select a state to choose"
                    : "----Select Local Govt Area----"}
                </option>
                {localGovtOptions.length > 0 &&
                  localGovtOptions.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
              </Select>
            </div>

            {/* Town */}
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <FaCity className="text-main_color" />
                <span>Category</span>
              </label>
              {/* <TextInput
                 type="text"
                 name="town"
                 value={details.categoryofbusiness || ""}
                 onChange={onTextFieldChange}
                 color=""
               /> */}
              <DropdownInput
                defaultValue={details.categoryofbusiness}
                register={{
                  name: "categoryofbusiness",
                  required: true,
                  disabled: isViewing,
                  // onChange: (e) => onTextFieldChange(e)
                }}
                options={businessCategories}
                placeholder="Type or choose a business category...."
                customStyles={{
                  wrapper: "border-gray-500",
                }}
                onChange={(e) => onTextFieldChange(e)}
              />
            </div>
            {/* Town */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <FaCity className="text-main_color" />
                <span>Town</span>
              </label>
              <TextInput
                type="text"
                name="town"
                required
                disabled={isViewing}
                value={details.town || ""}
                onChange={onTextFieldChange}
                color=""
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <FaEnvelope className="text-main_color" />
                <span>Email</span>
              </label>
              <TextInput
                type="email"
                name="email"
                required
                disabled={isViewing}
                value={details.email || ""}
                onChange={onTextFieldChange}
                color=""
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <FaPhone className="text-main_color" />
                <span>Phone Number</span>
              </label>
              <TextInput
                type="text"
                name="phonenumber"
                required
                disabled={isViewing}
                value={details.phonenumber || ""}
                onChange={onTextFieldChange}
                maxLength={11}
                minLength={11}
                // max={11}
                color=""
              />
            </div>

            {/* WhatsApp Number */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <FaPhone className="text-main_color" />
                <span>WhatsApp Number</span>
              </label>
              <TextInput
                type="text"
                name="whatsappnumber"
                disabled={isViewing}
                // maxLength={11}
                // min={11}
                value={details.whatsappnumber || ""}
                onChange={onTextFieldChange}
                color=""
              />
            </div>

            {/* Website */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <FaGlobe className="text-main_color" />
                <span>Website</span>
              </label>
              <TextInput
                type="url"
                name="website"
                disabled={isViewing}
                value={details.website || ""}
                onChange={onTextFieldChange}
                color=""
              />
            </div>

            {/* Staff Strength */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <FaUsers className="text-main_color" />
                <span>Staff Strength</span>
              </label>
              <TextInput
                type="text"
                name="staffstrength"
                required
                disabled={isViewing}
                value={details.staffstrength || ""}
                onChange={onTextFieldChange}
                color=""
              />
            </div>

            {/* Status */}
            {/* <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <FaChartLine className="text-main_color" />
                <span>Status</span>
              </label>
              <TextInput
                type="text"
                name="status"
                required
                disabled={isViewing}
                value={details.status || ""}
                onChange={onTextFieldChange}
                color=""
              />
            </div> */}

            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4"> */}
            <div className="flex flex-col items-center">
              <Label
                htmlFor="imgs"
                className="w-full h-[300px] cursor-pointer text-center font-medium text-main_color p-3 border border-gray-300 rounded-md bg-gray-100 flex flex-col items-center space-y-2"
              >
                <img
                  src={imagePreview.ceoImg || "/images/upload.png"}
                  alt="CEO"
                  className={`${
                    imagePreview.ceoImg === "/images/upload.png"
                      ? "h-5/6 w-5/6"
                      : "h-full w-full"
                  } rounded-md object-cover`}
                />
                {imagePreview.ceoImg === "/images/upload.png" && (
                  <span className="text-gray-500">
                    Click to upload CEO photo
                  </span>
                )}
              </Label>
              <TextInput
                type="file"
                name="ceoImg"
                id="imgs"
                className="hidden"
                disabled={isViewing}
                onChange={onFileFieldChange}
              />
            </div>

            <div className="flex flex-col items-center">
              <Label
                htmlFor="productImg"
                className="w-full h-[300px] cursor-pointer text-center font-medium text-main_color p-3 border border-gray-300 rounded-md bg-gray-100 flex flex-col items-center space-y-2"
              >
                <img
                  src={imagePreview.logo}
                  alt="Product"
                  className={`${
                    imagePreview.logo === "/images/upload.png"
                      ? "h-5/6 w-5/6"
                      : "h-full w-full"
                  } rounded-md object-cover`}
                />
                {imagePreview.logo === "/images/upload.png" && (
                  <span className="text-gray-500">
                    Click to upload product image
                  </span>
                )}
              </Label>
              <TextInput
                type="file"
                name="logo"
                id="productImg"
                disabled={isViewing}
                className="hidden"
                onChange={onFileFieldChange}
              />
            </div>
            {/* </div> */}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className="bg-gray-100 border-t border-gray-200 flex justify-end space-x-4">
        {isViewing ? (
          <>
            <Button
              color="light"
              onClick={closeModal}
              className="font-semibold text-gray-700 border border-gray-300 hover:bg-gray-200 rounded-md "
            >
              <span className="flex items-center space-x-2">
                <FaTimes />
                <span>Close</span>
              </span>{" "}
            </Button>
            <Button
              onClick={toggleMode}
              className="font-semibold text-white bg-yellow-400 rounded-md "
            >
              <span className="flex items-center space-x-2">
                <FaRegEdit />
                <span>Edit</span>
              </span>
            </Button>
          </>
        ) : (
          <>
            <Button
              color="light"
              onClick={toggleMode}
              disabled={isSaving}
              className="font-semibold text-white !bg-[#ff0000] rounded-md "
            >
              <span className="flex items-center space-x-2">
                <AiOutlineStop />
                <span>Stop Editing</span>
              </span>{" "}
            </Button>
            <Button
              disabled={isSaving}
              onClick={() => {
                formRef.current.requestSubmit();
              }}
              className="font-semibold text-white bg-main_color hover:bg-green-600 rounded-md "
            >
              <span className="flex items-center space-x-2">
                {isSaving ? (
                  <AiOutlineLoading className="size-7 animate-spin" />
                ) : (
                  <>
                    <FaSave />
                    <span>Save Changes</span>
                  </>
                )}
              </span>
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default EditBusinessModal;
