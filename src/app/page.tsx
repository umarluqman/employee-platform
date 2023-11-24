import { columns } from "./columns";
import { DataTable } from "./data-table";
import type { Employee } from "@/store";
import { useStore } from "@/store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";

async function getData(): Promise<Employee[]> {
  const response = await fetch(
    "https://dummy.restapiexample.com/api/v1/employees"
  );
  const data = await response.json();
  useStore.setState({
    employeeList: data.data,
  });
  return data.data;
}

export default async function Home() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-column sm:flex-row justify-between">
          <div className="space-y-2 sm:mb-0 mb-4">
            <CardTitle>Employees</CardTitle>
            <CardDescription>
              Search and filter employees in the company.
            </CardDescription>
          </div>
          <Link href="/add">
            <Button>
              <Plus />
              Add Employee
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="space-y-2">
          <DataTable columns={columns} data={data} />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
