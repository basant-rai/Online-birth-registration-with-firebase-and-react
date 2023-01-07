import React, { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../firebase-config";
import { doc, setDoc } from "firebase/firestore";

const AddressForm = ({ handleClick, details }) => {
  const session = JSON.parse(localStorage.getItem("jwt"));
  const user_id = useMemo(() => session.id, [session]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      country: details.country,
      address: details.address,
      ward: details.ward,
      province: details.province,
      district:details.district
    },
  });

  const handleSave = useCallback(
    async (data) => {
      try {
        const { country, address, ward, province, district } = data;
        await setDoc(doc(db, "user_address", user_id), {
          country,
          address,
          ward,
          province,
          district,
        });
        setTimeout(() => {
          handleClick("next");
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    },
    [handleClick, user_id]
  );

  return (
    <div>
      <main className="w-75 mx-auto">
        <form onSubmit={handleSubmit(handleSave)} className="mt-2">
          <h1 className="h3 mb-3 fw-normal text-dark text-center">
            Permanent address
          </h1>
          <div className="grid grid-cols-2 gap-3">
            <div className="">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  placeholder="Nepal"
                  {...register("country", { required: true })}
                />
                <label htmlFor="country">Country</label>
              </div>
              {errors.country && (
                <span className="text-danger" style={{ fontSize: "12px" }}>
                  *Required
                </span>
              )}
            </div>
            <div className="">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="district"
                  {...register("district", { required: true })}
                />
                <label htmlFor="m-name">District</label>
              </div>
              {errors.district && (
                <span className="text-danger" style={{ fontSize: "12px" }}>
                  *Required
                </span>
              )}
            </div>
            <div className="mt-2">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  {...register("address", { required: true })}
                  placeholder="address"
                />
                <label htmlFor="l-name">Address</label>
              </div>
              {errors.address && (
                <span className="text-danger" style={{ fontSize: "12px" }}>
                  *Required
                </span>
              )}
            </div>
            <div className="mt-2">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="ward"
                  id="ward"
                  {...register("ward", { required: true })}
                />
                <label htmlFor="ward">Ward no.</label>
              </div>
              {errors.ward && (
                <span className="text-danger" style={{ fontSize: "12px" }}>
                  *Required
                </span>
              )}
            </div>
            <div className="mt-2">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="province"
                  placeholder="state"
                  {...register("province", { required: true })}
                />
                <label htmlFor="province">Province</label>
              </div>
              {errors.province && (
                <span className="text-danger" style={{ fontSize: "12px" }}>
                  *Required
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <button
              className=" btn btn-lg btn-info mt-4"
              onClick={() => handleClick("previous")}
            >
              Back
            </button>
            <button
              className=" btn btn-lg btn-primary mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <span>Save Details</span>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddressForm;
