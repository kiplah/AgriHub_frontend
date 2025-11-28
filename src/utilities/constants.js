export const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#F9F9F9",
    minHeight: "48px",
    border: state.isFocused ? "2px solid #078C89" : "none",
    boxShadow: "none",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "none",
      border: state.isFocused ? "2px solid #078C89" : "none",
    },
    "&:focus": {
      boxShadow: "none",
      border: "2px solid #078C89",
    },
  }),
};

export const customDELModalStyles = {
  modal: {
    padding: "0px",
    margin: "5% auto",
    width: "90%",
    maxWidth: "400px",
    borderRadius: "20px",
    overflow: "hidden",
  },
};

export const customStylesServicesSpec = {
  control: (provided, state) => ({
    ...provided,
    height: "44px",
    borderRadius: "8px",
    ...(state.isFocused && {
      boxShadow: `0 0 0 2px #078C89`,
    }),
  }),
};

export const customModalStyles = {
  modal: {
    padding: "0px",
    margin: "5% auto",
    width: "90%",
    maxWidth: "400px",
    borderRadius: "20px",
    overflow: "hidden",
  },
};

export const customCityModalStyles = {
  modal: {
    padding: "0px",
    margin: "5% auto",
    width: "90%",
    maxWidth: "400px",
    borderRadius: "20px",
    overflow: "hidden",
  },
};

export const customServicesSpecModalStyles = {
  modal: {
    padding: "0px",
    margin: "5% auto",
    width: "90%",
    maxWidth: "400px",
    borderRadius: "20px",
    overflow: "hidden",
  },
};

export const createSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");
export const roleTypeOptions = [
  {
    value: "super_admin",
    label: "Super Admin",
  },
  {
    value: "business_owner",
    label: "Business Owner",
  },
  {
    value: "buyer",
    label: "Buyer",
  },
];
export const defaultUserValidations = {
  user_name: {
    isValid: null,
    message: "This field is required",
  },
  email: {
    isValid: null,
    message: "This field is required",
  },
  role_type: {
    isValid: true,
    message: "This field is required",
  },
  password: {
    isValid: true,
    message: "This field is required",
  },
  confirm_password: {
    isValid: true,
    message: "This field is required",
  },
};
export const defaultUserFormValues = {
  user_name: "",
  email: "",
  role_type: "business_owner",
  picture: "",
  password: "",
  is_active: true,
};
export const defaultAmenValidStates = {
  name: {
    isValid: null,
    message: "NAME is required.",
  },
  slug: {
    isValid: null,
    message: "SLUG is required.",
  },
};
export const defaultSpecValidStates = {
  name: {
    isValid: null,
    message: "Name is required",
  },
  slug: {
    isValid: null,
    message: "Slug is required",
  },
  category: {
    isValid: true,
    message: "CATEGORY is required",
  },
};
export const defaultServValidStates = {
  name: {
    isValid: null,
    message: "Name is required",
  },
  slug: {
    isValid: null,
    message: "Slug is required",
  },
  speciality: {
    isValid: true,
    message: "Speciality is required",
  },
};
export const defaultShopValidations = {
  name: {
    isValid: null,
    message: "This field is required",
  },
  slug: {
    isValid: null,
    message: "This field is required",
  },
  description: {
    isValid: true,
    message: "This field is required",
  },
  status: {
    isValid: true,
    message: "This field is required",
  },
  region: {
    isValid: true,
    message: "This field is required",
  },
  postal_code: {
    isValid: true,
    message: "This field is required",
  },
  address: {
    isValid: true,
    message: "This field is required",
  },
  email_1: {
    isValid: true,
    message: "This field is required",
  },
  phone_1: {
    isValid: true,
    message: "This field is required",
  },
  facebook: {
    isValid: true,
    message: "Must be a valid url",
  },
  x: {
    isValid: true,
    message: "Must be a valid url",
  },
  instagram: {
    isValid: true,
    message: "Must be a valid url",
  },
  tick_tok: {
    isValid: true,
    message: "Must be a valid url",
  },
  other: {
    isValid: true,
    message: "Must be a valid url",
  },
  website: {
    isValid: true,
    message: "Must be a valid url",
  },
};
export const defaultDaysOrder = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
export const defaultTimeSlots = {
  monday: {
    status: "Closed",
    slots: [],
  },
  tuesday: {
    status: "Closed",
    slots: [],
  },
  wednesday: {
    status: "Closed",
    slots: [],
  },
  thursday: {
    status: "Closed",
    slots: [],
  },
  friday: {
    status: "Closed",
    slots: [],
  },
  saturday: {
    status: "Closed",
    slots: [],
  },
  sunday: {
    status: "Closed",
    slots: [],
  },
};
export const defaultFormValues = {
  name: "",
  slug: "",
  description: "",
  website: "",
  media_gallery: {},
  time_slots: defaultTimeSlots,
  shop_owner: "",
  category: "",
  specialities: [],
  amenities: [],
  services: [],
  address: "",
  region: "",
  postal_code: "",
  city: "",
  email_1: "",
  email_2: "",
  phone_1: "",
  phone_2: "",
  facebook: "",
  instagram: "",
  tick_tok: "",
  x: "",
  other: "",
  status: "draft",
  coordinates: {
    lng: -71.21033,
    lat: 42.34516,
  },
  is_claimed: false,
};
export const statusOptions = [
  {
    value: "draft",
    label: "Draft",
  },
  {
    value: "in_revision",
    label: "In Revision",
  },
  {
    value: "published",
    label: "Published",
  },
  {
    value: "cancelled",
    label: "Cancelled",
  },
];
