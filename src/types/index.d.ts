type AccountTypeEnum =
  | "NONE"
  | "ARTISAN"
  | "SAFARI"
  | "FAIRS"
  | "BUSINESS"
  | "HOTEL"
  | "RESTAURANT"
  | "LANGUAGE"
  | "TRAVEL_PLANER"
  | "SUPERADMIN"
  | "ARTISAN_ADMIN"
  | "SAFARI_ADMIN"
  | "FAIRS_ADMIN"
  | "BUSINESS_ADMIN"
  | "HOTEL_ADMIN"
  | "RESTAURANT_ADMIN"
  | "TRAVEL_PLANER_ADMIN"
  | "LANGUAGE_ADMIN"
  | "CRAFT_DOCUMENTOR_ADMIN"
  | "CRAFT_DOCUMENTOR"
  | "ECO_TRANSIT";

type AccountProps = {
  userId: string;
  email: string;
  password: string;
  accountType: AccountTypeEnum;
};

type LoginProps = {
  token: string;
  user: {
    id: string;
    email: string;
    accountType: string;
  };
};

type CraftProps = {
  craftId: string;
  createdAt: Date;
  craftName: string;
  craftSlug: string;
  updateAt: Date;
};

type SubCraftProps = {
  craftId: string;
  subCraftId: string;
  createdAt: Date;
  updatedAt: Date;
  subCraftName: string;
  subCraftSlug: string;
};

// * ARTISAN

type ArtisanCreationProps = {
  firstName: string;
  lastName: string;
  address: string;
  description: string;
  experience: string;
  education: string;
  training: string;
  certificate: string;
  recognition: string;
  craftId: string;
  subCraftId: string;
  dp: string;
  email: string;
  password: string;
}; 

type ArtisanUpdationProps = {
  accountId: string;
  firstName: string;
  lastName: string;
  address: string;
  description: string;
  experience: string;
  education: string;
  training: string;
  certificate: string;
  recognition: string;
  craftId: string;
  subCraftId: string;
  dp: string;
};

type PortfolioProps = {
  portfolioId: string;
  images: string[];
};

type ArtisanDetailProps = {
  artisanId: string;
  firstName: string;
  lastName: string;
  address: string;
  description: string;
  experience: string;
  education: string;
  training: string;
  certificate: string;
  recongnition: string;
  craftId: string;
  subCraftId: string;
  dp: string;
  isActive: boolean;
  craftId: string;
  subCraftId: string;
  accountId: string;
  subCraft: SubCraftProps;
  craft: CraftProps;
};

type ArtisanPortolioProps = {
  artisanId: string;
  firstName: string;
  lastName: string;
  address: string;
  description: string;
  experience: string;
  education: string;
  training: string;
  certificate: string;
  recongnition: string;
  craftId: string;
  subCraftId: string;
  dp: string;
  subCraft: SubCraftProps;
  craft: CraftProps;
  Portfolio: PortfolioProps | null;
  ArtisanPackage: ArtisanPackageProps[];
};

type ArtisanPackageRequestProps = {
  accountId: string;
  price: number;
  title: string;
  duration: number;
  features: string[];
  experience: string;
};

type ArtisanPackageUpdateProps = {
  packageId: string;
  price: number;
  title: string;
  duration: number;
  features: string[];
  experience: string;
};

type ArtisanPackageProps = {
  packageId: string;
  duration: number;
  features: string[];
  experience: string;
  price: number;
  title: string;
  artisanId: string;
  createdAt: Date;
  updatedAt: Date;
};

//* SAFARI
type SafariCreationProps = {
  firstName: string;
  lastName: string;
  address: string;
  description: string;
  dp: string;
  email: string;
  password: string;
};

type SafariUpdationProps = {
  accountId: string;
  firstName: string;
  lastName: string;
  address: string;
  description: string;
  dp: string;
};

type SafariProps = {
  safariId: string;
  firstName: string;
  lastName: string;
  dp: string;
  address: string;
  isActive: boolean;
  description: string;
  accountId: string;
};

type SafariTourCreationProps = {
  title: string;
  duration: string;
  fee: number;
  operator: string;
  description: string;
  features: string[];
  accountId: string;
};

type SafariTourProps = {
  tourId: string;
  title: string;
  operator: string;
  description: string;
  duration: string;
  features: string[];
  fee: number;
  safariId: string;
  createdAt: Date;
  updatedAt: Date;
};

type SafariBookingInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  additionalNote: string;

  tourDate: string;
  numberOfGuests: number;
  totalAmount: number;
  tourId: string;
  safariId: string;
};

type SafariDetailProps = {
  safariId: string;
  firstName: string;
  lastName: string;
  dp: string;
  address: string;
  description: string;
  accountId: string;
  SafariTour: SafariTourProps[];
};

// * FAIR
type FairCreationProps = {
  firstName: string;
  lastName: string;
  address: string;
  description: string;
  dp: string;
  email: string;
  password: string;
};

type FairUpdationProps = {
  accountId: string;
  firstName: string;
  lastName: string;
  address: string;
  description: string;
  dp: string;
};

type FairProps = {
  fairId: string;
  firstName: string;
  lastName: string;
  dp: string;
  address: string;
  description: string;
  accountId: string;
};

type FairLocationEnum = "INTERNATIONAL" | "NATIONAL" | "LOCAL";
type FairTypeEnum = "FAIR" | "EXHIBITION" | "MUSEUM";
type FairEventCreationProps = {
  title: string;
  location: string;
  vanue: string;
  fairType: string;
  startDate: string;
  endDate: string;
  organizer: string;
  latitude: number;
  longitude: number;
  description: string;
  accountId: string;
};

type FairBookingInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  numberOfTickets: number;
  ticketType: string;
  additionalNote: string;
  eventDate: string;
  eventId: string;
  fairId: string;
  totalAmount: number;
};

type FairEventUpdationProps = {
  title: string;
  location: string;
  vanue: string;
  fairType: string;
  startDate: string;
  endDate: string;
  organizer: string;
  latitude: number;
  longitude: number;
  description: string;
  eventId: string;
};

type FairEventProps = {
  eventId: string;
  title: string;
  location: FairLocationEnum;
  vanue: string;
  startDate: string;
  endDate: string;
  organizer: string;
  fairType: FairTypeEnum;
  latitude: number;
  longitude: number;
  description: string;
  fairId: string;
  createdAt: Date;
  updatedAt: Date;
};

type FairDetailProps = {
  fairId: string;
  firstName: string;
  lastName: string;
  dp: string;
  address: string;
  description: string;
  accountId: string;
  FairEvent: FairEventProps[];
};

//* Shop
type ShopCreationProps = {
  email: string;
  password: string;
  accountId: string;
  businessName: string;
  shopName: string;
  vendorType: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  ownerName: string;
  phoneNumber: string;
  website: string;
  description: string;
  productCategories: string[];
  isGICertified: boolean;
  isHandmade: string;
  pickupOptions: string[];
  deliveryTime: string;
  deliveryFee: string;
  pricingStructure: string;
  orderProcessing: string;
  paymentMethods: string[];
  returnPolicy: string;
  stockAvailability: string;
  offersCustomization: boolean;
  packagingType: string;
  shopTiming: string;
  workingDays: string[];
  agreedToTerms: boolean;
  agreedToBlacklist: boolean;
  dp: string;
};

type ShopUpdationProps = {
  accountId: string;
  businessName: string;
  shopName: string;
  vendorType: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  ownerName: string;
  phoneNumber: string;
  website: string;
  description: string;
  productCategories: string[];
  isGICertified: boolean;
  isHandmade: string;
  pickupOptions: string[];
  deliveryTime: string;
  deliveryFee: string;
  pricingStructure: string;
  orderProcessing: string;
  paymentMethods: string[];
  returnPolicy: string;
  stockAvailability: string;
  offersCustomization: boolean;
  packagingType: string;
  shopTiming: string;
  workingDays: string[];
  dp: string;
  agreedToTerms?: boolean;
  agreedToBlacklist?: boolean;
};

type ShopProps = {
  accountId: string;
  businessName: string;
  shopName: string;
  vendorType: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  ownerName: string;
  phoneNumber: string;
  website: string;
  description: string;
  productCategories: string[];
  isGICertified: boolean;
  isHandmade: string;
  pickupOptions: string[];
  deliveryTime: string;
  deliveryFee: string;
  pricingStructure: string;
  orderProcessing: string;
  paymentMethods: string[];
  returnPolicy: string;
  stockAvailability: string;
  offersCustomization: boolean;
  packagingType: string;
  shopTiming: string;
  workingDays: string[];
  agreedToTerms: boolean;
  agreedToBlacklist: boolean;
  dp: string;
};

type ProductCreationProps = {
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  material: string;
  dimensions?: string;
  weight?: number;
  stock: number;
  isAvailable: boolean;
  craftType: string;
  artisanMade: boolean;
  accountId: string;
};

type ProductUpdateProps = {
  productId: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  material: string;
  dimensions?: string;
  weight?: number;
  stock: number;
  isAvailable: boolean;
  craftType: string;
  artisanMade: boolean;
};

type ProductProps = {
  productId: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  material: string;
  dimensions: string | null;
  weight: number | null;
  stock: number;
  isAvailable: boolean;
  craftType: string;
  artisanMade: boolean;
  shopId: string;
  createdAt: Date;
  updatedAt: Date;
};

type ShopDetailProps = {
  accountId: string;
  businessName: string;
  shopName: string;
  vendorType: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  ownerName: string;
  phoneNumber: string;
  website: string;
  description: string;
  productCategories: string[];
  isGICertified: boolean;
  isHandmade: string;
  pickupOptions: string[];
  deliveryTime: string;
  deliveryFee: string;
  pricingStructure: string;
  orderProcessing: string;
  paymentMethods: string[];
  returnPolicy: string;
  stockAvailability: string;
  offersCustomization: boolean;
  packagingType: string;
  shopTiming: string;
  workingDays: string[];
  agreedToTerms: boolean;
  agreedToBlacklist: boolean;
  dp: string;
  createdAt: Date;
  updatedAt: Date;
  products: ProductProps[];
};

//* Restaurant
type RestaurantCreationProps = {
  name: string;
  description: string;
  location: string;
  cuisine: string[];
  priceRange: string;
  image: string;
  email: string;
  password: string;
};

type RestaurantUpdationProps = {
  restaurantId: string;
  name: string;
  description: string;
  location: string;
  cuisine: string[];
  priceRange: string;
  image: string;
};

type RestaurantProps = {
  restaurantId: string;
  accountId: string;
  name: string;
  description: string;
  location: string;
  cuisine: string[];
  priceRange: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

type RestaurantMenuProps = {
  menuItemId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  restaurantId: string;
  createdAt: Date;
  updatedAt: Date;
};

type RestaurantDetailProps = {
  restaurantId: string;
  name: string;
  description: string;
  location: string;
  cuisine: string[];
  priceRange: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  menu: RestaurantMenuProps[];
};

type RestaurantDetailByAccountIdProps = {
  restaurantId: string;
  name: string;
  description: string;
  location: string;
  cuisine: string[];
  priceRange: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

type RestaurantBookingCreationProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tableNumber: string;
  additionalNote: string;
  resturantId: string;
  subtotal: number;
  tax: number;
  total: number;
  items: {
    menuItemId: string;
    quantity: number;
  }[];
};

type MenuCategory = "STARTER" | "MAIN_COURSE" | "DESSERT" | "BEVERAGE";

type MenuItemProps = {
  menuItemId: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  spicyLevel: number;
  image: string;
  restaurantId: string;
  createdAt: Date;
  updatedAt: Date;
};

type MenuItemCreationProps = {
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  spicyLevel: number;
  image: string;
  accountId: string;
};

type MenuItemUpdateProps = {
  menuItemId: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  spicyLevel: number;
  image: string;
};

// * Travel Planer
type TravelPlanerCreationProps = {
  name: string;
  description: string;
  location: string;
  priceRange: string;
  language: string[];
  speciality: string[];
  email: string;
  password: string;
  accountId: string;
  dp: string;
};

type TravelPlanerUpdationProps = {
  travelPlanerId: string;
  name: string;
  description: string;
  location: string;
  priceRange: string;
  language: string[];
  speciality: string[];
  dp: string;
  accountId: string;
};

type TravelPlanerProps = {
  travelPlanerId: string;
  name: string;
  description: string;
  location: string;
  priceRange: string;
  language: string[];
  speciality: string[];
  dp: string;
  accountId: string;
};

type TravelTourCreationProps = {
  title: string;
  description: string;
  image: string;
  duration: number;
  isPricePerPerson: boolean;
  maxGroupSize: number;
  price: number;
  languages: string[];
  features: string[];
  isActive: boolean;
  accountId: string;
};

type TravelTourProps = {
  tourId: string;
  title: string;
  description: string;
  image: string;
  duration: number;
  isPricePerPerson: boolean;
  maxGroupSize: number;
  price: number;
  languages: string[];
  features: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type TravelTourUpdateProps = {
  tourId: string;
  title: string;
  description: string;
  image: string;
  duration: number;
  isPricePerPerson: boolean;
  maxGroupSize: number;
  price: number;
  languages: string[];
  features: string[];
  isActive: boolean;
};

type HotelProps = {
  hotelId: string;
  code: string;
  name: string;
  address: string;
  longitude: number;
  latitude: number;
  description: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  isActive: boolean;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  accountId: string;
};

type HotelCreationProps = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  hotelName: string;
  address: string;
  description: string;
  phone: string;
  longitude?: string;
  latitude?: string;
  checkIn: string;
  checkOut: string;
};

type HotelUpdateProps = {
  hotelId: string;
  name: string;
  address: string;
  longitude: string;
  latitude: string;
  description: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  images: string[];
};

type RoomProps = {
  roomId: string;
  code: string;
  name: string;
  capacity: number;
  area: number;
  features: string[];
  description: string;
  dp: string;
  beds: number;
  quantity: number;
  price: number;
  isActive: boolean;
  minimumstay: number;
  images: string[];
  hotelId: string;
};

type RoomCreationProps = {
  name: string;
  capacity: number;
  area: number;
  features: string[];
  description: string;
  roomType: string;
  dp: string;
  beds: number;
  quantity: number;
  price: number;
  isActive: boolean;
  minimumstay: number;
  images: string[];
  accountId: string;
};

type RoomTableProps = {
  roomId: string;
  code: string;
  name: string;
  capacity: number;
  area: number;
  features: string[];
  description: string;
  roomType: string;
  dp: string;
  beds: number;
  quantity: number;
  price: number;
  images: string[];
  hotelId: string;
  isActive: boolean;
  minimumstay: number;
  images: string[];
  hotel: {
    name: string;
    hotelId: string;
    phone: string;
    code: string;
    accountId: string;
  };
};

type ArtisanBookingCreationProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  additionalNote: string;
  startDate: string;
  endDate: string;
  amount: number;
  artisanId: string;
  packageId: string;
};

type LanguageServiceCreationProps = {
  profileName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  description: string;
  experience: string;
  languages: string[];
  specialization: string[];
  hourlyRate: number;
  minBookingHours: number;
  maxBookingHours: number;
  availability: string[];
  startTime: string;
  endTime: string;
  location: string;
  serviceMode: string[];
  certification: string[];
  qualification: string;
  profileImage: string;
  portfolio: string[];
  accountId: string;
};

type LanguageServiceUpdateProps = {
  languageServiceId: string;
  profileName: string;
  firstName: string;
  lastName: string;
  description: string;
  experience: string;
  languages: string[];
  specialization: string[];
  hourlyRate: number;
  minBookingHours: number;
  maxBookingHours: number;
  availability: string[];
  startTime: string;
  endTime: string;
  location: string;
  serviceMode: string[];
  certification: string[];
  qualification: string;
  profileImage: string;
  portfolio: string[];
};

type LanguageServiceFilterOptions = {
  languages: string[];
  specializations: string[];
  locations: string[];
  serviceModes: string[];
  priceRanges: string[];
};

type LanguageServiceBookingInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  additionalNote: string;
  bookingDate: string;
  bookingTime: string;
  hours: number;
  sourceLanguage: string;
  targetLanguage: string;
  totalAmount: number;
  languageServiceId: string;
};

type TravelBookingCreationProps = {
  travelPlanerId: string;
  tourId: string;
  startDate: string;
  endDate: string;
  numberOfPeople: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  additionalRequests: string;
  totalAmount: number;
};

type ShopOrderCreationProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  additionalNote?: string;
  shopId: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
};

type DocumentorBookingInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  postalCode?: string;
  additionalNote?: string;
  startDate: string;
  endDate: string;
  location: string;
  specialRequests?: string;
  totalAmount: number;
  packageId: string;
  documentorId: string;
};

type DocumentorProfileInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dp: string;
  address: string;
  description: string;
  yearsExperience: number;
  specialization: string[];
  craftFocusAreas: string[];
  languages: string[];
};

type DocumentorProfile = {
  documentorId: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  bio: string;
  location: string;
  yearsExperience: number;
  specialization: string[];
  equipment: string[];
  documentationStyle: string[];
  mediaTypes: string[];
  portfolioLinks?: string[];
  isActive: boolean;
  accountId: string;
  account: {
    email: string;
    accountType: AccountType;
  };
  DocumentorPortfolio?: {
    images: string[];
    videos: string[];
    droneShots: string[];
  };
  documents?: {
    name: string;
    url: string;
    type: string;
  }[];
};

type CraftDocumentorProps = {
  documentorId: string;
  firstName: string;
  lastName: string;
  dp: string;
  address: string;
  description: string;
  yearsExperience: number;
  specialization: string[];
  craftFocusAreas: string[];
  languages: string[];
  isActive: boolean;
  accountId: string;
  createdAt: Date;
  updatedAt: Date;
};

type DocumentorProfileUpdateInputProps = {
  firstName: string;
  lastName: string;
  dp: string;
  description: string;
  address: string;
  yearsExperience: number;
  specialization: string[];
  languages: string[];
  craftFocusAreas: string[];
};

type RatePlanDetailProps = {
  code: string;
  description: string;
  hotelId: string;
  name: string;
  isActive: boolean;
  ratePlanId: string;
  mealId: number;
  roomrateplans: {
    room: { capacity: number };
    occupancy: number;
    rrpId: string;
  }[];
};

type DiscountProps = {
  discountId: string;
  discount: number;
  title: string;
  startDate: string;
  endDate: string;
  redeemCode: string;
  createdAt: Date;
  updatedAt: Date;
};

type RatePlanProps = {
  ratePlanId: string;
  code: string;
  name: string;
  description: string;
  isActive: boolean;
  mealId: number;
  hotelId: string;
  createdAt: Date;
  updatedAt: Date;
};

type RatePlanHotelDetailProps = {
  ratePlanId: string;
  code: string;
  name: string;
  description: string;
  isActive: boolean;
  mealId: number;
  hotelId: string;
  hotel: {
    hotelId: string;
    code: string;
    name: string;
    accountId: string;
  };
};

type RatePlanCreationProps = {
  rateName: string;
  description: string;
  accountId: string;
  mealId: number;
};

type RatePlanUpdateProps = {
  rateId: string;
  rateName: string;
  code: string;
  description: string;
  mealId: number;
};

type RatePlanStatusUpdateProps = {
  rateId: string;
  status: boolean;
};

type RatePlanDeleteProps = {
  rateId: string;
};

type RoomRatePLanProps = {
  rrpId: string;
  occupancy: number;
  hotelName: string;
  hotelId: string;
  rateId: string;
  roomId: string;
  createdAt: Date;
  updatedAt: Date;
};

type RoomRatePlanCreationProps = {
  rateId: string;
  roomId: string;
  occupancy: number;
};

type PriceProps = {
  priceId: string;
  startDate: string;
  endDate: string;
  planCode: string;
  price: number;
  rrpId: string;
};

type FilteredPricesProps = {
  rrpId: string;
  rateId: string;
  roomId: string;
  occupancy: number;
  roomprices: {
    startDate: string;
    endDate: string;
    price: number;
    planCode: string;
  }[];
};

type RatePriceProps = {
  rrpId: string;
  rateId: string;
  roomId: string;
  occupancy: number;
  roomprices: {
    startDate: string;
    endDate: string;
    price: number;
    planCode: string;
  }[];
  room: {
    roomId: string;
    name: string;
    quantity: number;
  };
  rate: {
    ratePlanId: string;
    name: string;
    code: string;
  };
};

type GroupedRatePriceProps = {
  roomId: string;
  name: string;
  occupancy: number;
  roomrateplans: {
    rrpId: string;
    rateId: string;
    roomId: string;
    occupancy: number;
    roomprices: {
      startDate: string;
      endDate: string;
      price: number;
      planCode: string;
    }[];
    rate: {
      ratePlanId: string;
      name: string;
      code: string;
    };
  }[];
};

type BlockDateCreationProps = {
  startDate: string;
  endDate: string;
  roomId: string;
  hotelCode: string;
  roomCode: string;
};

type BlockDatesResponse = {
  roomId: string;
  blockdates: {
    startDate: string;
    endDate: string;
  }[];
};

type RoomBookingInfoProps = {
  bookingDetailId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  arrivalTime: string;
  zip: string;
  address: string;
  additionalInfo: string;
  status: string;
  dob: string;
};

type BookingCancelProps = {
  roomId: string;
  bookingDetailId: string;
};

type RefundCreationProps = {
  bookingId: string;
  reason: string;
  percentage: number;
  accountId: string;
};

type BookingTableProps = {
  bookingId: string;
  startDate: string;
  endDate: string;
  price: number;
  adults: number;
  children: number;
  isRefund: boolean;
  createdAt: Date;
  bookingDetailId: string;
  BookingDetail: {
    bookingDetailId: string;
    firstName: string;
    lastName: string;
    email: string;
    status: string;
    bookingReservationId: string;
  };
  room: {
    roomId: string;
    name: string;
  };
};

type RoomBookingDetailProps = {
  bookingId: string;
  startDate: string;
  endDate: string;
  price: number;
  isRefund: boolean;
  roomId: string;
  bookingDetailId: string;
  quantity: number;
  adults: number;
  children: number;
  createdAt: Date;
  BookingDetail: {
    bookingDetailId: string;
    city: string;
    country: string;
    phone: string;
    zip: string;
    address: string;
    firstName: string;
    lastName: string;
    email: string;
    arrivalTime: string;
    status: string;
    additionalInfo: string;
  };
  room: {
    roomId: string;
    name: string;
    hotelId: string;
    roomType: string;
    hotel: {
      name: string;
      phone: string;
    };
  };
};

type BookingCreationProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  zip: string;
  address: string;
  arrivalTime: string;
  additional: string;
  dob: string;
  startDate: string;
  endDate: string;
  adults: number;
  children: number;
  quantity: number;
  roomId: string;
  price: number;
  duration:number
  rateplan: string;
};

type BookingUpdateProps = {
  bookingDetailId: string;
  bookingId: string;
  adults: number;
  children: number;
  infants: number;
  quantity: number;
  startDate: string;
  roomId: string;
  endDate: string;
  price: number;
  mealType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  zip: string;
  address: string;
  arrivalTime: string;
  type: string;
  rateplan: string;
  additional: string;
  dob: string;
};

type BookingPreviewProps = {
  room: {
    hotel: {
      name: string;
    };
    name: string;
    roomType: string;
  };
  startDate: string;
  endDate: string;
  bookingId: string;
  price: number;
  adults: number;
  children: number;
  BookingDetail: {
    bookingDetailId: string;
    firstName: string;
    email: string;
    country: string;
  };
};

type ReservationProps = {
  bookingId: string;
  startDate: string;
  endDate: string;
  quantity: number;
  adults: number;
  children: number;
  roomId: string;
  BookingDetail: {
    bookingDetailId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
};

//* ECO TRANSIT
type EcoTransitCreationProps = {
  name: string;
  address: string;
  description: string;
  dp: string;
  email: string;
  password: string;
};

type EcoTransitUpdationProps = {
  accountId: string;
  name: string;
  address: string;
  description: string;
  dp: string;
};

type EcoTransitProps = {
  transitId: string;
  name: string;
  dp: string;
  address: string;
  description: string;
  isActive: boolean;
  accountId: string;
};

// Shop Order Types
type ShopOrderProps = {
  orderId: string;
  isActive: boolean;
  status: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shopId: string;
  bookingDetailId: string;
  createdAt: Date;
  updatedAt: Date;
  bookingDetail: BookingDetailProps;
  orderItems: ShopOrderItemProps[];
};

type ShopOrderItemProps = {
  orderItemId: string;
  quantity: number;
  price: number;
  orderId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  product: {
    name: string;
    images: string[];
    price: number;
  };
};

type BookingDetailProps = {
  bookingDetailId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  additionalNote: string;
  address: string;
  city: string;
  postalCode: string;
  createdAt: Date;
  updatedAt: Date;
};
