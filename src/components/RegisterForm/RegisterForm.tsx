"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(15, "Name must be at most 15 characters"),
    email: z
      .string()
      .nonempty("Email is required")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ),
    password: z
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,15}$/,
        "Password must include uppercase, lowercase, number, special character, and be 5–15 characters long",
      ),
    rePassword: z.string().nonempty("Please confirm your password"),
    phone: z
      .string()
      .nonempty("Phone is required")
      .min(11, "Phone must be at least 11 digits")
      .max(11, "Phone must be at most 11 digits"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match",
  });

type FormData = z.infer<typeof formSchema>;

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  async function onSubmit(data: FormData) {
    setLoading(true);

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
            rePassword: data.rePassword,
            phone: data.phone,
          }),
        },
      );

      const result = await res.json();

      if (res.ok) {
        toast.success("Registered successfully!");
        form.reset();
        sessionStorage.setItem("email", data.email);
        sessionStorage.setItem("password", data.password);
        router.push("/login");
      } else {
        const serverMsg =
          result.errors?.msg || result.message || "Registration failed";
        toast.error(serverMsg);
      }
    } catch (error: any) {
      toast.error(error?.message || "Registration failed");
    }
    setLoading(false);
  }

  return (
    <Card className="w-full sm:max-w-md shadow-xl ">
      <CardContent>
        <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {[
              {
                name: "name",
                label: "Name",
                type: "text",
                placeholder: "Your Name",
              },
              {
                name: "email",
                label: "Email",
                type: "email",
                placeholder: "example@email.com",
              },
              {
                name: "password",
                label: "Password",
                type: "password",
                placeholder: "••••••••",
              },
              {
                name: "rePassword",
                label: "Confirm Password",
                type: "password",
                placeholder: "••••••••",
              },
              {
                name: "phone",
                label: "Phone",
                type: "tel",
                placeholder: "e.g., +20 123 456 7890",
              },
            ].map((field) => (
              <Controller
                key={field.name}
                name={field.name as keyof FormData}
                control={form.control}
                render={({ field: f, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`register-${field.name}`}>
                      {field.label}
                    </FieldLabel>
                    <Input
                      {...f}
                      id={`register-${field.name}`}
                      type={field.type}
                      placeholder={field.placeholder}
                      autoComplete={field.name}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            ))}
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Field orientation="horizontal" className="w-full">
          <Button
            type="submit"
            form="register-form"
            className="w-full"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 animate-spin" />}
            Register
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
