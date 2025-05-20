/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SalesOrderService } from '../services'
import { ResponseModel } from "@src/shared/models";
import { CustomerModel } from "../models/customer.model";
import { SalesOrderListModel } from "../models/sales-order-list.model";
import { SalesOrderListDetailModel } from "../models/sales-order-detail.model";
import { FilterSalesOrderListRequest } from "../requests/filter-sales-order.request";
import { ItemListModel } from "../models/item-list.model";
import { StorageService } from "@src/shared/local-storage";

export const fetchCustomers = createAsyncThunk(
  'salesOrder/fetchCustomer',
  async (): Promise<CustomerModel[]> => {
    const { d } = await SalesOrderService().getCustomer()
    return d;
  }
)

export const fetchItems = createAsyncThunk(
  'salesOrder/fetchItems',
  async (): Promise<ItemListModel[]> => {
    const { d } = await SalesOrderService().getItem()
    return d;
  }
)

export const fetchSalesOrderList = createAsyncThunk(
  'salesOrder/fetchSalesOrderList',
  async (option: FilterSalesOrderListRequest): Promise<ResponseModel<SalesOrderListModel[]>> => {
    const data = await SalesOrderService().show(option);
    return data;
  }
)

export const fetchSalesOrderDetail = createAsyncThunk(
  'salesOrder/fetchSalesOrderDetail',
  async (id: number): Promise<SalesOrderListDetailModel> => {
    const { d } = await SalesOrderService().detail(id);
    StorageService().set('salesOrderItem', d);
    return d;
  }
)

const initialSalesOrderItem = () => {
  const item = StorageService().get('salesOrderItem');
  if (item && typeof item === 'object') {
    return new SalesOrderListDetailModel(item as any);
  }
  return undefined;
}

interface SalesOrderState {
  data: ResponseModel<SalesOrderListModel[]> | undefined;
  item: SalesOrderListDetailModel | undefined;
  filter: FilterSalesOrderListRequest;
  customers: CustomerModel[] | undefined;
  items: ItemListModel[] | undefined;
}

const initialState: SalesOrderState = {
  data: undefined,
  item: initialSalesOrderItem(),
  filter: FilterSalesOrderListRequest.createFromJson({}),
  customers: undefined,
  items: undefined,
};

export const salesOrderSlice = createSlice({
  name: 'salesOrder',
  initialState,
  reducers: {
    handleFilter: (state, action: PayloadAction<FilterSalesOrderListRequest>) => {
      state.filter = new FilterSalesOrderListRequest(action.payload);
    },
    handleItemDetail: (state, action: PayloadAction<SalesOrderListDetailModel | undefined>) => {
      if (!action.payload) {
        StorageService().destroy('salesOrderItem');
      }
      state.item = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSalesOrderList.fulfilled, (state, action) => {
      state.data = new ResponseModel<SalesOrderListModel[]>(action.payload);
    });
    builder.addCase(fetchSalesOrderList.rejected, (state, action) => {
      console.error('Error fetching sales order list:', action.error);
    });
    builder.addCase(fetchSalesOrderDetail.fulfilled, (state, action) => {
      state.item = new SalesOrderListDetailModel(action.payload);
    });
    builder.addCase(fetchSalesOrderDetail.rejected, (state, action) => {
      console.error('Error fetching sales order detail:', action.error);
    })
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      state.customers = action.payload.map((c) => new CustomerModel(c));
    });
    builder.addCase(fetchCustomers.rejected, (state, action) => {
      console.error('Error fetching customer list:', action.error);
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload.map((i) => new ItemListModel(i));
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      console.error('Error fetching item list:', action.error);
    });
  }
})

export const {
  handleItemDetail,
  handleFilter,
} = salesOrderSlice.actions;

export default salesOrderSlice.reducer;