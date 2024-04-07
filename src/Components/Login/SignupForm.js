import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heading, Text, Button, Radio, RadioGroup, Stack, Input
} from '@chakra-ui/react'
export const SignupForm = () => {
  const navigate = useNavigate();

  const isValid = () => {
    let email = formValue.email;
    console.log(email);
    let password = formValue.password;
    let name = formValue.name;
    let valid = true;
    if (
      email.search(
        /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9-]+$/
      ) === -1
    ) {
      valid = false;
      setError({
        error: true,
        message: "Please provide a valid Email Id",
      });
    } else if (password.length < 8) {
      valid = false;
      setError({
        error: true,
        message: "The password should be at least 8 characters long",
      });
    } else if (name.length < 3) {
      valid = false;
      setError({
        error: true,
        message: "The name should be at least 3 characters long",
      });
    }
    return valid;
  };

  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const [rerender, setRerender] = useState(false);

  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    role: "customer",
    password: "",
  });

  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValue);
    if (!isValid()) {
      setTimeout(() => {
        setError({ error: false, message: null });
        setRerender(!rerender);
      }, 5000);
    } else {
      await fetch("https://annaprasadam.onrender.com/signup", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formValue),
      })
        .then((res) => res.json())
        .then(async (data) => {
          if (!data.error) {
            localStorage.setItem("auth_token", data.auth_token);
            localStorage.setItem("role", data.role);
            if (formValue.role === "customer") {
              navigate("/home");
            } else {
              navigate("/dashboard");
            }
          } else {
            setError({
              error: true,
              message:
                "User with the given Email already exists! Try a different one!",
            });
            setTimeout(() => {
              setError({ error: false, message: null });
              setRerender(!rerender);
            }, 2000);
          }
        })
        .catch((error) => {
          console.log("error");
          setError({
            error: true,
            message:
              "Problem occured while reaching the server:( Check your internet connection !",
          });
          setTimeout(() => {
            setError({ error: false, message: null });
            setRerender(!rerender);
          }, 5000);
        });
    }
  };

  return (
    <>
      <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
        <div className="d-flex flex-column align-items-center mx-5">
          <Heading color="orange.500">Anna<Text as="span" color="orange.400">Prasadam</Text></Heading>

          <section className="m-auto login mt-3 border p-3 rounded animate__animated animate__fadeIn">
            <h3 className="text-center mb-4">Sign Up</h3>
            <div className="m-auto">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <Input
                   focusBorderColor='orange.400'
                    type="name"
                    id="name"
                    name="name"
                    className="form-control search"
                    onChange={handleChange}
                    value={formValue.name}
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <Input
                   focusBorderColor='orange.400'
                    type="email"
                    id="email"
                    name="email"
                    className="form-control search"
                    onChange={handleChange}
                    value={formValue.email}
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3 d-flex">
                  <label className="form-label me-2">Role</label>
                  <RadioGroup defaultValue='customer'>
                  <Stack spacing={5} direction='row'>
                    <Radio colorScheme='orange' value="customer"
                      id="customer" name="role"
                      onChange={handleChange}
                    >
                      Customer
                    </Radio>
                    <Radio colorScheme='orange' value="owner"
                      id="owner" name="role"
                      onChange={handleChange}>
                      Owner
                    </Radio>
                    </Stack>
                  </RadioGroup>
                </div>
                <div className="mb-3">
                  <label className="form-label">Create Password</label>
                  <Input
                   focusBorderColor='orange.400'
                    type="password"
                    id="password"
                    name="password"
                    className="form-control search"
                    onChange={handleChange}
                    value={formValue.password}
                  />
                </div>
                <div className="text-center d-flex flex-column">
                  <Button colorScheme="orange" type="submit" mb={2}>
                    Sign Up
                  </Button>
                  <Link to="/login">
                      <Text className="text-center">
                        Already have an account?{" "}
                        <Text as='span' color="orange.500">Login</Text>
                      </Text>
                  </Link>
                </div>
              </form>
            </div>
          </section>
          {error.error && (
            <div className="alert alert-danger mt-2 text-center" role="alert">
              {error.message}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
