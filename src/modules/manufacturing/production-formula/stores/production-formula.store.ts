/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FilterProductionFormulaListRequest } from "../requests/filter-production-formula-list.request";
import { ProductionFormulaService } from "../services";
import { ProductionFormulaListModel } from "../models/production-formula-list.model";
import { ResponseModel } from "@src/shared/models";
import { ItemDetail } from "../models/production-formula-detail.model";
import { ProducedItem } from "../models/produced-item.model";
import { Process } from '../models/process.model';
import { StorageService } from "@src/shared/local-storage";

export const fetchList = createAsyncThunk(
  'productionFormula/fetchList',
  async (option: FilterProductionFormulaListRequest): Promise<ResponseModel<ProductionFormulaListModel[]>> => {
    const data = await ProductionFormulaService().show(option)
    return data;
  }
)

export const fetchItemDetail = createAsyncThunk(
  'productionFormula/fetchItemDetail',
  async (id: number): Promise<any> => {
    const { d } = await ProductionFormulaService().detail(id)
    StorageService().set('productionFormulaItem', d);
    return d;
  }
)

export const fetchProducedItems = createAsyncThunk(
  'productionFormula/fetchProducedItems',
  async (): Promise<any> => {
    const { d } = await ProductionFormulaService().getProducedItems()
    return d;
  }
)

export const fetchMaterialItems = createAsyncThunk(
  'productionFormula/fetchMaterialItems',
  async (): Promise<any> => {
    const { d } = await ProductionFormulaService().getMaterialItems();
    return d;
  }
)

export const fetchProcesses = createAsyncThunk(
  'productionFormula/fetchProcesses',
  async (): Promise<any> => {
    const { d } = await ProductionFormulaService().getProcesses()
    return d;
  }
)

const initialProductionFormulaItem = () => {
  const item = StorageService().get('productionFormulaItem');
  if (item && typeof item === 'object') {
    return new ItemDetail(item as any);
  }
  return undefined;
}

interface ProductionFormulaState {
  data: ResponseModel<ProductionFormulaListModel[]> | undefined;
  item: ItemDetail | undefined;
  filter: FilterProductionFormulaListRequest;
  producedItems: ProducedItem[] | undefined;
  materialItems: ProducedItem[] | undefined;
  processes: Process[] | undefined;
}

const initialState: ProductionFormulaState = {
  data: undefined,
  item: initialProductionFormulaItem(),
  filter: FilterProductionFormulaListRequest.createFromJson({}),
  producedItems: undefined,
  materialItems: undefined,
  processes: undefined,
};

export const productionFormulaSlice = createSlice({
  name: 'productionFormula',
  initialState,
  reducers: {
    handleFilter: (state, action: PayloadAction<FilterProductionFormulaListRequest>) => {
      state.filter = new FilterProductionFormulaListRequest(action.payload);
    },
    handleItemDetail: (state, action) => {
      if (!action.payload) {
        StorageService().destroy('productionFormulaItem');
      }
      state.item = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchList.fulfilled, (state, action) => {
      state.data = new ResponseModel<ProductionFormulaListModel[]>(action.payload);
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
    builder.addCase(fetchProducedItems.fulfilled, (state, action) => {
      state.producedItems = action.payload.map((item: any) => new ProducedItem(item));
    });
    builder.addCase(fetchProducedItems.rejected, (state, action) => {
      console.error('Error fetching produced items', action.error);
    });
    builder.addCase(fetchMaterialItems.fulfilled, (state, action) => {
      state.materialItems = action.payload.map((item: any) => new ProducedItem(item));
    });
    builder.addCase(fetchMaterialItems.rejected, (state, action) => {
      console.error('Error fetching produced items', action.error);
    });
    builder.addCase(fetchProcesses.fulfilled, (state, action) => {
      state.processes = action.payload.map((item: any) => new Process(item));
    });
    builder.addCase(fetchProcesses.rejected, (state, action) => {
      console.error('Error fetching processes', action.error);
    });
  }
})

export const {
  handleFilter,
  handleItemDetail,
} = productionFormulaSlice.actions;

export default productionFormulaSlice.reducer;