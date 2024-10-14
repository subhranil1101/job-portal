import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
      name: "job",
      initialState: {
            allJobs: [],
            allAdminJobs: [],
            singleJob: null,
            searchJobByName: ""
      },
      reducers: {
            setAllJobs: (state, action) => { state.allJobs = action.payload },
            setSingleJob: (state, action) => { state.singleJob = action.payload },
            setAllAdminJobs: (state, action) => { state.allAdminJobs = action.payload },
            setSearchJobByName: (state, action) => { state.searchJobByName = action.payload }
      }
})

export const { setAllJobs, setSingleJob, setAllAdminJobs, setSearchJobByName } = jobSlice.actions;
export default jobSlice.reducer;