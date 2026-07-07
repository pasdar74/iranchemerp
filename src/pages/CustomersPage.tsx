import React from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { fetchContacts, HesabfaContact } from '../services/hesabfaContacts';

const pageSizes = [10, 20, 50];

function formatMoney(value?: number) {
  return typeof value === 'number' ? value.toLocaleString('fa-IR') : '۰';
}

function contactStatus(contact: HesabfaContact) {
  return contact.Active === false ? 'غیرفعال' : 'فعال';
}

function CustomersPage() {
  const [contacts, setContacts] = React.useState<HesabfaContact[]>([]);
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [search, setSearch] = React.useState('');
  const [totalCount, setTotalCount] = React.useState(0);
  const [filteredCount, setFilteredCount] = React.useState(0);

  React.useEffect(() => {
    let isCurrent = true;

    setIsLoading(true);
    setError('');

    fetchContacts({ page, pageSize, search })
      .then((result) => {
        if (!isCurrent) return;
        setContacts(result.list);
        setTotalCount(result.totalCount);
        setFilteredCount(result.filteredCount);
      })
      .catch((fetchError: Error) => {
        if (!isCurrent) return;
        setContacts([]);
        setError(fetchError.message);
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [page, pageSize, search]);

  const pageCount = Math.max(1, Math.ceil((filteredCount || totalCount || 0) / pageSize));

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    setSearch(event.target.value);
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(1);
    setPageSize(Number(event.target.value));
  };

  return (
    <AdminLayout activeHref="#customers">
      <div className="erp-page-heading">
        <div>
          <h1>مشتریان</h1>
          <div className="erp-breadcrumb">
            <a href="#dashboard">داشبورد</a>
            <span aria-hidden="true">/</span>
            <span>لیست مشتریان</span>
          </div>
        </div>

        <div className="erp-heading-actions">
          <div className="erp-stat-chip is-cyan">
            <strong>{totalCount.toLocaleString('fa-IR')}</strong>
            <span>کل مشتریان</span>
          </div>
          <button className="erp-date-button" type="button">به‌روزرسانی از حسابفا</button>
        </div>
      </div>

      <section className="erp-panel">
        <div className="erp-panel-header erp-table-panel-header">
          <h2>لیست مشتریان</h2>
          <span className="erp-table-source">حسابفا</span>
        </div>

        <div className="erp-table-toolbar">
          <label className="erp-table-length">
            نمایش
            <select value={pageSize} onChange={handlePageSizeChange}>
              {pageSizes.map((size) => (
                <option value={size} key={size}>{size}</option>
              ))}
            </select>
            رکورد
          </label>

          <label className="erp-table-search">
            <span>جستجو</span>
            <input value={search} onChange={handleSearchChange} placeholder="نام مشتری" />
          </label>
        </div>

        {error ? <div className="erp-table-alert">{error}</div> : null}

        <div className="erp-table-wrap">
          <table className="erp-data-table">
            <thead>
              <tr>
                <th>کد</th>
                <th>نام مشتری</th>
                <th>شرکت</th>
                <th>موبایل</th>
                <th>شهر</th>
                <th>بدهکاری</th>
                <th>بستانکاری</th>
                <th>وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="erp-table-empty">در حال دریافت اطلاعات...</td>
                </tr>
              ) : null}

              {!isLoading && contacts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="erp-table-empty">مشتری‌ای برای نمایش وجود ندارد.</td>
                </tr>
              ) : null}

              {!isLoading && contacts.map((contact) => (
                <tr key={contact.Code || contact.Name}>
                  <td>{contact.Code || '-'}</td>
                  <td>
                    <strong>{contact.Name || [contact.FirstName, contact.LastName].filter(Boolean).join(' ') || '-'}</strong>
                    <span>{contact.NodeFamily || 'بدون دسته‌بندی'}</span>
                  </td>
                  <td>{contact.Company || '-'}</td>
                  <td>{contact.Mobile || contact.Phone || '-'}</td>
                  <td>{contact.City || '-'}</td>
                  <td>{formatMoney(contact.Liability)}</td>
                  <td>{formatMoney(contact.Credits)}</td>
                  <td>
                    <span className={contact.Active === false ? 'erp-status is-off' : 'erp-status is-on'}>
                      {contactStatus(contact)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="erp-table-footer">
          <span>
            نمایش صفحه {page.toLocaleString('fa-IR')} از {pageCount.toLocaleString('fa-IR')}
          </span>
          <div className="erp-pagination">
            <button type="button" disabled={page <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>
              قبلی
            </button>
            <strong>{page.toLocaleString('fa-IR')}</strong>
            <button type="button" disabled={page >= pageCount} onClick={() => setPage((current) => Math.min(pageCount, current + 1))}>
              بعدی
            </button>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}

export default CustomersPage;
