export interface CreateTaskRequest {
  title: string;
  description: string;
  dueDate: string;
  status: "Pending" | "InProgress" | "Completed";
  remarks?: string;
}