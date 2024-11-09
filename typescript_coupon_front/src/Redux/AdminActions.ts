export enum AdminActionType {
  ADD_CUSTOMER = "ADD_CUSTOMER",
  DELETE_CUSTOMER = "DELETE_CUSTOMER",
  UPDATE_CUSTOMER = "UPDATE_CUSTOMER",
  SET_CUSTOMER_LIST = "SET_CUSTOMER_LIST",
}

export interface AddCustomerAction {
  type: AdminActionType.ADD_CUSTOMER;
  payload: Customer;
}

export interface DeleteCustomerAction {
  type: AdminActionType.DELETE_CUSTOMER;
  payload: number;
}

export interface UpdateCustomerAction {
  type: AdminActionType.UPDATE_CUSTOMER;
  payload: Customer;
}

export interface SetCustomerListAction {
  type: AdminActionType.SET_CUSTOMER_LIST;
  payload: Customer[];
}

export type AdminActions =
  | AddCustomerAction
  | DeleteCustomerAction
  | UpdateCustomerAction
  | SetCustomerListAction;

export interface Customer {
  id: number;
  email: string;
  password: string;
}

export const addCustomerAction = (customer: Customer): AddCustomerAction => ({
  type: AdminActionType.ADD_CUSTOMER,
  payload: customer,
});

export const deleteCustomerAction = (
  customerId: number
): DeleteCustomerAction => ({
  type: AdminActionType.DELETE_CUSTOMER,
  payload: customerId,
});

export const updateCustomerAction = (
  customer: Customer
): UpdateCustomerAction => ({
  type: AdminActionType.UPDATE_CUSTOMER,
  payload: customer,
});

export const setCustomerListAction = (
  customers: Customer[]
): SetCustomerListAction => ({
  type: AdminActionType.SET_CUSTOMER_LIST,
  payload: customers,
});
