export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "Pending" | "InProgress" | "Completed";
  remarks?: string;

  createdOn: string;
  updatedOn: string;
  createdBy: string;
  updatedBy: string;
}
