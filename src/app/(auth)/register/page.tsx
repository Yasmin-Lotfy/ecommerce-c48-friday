"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { registerSchema, RegisterSchemaType } from "@/lib/schema/auth.schema";
import { registerUser } from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Register() {
  const router = useRouter()
  const { handleSubmit, control , formState:{isSubmitting} } = useForm<RegisterSchemaType>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  async function submitUserRegister(values: RegisterSchemaType) {
    try {
      const response = await registerUser(values);
      console.log(response);
      if(response.message === "success"){
        // res.message
        //  toast 
        //  routing login
        toast.success("Account Created Successfully");
        router.push("/login")
      }else{
        //  error res.message
        toast.error(response.message)
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="container mx-auto mt-6 px-6">
        <h2 className="text-chart-5 text-3xl font-bold my-5">Register Form</h2>
        <form className="space-y-4" onSubmit={handleSubmit(submitUserRegister)}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <>
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      className="rounded-xl bg-white border-2 border-gray-400"
                      aria-invalid={fieldState.invalid}
                      placeholder="User Name"
                      type="text"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                </>
              );
            }}
          />

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

          {/*  confirm password */}
          <Controller
            name="rePassword"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <>
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Confirm Password
                    </FieldLabel>
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

          {/*  phone */}

          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <>
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      className="rounded-xl bg-white border-2 border-gray-400"
                      aria-invalid={fieldState.invalid}
                      placeholder="User Phone"
                      type="tel"
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
            {isSubmitting ? <Spinner/> : "Register"}
            
         
          </Button>
        </form>
      </div>
    </>
  );
}
