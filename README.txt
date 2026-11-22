HamFit Frontend - v8
====================
صفحات:
- index.html: صفحه اصلی
- register.html: ثبت‌نام نمایشی
- profile.html: تکمیل اطلاعات بدنی و هدف
- dashboard.html: داشبورد کاربر
- workout.html: جزئیات جلسه تمرینی، لیست حرکات، ثبت انجام حرکت و تایمر استراحت

اجرا:
1) ZIP را استخراج و پوشه hamfit-frontend را در VS Code باز کنید.
2) فایل index.html را با Live Server اجرا کنید.
3) برای مشاهده صفحات می‌توانید از مسیرهای dashboard.html و workout.html استفاده کنید.

وضعیت اتصال:
این نسخه فرانت‌اند نمایشی است. اطلاعات پروفایل از sessionStorage خوانده می‌شود.
برنامه تمرینی و حرکات نمونه‌اند. برای نسخه واقعی باید APIهای Django برای دریافت برنامه،
ثبت انجام حرکت/جلسه و دریافت جزئیات حرکت مشخص و متصل شوند.


نسخه ارتقایافته تجربه کاربری و انیمیشن:
- نام فارسی برند: حام فیت | نام لاتین: HamFit
- افکت ورود تدریجی بخش‌ها و کارت‌ها هنگام اسکرول (Scroll Reveal)
- نوار پیشرفت اسکرول و هدر شیشه‌ای هنگام پایین رفتن صفحه
- منوی موبایل با پشتیبانی از بستن با Escape و انتخاب لینک
- رعایت تنظیمات کاهش حرکت سیستم‌عامل (prefers-reduced-motion)
- بهبود تعامل دکمه‌ها، فوکوس صفحه‌کلید و نقاط شکست موبایل
- این نسخه همچنان فرانت‌اند است؛ اتصال واقعی API و احراز هویت Django نیازمند بک‌اند و آدرس API است.


ورود آزمایشی (Demo):
- از index.html وارد login.html شو.
- می‌توانی ابتدا ثبت‌نام کنی؛ اطلاعات ورود فقط در localStorage همین مرورگر ذخیره می‌شود.
- برای تست سریع، در login.html روی «ورود آزمایشی سریع» بزن.
- بعد از ورود، اگر پروفایل ذخیره نشده باشد به profile.html و در غیر این صورت به dashboard.html می‌روی.
- این احراز هویت واقعی نیست. پس از آماده شدن Django باید با API و session/token واقعی جایگزین شود.


نسخه ۸ — تم روز White Neon و ورود با شماره تلفن:
- تم روشن سفید با جزئیات فیروزه‌ای نئونی در همه صفحات.
- لوگوی رسمی ارسالی کاربر جایگزین فایل لوگوی قبلی شد.
- ثبت‌نام شامل نام، شماره تلفن، ایمیل و رمز عبور است.
- ورود با ایمیل یا شماره تلفن و رمز عبور حساب ثبت‌شده انجام می‌شود.
- دکمه ورود سریع آزمایشی از صفحه ورود حذف شده است.
- حساب، پروفایل و وضعیت ورود در localStorage همین مرورگر ذخیره می‌شوند.
- برنامه و تمرین فعلی نمونه/پیش‌نمایش فرانت‌اند هستند؛ برای برنامه‌سازی واقعی و ذخیره امن باید API بک‌اند Django متصل شود.
- این نسخه برای تست فرانت‌اند است؛ رمز عبور در localStorage ذخیره می‌شود و برای استفاده عمومی/واقعی مناسب نیست.

اجرا: پوشه hamfit-frontend را در VS Code باز کن و index.html را با Live Server اجرا کن.


نسخه 8.3 — تغییرات جدید
- انتخاب محل تمرین (خانه یا باشگاه) در مرحله تکمیل پروفایل
- نمایش نوع برنامه انتخاب‌شده در صفحه تمرین
- جایگزین خانگی پارویی دمبل با پارویی کوله‌پشتی/دمبل
- نمایش واضح عضلات هدف و عضلات درگیر اصلی برای هر حرکت
- ورود با شماره تلفن یا ایمیل در صفحه ورود
- تم روشن نئونی (روز) حفظ شده است

نکته: رابط کاربری همچنان فرانت‌اند استاتیک است؛ برای ثبت‌نام واقعی، احراز هویت، ذخیره دائمی اطلاعات و دریافت برنامه پویا باید API بک‌اند Django متصل شود.


HAMFIT v8.4 updates:
- BMI value and status on dashboard. Adult categories are only used from age 18.
- Under-18 users see an age-growth-chart caution instead of adult categories.
- Each exercise includes a front/back target-muscle illustration with highlighted regions.
- Profile asks whether the user trains at home or in a gym and stores the choice.
- Homepage About section includes founder details supplied by the owner and social links.
- Logo enlarged across pages.
Note: anatomy maps are simplified educational diagrams, not medical-grade anatomy. Workout data remains frontend demo content.
