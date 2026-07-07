import React from 'react';
import Button from '../components/ui/Button';
import TextInput from '../components/ui/TextInput';

const authIllustration =
  'https://preview.sprukomarket.com/html/bootstrap/valex/dist/assets/images/media/pngs/5.png';
const brandLogo =
  'https://preview.sprukomarket.com/html/bootstrap/valex/dist/assets/images/brand-logos/desktop-logo.png';

function SignInPage() {
  return (
    <main className="signin-page">
      <section className="signin-visual" aria-hidden="true">
        <img src={authIllustration} alt="" />
      </section>

      <section className="signin-panel" aria-labelledby="signin-title">
        <div className="signin-box">
          <img className="signin-logo" src={brandLogo} alt="Valex" />

          <h1 className="signin-title" id="signin-title">خوش برگشتی!</h1>
          <p className="signin-subtitle">برای ادامه وارد شوید.</p>

          <form action="#" method="post">
            <TextInput
              autoComplete="email"
              id="email"
              label="ایمیل"
              name="email"
              placeholder="ایمیل خود را وارد کنید"
              type="email"
            />

            <TextInput
              autoComplete="current-password"
              id="password"
              label="رمز عبور"
              name="password"
              placeholder="رمز عبور خود را وارد کنید"
              type="password"
            />

            <Button fullWidth type="submit">ورود</Button>

            <div className="signin-actions">
              <Button fullWidth icon="f" type="button" variant="facebook">
                ورود با Facebook
              </Button>
              <Button fullWidth icon="X" type="button" variant="info">
                ورود با Twitter
              </Button>
            </div>
          </form>

          <div className="signin-meta">
            <a href="#forgot-password">رمز عبور را فراموش کرده اید؟</a>
            <p>حساب کاربری ندارید؟ <strong>ساخت حساب</strong></p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SignInPage;
