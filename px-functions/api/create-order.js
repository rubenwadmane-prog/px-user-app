export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // TODO: Add logic to create an order
      const orderId = `ORD-${Date.now()}`;
      
      res.status(200).json({ success: true, orderId: orderId, message: "Order created successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
