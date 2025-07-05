"use client";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Fetch from "@/utils/axios";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";

export default function LoginForm() {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);

  const otpInputRef = useRef();

  const phoneRegex = /^09\d{9}$/;
  const otpRegex = /^\d{5}$/;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
      otp: "",
    },
  });

  useEffect(() => {
    if (step !== "otp" || timeLeft <= 0) return;
    otpInputRef.current.focus();
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [step, timeLeft]);

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);

    try {
      if (step === "phone") {
        if (!phoneRegex.test(data.phone)) {
          toast.error("شماره تلفن معتبر نیست");
          setLoading(false);
          return;
        }

        setPhone(data.phone);

        const { status, message } = await Fetch.post("/auth/send-otp", {
          phone: data.phone,
        });

        if (status > 201) {
          toast.error(message);
          setLoading(false);
          return;
        }

        toast.success(message);
        setStep("otp");
        setTimeLeft(120);
        setCanResend(false);
      } else {
        if (!otpRegex.test(data.otp)) {
          toast.error("کد باید ۵ رقم باشد");
          setLoading(false);
          return;
        }

        const { status, message, accessToken, sessionId } = await Fetch.post(
          "/auth/verify-otp",
          {
            phone,
            code: data.otp,
          }
        );

        if (status > 201) {
          toast.error(message);
          setLoading(false);
          return;
        }

        await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ accessToken, sessionId }),
          credentials: "include",
        });

        window.location.href = "/";
      }
    } catch (error) {
      toast.error("خطایی رخ داد، دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend || loading) return;

    setLoading(true);
    try {
      const { status, message } = await Fetch.post("/auth/send-otp", { phone });

      if (status > 201) {
        toast.error(message);
        return;
      }

      toast.success("کد دوباره ارسال شد");
      setTimeLeft(120);
      setCanResend(false);
    } catch {
      toast.error("خطایی رخ داد، دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-card p-6 rounded-xl shadow-md space-y-5 text-right flex flex-col items-center"
      >
        <h2 className="text-xl font-bold mb-2 text-center">
          ورود با شماره موبایل
        </h2>

        {step === "phone" ? (
          <>
            <Input
              placeholder="شماره موبایل (مثال: 09123456789)"
              {...register("phone", { required: true })}
              dir="ltr"
              disabled={loading}
            />

            <Button
              className="w-full dark:bg-white"
              type="submit"
              disabled={loading}
            >
              {!!loading ? (
                <PropagateLoader size={10} color="#000" />
              ) : (
                "ارسال کد تایید"
              )}
            </Button>
          </>
        ) : (
          <>
            <div className="text-sm text-muted-foreground text-center">
              کد تایید به {phone} ارسال شد
            </div>

            <InputOTP
              maxLength={5}
              onChange={(value) => setValue("otp", value)}
              disabled={loading}
            >
              <InputOTPGroup dir="ltr" className="justify-center">
                {[...Array(5)].map((_, i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    ref={i === 0 ? otpInputRef : null}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>

            <div className="flex justify-between gap-15 text-sm text-muted-foreground w-full items-center">
              <span>{formatTime(timeLeft)}</span>
              <button
                type="button"
                onClick={handleResend}
                disabled={!canResend || loading}
                className={`${
                  !canResend ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                ارسال مجدد
              </button>
            </div>

            <Button className="w-full" type="submit" disabled={loading}>
              تایید کد
            </Button>
          </>
        )}
      </form>
    </div>
  );
}
