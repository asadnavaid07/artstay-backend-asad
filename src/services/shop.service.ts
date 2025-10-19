import prisma from "~/libs/prisma";
import { logger } from "~/utils/logger";
import { Request } from "express";

export const shopService = {
  getApplicationStatus: async (accountId: string) => {
    try {
      const application = await prisma.shop.findUnique({
        where: {
          accountId: accountId,
        },
      });
      return {
        status: "success",
        message: "application status",
        data: application,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch application status");
    }
  },
  getFilterOptions: async () => {
    try {
      const shops = await prisma.shop.findMany({
        select: {
          city: true,
          state: true,
          country: true,
          isHandmade: true,
          vendorType: true,
          deliveryTime: true,
          productCategories: true,
        },
      });

      // Extract all unique product categories from the database
      const allCategories = new Set();
      shops.forEach((shop) => {
        shop.productCategories.forEach((category) => {
          allCategories.add(category);
        });
      });

      return {
        status: "success",
        message: "fetched all filters",
        data: {
          productCategories: Array.from(allCategories).sort(),
          locations: {
            cities: [...new Set(shops.map((shop) => shop.city))].filter(
              (city) => city !== "none"
            ),
            states: [...new Set(shops.map((shop) => shop.state))].filter(
              (state) => state !== "none"
            ),
            countries: [...new Set(shops.map((shop) => shop.country))].filter(
              (country) => country !== "none"
            ),
          },
          vendorTypes: [
            ...new Set(shops.map((shop) => shop.vendorType)),
          ].filter((type) => type !== "none"),
          handmadeOptions: [...new Set(shops.map((shop) => shop.isHandmade))],
          deliveryTimes: [
            ...new Set(shops.map((shop) => shop.deliveryTime)),
          ].filter((time) => time !== "none"),
          certificationOptions: ["giCertified"],
        },
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch filters");
    }
  },
  getAllShopsPagination: async (req: Request) => {
    try {
      const queryParams = req.query;
      const limit = Number(queryParams.limit);
      const skip = Number(queryParams.cursor ?? 0);
      const totalCount = await prisma.shop.count();

      const shops = await prisma.shop.findMany({
        take: limit,
        skip: skip,
        orderBy: {
          createdAt: "desc",
        },
        distinct: ["shopId"],
      });

      const nextCursor = skip + limit;
      const hasNextPage = nextCursor < totalCount;

      return {
        status: "success",
        message: "all shops",
        data: {
          shops: shops,
          metadata: {
            cursor: hasNextPage ? nextCursor.toString() : undefined,
            hasNextPage,
            totalItems: totalCount,
            currentPage: Math.floor(skip / limit) + 1,
            totalPages: Math.ceil(totalCount / limit),
          },
        },
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch all shops");
    }
  },
  getAllShops: async () => {
    try {
      const shops = await prisma.shop.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return {
        status: "success",
        message: "all shops",
        data: shops,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch all shops");
    }
  },
  getShopByAccountId: async (accountId: string) => {
    try {
      const shop = await prisma.shop.findUnique({
        where: {
          accountId: accountId,
        },
      });

      return {
        status: "success",
        message: "shops details",
        data: shop,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch shop details");
    }
  },
  getShopById: async (shopId: string) => {
    try {
      const shop = await prisma.shop.findUnique({
        where: {
          shopId: shopId,
        },
        include: {
          products: true,
        },
      });

      return {
        status: "success",
        message: "shop details",
        data: shop,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch shop details");
    }
  },
  createProduct: async (product: ProductCreationProps) => {
    try {
      let shop = await prisma.shop.findUnique({
        where: {
          accountId: product.accountId,
        },
      });

      if (!shop) {
        // Create a basic shop record for the user if it doesn't exist
        shop = await prisma.shop.create({
          data: {
            businessName: "My Business",
            shopName: "My Shop",
            vendorType: "Individual Artisan",
            address: "Address not provided",
            city: "City not provided",
            state: "State not provided",
            country: "Country not provided",
            zipCode: "00000",
            ownerName: "Owner not provided",
            phoneNumber: "0000000000",
            email: "email@example.com",
            website: "",
            description: "Shop profile not completed yet",
            productCategories: [],
            isGICertified: false,
            isHandmade: "Mixed",
            pickupOptions: [],
            deliveryTime: "Next Day",
            deliveryFee: "0",
            pricingStructure: "Fixed Price",
            orderProcessing: "Instant Confirmation",
            paymentMethods: [],
            returnPolicy: "Standard return policy",
            stockAvailability: "Ready Stock",
            offersCustomization: false,
            packagingType: "Standard",
            shopTiming: "9 AM - 6 PM",
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dp: "/placeholder-shop.svg",
            isActive: true,
            accountId: product.accountId,
            agreedToTerms: false,
            agreedToBlacklist: false,
          },
        });
      }

      await prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
          images: product.images,
          category: product.category,
          material: product.material,
          dimensions: product.dimensions,
          weight: product.weight,
          stock: product.stock,
          craftType: product.craftType,
          artisanMade: product.artisanMade,
          isAvailable: product.isAvailable,
          shopId: shop.shopId,
        },
      });

      return {
        status: "success",
        message: "product created",
        data: product,
      };
    } catch (error) {
      logger.error(error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to create product"
      );
    }
  },
  updateProduct: async (product: ProductUpdateProps) => {
    try {
      await prisma.product.update({
        where: {
          productId: product.productId,
        },
        data: product,
      });

      return {
        status: "success",
        message: "product updated",
        data: product,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to update product");
    }
  },
  getProductsByAccountId: async (accountId: string) => {
    try {
      const products = await prisma.product.findMany({
        where: {
          shop: {
            accountId: accountId,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        distinct: ["productId"],
      });

      return {
        status: "success",
        message: "products",
        data: products,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to get products");
    }
  },
  getProductById: async (productId: string) => {
    try {
      const product = await prisma.product.findUnique({
        where: {
          productId: productId,
        },
      });

      return {
        status: "success",
        message: "product",
        data: product,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to get product");
    }
  },
  createShopOrder: async (req: Request) => {
    try {
      const order = req.body as ShopOrderCreationProps;

      // Start a transaction to ensure all operations succeed or fail together
      return await prisma.$transaction(async (tx) => {
        // 1. Create order detail
        const orderDetail = await tx.bookingDetail.create({
          data: {
            firstName: order.firstName,
            lastName: order.lastName,
            email: order.email,
            phone: order.phone,
            additionalNote: order.additionalNote || "",
          },
        });

        // 2. Create shop order
        const shopOrder = await tx.shopOrder.create({
          data: {
            isActive: true,
            status: "new",
            subtotal: order.subtotal,
            tax: order.tax,
            shipping: order.shipping,
            total: order.total,
            bookingDetailId: orderDetail.bookingDetailId, // Fixed typo in field name
            shopId: order.shopId,
          },
        });

        // 3. Get product details for each item to save the correct price and update stock
        const products = await tx.product.findMany({
          where: {
            productId: {
              in: order.items.map((item) => item.productId),
            },
          },
          select: {
            productId: true,
            price: true,
            stock: true,
            name: true,
          },
        });

        const productPriceMap = new Map(
          products.map((product) => [product.productId, product.price])
        );

        // Check if any products are out of stock
        for (const item of order.items) {
          const product = products.find((p) => p.productId === item.productId);

          if (!product) {
            throw new Error(`Product with ID ${item.productId} not found`);
          }

          if (product.stock < item.quantity) {
            throw new Error(
              `Insufficient stock for product "${product.name}". Available: ${product.stock}, Requested: ${item.quantity}`
            );
          }
        }

        // 4. Create order items
        if (order.items && order.items.length > 0) {
          const orderItems = order.items.map((item) => ({
            orderId: shopOrder.orderId,
            productId: item.productId,
            quantity: item.quantity,
            price: productPriceMap.get(item.productId) || 0,
          }));

          await tx.shopOrderItem.createMany({
            data: orderItems,
          });

          // 5. Update stock for each product
          for (const item of order.items) {
            const product = products.find(
              (p) => p.productId === item.productId
            );
            if (product) {
              await tx.product.update({
                where: { productId: item.productId },
                data: {
                  stock: product.stock - item.quantity,
                  // If stock reaches 0, mark product as unavailable
                  isAvailable: product.stock - item.quantity > 0,
                },
              });
            }
          }
        }

        return {
          status: "success",
          message: "Shop order created successfully",
          data: {
            orderId: shopOrder.orderId,
          },
        };
      });
    } catch (error) {
      logger.error(error);
      // Provide more specific error message to the user
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Failed to create shop order");
    }
  },
  getShopOrders: async (accountId: string) => {
    try {
      // First get the shop for this account
      const shop = await prisma.shop.findUnique({
        where: { accountId },
        select: { shopId: true },
      });

      if (!shop) {
        return {
          status: "error",
          message: "Shop not found",
          data: null,
        };
      }

      // Get all orders for this shop with related data
      const orders = await prisma.shopOrder.findMany({
        where: { shopId: shop.shopId },
        include: {
          bookingDetail: true,
          orderItems: {
            include: {
              product: {
                select: {
                  name: true,
                  images: true,
                  price: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      return {
        status: "success",
        message: "Shop orders retrieved",
        data: orders,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch shop orders");
    }
  },
  updateOrderStatus: async (orderId: string, status: string) => {
    try {
      const updatedOrder = await prisma.shopOrder.update({
        where: { orderId },
        data: { status },
        include: {
          bookingDetail: true,
          orderItems: {
            include: {
              product: {
                select: {
                  name: true,
                  images: true,
                  price: true,
                },
              },
            },
          },
        },
      });

      return {
        status: "success",
        message: "Order status updated",
        data: updatedOrder,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to update order status");
    }
  },
};
