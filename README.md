# IranChem ERP Frontend

این پروژه را خیلی کوچک شروع می کنیم تا هر بخش فقط یک بار ساخته شود و بعدا در جای خودش . استفاده شود.

## ساختار فعلی

- `src/App.tsx`: فعلا صفحه نمونه پنل را نمایش می دهد.
- `src/components/layout/AdminLayout.tsx`: شل اصلی پنل شامل منوی بالای صفحه و منوی کناری.
- `src/components/ui/TextInput.tsx`: کامپوننت عمومی input و label.
- `src/components/ui/Button.tsx`: کامپوننت عمومی button با variant های لازم.
- `src/pages/AdminPreviewPage.tsx`: صفحه نمونه پنل، بر اساس قالب Valex و با متن های فارسی موقت.
- `src/pages/SignInPage.tsx`: صفحه ورود بر اساس نمونه Valex.
- `src/styles/tokens.css`: رنگ ها، radius، shadow و مقدارهای پایه قالب.
- `src/styles/elements.css`: استایل المان های قابل استفاده مجدد مثل input و button.
- `src/styles/layout.css`: CSS اصلی layout پنل، header، sidebar، breadcrumb، کارت ها و grid محتوا.
- `src/pages/signin.css`: فقط چیدمان و فاصله های مخصوص صفحه ورود.
- `src/assets/fonts`: فایل های فونت پروژه.

## قانون ساخت المان ها

هر المان عمومی اول داخل `src/components/ui` و استایل عمومی آن داخل `src/styles/elements.css` ساخته می شود. صفحه ها فقط همان کامپوننت را استفاده می کنند.

نمونه:

```tsx
<TextInput id="email" label="ایمیل" type="email" placeholder="ایمیل خود را وارد کنید" />
<Button type="submit" fullWidth>ورود</Button>
```

اگر بعدا input دیگری لازم شد، کد جدید نمی سازیم و از `TextInput` استفاده می کنیم. اگر ظاهر خاصی لازم شد، یک prop یا modifier کوچک اضافه می کنیم.

## برداشت از نمونه Valex

- رنگ اصلی: `#0162e8`
- پس زمینه عمومی: `#ecf0fa`
- پس زمینه بخش تصویر ورود: آبی روشن نزدیک به `#b7d4fa`
- input ها: border روشن، ارتفاع حدود 35px، radius کوچک و focus آبی
- دکمه اصلی: آبی، تمام عرض در فرم ورود
- صفحه ورود: دو ستون، تصویر سمت چپ در دسکتاپ و فرم سمت راست؛ در موبایل فقط فرم نمایش داده می شود.

## مرحله انجام شده

استایل های پایه فرم، صفحه ورود، و نمونه layout پنل ساخته شد. هنوز هیچ منطق ورود، بک اند، validation، dashboard واقعی یا route اضافه نشده است.

## نمونه پنل

نمونه پنل از صفحه Valex الهام گرفته شده است:

- header ثابت با ارتفاع 64px
- sidebar ثابت با عرض 240px در سمت راست برای RTL
- محتوای اصلی با فاصله از header و sidebar
- منوها فعلا متن فارسی نمونه دارند و همه لینک ها موقت هستند
- بعدا متن هر منو و لینک واقعی آن جداگانه تغییر داده می شود

## فونت ها

- `YekanBakhFaNum-Regular.woff`: فونت پایه کل سایت.
- `Farhang2FaNum-medium.woff`: فونت تیترها، متن های برجسته و دکمه ها.

فونت ها در `src/index.css` با `@font-face` تعریف شده اند و نام هایشان در `src/styles/tokens.css` به صورت token نگهداری می شود.

## اجرای پروژه

```bash
npm start
```

بعد از اجرا، پروژه روی `http://localhost:3000/` دیده می شود.

## دپلوی

این پروژه React با Create React App ساخته شده است. برای هاست معمولی فقط خروجی `npm run build` باید داخل document root دامنه آپلود شود، نه کل سورس پروژه.

فایل های خروجی طبیعی build شامل این موارد هستند:

- `index.html`
- `asset-manifest.json`
- `manifest.json`
- `robots.txt`
- فایل های آیکن مثل `favicon.ico`
- پوشه `static`

در workflow فعلی، خروجی `build` مستقیم داخل ریشه FTP آپلود می شود تا آدرس `https://adminerp.iranchem.com/` همان فایل `index.html` خروجی React را بخواند.

## اتصال حسابفا

صفحه مشتریان از مسیر داخلی `api/hesabfa/contacts.php` اطلاعات را می خواند. این فایل روی هاست به API حسابفا وصل می شود تا کلیدهای حسابفا داخل React و مرورگر دیده نشوند.

برای deploy باید این Secretها در GitHub repository تنظیم شوند:

- `HESABFA_API_KEY`
- `HESABFA_USER_ID`
- `HESABFA_PASSWORD`
- `HESABFA_LOGIN_TOKEN`

فایل واقعی `config.php` در زمان GitHub Actions داخل خروجی build ساخته می شود و نباید داخل git قرار بگیرد.

در منوی حسابداری، گزینه `مشتریان` به صفحه لیست مشتریان وصل شده است و جدول از endpoint داخلی بالا داده می گیرد.
