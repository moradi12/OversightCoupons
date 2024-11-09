import { AdminActionType, AdminActions, Customer } from "./AdminActions";

export interface AdminState {
  customers: Customer[];
}

const initialState: AdminState = {
  customers: [],
};

export const adminReducer = (
  state: AdminState = initialState,
  action: AdminActions
): AdminState => {
  switch (action.type) {
    case AdminActionType.ADD_CUSTOMER:
      return { ...state, customers: [...state.customers, action.payload] };

    case AdminActionType.DELETE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter((customer) => customer.id !== action.payload),
      };

    case AdminActionType.UPDATE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.map((customer) =>
          customer.id === action.payload.id ? action.payload : customer
        ),
      };

    case AdminActionType.SET_CUSTOMER_LIST:
      return { ...state, customers: action.payload };

    default:
      return state;
  }
};
