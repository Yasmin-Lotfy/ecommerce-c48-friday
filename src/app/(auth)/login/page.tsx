"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { loginSchema, LoginSchemaType } from "@/lib/schema/auth.schema";
import { loginUser } from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<LoginSchemaType>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function submitUserLogin(values: LoginSchemaType) {
    // try {
    //   const response = await loginUser(values);
    //   console.log(response);
    //   if(response.message === "success"){
    //     // res.message
    //     //  toast
    //     //  routing login
    //     toast.success("Login Successfully");
    //     router.push("/products")
    //   }else{
    //     //  error res.message
    //     toast.error(response.message)
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      // callbackUrl:"/products",
      redirect: false,
    });

    if (response?.ok == true) {
      router.push("/products");
      toast.success("Login Successfully");
    } else {
     toast.error(response?.error)
      
    }
  }
  return (
    <>
      <div className="container mx-auto mt-6 px-6">
        <h2 className="text-chart-5 text-3xl font-bold my-5">Login Form</h2>
        <form className="space-y-4" onSubmit={handleSubmit(submitUserLogin)}>
          {/*  email */}
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <>
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      className="rounded-xl bg-white border-2 border-gray-400"
                      aria-invalid={fieldState.invalid}
                      placeholder="User Email"
                      type="email"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                </>
              );
            }}
          />
          {/* password */}
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <>
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      className="rounded-xl bg-white border-2 border-gray-400"
                      aria-invalid={fieldState.invalid}
                      placeholder="User Password"
                      type="password"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                </>
              );
            }}
          />

          <Button type="submit" variant="default" className="w-full">
            {isSubmitting ? <Spinner /> : "Login"}
          </Button>
        </form>
      </div>
    </>
  );
}
