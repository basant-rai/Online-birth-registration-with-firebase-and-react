import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../firebase-config";
import { setDoc, doc } from "firebase/firestore";

const PersonalForm = ({ details, handleClick }) => {
  const session = JSON.parse(localStorage.getItem("jwt"));
  const user_id = useMemo(() => session.id, [session]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      first_name: details.first_name,
      last_name: details.last_name,
      middle_name: details.middle_name,
      mother_name: details.mother_name,
      father_name: details.father_name,
      grandfather_name: details.grandfather_name,
      grandmother_name: details.grandmother_name,
      dob: details.dob,
    },
  });

  const handleSave = useCallback(
    async (data) => {
      const {
        first_name,
        last_name,
        middle_name,
        mother_name,
        father_name,
        grandfather_name,
        grandmother_name,
        dob,
      } = data;
      await setDoc(doc(db, "user", user_id), {
        first_name,
        last_name,
        middle_name,
        mother_name,
        father_name,
        grandfather_name,
        grandmother_name,
        dob,
      });
      setTimeout(() => {
        handleClick("next");
      }, 1000);
    },
    [handleClick, user_id]
  );
  return (
    <div>
      <main className="w-75 mx-auto">
        <form onSubmit={handleSubmit(handleSave)} className="mt-2">
          <h1 className="h3 mb-3 fw-normal text-dark">Add your details</h1>
          <div className="grid grid-cols-2 gap-3">
            <div className="">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="f-name"
                  placeholder="Jonn"
                  {...register("first_name", { required: true })}
                />
                <label htmlFor="f-name">First Name</label>
              </div>
              {errors.first_name && (
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
                  placeholder="Jonn"
                  {...register("middle_name")}
                />
                <label htmlFor="m-name">Middle Name</label>
              </div>
            </div>
            <div className="mt-2">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  {...register("last_name", { required: true })}
                  placeholder="Doe"
                />
                <label htmlFor="l-name">Last Name</label>
              </div>
              {errors.last_name && (
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
                  placeholder="date"
                  {...register("dob", { required: true })}
                />
                <label htmlFor="dob">Date of birth</label>
              </div>
              {errors.dob && (
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
                  placeholder="Doe"
                  {...register("father_name", { required: true })}
                />
                <label htmlFor="father_name">Father Name</label>
              </div>
              {errors.father_name && (
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
                  id="mother-name"
                  placeholder="Jonn"
                  {...register("mother_name", { required: true })}
                />
                <label htmlFor="mother-name">Mother Name</label>
              </div>
              {errors.mother_name && (
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
                  id="grand_father_name"
                  placeholder="Jonn"
                  {...register("grandfather_name", { required: true })}
                />
                <label htmlFor="grand_father_name">GrandFather Name</label>
              </div>
              {errors.grandfather_name && (
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
                  id="grand_mother_name "
                  placeholder="Jonn"
                  {...register("grandmother_name", { required: true })}
                />
                <label htmlFor="grand_mother_name ">GrandMother Name</label>
              </div>
              {errors.grandmother_name && (
                <span className="text-danger" style={{ fontSize: "12px" }}>
                  *Required
                </span>
              )}
            </div>
          </div>
          <button
            className=" w-100 btn btn-lg btn-primary mt-4"
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
        </form>
      </main>
    </div>
  );
};

export default PersonalForm;
