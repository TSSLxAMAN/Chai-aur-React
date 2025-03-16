import "./App.css";
import { useForm } from "react-hook-form";
function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <>
      <div className="registration-form">
        <h1>Registration form</h1>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="First Name">First Name : </label>
                </td>
                <td>
                  <input
                    className={errors["First name"] ? "error-input" : ""}
                    {...register("First name", {
                      required: {
                        message: "First name is required",
                        value: true,
                      },
                      minLength: {
                        value: 3,
                        message: "Minimum 3 characters required",
                      },
                      maxLength: {
                        value: 6,
                        message: "Maximum 6 characters required",
                      },
                    })}
                  />
                </td>
                <td>
                  {errors["First name"] && (
                    <p className={errors["First name"] ? "error-input" : ""}>
                      {errors["First name"].message}
                    </p>
                  )}
                </td>
              </tr>

              <tr>
                <td>
                  <label htmlFor="Middle Name">Middle Name : </label>
                </td>
                <td>
                  <input
                    {...register("Middle name", {
                      required: {
                        value: true,
                        message: "Middle name is required",
                      },
                      maxLength: {
                        value: 6,
                        message: "Maximum 6 characters required",
                      },
                      minLength: {
                        value: 3,
                        message: "Minimum 3 characters required",
                      },
                    })}
                  />
                </td>
                <td>
                  {errors["Middle name"] && (
                    <p className={errors["Middle name"] ? "error-input" : ""}>
                      {errors["Middle name"].message}
                    </p>
                  )}
                </td>
              </tr>

              <tr>
                <td>
                  <label htmlFor="Last Name">Last Name : </label>
                </td>
                <td>
                  <input
                    {...register("Last name", {
                      required: {
                        value: true,
                        message: "Last name is required",
                      },
                      maxLength: {
                        value: 6,
                        message: "Maximum 6 characters required",
                      },
                      minLength: {
                        value: 3,
                        message: "Minimum 3 characters required",
                      },
                    })}
                  />
                </td>
                <td>
                  {errors["Last name"] && (
                    <p className={errors["Last name"] ? "error-input" : ""}>
                      {errors["Last name"].message}
                    </p>
                  )}
                </td>
              </tr>

              <tr>
                <td>
                  <label>Gender : </label>
                </td>
                <td>
                  <select
                    {...register("gender", {
                      required: { value: true, message: "Select gender" },
                    })}
                  >
                    <option defaultValue={"DEFAULT"} disabled></option>
                    <option value="female">female</option>
                    <option value="male">male</option>
                    <option value="other">other</option>
                  </select>
                </td>
                <td>
                  {errors["gender"] && (
                    <p className={errors["gender"] ? "error-input" : ""}>
                      {errors["gender"].message}
                    </p>
                  )}
                </td>
              </tr>

              <tr>
                <td> </td>
                <td>
                  <input type="submit" />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
}

export default App;
