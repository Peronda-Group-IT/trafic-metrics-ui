'use client';

import { useActionState, useEffect, useState } from 'react';
import { login } from './actions';
import Image from 'next/image';
import { generateFingerprint } from '@/lib/fingerprint';
import { EyeIcon, EyeOff } from 'lucide-react';
import { useT } from '@/contexts/TranslationContext'; // <- Add this
import { Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LoginForm() {
  const [state, action, pending] = useActionState(login);
  const [viewPassword, setViewPassword] = useState(false);  
  const [fingerprint, setFingerprint] = useState(null);
  const { t } = useT();
  const URL = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    const getFingerprint = async () => {
      const windowFingerprint = await generateFingerprint();
      setFingerprint(windowFingerprint);
    };
    getFingerprint();
  }, []);

  return (
    <div className="h-screen flex justify-center items-center bg-background">
      <div className="bg-card rounded-lg shadow-lg w-auto flex flex-col-reverse items-center md:flex-row gap-4 md:h-[450px] border-2">
        <div className='p-8 w-96 text-center'>
          <h2 className="text-2xl font-bold mb-2 text-foreground">{t('login_title')}</h2>
          <p className="text-muted-foreground mb-4">{t('login_subtitle')}</p>
          <form action={action} className="flex flex-col gap-4">
            <input
              className="hidden"
              name="fingerprint"
              type="text"
              defaultValue={fingerprint}
            />
            <div>
              <label className="block text-sm font-medium text-foreground text-start">{t('login_username_label')}</label>
              <input
                name="username"
                type="text"
                placeholder="peronda"
                className="w-full bg-input border border-border text-foreground p-2 rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground text-start">{t('login_password_label')}</label>
              <div className='relative'>
                <input
                  name="password"
                  type={viewPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full bg-input border border-border text-foreground p-2 rounded mt-1"
                />
                <div className='absolute right-3 top-3 cursor-pointer z-10' onClick={() => setViewPassword(!viewPassword)}>
                  {viewPassword ?
                    <EyeOff className="text-muted-foreground hover:text-foreground" /> :
                    <EyeIcon className="text-muted-foreground hover:text-foreground" />
                  }
                </div>
              </div>
              <div className='h-6 mt-2 w-full text-red-400 text-sm'>{state?.error}</div>
            </div>

            <div className="text-right text-sm mt-4 w-full flex justify-center">
              <a
                href="mailto:serviciosit@perondagroup.es?subject=He%20olvidado%20mi%20contraseña%20inicio%20sesión%20en%20web"
                className="text-primary hover:underline"
              >
                {t('login_forgot')}
              </a>
            </div>

            <Button
              type="submit"
              disabled={pending}
              className="w-full bg-primary h-10 flex justify-center text-primary-foreground py-2 rounded hover:opacity-90 cursor-pointer"
            >
              {pending ? <Loader className={"animate-spin"}/> : t('login_submit')}
            </Button>
          </form>

          <p className="text-center text-sm mt-4 text-muted-foreground">
            {t('login_help_mail_subject')}{' '}
            <a
              href="mailto:serviciosit@perondagroup.es?subject=Problema%20de%20inicio%20de%20sesión%20en%20web"
              className="text-primary hover:underline"
            >
              {t('login_help_link')}
            </a>
          </p>
        </div>

        <div className="w-full md:w-96 h-52 rounded-t-lg md:rounded-r-lg md:h-full flex justify-center bg-black md:relative">
          <Image
            priority
            src={`${URL}/login_image.png`}
            alt="Logo"
            fill
            className="object-cover hidden md:block rounded-r-lg"
            sizes="100%"
          />
          <Image
            src={`${URL}/login_image.png`}
            alt="Logo"
            className="md:hidden block w-full h-full object-contain"
            height={2481}
            width={3545}
          />
        </div>
      </div>
    </div>
  );
}
