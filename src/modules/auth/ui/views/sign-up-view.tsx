"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OctagonAlert } from "lucide-react";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Alert, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

const formSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
    confirmPassword: z.string().min(1, { message: "Confirm the Password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export const SignUpView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    setError(null);
    setPending(true);

    authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setPending(false);
          router.push("/");
        },
        onError: (err) => {
          setError(err.error.message);
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Let&apos;s Started</h1>
                <p className="text-muted-foreground text-balance">
                  Create your account
                </p>
              </div>

              <div className="grid gap-3">
                <Field name="name">
                  <FieldLabel>Name</FieldLabel>
                  <Input
                    type="text"
                    placeholder="John Deo"
                    {...register("name")}
                    aria-invalid={!!errors.name}
                  />
                  <FieldError>{errors.name?.message}</FieldError>
                </Field>
              </div>
              <div className="grid gap-3">
                <Field name="email">
                  <FieldLabel>Email Address</FieldLabel>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                  />
                  <FieldError>{errors.email?.message}</FieldError>
                </Field>
              </div>

              <div className="grid gap-3">
                <Field name="password">
                  <FieldLabel>Password</FieldLabel>
                  <Input
                    type="password"
                    placeholder="**********"
                    {...register("password")}
                    aria-invalid={!!errors.password}
                  />
                  <FieldError>{errors.password?.message}</FieldError>
                </Field>
              </div>
              <div className="grid gap-3">
                <Field name="confirmPassword">
                  <FieldLabel>Confirm Password</FieldLabel>
                  <Input
                    type="password"
                    placeholder="**********"
                    {...register("confirmPassword")}
                    aria-invalid={!!errors.confirmPassword}
                  />
                  <FieldError>{errors.password?.message}</FieldError>
                </Field>
              </div>

              {!!error && (
                <Alert className="bg-destructive/10">
                  <OctagonAlert className="text-destructive!" />
                  <AlertTitle>{error}</AlertTitle>
                </Alert>
              )}

              <Button disabled={pending} type="submit" className="w-full">
                Register
              </Button>

              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or Continue with
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => {
                    authClient.signIn.social({
                      provider: "google",
                    });
                  }}
                  disabled={pending}
                  className="w-full cursor-pointer"
                  variant="outline"
                  type="button"
                >
                  <FaGoogle />
                </Button>
                <Button
                  onClick={() => {
                    authClient.signIn.social({
                      provider: "github",
                    });
                  }}
                  disabled={pending}
                  className="w-full cursor-pointer"
                  variant="outline"
                  type="button"
                >
                  <FaGithub />
                </Button>
              </div>

              <div className="text-center text-sm">
                Already registered ?{" "}
                <Link
                  className="underline underline-offset-4 text-blue-700"
                  href="/signIn"
                >
                  Login
                </Link>
              </div>
            </div>
          </form>

          <div className="bg-radial from-sidebar-accent to-sidebar relative hidden md:flex flex-col gap-y-4 items-center justify-center">
            <img src="/logo.svg" alt="Logo" className="h-[92px] w-[92px]" />
            <p className="text-2xl font-semibold text-white">AI-Meetup</p>
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking Continue, you agree to our <a href="#">Terms of Service</a>
      </div>
    </div>
  );
};
