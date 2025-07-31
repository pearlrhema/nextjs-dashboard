import Form from "@/app/ui/invoices/create-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchCustomers } from "@/app/lib/data";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Create Invoice",
  description: "Create a new invoice for your customers",
};

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Create Invoice",
            href: "/dashboard/invoices/create",
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
// This page is for creating a new invoice. It fetches the list of customers
// and passes it to the Form component. The breadcrumbs are also set up to
// reflect the current page in the dashboard. The Form component will handle
// the creation of a new invoice, including validation and submission logic.
