import { PrismaClient } from '@prisma/client';

// DATABASE_URL is read from .env via Prisma's built-in dotenv support
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data (sequential to avoid Atlas free-tier timeouts)
  console.log('🗑️  Clearing existing data...');
  await prisma.order.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.product.deleteMany();
  await prisma.shop.deleteMany();

  // --- SHOPS (sequential) ---
  console.log('🏪 Seeding shops...');

  const burgerPalace = await prisma.shop.create({
    data: { name: 'Burger Palace', imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400', rating: 4.8 },
  });
  const pizzaHeaven = await prisma.shop.create({
    data: { name: 'Pizza Heaven', imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400', rating: 4.5 },
  });
  const tacoFiesta = await prisma.shop.create({
    data: { name: 'Taco Fiesta', imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400', rating: 4.2 },
  });
  const sushiSamurai = await prisma.shop.create({
    data: { name: 'Sushi Samurai', imageUrl: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400', rating: 4.7 },
  });
  const saladBar = await prisma.shop.create({
    data: { name: 'The Salad Bar', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', rating: 3.9 },
  });
  const pastaParadise = await prisma.shop.create({
    data: { name: 'Pasta Paradise', imageUrl: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400', rating: 2.5 },
  });

  console.log('✅ Created 6 shops');

  // --- PRODUCTS (createMany per shop to minimize round trips) ---
  console.log('🍔 Seeding products...');

  await prisma.product.createMany({
    data: [
      { name: 'Classic Smash Burger', price: 149, category: 'Burgers', shopId: burgerPalace.id, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300' },
      { name: 'Double Bacon Cheeseburger', price: 199, category: 'Burgers', shopId: burgerPalace.id, imageUrl: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=300' },
      { name: 'Mushroom Swiss Burger', price: 169, category: 'Burgers', shopId: burgerPalace.id, imageUrl: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=300' },
      { name: 'Spicy Jalapeño Burger', price: 159, category: 'Burgers', shopId: burgerPalace.id, imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300' },
      { name: 'Crispy Chicken Burger', price: 139, category: 'Burgers', shopId: burgerPalace.id, imageUrl: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=300' },
      { name: 'Classic Fries', price: 59, category: 'Sides', shopId: burgerPalace.id, imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300' },
      { name: 'Onion Rings', price: 69, category: 'Sides', shopId: burgerPalace.id, imageUrl: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=300' },
      { name: 'Cola 0.5L', price: 49, category: 'Drinks', shopId: burgerPalace.id, imageUrl: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300' },
      { name: 'Chocolate Milkshake', price: 89, category: 'Drinks', shopId: burgerPalace.id, imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300' },
      { name: 'Cheesecake Slice', price: 79, category: 'Desserts', shopId: burgerPalace.id, imageUrl: 'https://images.unsplash.com/photo-1567171466295-4afa63d45416?w=300' },
    ],
  });

  await prisma.product.createMany({
    data: [
      { name: 'Margherita Pizza', price: 199, category: 'Pizza', shopId: pizzaHeaven.id, imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300' },
      { name: 'Pepperoni Pizza', price: 239, category: 'Pizza', shopId: pizzaHeaven.id, imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300' },
      { name: 'BBQ Chicken Pizza', price: 259, category: 'Pizza', shopId: pizzaHeaven.id, imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300' },
      { name: 'Four Cheese Pizza', price: 249, category: 'Pizza', shopId: pizzaHeaven.id, imageUrl: 'https://images.unsplash.com/photo-1552539618-7eec9b4d1796?w=300' },
      { name: 'Veggie Supreme Pizza', price: 219, category: 'Pizza', shopId: pizzaHeaven.id, imageUrl: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=300' },
      { name: 'Garlic Bread', price: 69, category: 'Sides', shopId: pizzaHeaven.id, imageUrl: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=300' },
      { name: 'Caesar Salad', price: 99, category: 'Sides', shopId: pizzaHeaven.id, imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300' },
      { name: 'Lemonade', price: 55, category: 'Drinks', shopId: pizzaHeaven.id, imageUrl: 'https://images.unsplash.com/photo-1585621386284-cb4c97571e69?w=300' },
      { name: 'Tiramisu', price: 89, category: 'Desserts', shopId: pizzaHeaven.id, imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300' },
      { name: 'Panna Cotta', price: 79, category: 'Desserts', shopId: pizzaHeaven.id, imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300' },
    ],
  });

  await prisma.product.createMany({
    data: [
      { name: 'Classic Beef Taco', price: 89, category: 'Burgers', shopId: tacoFiesta.id, imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300' },
      { name: 'Chicken Quesadilla', price: 129, category: 'Burgers', shopId: tacoFiesta.id, imageUrl: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=300' },
      { name: 'Loaded Nachos', price: 149, category: 'Sides', shopId: tacoFiesta.id, imageUrl: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=300' },
      { name: 'Guacamole & Chips', price: 99, category: 'Sides', shopId: tacoFiesta.id, imageUrl: 'https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=300' },
      { name: 'Mexican Rice Bowl', price: 139, category: 'Sides', shopId: tacoFiesta.id, imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300' },
      { name: 'Horchata', price: 59, category: 'Drinks', shopId: tacoFiesta.id, imageUrl: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=300' },
      { name: 'Mango Agua Fresca', price: 55, category: 'Drinks', shopId: tacoFiesta.id, imageUrl: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=300' },
      { name: 'Churros with Chocolate', price: 79, category: 'Desserts', shopId: tacoFiesta.id, imageUrl: 'https://images.unsplash.com/photo-1624374053855-39fa5e9baf85?w=300' },
      { name: 'Fish Taco', price: 99, category: 'Burgers', shopId: tacoFiesta.id, imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300' },
      { name: 'Burrito Bowl', price: 159, category: 'Burgers', shopId: tacoFiesta.id, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300' },
    ],
  });

  await prisma.product.createMany({
    data: [
      { name: 'Salmon Nigiri (2pc)', price: 99, category: 'Sides', shopId: sushiSamurai.id, imageUrl: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=300' },
      { name: 'Dragon Roll (8pc)', price: 219, category: 'Burgers', shopId: sushiSamurai.id, imageUrl: 'https://images.unsplash.com/photo-1617196034499-cc2e6d350c0c?w=300' },
      { name: 'California Roll (8pc)', price: 169, category: 'Burgers', shopId: sushiSamurai.id, imageUrl: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=300' },
      { name: 'Spicy Tuna Roll (8pc)', price: 189, category: 'Burgers', shopId: sushiSamurai.id, imageUrl: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=300' },
      { name: 'Miso Soup', price: 49, category: 'Sides', shopId: sushiSamurai.id, imageUrl: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=300' },
      { name: 'Edamame', price: 59, category: 'Sides', shopId: sushiSamurai.id, imageUrl: 'https://images.unsplash.com/photo-1515942661900-94b3d1972591?w=300' },
      { name: 'Green Tea', price: 45, category: 'Drinks', shopId: sushiSamurai.id, imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300' },
      { name: 'Sake (300ml)', price: 129, category: 'Drinks', shopId: sushiSamurai.id, imageUrl: 'https://images.unsplash.com/photo-1582586218214-1e0f3a96e8d3?w=300' },
      { name: 'Mochi Ice Cream (3pc)', price: 99, category: 'Desserts', shopId: sushiSamurai.id, imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300' },
      { name: 'Tempura Prawn (6pc)', price: 179, category: 'Sides', shopId: sushiSamurai.id, imageUrl: 'https://images.unsplash.com/photo-1617196034499-cc2e6d350c0c?w=300' },
    ],
  });

  await prisma.product.createMany({
    data: [
      { name: 'Greek Salad', price: 119, category: 'Sides', shopId: saladBar.id, imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300' },
      { name: 'Caesar Salad with Chicken', price: 149, category: 'Sides', shopId: saladBar.id, imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300' },
      { name: 'Quinoa Power Bowl', price: 169, category: 'Burgers', shopId: saladBar.id, imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300' },
      { name: 'Avocado Toast', price: 99, category: 'Sides', shopId: saladBar.id, imageUrl: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=300' },
      { name: 'Smoothie Bowl', price: 129, category: 'Desserts', shopId: saladBar.id, imageUrl: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=300' },
      { name: 'Green Detox Juice', price: 79, category: 'Drinks', shopId: saladBar.id, imageUrl: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=300' },
      { name: 'Protein Shake', price: 89, category: 'Drinks', shopId: saladBar.id, imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300' },
      { name: 'Acai Bowl', price: 149, category: 'Desserts', shopId: saladBar.id, imageUrl: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=300' },
      { name: 'Tuna Nicoise Salad', price: 159, category: 'Sides', shopId: saladBar.id, imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300' },
      { name: 'Hummus Wrap', price: 109, category: 'Burgers', shopId: saladBar.id, imageUrl: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=300' },
    ],
  });

  await prisma.product.createMany({
    data: [
      { name: 'Spaghetti Carbonara', price: 179, category: 'Pizza', shopId: pastaParadise.id, imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=300' },
      { name: 'Penne Arrabbiata', price: 159, category: 'Pizza', shopId: pastaParadise.id, imageUrl: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=300' },
      { name: 'Fettuccine Alfredo', price: 169, category: 'Pizza', shopId: pastaParadise.id, imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300' },
      { name: 'Lasagna Bolognese', price: 199, category: 'Pizza', shopId: pastaParadise.id, imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300' },
      { name: 'Gnocchi al Pesto', price: 169, category: 'Pizza', shopId: pastaParadise.id, imageUrl: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=300' },
      { name: 'Bruschetta (4pc)', price: 79, category: 'Sides', shopId: pastaParadise.id, imageUrl: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=300' },
      { name: 'Minestrone Soup', price: 89, category: 'Sides', shopId: pastaParadise.id, imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=300' },
      { name: 'Italian Sparkling Water', price: 49, category: 'Drinks', shopId: pastaParadise.id, imageUrl: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?w=300' },
      { name: 'Espresso', price: 45, category: 'Drinks', shopId: pastaParadise.id, imageUrl: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=300' },
      { name: 'Cannoli (2pc)', price: 89, category: 'Desserts', shopId: pastaParadise.id, imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300' },
    ],
  });

  console.log('✅ Created 60 products across all shops');

  // --- COUPONS (single createMany) ---
  console.log('🏷️  Seeding coupons...');

  await prisma.coupon.createMany({
    data: [
      { code: 'SAVE10', name: 'Save 10%', imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300', discountPercent: 10, isActive: true },
      { code: 'WELCOME20', name: 'Welcome Discount 20%', imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300', discountPercent: 20, isActive: true },
      { code: 'FIRST15', name: 'First Order 15%', imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300', discountPercent: 15, isActive: true },
      { code: 'HALF50', name: 'Half Price Special', imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300', discountPercent: 50, isActive: true },
      { code: 'EXPIRED', name: 'Expired Coupon (inactive)', discountPercent: 5, isActive: false },
    ],
  });

  console.log('✅ Created 5 coupons (4 active)');

  console.log('\n🎉 Database seeded successfully!');
  console.log('   Shops:    6');
  console.log('   Products: 60 (10 per shop)');
  console.log('   Coupons:  5 (4 active: SAVE10, WELCOME20, FIRST15, HALF50)');
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
