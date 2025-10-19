import { z } from "zod";

export const artisanCreationSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    address: z.string(),
    description: z.string(),
    experience: z.string(),
    education: z.string(),
    training: z.string(),
    certificate: z.string(),
    recognition: z.string(),
    craftId: z.string(),
    subCraftId: z.string(),
    dp: z.string(),
    email: z.string(),
    password: z.string()
})

export const artisanUpdationSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    address: z.string(),
    description: z.string(),
    experience: z.string(),
    education: z.string(),
    training: z.string(),
    certificate: z.string(),
    recognition: z.string(),
    craftId: z.string(),
    subCraftId: z.string(),
    dp: z.string(),
    accountId: z.string()
})

export const safariCreationSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    address: z.string(),
    description: z.string(),
    dp: z.string(),
    email: z.string(),
    password: z.string()
})

export const safariUpdationSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    address: z.string(),
    description: z.string(),
    dp: z.string(),
})

export const fairCreationSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    address: z.string(),
    description: z.string(),
    dp: z.string(),
    email: z.string(),
    password: z.string()
})

export const fairUpdationSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    address: z.string(),
    description: z.string(),
    dp: z.string(),
    accountId: z.string()
})

export const shopCreationSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    businessName: z.string(),
    shopName: z.string(),
    vendorType: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    zipCode: z.string(),
    ownerName: z.string(),
    phoneNumber: z.string(),
    website: z.string(),
    description: z.string(),
    productCategories: z.array(z.string()),
    isGICertified: z.boolean(),
    isHandmade: z.string(),
    pickupOptions: z.array(z.string()),
    deliveryTime: z.string(),
    deliveryFee: z.string(),
    pricingStructure: z.string(),
    orderProcessing: z.string(),
    paymentMethods: z.array(z.string()),
    returnPolicy: z.string(),
    stockAvailability: z.string(),
    offersCustomization: z.boolean(),
    packagingType: z.string(),
    shopTiming: z.string(),
    workingDays: z.array(z.string()),
    agreedToTerms: z.boolean(),
    agreedToBlacklist: z.boolean(),
    dp: z.string(),
})

export const shopUpdationSchema = z.object({
    businessName: z.string(),
    shopName: z.string(),
    vendorType: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    zipCode: z.string(),
    ownerName: z.string(),
    phoneNumber: z.string(),
    website: z.string(),
    description: z.string(),
    productCategories: z.array(z.string()),
    isGICertified: z.boolean(),
    isHandmade: z.string(),
    pickupOptions: z.array(z.string()),
    deliveryTime: z.string(),
    deliveryFee: z.string(),
    pricingStructure: z.string(),
    orderProcessing: z.string(),
    paymentMethods: z.array(z.string()),
    returnPolicy: z.string(),
    stockAvailability: z.string(),
    offersCustomization: z.boolean(),
    packagingType: z.string(),
    shopTiming: z.string(),
    workingDays: z.array(z.string()),
    agreedToTerms: z.boolean().optional(),
    agreedToBlacklist: z.boolean().optional(),
    dp: z.string(),
    accountId: z.string()
})

export const restaurantCreationSchema = z.object({
    name: z.string(),
    description: z.string(),
    location: z.string(),
    cuisine: z.array(z.string()),
    priceRange: z.string(),
    image: z.string(),
    email: z.string().email(),
    password: z.string()
})

export const restaurantUpdationSchema = z.object({
    name: z.string(),
    description: z.string(),
    location: z.string(),
    cuisine: z.array(z.string()),
    priceRange: z.string(),
    image: z.string(),
    accountId: z.string()
})


export const travelPlanerCreationSchema = z.object({
    name: z.string(),
    description: z.string(),
    location: z.string(),
    priceRange: z.string(),
    language: z.array(z.string()),
    speciality: z.array(z.string()),
    email: z.string().email(),
    dp: z.string(),
    password: z.string(),
})

export const travelPlanerUpdationSchema = z.object({
    name: z.string(),
    description: z.string(),
    location: z.string(),
    priceRange: z.string(),
    language: z.array(z.string()),
    speciality: z.array(z.string()),
    dp: z.string(),
    accountId: z.string()
})

export const ecoTransitCreationSchema = z.object({
    name: z.string(),
    address: z.string(),
    description: z.string(),
    dp: z.string(),
    email: z.string(),
    password: z.string()
})

export const ecoTransitUpdationSchema = z.object({
    name: z.string(),
    address: z.string(),
    description: z.string(),
    dp: z.string(),
    accountId: z.string()
})
