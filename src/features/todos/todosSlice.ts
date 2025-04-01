import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  text: string;
  ready: boolean;
  difficult: number;
  create_at: string;
  completion_date: string;
}

interface TodosState {
  items: Todo[];
  stars: number;
}

const initialState: TodosState = {
  items: [],
  stars: 0,
};
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Omit<Todo, "id" | "create_at">>) => {
      const newTodo: Todo = {
        ...action.payload,
        id: Date.now(),
        create_at: new Date().toLocaleDateString(),
      };
      state.items.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) {
        const wasReady = todo.ready;
        todo.ready = !todo.ready;
        if (!wasReady && todo.ready) {
          state.stars += todo.difficult;
        } else if (wasReady && !todo.ready) {
          state.stars -= todo.difficult;
        }
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    removeAllTodos: (state) => {
      state.items = state.items.filter((todo) => !todo.ready);
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, removeAllTodos } =
  todosSlice.actions;
export default todosSlice.reducer;
