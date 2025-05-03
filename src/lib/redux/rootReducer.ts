import authStore from '@modules/auth/stores/auth.store';
import productionFormulaStore from '@modules/manufacturing/production-formula/stores/production-formula.store';

const rootReducer = {
  authStore,
  productionFormulaStore,
}

export default rootReducer;