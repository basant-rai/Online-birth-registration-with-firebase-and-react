import React, { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const VerificationForm = ({ handleClick, details }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const [backPreviewImage, setBackPreviewImage] = useState();
  const [frontPhoto, setFrontPhoto] = useState();
  const [updateFrontPhoto, setUpdateFrontPhoto] = useState();
  const [updateBackPhoto, setUpdateBackPhoto] = useState();
  const [backPhoto, setBackPhoto] = useState();
  const navigate = useNavigate();
  const session = JSON.parse(localStorage.getItem("jwt"));
  const user_id = useMemo(() => session.id, [session]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
    setError,
  } = useForm({
    defaultValues: {
      country: details.country,
      issued_date: details.issued_date,
      issued_district: details.issued_district,
      citizenship_number: details.citizenship_number,
    },
  });

  const onSelectFileFront = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpdateFrontPhoto(file.name);
      const selectFile = URL.createObjectURL(file);
      setPreviewImage(selectFile);
    } else {
      setError("front", {
        type: "manual",
        message: "Required",
      });
    }
  };
  const onSelectFileBack = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpdateBackPhoto(file.name);
      const selectFile = URL.createObjectURL(file);
      setBackPreviewImage(selectFile);
    } else {
      setError("back", {
        type: "manual",
        message: "Required",
      });
    }
  };
  const handleSave = useCallback(
    async (data) => {
      try {
        const { issued_date, issued_district, citizenship_number } = data;
        const backstorageRef = ref(storage, updateBackPhoto);
        const frontstorageRef = ref(storage, updateFrontPhoto);
        await uploadBytesResumable(frontstorageRef, updateFrontPhoto);
        await uploadBytesResumable(backstorageRef, updateBackPhoto);

        await getDownloadURL(frontstorageRef).then((downloadURL) => {
          setFrontPhoto((prev) => ({ ...prev, img: downloadURL }));
        });
        await getDownloadURL(backstorageRef).then((downloadURL) => {
          setBackPhoto((prev) => ({ ...prev, img: downloadURL }));
        });
        if (frontPhoto && backPhoto) {
          await setDoc(doc(db, "user_document", user_id), {
            frontPhoto,
            backPhoto,
            issued_date,
            issued_district,
            citizenship_number,
          });
          setIsSuccess(true);
          setTimeout(() => {
            navigate("/downloadpdf");
          }, 1000);
        } else {
          setIsUploaded(true);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [updateBackPhoto, updateFrontPhoto, frontPhoto, backPhoto, user_id, navigate]
  );
  return (
    <div>
      <main className=" sm:w-75 mx-auto">
        <form onSubmit={handleSubmit(handleSave)} className="mt-2">
          <h1 className="h3 mb-3 pl-3 fw-normal text-dark">
            Document verification
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="w-full">
              <div className="">
                <label htmlFor="front" className="w-full">
                  {previewImage ? (
                    <img
                      className="rounded h-80 w-full "
                      src={previewImage}
                      alt="front"
                    />
                  ) : (
                    <div className=" border border-primary h-80 w-full rounded-xl text-center pt-32 text-primary text-xl">
                      Add
                    </div>
                  )}
                  <input
                    type="file"
                    id="front"
                    name="fromt_photo"
                    accept="image/*"
                    onClick={() => {
                      clearErrors(["front"]);
                    }}
                    {...register("front", { required: true })}
                    onChange={onSelectFileFront}
                    className="mt-1 block hidden w-1/2 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                  Citizen front
                </label>
              </div>
              {errors.front && (
                <span className="text-danger" style={{ fontSize: "12px" }}>
                  *Required
                </span>
              )}
            </div>
            <div className="w-full">
              <div className="w-full">
                <label htmlFor="back" className="w-full">
                  {backPreviewImage ? (
                    <img
                      className="rounded h-80 w-full "
                      src={backPreviewImage}
                      alt="back"
                    />
                  ) : (
                    <div className=" border border-primary h-80 w-full rounded-xl text-center pt-32 text-primary text-xl">
                      Add
                    </div>
                  )}
                  <input
                    type="file"
                    id="back"
                    name="back_photo"
                    accept="image/*"
                    onClick={() => {
                      clearErrors(["back"]);
                    }}
                    {...register("back", { required: true })}
                    onChange={onSelectFileBack}
                    className="mt-1 hidden rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                  Citizen Back
                </label>
              </div>
              {errors.back && (
                <span className="text-danger" style={{ fontSize: "12px" }}>
                  *Required
                </span>
              )}
            </div>

            <div className="mt-2">
              <div className="form-floating">
                <input
                  type="date"
                  className="form-control"
                  {...register("issued_date", { required: true })}
                  placeholder="date"
                />
                <label htmlFor="l-name">Issued Date</label>
              </div>
              {errors.issued_date && (
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
                  placeholder="issued_district"
                  id="issued_district"
                  {...register("issued_district", { required: true })}
                />
                <label htmlFor="issued_district">Issued district</label>
              </div>
              {errors.issued_district && (
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
                  id="citizenship_number"
                  placeholder="state"
                  {...register("citizenship_number", { required: true })}
                />
                <label htmlFor="citizenship_number">Citizenship no.</label>
              </div>
              {errors.citizenship_number && (
                <span className="text-danger" style={{ fontSize: "12px" }}>
                  *Required
                </span>
              )}
            </div>
          </div>
          {isUploaded && (
            <div>
              <div className="checkbox mt-3">
                <label>
                  <input
                    type="checkbox"
                    value="remember-me"
                    {...register("accept", { required: true })}
                  />
                  <span className="ms-1 text-primary">
                    I accept all terms & condition
                  </span>
                </label>
              </div>
              {errors.accept && (
                <span className="text-danger" style={{ fontSize: "12px" }}>
                  *Required
                </span>
              )}
            </div>
          )}
          <div className="flex justify-between">
            <button
              className=" btn btn-lg btn-info mt-4"
              onClick={() => handleClick("previous")}
            >
              Back
            </button>
            {isUploaded ? (
              <button
                className="disabled:btn-dark btn btn-lg btn-primary mt-4"
                disabled={isSubmitting || isSuccess}
              >
                {isSubmitting ? (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <span>Confirm</span>
                )}
              </button>
            ) : (
              <>
                <button
                  className="disabled:btn-dark btn btn-lg btn-primary mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <span>Save</span>
                  )}
                </button>
              </>
            )}
          </div>
        </form>
      </main>
    </div>
  );
};

export default VerificationForm;
