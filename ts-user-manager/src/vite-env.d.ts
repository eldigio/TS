/// <reference types="vite/client" />

interface IUser {
  name: string;
  tasks: [{ taskId: number; taskName: string } | null];
}
