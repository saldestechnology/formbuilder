///
/// This file contains all the API calls that are used in the application.

import { mockInputs } from "./FormBuilder";
export const fetchMockItems = async () => {
  return await Promise.resolve(mockInputs);
};
