import { mockInputs } from "@/utils/FormBuilder";
import {
  createSlice,
  configureStore,
  PayloadAction,
  AnyAction,
} from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

interface FormState {
  forms: Form[];
}

const formSlice = createSlice({
  name: "forms",
  initialState: {
    forms: [] as Form[],
  } as FormState,
  reducers: {
    setForms: (state, action: PayloadAction<Form[]>) => {
      state.forms = action.payload;
    },
    removeById: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      state.forms = state.forms.filter((form) => form.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: AnyAction) => {
      return { ...state, ...action.payload };
    });
  },
});

export const { setForms, removeById } = formSlice.actions;

const store = configureStore({
  reducer: formSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export const selectForms = (state: RootState) => state.forms;

export default createWrapper(() => store, { debug: true });

////////////////////////////////////////////////////////////////////////////
// Usage:
// store.subscribe(() => console.log(store.getState()));
// store.dispatch(
//   addItemToPosition({
//     input: {
//       type: "text",
//       label: "Text",
//       placeholder: "placeholder",
//     } as TextInput,
//     position: 0,
//   })
// );
// store.dispatch(removeItem(0));
////////////////////////////////////////////////////////////////////////////
