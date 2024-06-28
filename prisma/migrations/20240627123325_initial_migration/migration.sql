-- CreateTable
CREATE TABLE "products_table" (
    "id" TEXT NOT NULL,
    "productThumbnail" TEXT NOT NULL,
    "productTitle" TEXT NOT NULL,
    "productDescription" TEXT NOT NULL,
    "productCost" TEXT NOT NULL,
    "onOffer" TEXT NOT NULL,

    CONSTRAINT "products_table_pkey" PRIMARY KEY ("id")
);
