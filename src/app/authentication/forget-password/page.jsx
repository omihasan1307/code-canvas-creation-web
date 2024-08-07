"use client";
import Image from "next/image";
import logo from "../../../../public/code canvas creations/logo-icon.png";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { enqueueSnackbar } from "notistack";
// import { cn } from "@/lib/utils";

export default function ForgetPassword() {
  const [instance] = useAxiosSecure();
  const [emailData, setEmailData] = useState({
    email: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await instance.post(
        `/auth/send-reset-password-email`,
        emailData
      );
      if (response) {
        enqueueSnackbar(`Check Your mail for confirm the Registration `, {
          variant: "success",
        });
      }
    } catch (error) {
      enqueueSnackbar(`${error.response.data.error.message} `, {
        variant: "error",
      });
    }
  };

  return (
    <div
      classNameName="h-screen flex items-center justify-center border"
      style={{ padding: "50px" }}
    >
      <section
        className="h-100 gradient-form"
        style={{ backgroundColor: "#eee" }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div>
                        <a href="/" className="text-black  ">
                          <FontAwesomeIcon
                            icon={faArrowLeft}
                            style={{ marginRight: "4px" }}
                          />{" "}
                          Home
                        </a>
                      </div>
                      <div className="text-center">
                        <Image src={logo} width={150} height={50} />
                        {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                    style="width: 185px;" alt="logo"> */}
                      </div>

                      <form onSubmit={handleLoginSubmit}>
                        <div data-mdb-input-init className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form2Example11"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="form2Example11"
                            className="form-control"
                            placeholder="Email address"
                            name="email"
                            value={emailData.email}
                            onChange={handleLoginChange}
                          />
                        </div>

                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>

                        {/* <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <button
                            type="button"
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-outline-danger"
                            onClick={() => setLogin(!login)}
                          >
                            Create new
                          </button>
                        </div> */}
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center auth-img">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      {/* <h4 className="mb-4">We are more than just a company</h4> */}
                      {/* <p className="small mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}