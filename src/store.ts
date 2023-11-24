import { create } from "zustand";

export type Employee = {
  id: number;
  employee_name: string;
  employee_salary: number;
  employee_age: number;
  profile_image: string;
};

type State = {
  employeeList: Employee[] | null;
  selectedEmployee: Employee | null;
};

type Action = {
  setEmployeeList: (employeeList: State["employeeList"]) => void;
  setSelectedEmployee: (selectedEmployee: State["selectedEmployee"]) => void;
};

export const useStore = create<State & Action>((set) => ({
  employeeList: null,
  setEmployeeList: (employeeList) => set({ employeeList: employeeList }),
  selectedEmployee: null,
  setSelectedEmployee: (selectedEmployee) =>
    set({ selectedEmployee: selectedEmployee }),
}));
