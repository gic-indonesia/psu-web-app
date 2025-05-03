import { IProductionFormulaModel } from "../models/production-formula-list.model";

const mockProductionFormulas: IProductionFormulaModel[] = [
  {
    id: 'prod-formula-001',
    branch: 'Jakarta',
    name: 'Headlamp Honda Brio 2017 VTEC Turbo',
    qty: 100,
    denom: 'kg',
    aprroval_status: 'approved',
    is_active: true,
    price: 15000,
    total_price: 1500000,
    cost: 1200000,
    material: 1000000,
    other_price: 200000,
    annotation: 'For seasonal product',
    created_by: 'admin_user',
  },
  {
    id: 'prod-formula-002',
    branch: 'Bandung',
    name: 'Formula B',
    qty: 50,
    denom: 'liter',
    aprroval_status: 'pending',
    is_active: false,
    price: 20000,
    total_price: 1000000,
    cost: 850000,
    material: 700000,
    other_price: 150000,
    annotation: 'Under review for Q3',
    created_by: 'user_b',
  },
  {
    id: 'prod-formula-003',
    branch: 'Surabaya',
    name: 'Formula C',
    qty: 200,
    denom: 'pcs',
    aprroval_status: 'rejected',
    is_active: false,
    price: 10000,
    total_price: 2000000,
    cost: 1800000,
    material: 1500000,
    other_price: 300000,
    annotation: 'Rejected due to cost overrun',
    created_by: 'qa_manager',
  }
];

export default mockProductionFormulas;