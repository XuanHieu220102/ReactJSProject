import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = 'https://64e5f67f09e64530d17f54dc.mockapi.io/getInfo';
const apiGroup = 'http://localhost:8080/api/v1/group?size=99';

export const getInfor = createAsyncThunk("fetchInfor", async (number) => {
    const data = await fetch(api);
    return data.json();
})

export const getInfoById = createAsyncThunk("fetchInforById", async (id) => {
    const url = `${api}/${id}`;
    const respon = await fetch(url);
    return respon.json();
})
export const getAllGroup = createAsyncThunk("fetchAllGroup", async (number) => {
    const response = await fetch(apiGroup);
    return response.json();
})
export const RecalApiLoading = createSlice(
    {
        name:'apiSave',
        initialState: {
            responApi: null,
            responApiDetail: null,
            responGroupApi: null
        },
        reducers: {
            callApi: async (state, action) => {         
            }
        },
        extraReducers: (builder) => {
            builder.addCase(getInfor.fulfilled, (state, action) => {
                console.log('action.payload:', action.payload);
                state.responApi = action.payload;
            });
            builder.addCase(getInfoById.fulfilled, (state, action) => {
                state.responApiDetail = action.payload;
            });
            builder.addCase(getAllGroup.fulfilled, (state, action) => {
                state.responGroupApi = action.payload;
            })

        }
    }
)

export const {callApi} = RecalApiLoading.actions
export default RecalApiLoading.reducer