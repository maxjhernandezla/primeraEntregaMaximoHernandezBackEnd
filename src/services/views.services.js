const products = async () => {
    try {
      const { limit, page, sort, category, status } = req.query;
      let products = [];
      let token;
      const cookie = req.cookies["sessionCookie"];
      let cartId; // Declarar cartId fuera del bloque if
      let userByEmail;
  
      if (cookie) {
        token = verifyToken(cookie);
        userByEmail = await usersService.getUserByEmail(token.user.email);
        if (userByEmail.role !== 'admin') {
          cartId = userByEmail.cart._id.toString();
        }
      }
  
      const { docs } = await getProductsService({
        limit,
        page,
        sort,
        category,
        status,
      });
  
      if (cartId) {
        products = docs.map((product) => ({ ...product, cartId }));
      } else {
        products = docs;
        products = docs.map((product) => ({ ...product,  role: userByEmail?.role}));
      }
  
      res.render("products", { products, user: token?.user });
    } catch (error) {
      req.logger.error(
        `ERROR => date: ${new Date()} - message: ${error.message}`
      );
      res.sendServerError(error.message);
    }
  };

export {
    products
}