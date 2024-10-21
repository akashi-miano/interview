import { z } from "zod";
import { FaEnvelope } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Lottie from "lottie-react";
import submittedAnimation from "../animations/submitted.json";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import envelopeAnimation from "../animations/envelope.json";

const Contact = () => {
  const form = useRef();

  const sendEmail = () => {
    emailjs
      .sendForm("service_ijk9w1d", "template_akzfaws", form.current, {
        publicKey: "jMHt5msMMzPaqPJfK",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  const schema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    message: z.string().min(20),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data, e) => {
    e.preventDefault();
    setSubmitted(true);
    sendEmail();
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
    console.log(data);
  };

  const [isSubmitted, setSubmitted] = useState(false);

  return (
    <section className="py-12">
      <div className="container">
        <header className="flex items-center justify-center gap-4">
          <FaEnvelope size={30} />
          <h1 className="text-4xl text-center py-2">Contact Me</h1>
        </header>
        <div className="wrapper grid md:grid-cols-2 items-center">
          <Lottie animationData={envelopeAnimation} />
          <form onSubmit={handleSubmit(onSubmit)} ref={form} className="p-4">
            <div className="wrapper">
              <label htmlFor="name" className="mb-2 block">
                Name
              </label>
              <input
                type="text"
                className="w-full border-2 px-2 focus:outline-none focus:border-cyan-500 duration-300"
                {...register("name")}
              />
              {errors.name ? (
                <span className="text-red-500 opacity-1 duration-300">
                  Name must be at least 3 characters long!
                </span>
              ) : (
                <span className="text-red-500 opacity-0 duration-300">
                  Name must be at least 3 characters long!
                </span>
              )}
            </div>
            <div className="wrapper">
              <label htmlFor="email" className="mb-2 block">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border-2 px-2 focus:outline-none focus:border-cyan-500 duration-300"
                {...register("email")}
              />
              {errors.email ? (
                <span className="text-red-500 duration-300 opacity-1">
                  Input a valid email address!
                </span>
              ) : (
                <span className="text-red-500 duration-300 opacity-0">
                  Input a valid email address!
                </span>
              )}
            </div>
            <div className="wrapper mb-4">
              <label htmlFor="message" className="mb-2 block">
                message
              </label>
              <textarea
                name="message"
                id="message"
                className="w-full border-2 vertical min-h-[100px] max-h-[150px] px-2 focus:outline-none focus:border-cyan-500 duration-300"
                {...register("message")}
              ></textarea>
              {errors.message ? (
                <span className="text-red-500 opacity-1 duration-300">
                  Message must be at least 20 characters long!
                </span>
              ) : (
                <span className="text-red-500 opacity-0 duration-300">
                  Message must be at least 20 characters long!
                </span>
              )}
            </div>
            <button
              className={
                isValid
                  ? "btn y !bg-zinc-700 text-white rounded-md"
                  : "btn y !bg-gray-400 text-white rounded-md"
              }
              type="submit"
            >
              Submit
            </button>
            {isSubmitted ? (
              <div className="flex items-center">
                <span className="text-md text-green-500 duration-300 opacity-1">
                  The message was sent successfully
                </span>
                <Lottie
                  animationData={submittedAnimation}
                  loop={false}
                  className="text-[25px] opacity-1 duration-300"
                />
              </div>
            ) : (
              <div className="flex items-center">
                <span className="text-md text-green-500 opacity-0 duration-300">
                  The message was sent successfully
                </span>
                <Lottie
                  animationData={submittedAnimation}
                  className="text-[25px] opacity-0 duration-300"
                />
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
