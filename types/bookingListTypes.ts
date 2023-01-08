export interface bookingList {
  bookingList: {
    id: string;
    check_in: string;
    check_out: string;
    paid: number;
    createdAt: string;
    roomBy: {
      name: string;
    };
    status: string;
    userBy: {
      name: string;
      image: string;
    };
  }[];
  numOfpages: number;
  page: number;
}
export interface bookingList2 {
  id: string;
  check_in: string;
  check_out: string;
  paid: number;
  createdAt: string;
  roomBy: {
    name: string;
  };
  status: string;
  userBy: {
    name: string;
    image: string;
  };
}

export interface bookingStatus {
  CHECKIN: number;
  CHECKOUT: number;
}

export interface graphChart {
  monthly: string;
  CHECKIN: number;
  CHECKOUT: number;
}
export interface doughnutChart {
  Pending: number;
  Booked: number;
  Cancelled: number;
}
