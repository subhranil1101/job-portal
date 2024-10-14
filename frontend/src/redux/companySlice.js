import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
      name: "company",
      initialState: {
            singleCompany: null,
            companies: [],
            searchCompanyByName: ""
      },
      reducers: {
            setSingleCompany: (state, actions) => {
                  state.singleCompany = actions.payload
            },
            setCompanies: (state, actions) => {
                  state.companies = actions.payload
            },
            setSearchCompanyByName: (state, actions) => {
                  state.searchCompanyByName = actions.payload
            }
      }
});

export const { setSingleCompany, setCompanies, setSearchCompanyByName } = companySlice.actions;
export default companySlice.reducer