const keyPublishable = "type here your PUBLISHABLE_KEY";
const keySecret = "type here your SECRET_KEY";

const app = require("express")();
const stripe = require("stripe")(keySecret);

app.set("view engine", "ejs");
app.use(require("body-parser").urlencoded({ extended: false }));

app.get("/", (req, res) => res.render("index", { keyPublishable }));

app.post("/charge", (req, res) => {
  let amount = 1000; // type here $10 into cents

  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    .then(customer =>
      stripe.charges.create({
        amount, // need amount
        description: "Sample Charge", //need desc
        currency: "usd", //need currency type
        customer: customer.id
      })
    )
    .then(charge => res.render("charge"));
});

app.listen(3000, () => console.log("Server Started"));
