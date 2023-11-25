"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStore, type Employee } from "@/store";
import Link from "next/link";
import truncate from "truncate";
import useTranslation from "next-translate/useTranslation";
// This type is used to define the shape of the data.

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "employee_name",
    id: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name: string = row.getValue("name");
      let truncatedName = truncate(name, 25);

      return <div className="pl-4">{truncatedName}</div>;
    },
  },
  {
    accessorKey: "employee_age",
    header: () => <div className="text-right">Age</div>,
    id: "age",
    cell: ({ row }) => {
      const age: number = row.getValue("age");

      return <div className="text-right">{age}</div>;
    },
  },
  {
    accessorKey: "employee_salary",
    id: "salary",
    header: () => <div className="text-right">Salary</div>,
    cell: ({ row }) => {
      const salary = parseFloat(row.getValue("salary"));
      const formatted = new Intl.NumberFormat("en-UK", {
        style: "currency",
        currency: "myr",
      }).format(salary);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const employee = row.original;

      let { t, ...rest } = useTranslation("common");
      console.log({ t: t("actions"), rest });

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
            <Link href={`/${employee.id}`}>
              <DropdownMenuItem
                onClick={() =>
                  useStore.setState({ selectedEmployee: employee })
                }
              >
                Edit employee
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
