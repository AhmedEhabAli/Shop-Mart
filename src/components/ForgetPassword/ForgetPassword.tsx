"use client";
import {
  forgetPasswordAction,
  resetPasswordAction,
  verifyCodeAction,
} from "@/action/forgetPasswordAction";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CheckCircle2,
  KeyRound,
  Loader2,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

type Step = "email" | "verify" | "resetPassword" | "done";

export default function ForgetPassword() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("email");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);
    if (!isOpen) {
      setTimeout(() => {
        setStep("email");
        setEmail("");
        setCode("");
        setNewPassword("");
      }, 300);
    }
  }

  async function handleSendEmail() {
    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await forgetPasswordAction(email);
      if (res.statusMsg === "success") {
        toast.success("Code sent! Check your email.");
        setStep("verify");
      } else {
        toast.error(res.message ?? "Something went wrong.");
      }
    } catch {
      toast.error("An unexpected error occurred.");
    }
    setIsLoading(false);
  }

  async function handleVerifyCode() {
    if (!code.trim()) {
      toast.error("Please enter the verification code.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await verifyCodeAction(code);
      if (res.status === "success") {
        toast.success("Code verified! Now set your new password.");
        setStep("resetPassword");
      } else {
        toast.error(res.message ?? "Invalid code. Please try again.");
      }
    } catch {
      toast.error("An unexpected error occurred.");
    }
    setIsLoading(false);
  }

  async function handleResetPassword() {
    if (!newPassword.trim()) {
      toast.error("Please enter your new password.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await resetPasswordAction(email, newPassword);
      if (res.status === "success") {
        toast.success("Password reset successfully!");
        setStep("done");
      } else {
        toast.error(res.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="text-sm mt-2 mb-4 cursor-pointer hover:underline focus:outline-none">
          Forgot password?
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        {step === "email" && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <Mail className="w-5 h-5 text-blue-600" />
                <DialogTitle>Reset Your Password</DialogTitle>
              </div>
              <DialogDescription>
                Enter your email and we&apos;ll send you a 6-digit code to reset
                your password.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-3 py-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendEmail()}
                autoFocus
              />
            </div>

            <Button
              onClick={handleSendEmail}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
              {isLoading ? "Sending..." : "Send Reset Code"}
            </Button>
          </>
        )}

        {step === "verify" && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <DialogTitle>Enter Verification Code</DialogTitle>
              </div>
              <DialogDescription>
                We sent a 6-digit code to{" "}
                <span className="font-medium text-foreground">{email}</span>.
                Enter it below to continue.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-3 py-2">
              <Label htmlFor="reset-code">Verification Code</Label>
              <Input
                id="reset-code"
                type="text"
                placeholder="______"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => e.key === "Enter" && handleVerifyCode()}
                className="tracking-[0.5em] text-center text-lg font-mono"
                autoFocus
              />
            </div>

            <div className="flex flex-col gap-2">
              <Button
                onClick={handleVerifyCode}
                disabled={isLoading || code.length < 6}
                className="w-full"
              >
                {isLoading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
                {isLoading ? "Verifying..." : "Verify Code"}
              </Button>

              <Button
                variant="ghost"
                onClick={() => {
                  setStep("email");
                  setCode("");
                }}
                disabled={isLoading}
                className="w-full"
              >
                ← Use a different email
              </Button>
            </div>
          </>
        )}

        {step === "resetPassword" && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <KeyRound className="w-5 h-5 text-blue-600" />
                <DialogTitle>Set New Password</DialogTitle>
              </div>
              <DialogDescription>
                Enter your new password for{" "}
                <span className="font-medium text-foreground">{email}</span>.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-3 py-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleResetPassword()}
                autoFocus
              />
            </div>

            <Button
              onClick={handleResetPassword}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </>
        )}

        {step === "done" && (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <CheckCircle2 className="w-14 h-14 text-green-500" />
            <div>
              <h2 className="text-lg font-semibold">Password Reset!</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Your password has been reset successfully. You can now log in
                with your new password.
              </p>
            </div>
            <Button onClick={() => handleOpenChange(false)} className="w-full">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
