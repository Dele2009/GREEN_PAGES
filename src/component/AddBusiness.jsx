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
import { useAppContext } from "../contexts/AppContext";
import DropdownInput from "../utils/DropdownInput";
import { localGovernmentAreas } from "../utils/stateandlocalgovnt";

const AddBusiness = () => {
  const { businessCategories, states } = useAppContext();

  const [image, setImage] = useState("/images/upload.png");
  const [productImage, setProductImage] = useState("/images/upload.png");
  const [loading, setLoading] = useState(false);
  const [localGovtOptions, setLocalGovtOptions] = useState([]);

  const schema = yup.object().shape({
    companyname: yup.string().required("Name is required!"),
    owneremail: yup
      .string()
      .email("Provided a valid email for the business owner")
      .required("Owner's email is required!"),
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
      ),
    ceoImg: yup.string(),
    productImage: yup.string(),
    staffstrength: yup.string().required("Required!"),
    address: yup.string().required("Required!"),
    isAuthorized: yup.boolean().oneOf([true], "You must authorize to proceed"),
  });

  console.log(schema);

  const {
    watch,
    control,
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
            // "Content-Type": "multipart/form-data",
            Authorization: `Token ${Cookies.get("token")}`,
          },
        }
      );
      reset();
      setImage("/images/upload.png");
      setProductImage("/images/upload.png");
      showToast("success", "Business Submitted For Approval");
    } catch ({ message, response }) {
      console.log(message);
      showToast("error", response.message || message);
    } finally {
      setLoading(false);
    }
  };

  const handleImage = (e) => setImage(URL.createObjectURL(e.target.files[0]));
  const handleProduct = (e) =>
    setProductImage(URL.createObjectURL(e.target.files[0]));

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">
          Register a new business for a member
        </h1>

        <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
          <div>
            <Label htmlFor="companyname" value="Organizational Name" />
            <TextInput
              type="text"
              placeholder="Enter organization name"
              {...register("companyname")}
              color={errors.companyname ? "failure" : ""}
              helperText={errors.companyname?.message}
            />
          </div>
          <div>
            <Label
              htmlFor="owneremail"
              value="Organizational Owners Registered email"
            />
            <TextInput
              type="text"
              placeholder="Enter organization owner's email"
              {...register("owneremail")}
              color={errors.owneremail ? "failure" : ""}
              helperText={errors.owneremail?.message}
            />
          </div>

          <div>
            <Label htmlFor="email" value="Organizational email" />
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
                <option value="">Select State</option>
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
                // disabled={localGovtOptions.length === 0}
                {...register("localgovernment")}
                color={errors.localgovernment ? "failure" : ""}
                helperText={errors.localgovernment?.message}
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
                placeholder="11-digit whatsapp phone number"
                {...register("whatsappnumber")}
                color={errors.whatsappnumber ? "failure" : ""}
                helperText={errors.whatsappnumber?.message}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="categoryofbusiness" value="Business Category" />
            {/* <TextInput
                            type="text"
                            placeholder="e.g. Retail, Hospitality"
                            {...register("categoryofbusiness")}
                            color={errors.categoryofbusiness ? 'failure' : ''}
                            helperText={errors.categoryofbusiness?.message}
                        /> */}
            <Controller
              name="categor yofbusiness"
              control={control}
              render={({ field }) => (
                <DropdownInput
                  {...field}
                  options={businessCategories}
                  placeholder="Type or choose a business category...."
                  customStyles={{
                    wrapper: `border ${
                      errors.categoryofbusiness
                        ? "border-red-500 bg-red-400"
                        : "border-gray-500"
                    } !rounded-lg`,
                    input: `${errors.categoryofbusiness ? "bg-red-50" : ""}`,
                  }}
                />
              )}
            />

            {errors.categoryofbusiness?.message && (
              <p className="text-red-600 text-sm ">
                {errors.categoryofbusiness?.message}
              </p>
            )}
          </div>

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
                className="w-full h-[300px] cursor-pointer text-center font-medium text-main_color p-3 border border-gray-300 rounded-md bg-gray-100 flex flex-col items-center space-y-2"
              >
                <img
                  src={image}
                  alt="CEO"
                  className={`${
                    image === "/images/upload.png"
                      ? "h-5/6 w-5/6"
                      : "h-full w-full"
                  } rounded-full object-cover`}
                />
                {image === "/images/upload.png" && (
                  <span className="text-gray-500">
                    Click to upload CEO photo
                  </span>
                )}
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
                className="w-full h-[300px] cursor-pointer text-center font-medium text-main_color p-3 border border-gray-300 rounded-md bg-gray-100 flex flex-col items-center space-y-2"
              >
                <img
                  src={productImage}
                  alt="Product"
                  className={`${
                    productImage === "/images/upload.png"
                      ? "h-5/6 w-5/6"
                      : "h-full w-full"
                  } rounded-md object-cover`}
                />
                {productImage === "/images/upload.png" && (
                  <span className="text-gray-500">
                    Click to upload product image
                  </span>
                )}
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
            className="w-full flex items-center justify-content !bg-main_color mt-6"
          >
            {loading ? <Spinner size="sm" className="mr-2" /> : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddBusiness;
