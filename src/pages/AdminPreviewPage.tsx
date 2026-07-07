import React from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import Button from '../components/ui/Button';
import TextInput from '../components/ui/TextInput';

const statCards = [
  { tone: 'cyan', value: '۲۴', label: 'سفارش امروز' },
  { tone: 'pink', value: '۱۶', label: 'در انتظار بررسی' },
  { tone: 'yellow', value: '۸', label: 'ارسال شده' },
];

function AdminPreviewPage() {
  return (
    <AdminLayout activeHref="#dashboard">
      <div className="erp-page-heading">
        <div>
          <h1>ورودی ها</h1>
          <div className="erp-breadcrumb">
            <a href="#forms">المان های فرم</a>
            <span aria-hidden="true">/</span>
            <span>ورودی ها</span>
          </div>
        </div>

        <div className="erp-heading-actions">
          {statCards.map((card) => (
            <div className={`erp-stat-chip is-${card.tone}`} key={card.label}>
              <strong>{card.value}</strong>
              <span>{card.label}</span>
            </div>
          ))}
          <button className="erp-date-button" type="button">۱۴ مرداد ۱۴۰۵</button>
        </div>
      </div>

      <section className="erp-panel">
        <div className="erp-panel-header">
          <h2>انواع ورودی</h2>
          <button className="erp-code-button" type="button">نمایش کد</button>
        </div>

        <div className="erp-form-grid">
          <TextInput id="basic-input" label="ورودی ساده" />
          <TextInput id="label-input" label="ورودی با برچسب" />
          <TextInput id="placeholder-input" label="ورودی با placeholder" placeholder="متن نمونه" />
          <TextInput id="text-input" label="نوع متنی" placeholder="متن" />
          <TextInput id="number-input" label="نوع عددی" placeholder="عدد" type="number" />
          <TextInput id="password-input" label="نوع رمز عبور" placeholder="رمز عبور" type="password" />
          <TextInput id="email-input" label="نوع ایمیل" placeholder="email@example.com" type="email" />
          <TextInput id="tel-input" label="نوع تلفن" placeholder="+98 900 000 0000" type="tel" />
          <TextInput id="date-input" label="نوع تاریخ" type="date" />
          <TextInput id="week-input" label="نوع هفته" type="week" />
          <TextInput id="month-input" label="نوع ماه" type="month" />
          <TextInput id="time-input" label="نوع زمان" type="time" />
          <TextInput id="datetime-input" label="نوع تاریخ و زمان" type="datetime-local" />
          <TextInput id="search-input" label="نوع جستجو" placeholder="جستجو" type="search" />
          <div className="erp-form-group">
            <label className="erp-label" htmlFor="submit-demo">نوع ارسال</label>
            <Button id="submit-demo" type="button" fullWidth>ارسال</Button>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}

export default AdminPreviewPage;
