import React from 'react';

type HeaderAction = {
  label: string;
  symbol: string;
  badge?: string;
};

type MenuChild = {
  label: string;
  href: string;
};

type MenuGroup = {
  title?: string;
  items: Array<{
    active?: boolean;
    children?: MenuChild[];
    href: string;
    icon: string;
    label: string;
  }>;
};

const headerActions: HeaderAction[] = [
  { label: 'زبان', symbol: 'فا' },
  { label: 'حالت شب', symbol: '☾' },
  { label: 'پیام ها', symbol: '✉', badge: '3' },
  { label: 'اعلان ها', symbol: '⌁', badge: '5' },
  { label: 'تمام صفحه', symbol: '□' },
  { label: 'تنظیمات', symbol: '⚙' },
];

const menuGroups: MenuGroup[] = [
  {
    title: 'اصلی',
    items: [
      { active: true, href: '#dashboard', icon: '▣', label: 'داشبورد' },
    ],
  },
  {
    title: 'انبارداری',
    items: [
      { href: '#icons', icon: '◇', label: 'حواله های خروج' },
      {
        href: '#charts',
        icon: '▤',
        label: 'نمودارها',
        children: [
          { href: '#line-chart', label: 'نمودار خطی' },
          { href: '#bar-chart', label: 'نمودار ستونی' },
          { href: '#pie-chart', label: 'نمودار دایره ای' },
        ],
      },
      {
        href: '#apps',
        icon: '▦',
        label: 'برنامه ها',
        children: [
          { href: '#cards', label: 'کارت ها' },
          { href: '#calendar', label: 'تقویم' },
          { href: '#contacts', label: 'مخاطبین' },
        ],
      },
      {
        href: '#forms',
        icon: '▥',
        label: 'المان های فرم',
        children: [
          { href: '#inputs', label: 'ورودی ها' },
          { href: '#checks', label: 'چک باکس و رادیو' },
          { href: '#select', label: 'انتخابگر' },
          { href: '#upload', label: 'آپلود فایل' },
          { href: '#datepicker', label: 'تاریخ و زمان' },
        ],
      },
      { href: '#tables', icon: '▧', label: 'جدول ها' },
      { href: '#landing', icon: '◈', label: 'صفحه فرود' },
      { href: '#maps', icon: '⌖', label: 'نقشه ها' },
    ],
  },
  {
    title: 'صفحات',
    items: [
      { href: '#profile', icon: '◉', label: 'پروفایل' },
      { href: '#settings', icon: '⚙', label: 'تنظیمات' },
      { href: '#help', icon: '?', label: 'راهنما' },
    ],
  },
];

function Sidebar() {
  return (
    <aside className="erp-sidebar" aria-label="منوی اصلی">
      <div className="erp-sidebar-brand">
        <a className="erp-brand" href="#dashboard" aria-label="IranChem ERP">
          <span className="erp-brand-mark" aria-hidden="true" />
          <span className="erp-brand-text">IranChem</span>
        </a>
      </div>

      <nav className="erp-sidebar-nav">
        {menuGroups.map((group) => (
          <div className="erp-menu-group" key={group.title ?? 'group'}>
            {group.title ? <div className="erp-menu-title">{group.title}</div> : null}
            {group.items.map((item) => (
              <div className="erp-menu-entry" key={item.label}>
                <a className={item.active ? 'erp-menu-item is-active' : 'erp-menu-item'} href={item.href}>
                  <span className="erp-menu-icon" aria-hidden="true">{item.icon}</span>
                  <span className="erp-menu-label">{item.label}</span>
                  {item.children ? <span className="erp-menu-caret" aria-hidden="true">⌄</span> : null}
                </a>
                {item.children ? (
                  <div className="erp-submenu">
                    {item.children.map((child) => (
                      <a className="erp-submenu-item" href={child.href} key={child.label}>
                        {child.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}

function TopHeader() {
  return (
    <header className="erp-topbar">
      <div className="erp-topbar-inner">
        <button className="erp-icon-button" type="button" aria-label="باز و بسته کردن منو">
          <span aria-hidden="true">☰</span>
        </button>

        <label className="erp-topbar-search">
          <span className="sr-only">جستجو</span>
          <input type="search" placeholder="جستجو کنید..." />
          <span aria-hidden="true">⌕</span>
        </label>

        <div className="erp-topbar-actions" aria-label="ابزارهای بالای صفحه">
          {headerActions.map((action) => (
            <button className="erp-header-action" type="button" aria-label={action.label} key={action.label}>
              <span aria-hidden="true">{action.symbol}</span>
              {action.badge ? <span className="erp-action-badge">{action.badge}</span> : null}
            </button>
          ))}
          <button className="erp-profile-button" type="button" aria-label="پروفایل کاربر">
            <span>م</span>
          </button>
        </div>
      </div>
    </header>
  );
}

type AdminLayoutProps = {
  children: React.ReactNode;
};

function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="erp-shell">
      <Sidebar />
      <TopHeader />
      <main className="erp-main">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
