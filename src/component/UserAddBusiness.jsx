import React, { useState, useEffect } from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import {
  Alert,
  Button,
  Checkbox,
  Label,
  Modal,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import { showToast } from "../utils/Toast";
import { AiOutlineLoading } from "react-icons/ai";
import DropdownInput from "../utils/DropdownInput";
import { useAppContext } from "../contexts/AppContext";
import { localGovernmentAreas } from "../utils/stateandlocalgovnt";

const UserAddBusiness = () => {
  const { businessCategories, states } = useAppContext();

  const [image, setImage] = useState("/images/upload.png");
  const [productImage, setProductImage] = useState("/images/upload.png");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localGovtOptions, setLocalGovtOptions] = useState([]);
  // const [states, setStates] = useState([]);

  const schema = yup.object().shape({
    companyname: yup.string().required("Name is required!"),
    email: yup
      .string()
      .email("Email is not valid")
      .required("Email is required!"),
    state: yup.string().required("State is required"),
    localgovernment: yup.string().required("This field is required!"),
    town: yup.string().required("Please enter your town"),
    sector: yup.string().required("Please your Business sector"),
    phonenumber: yup
      .string()
      .required("Phone number is required")
      .matches(/^\d{11}$/, "Phone number is not valid"),
    whatsappnumber: yup.string().matches(/^\d{11}$/, "Number is not valid"),
    categoryofbusiness: yup.string().required("Input a Business Category"),
    website: yup
      .string()
      .url(
        'Invalid URL, must contain "https://" & domain extension e.g ".com", ".net"'
      )
      .required("URL is required"),
    ceoImg: yup.string(),
    productImage: yup.string(),
    staffstrength: yup.string().required("Required!"),
    address: yup.string().required("Required!"),
    isAuthorized: yup.boolean().oneOf([true], "You must authorize to proceed"),
  });

  const {
    control,
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const state = watch("state");
  useEffect(() => {
    if (state) {
      const options = localGovernmentAreas[state];
      setLocalGovtOptions(options);
    } else {
      setLocalGovtOptions([]);
    }
  }, [state]);

  const submitForm = async (data) => {
    setLoading(true);
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    const ceoImageFile = document.getElementById("imgs").files[0];
    const productImageFile = document.getElementById("productImg").files[0];

    if (ceoImageFile) {
      formData.append("ceoImg", ceoImageFile);
    }
    if (productImageFile) {
      formData.append("logo", productImageFile);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.REACT_APP_API_URL}/api/add-business/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${Cookies.get("token")}`,
          },
        }
      );
      // setMessage('Business Submitted For Approval')
      showToast("success", "Business Submitted For Approval");
      setIsSuccess(true);
      reset();
      setImage("/images/upload.png");
      setProductImage("/images/upload.png");
    } catch ({ response: { data }, message }) {
      console.log(data.message, data.message[0]);
      if (data.message[0] && data.message[0].length > 0) {
        data.message[0].forEach((mesg) => {
          showToast("error", mesg);
        });
      } else {
        showToast("error", data.message);
      }
      // setMessage(err.message);

      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setMessage("");

  const handleImage = (e) => setImage(URL.createObjectURL(e.target.files[0]));
  const handleProduct = (e) =>
    setProductImage(URL.createObjectURL(e.target.files[0]));

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">
          Add Your Business
        </h1>

        <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
          <div>
            <Label htmlFor="companyname" value="Organizational Name" />
            <TextInput
              type="text"
              placeholder="Enter organizational name"
              {...register("companyname")}
              color={errors.companyname ? "failure" : ""}
              helperText={errors.companyname?.message}
            />
          </div>

          <div>
            <Label htmlFor="email" value="Email" />
            <TextInput
              type="email"
              placeholder="Enter email address"
              {...register("email")}
              color={errors.email ? "failure" : ""}
              helperText={errors.email?.message}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="state" value="State" />
              <Select
                {...register("state")}
                color={errors.state ? "failure" : ""}
                helperText={errors.state?.message}
              >
                <option value="">----Select State----</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label htmlFor="localgovernment" value="Local Government" />
              {/* <TextInput
                type="text"
                placeholder="Local Government"
                {...register("localgovernment")}
                color={errors.localgovernment ? "failure" : ""}
                helperText={errors.localgovernment?.message}
              /> */}

              <Select
                disabled={localGovtOptions.length === 0}
                {...register("localgovernment")}
                color={errors.localgovernment ? "failure" : ""}
                helperText={errors.localgovernment?.message}
              >
                <option value="">----Select Local Govt Area----</option>
                {localGovtOptions.length > 0 &&
                  localGovtOptions.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="town" value="City / Town" />
            <TextInput
              type="text"
              placeholder="Enter your town"
              {...register("town")}
              color={errors.town ? "failure" : ""}
              helperText={errors.town?.message}
            />
          </div>

          <div>
            <Label htmlFor="sector" value="Sector" />
            <TextInput
              type="text"
              placeholder="Enter your business sector"
              {...register("sector")}
              color={errors.sector ? "failure" : ""}
              helperText={errors.sector?.message}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phonenumber" value="Phone Number" />
              <TextInput
                type="text"
                placeholder="11-digit phone number"
                {...register("phonenumber")}
                color={errors.phonenumber ? "failure" : ""}
                helperText={errors.phonenumber?.message}
              />
            </div>

            <div>
              <Label htmlFor="whatsappnumber" value="WhatsApp Number" />
              <TextInput
                type="text"
                placeholder="Optional"
                {...register("whatsappnumber")}
                color={errors.whatsappnumber ? "failure" : ""}
                helperText={errors.whatsappnumber?.message}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="categoryofbusiness" value="Business Category" />
            <Controller
              name="categoryofbusiness"
              control={control}
              render={({ field }) => (
                <DropdownInput
                  {...field}
                  //   register={register("categoryofbusiness")}
                  options={businessCategories}
                  placeholder="Type or choose a business category...."
                  customStyles={{
                    wrapper: `border ${
                      errors.categoryofbusiness
                        ? "border-red-500"
                        : "border-gray-500"
                    } !rounded-lg`,
                  }}
                />
              )}
            />
            {errors.categoryofbusiness?.message && (
              <p className="text-red-600 text-sm ">
                {errors.categoryofbusiness?.message}
              </p>
            )}
            <p>{watch("categoryofbusiness")}</p>
          </div>
          {/* <div>
            <Label htmlFor="categoryofbusiness" value="Business Category" />
            <TextInput
              type="text"
              placeholder="e.g. Retail, Hospitality"
              {...register("categoryofbusiness")}
              color={errors.categoryofbusiness ? "failure" : ""}
              helperText={errors.categoryofbusiness?.message}
            />
          </div> */}

          <div>
            <Label htmlFor="website" value="Website (optional)" />
            <TextInput
              type="text"
              placeholder="e.g. https://example.com"
              {...register("website")}
              color={errors.website ? "failure" : ""}
              helperText={errors.website?.message}
            />
          </div>

          <div>
            <Label htmlFor="staffstrength" value="Staff Strength" />
            <TextInput
              type="text"
              placeholder="e.g. 1-10, 10-50"
              {...register("staffstrength")}
              color={errors.staffstrength ? "failure" : ""}
              helperText={errors.staffstrength?.message}
            />
          </div>

          <div>
            <Label htmlFor="address" value="Business Address" />
            <TextInput
              type="text"
              placeholder="Enter business address"
              {...register("address")}
              color={errors.address ? "failure" : ""}
              helperText={errors.address?.message}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col items-center">
              <Label
                htmlFor="imgs"
                className="w-full cursor-pointer text-center font-medium text-main_color p-3 border border-gray-300 rounded-md bg-gray-100 flex flex-col items-center space-y-2"
              >
                <img
                  src={image}
                  alt="CEO"
                  className="h-24 w-24 rounded-full object-cover"
                />
                <span className="text-gray-500">Click to upload CEO photo</span>
              </Label>
              <input
                type="file"
                id="imgs"
                className="hidden"
                onChange={handleImage}
              />
            </div>

            <div className="flex flex-col items-center">
              <Label
                htmlFor="productImg"
                className="w-full cursor-pointer text-center font-medium text-main_color p-3 border border-gray-300 rounded-md bg-gray-100 flex flex-col items-center space-y-2"
              >
                <img
                  src={productImage}
                  alt="Product"
                  className="h-24 w-24 rounded-full object-cover"
                />
                <span className="text-gray-500">
                  Click to upload product image
                </span>
              </Label>
              <input
                type="file"
                id="productImg"
                className="hidden"
                onChange={handleProduct}
              />
            </div>
          </div>

          <div className="flex justify-start items-center gap-3">
            <Checkbox
              id="isAuthorized"
              {...register("isAuthorized")}
              className="text-main_color"
            />
            <Label
              htmlFor="isAuthorized"
              value={`I authorize National Greenpages to publish my business on their page and website.`}
            />
          </div>
          <p className="text-red-600 text-sm">{errors.isAuthorized?.message}</p>

          <Button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center !bg-main_color text-white mt-6"
          >
            {loading ? (
              <AiOutlineLoading className="animate-spin mr-2" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UserAddBusiness;
