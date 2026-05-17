import api from "@/services/apiClient";

export interface CustomerBookingPayload {
  date: string;
  time: string;
  guestCount: number;
  tableId: string;
  customerName: string;
  email: string;
  specialRequest: string;
}

export const customerBookingApi = {
  async createBooking(payload: CustomerBookingPayload) {
    const res = await api.post("/bookings", payload);
    return res.data;
  },

  async verifyBooking(code: string) {
    const res = await api.get(`/bookings/${code}`);
    return res.data;
  },
};
