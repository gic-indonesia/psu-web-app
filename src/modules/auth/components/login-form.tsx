'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { Input, PasswordInput } from "@src/shared/components/forms";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@src/shared/components/buttons";
import NextImage from "@src/shared/components/NextImage";
import { ILoginRequest, LoginRequest } from "../requests";
import { useState } from "react";
import * as z from "zod";
import { AuthService } from "../services";
import { modulesToAbilities } from "@src/lib/utils";
import { AxiosError } from "axios";
import { useAppDispatch } from "@src/hooks/redux";
import { LoginDataModel } from "../models/auth.model";
import { useRouter, useSearchParams } from "next/navigation";
import { handleLogin } from "../stores/auth.store";
import { Bounce, toast } from "react-toastify";

const schema = LoginRequest.schema();

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [processing, setProcessing] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const methods = useForm<z.infer<typeof schema>>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  const showLoginToast = (fullname: string, role: string) => {
    toast.success(`Welcome ${fullname}, you have successfully logged in as ${role}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      className: 'rounded-md',
      style: { width: '300px' }
      });
  }

  const onFinish: SubmitHandler<ILoginRequest> = (values: z.infer<typeof schema>) => {
    setProcessing(true);
    const params = LoginRequest.createFromJson(values);
    AuthService()
      .login(params)
      .then((response) => {
        const { data, status } = response;
        if (status === 200) {
          const modules = data.access.modules ? data.access.modules : [];
          const abilities = modulesToAbilities(modules);
          const loginData = LoginDataModel.createFromJson({
            id: data.user_id,
            fullname: data.profile.nama,
            username: data.profile.name,
            nik: data.profile.nik,
            company_list: data.access.company_list,
            accessToken: data.token,
            refreshToken: data.refresh_token,
            role: data.access.role,
            ability: abilities,
            tokenExpiresIn: data.expires_in,
          })
          dispatch(handleLogin(loginData));
          showLoginToast(loginData.fullname ?? loginData.username ?? 'User', loginData.role ?? 'normal user');
          setProcessing(false);
          const to = searchParams.get('to');
          if (to) {
            router.push(to.toString());
          } else {
            router.push('/dashboard/sales');
          }
        } else {
          setProcessing(false);
        }
      })
      .catch((e: AxiosError) => {
        const error = e as AxiosError;
        setProcessing(false)
        toast.error(`${error.response?.data}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        console.log(error);
      })
  };

  const { handleSubmit } = methods;

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm items-center justify-center">
        <div className="flex justify-center text-center items-center">
          <NextImage
            alt="PT. Pakan Sehat Unggul"
            src="/assets/psu-with-text.png"
            className="h-[150px] w-auto items-center"
            width='200'
            height='200'
          />
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onFinish)}
            className="space-y-6"
          >
            <div>
              <div className="mt-2">
                <Input
                  id="username"
                  label="Username"
                  labelClassName="font-semibold"
                  validation={{ required: 'Username must be filled' }}
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <PasswordInput
                  id='password'
                  label="Password"
                  validation={{ required: 'Password must be filled' }}
                  labelClassName="font-semibold"
                />
              </div>
            </div>

            <div>
              <Button
                isLoading={processing}
                variant="primary"
                type="submit"
                className="flex w-full justify-center rounded-md"
                size="base"
              >
                Sign In
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default LoginForm;