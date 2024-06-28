import Router from "express";
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()
const router = Router();

router.get("/", async (req, res) => {
  try{
    const products = await prisma.products.findMany()
    res.status(200).json(products)
  }
  catch(err){
    res.status(500).json({success:false, message:err.message})
  }
});

router.get("/:id", async(req, res) => {
  const id = req.params.id
  try{
    const products = await prisma.products.findFirst({
      where: {id:id},
      select:{
        id:true,
        productThumbnail:true,
        productTitle:true,
        productDescription:true,
        productCost:true,
        onOffer:true
      }
    })
    if(!products){
      res.status(404).json({success:false,message:"User not found"})
    }
    else{
     res.status(200).json(products)
    }
  }
  catch(err){
    res.status(500).json({success:false,message:err.message})
  }
});

router.post("/", async (req, res) => {
  try{
    const {productThumbnail, productTitle, productDescription, productCost, onOffer} = req.body
    const newProduct = await prisma.products.create({
      data: {
        productThumbnail,
        productTitle, 
        productDescription, 
        productCost, 
        onOffer
      },
      select: {
        id:true,
        productThumbnail:true,
        productTitle:true,
        productDescription:true, 
        productCost:true, 
        onOffer:true
      }
    })
    res.status(200).json(newProduct)
  }
  catch(err){
    res.status(500).json({success:false,message:err.message})
  }


});

router.patch("/:id", async(req, res) => {
  const { productThumbnail, productTitle, productDescription, productCost, onOffer } = req.body;
  const id = req.params.id
  try{
    let updatedproduct;
    if(productThumbnail){
      updatedproduct = await prisma.products.update({
        where: {id:id},
        data: {productThumbnail:productThumbnail}
      })
    }
    if(productTitle){
      updatedproduct = await prisma.products.update({
        where: {id:id},
        data: {productTitle:productTitle}
      })
    }
    if(productDescription){
      updatedproduct = await prisma.products.update({
        where: {id:id},
        data: {productDescription:productDescription}
      })
    }
    if(productCost){
      updatedproduct = await prisma.products.update({
        where: {id:id},
        data: {productCost:productCost}
      })
    }
    if(onOffer){
      updatedproduct = await prisma.products.update({
        where: {id:id},
        data: {onOffer:onOffer}
      })
    }
    res.status(200).json(updatedproduct)
  }
  catch{
    res.status(500).json({success:false,message:err.message})
  }
});

router.delete("/:id", async(req, res) => {
  const id = req.params.id
  try{
    const deleteProduct = await prisma.products.delete({
      where: {id:id},
        select:{
          productThumbnail: true,
          productTitle: true,
          productDescription: true,
          productCost: true,
          onOffer: true,
          id:true
        }
    })
    res.status(200).json(deleteProduct)
  }
  catch(err){
    res.status(500).json({success:false, message:err.message})
  }
});

export default router;
