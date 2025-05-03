/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FilterProductionFormulaListRequest } from "../requests/filter-production-formula-list.request";
import { ProductionFormulaService } from "../services";
import { ProductionFormulaListModel } from "../models/production-formula-list.model";
import { ItemDetail } from "../models/production-formula-detail.model";

export const fetchList = createAsyncThunk(
  'productionFormula/fetchList',
  async (option: FilterProductionFormulaListRequest): Promise<ProductionFormulaListModel> => {
    const data = await ProductionFormulaService().show(option)
    return data;
  }
)

export const fetchItemDetail = createAsyncThunk(
  'productionFormula/fetchItemDetail',
  async (id: number): Promise<any> => {
    const { d } = await ProductionFormulaService().detail(id)
    return d;
  }
)

interface ProductionFormulaState {
  data: ProductionFormulaListModel | undefined;
  item: ItemDetail | undefined;
  filter: FilterProductionFormulaListRequest;
}

const initialState: ProductionFormulaState = {
  data: undefined,
  item: undefined,
  filter: FilterProductionFormulaListRequest.createFromJson({}),
};

export const productionFormulaSlice = createSlice({
  name: 'productionFormula',
  initialState,
  reducers: {
    handleFilter: (state, action: PayloadAction<FilterProductionFormulaListRequest>) => {
      state.filter = new FilterProductionFormulaListRequest(action.payload);
    },
    handleItemDetail: (state, action) => {
      state.item = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchList.fulfilled, (state, action) => {
      state.data = new ProductionFormulaListModel(action.payload);
    });
    builder.addCase(fetchList.rejected, (state, action) => {
      console.error('Error fetching production formula list:', action.error);
    });
    builder.addCase(fetchItemDetail.fulfilled, (state, action) => {
      state.item = new ItemDetail(action.payload);
    });
    builder.addCase(fetchItemDetail.rejected, (state, action) => {
      console.error('Error fetching production formula item list', action.error);
    });
  }
})

export const {
  handleFilter,
  handleItemDetail,
} = productionFormulaSlice.actions;

export default productionFormulaSlice.reducer;