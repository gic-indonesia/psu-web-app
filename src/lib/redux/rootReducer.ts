import authStore from '@modules/auth/stores/auth.store';
import productionFormulaStore from '@modules/manufacturing/production-formula/stores/production-formula.store';
import salesOrderStore from '@modules/sales/sales-order/stores/sales-order.store';

const rootReducer = {
  authStore,
  productionFormulaStore,
  salesOrderStore,
}

export default rootReducer;