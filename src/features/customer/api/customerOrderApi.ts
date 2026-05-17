import api from "@/services/apiClient";

export interface CustomerOrderItemPayload {
  menuId: string;
  quantity: number;
  note: string;
}

export interface CustomerOrderPayload {
  bookingCode: string;
  tableId: string;
  items: CustomerOrderItemPayload[];
}

export const customerOrderApi = {
  async createOrder(payload: CustomerOrderPayload) {
    const res = await api.post("/orders", payload);
    return res.data;
  },
};
