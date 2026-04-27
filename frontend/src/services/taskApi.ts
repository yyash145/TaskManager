import axiosInstance from "./axiosInstance";
import { Task } from "../models/task";

export const createTask = async (data: any) => {
  const res = await axiosInstance.post("/task", data);
  return res.data;
};

export const getAllTasks = async (): Promise<Task[]> => {
  const res = await axiosInstance.get("/task");

  const apiData = res.data.data;
  const mappedTasks: Task[] = apiData.map((item: any) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    dueDate: item.dueDate,
    remarks: item.remarks || "",

    createdOn: item.createdOn,
    updatedOn: item.updatedOn,
    createdBy: item.createdBy,
    updatedBy: item.updatedBy,
  }));

  return mappedTasks;
};

export const searchTasks = async (params: any) => {
  const res = await axiosInstance.get("/task/search", {
    params,
  });

  return res.data.data;
};

export const updateTask = async (id: string, data: any) => {
  const res = await axiosInstance.put(`/task/${id}`, data);
  return res.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/task/${id}`);
};