import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const appTypeState = atom({
  key: "appTypeState", 
  default: "bus", 
});

export const pageLoadingState = atom({
  key: "pageLoadingState", 
  default: false, 
});

export const loadingState = atom({
  key: "loadingState", 
  default: false, 
});
export const metaDataState = atom({
  key: "metaDataState", 
  default: null, 
});

export const uniqueTrainCitiesState = atom({
  key: "uniqueTrainCitiesState",
  default: null,
});

export const uniqueBusCitiesState = atom({
  key: "uniqueBusCitiesState",
  default: null,
});

export const busTerminalsState = atom({
  key: "busTerminalsState",
  default: null,
});

export const seletcedServiceState = atom({
  key: "seletcedServiceState",
  default: 0,
});

export const kuposModalState = atom({
  key: "kuposModalState", 
  default: {}, 
});

export const kuposModalWithButtonsState = atom({
  key: "kuposModalWithButtonsState", 
  default: {}, 
});

export const kuposModalErrorSuccessState = atom({
  key: "kuposModalErrorSuccessState", 
  default: {}, 
});

export const successErrorModalState = atom({
  key: "successErrorModalState",
  default: {},
});

export const showLoginModalState = atom({
  key: "showLoginModalState",
  default: null,
});

export const customPackageModalState = atom({
  key: "customPackageModalState",
  default: null,
});

export const dontGoToMyAccountOnLoginState = atom({
  key: "dontGoToMyAccountOnLoginState",
  default: false,
});

export const showTypeState = atom({
  key: "showTypeState",
  default: 1,
});

export const loginDataState = atom({
  effects_UNSTABLE: [persistAtom],
  key: "loginDataState",
  default: null,
});

export const isLoggedInState = atom({
  key: "isLoggedInState",
  default: false, 
});
export const myCardsState = atom({
  key: "myCardsState",
  default: null,
});

export const ticketDetailsState = atom({
  key: "setTicketDetails", 
  default: null, 
});

export const loginLoading = atom({
  key: "loginLoading", 
  default: false, 
});

export const signUpLoading = atom({
  key: "signUpLoading", 
  default: false, 
});

export const generateOtpPending = atom({
  key: "generateOtpPending", 
  default: false, 
});

export const validateOtpPendingState = atom({
  key: "validateOtpPendingState", 
  default: false, 
});

export const resetPasswordPendingState = atom({
  key: "resetPasswordPendingState", 
  default: false, 
});

export const trustedComapniesState = atom({
  key: "trustedComapniesState",
  default: [
    { id: 0, icon: "kaufman.png" },
    { id: 1, icon: "dhl.png" },
    { id: 2, icon: "msi_mining.png" },
    { id: 3, icon: "bci.png" },
    { id: 4, icon: "santander.png" },
    { id: 5, icon: "caja_vecina.png" },
    { id: 6, icon: "los_heroes.png" },
    { id: 7, icon: "banco_estado.png" },
    { id: 8, icon: "multicaja.png" },
  ],
});

export const cancellationModalState = atom({
  key: "cancellationModalState",
  default: false,
});

export const selectedTabState = atom({
  key: "selectedTabState",
  default: "search",
});

export const selectedPackageTabState = atom({
  key: "selectedPackageTabState",
  default: { id: 0, title: "All" },
});

export const selectedTabServicesState = atom({
  key: "selectedTabServicesState",
  default: "Tours",
});

export const selectedLocationState = atom({
  key: "selectedLocationState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const selectedHotelState = atom({
  key: "selectedHotelState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const selectedCarState = atom({
  key: "selectedCarState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const selectedPackageState = atom({
  key: "selectedPackageState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const allPackagesState = atom({
  key: "allPackagesState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});


export const selectedActivityState = atom({
  key: "selectedActivityState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
