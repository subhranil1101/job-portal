import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
      name: "company",
      initialState: { singleCompany: null, companies: [] },
      reducers: {
            setSingleCompany: (state, actions) => {
                  state.singleCompany = actions.payload
            },
            setCompanies: (state, actions) => {
                  state.companies = actions.payload
            }
      }
});

export const { setSingleCompany, setCompanies } = companySlice.actions;
export default companySlice.reducer