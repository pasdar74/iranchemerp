export type HesabfaContact = {
  Active?: boolean;
  City?: string;
  Code?: string;
  Company?: string;
  ContactType?: number;
  Credits?: number;
  Email?: string;
  FirstName?: string;
  LastName?: string;
  Liability?: number;
  Mobile?: string;
  Name?: string;
  NodeFamily?: string;
  Phone?: string;
};

export type ContactsResponse = {
  filteredCount: number;
  from: number;
  list: HesabfaContact[];
  to: number;
  totalCount: number;
};

type FetchContactsParams = {
  page: number;
  pageSize: number;
  search: string;
};

export async function fetchContacts({ page, pageSize, search }: FetchContactsParams): Promise<ContactsResponse> {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  if (search.trim()) {
    params.set('search', search.trim());
  }

  const response = await fetch(`/api/hesabfa/contacts.php?${params.toString()}`, {
    headers: {
      Accept: 'application/json',
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.success) {
    throw new Error(data?.message || 'دریافت لیست مشتریان از حسابفا ناموفق بود.');
  }

  return data.result;
}
