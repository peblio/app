const User = require('../models/user.js');
const Page = require('../models/page.js');
const stripe = require("stripe")("sk_test_3na5tj3yVy0tO0BsOUj1wM4e00wQHONkBg");
import paymentPlans from '../payment/paymentPlans';

export function getUserProfile(req, res) {
  User.findOne({ name: req.params.userName }, (err, user) => {
    if (err || !user) {
      const statusCode = err ? 500 : 404;
      res.status(statusCode).send(err);
    } else {
      res.send({
        name: user.name,
        type: user.type,
        image: user.image,
        blurb: user.blurb,
        isOwner: !!(req.user && req.user.name && req.user.name === user.name)
      });
    }
  });
}

export function makePayment(req, res) {
  const planDefaults = paymentPlans[req.body.planName];
  stripe.customers.create({
    name: req.body.name,
    source: req.body.id
  }).then(customer => {
    stripe.charges.create({ 
      amount: planDefaults.price,
      description: `Charge for ${req.body.planName} for customer ${req.body.name}`,
      currency: planDefaults.currency,
      customer: customer.id
    }).then(charge => {
      var expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + parseInt(planDefaults.validityDays));
      User.update({ name: req.body.name },
        {
          paymentPlan: req.body.planName,
          expiresAt: expiryDate
        },
        (err, data) => {
          if (err) {
            return res.status(500).send(err);
          }
          else {
            return res.status(200).send(charge);
          }
        });
    });
  });
}

export function getUserDetailsById(req, res) {
  return getUserById(req.params.userObjectId, res);
}

export function getUserDetailsForPage(req, res) {
  return Page.findOne({ id: req.params.pageId }, (err, page) => {
    if (err || !page) {
      const statusCode = err ? 500 : 404;
      return res.status(statusCode).send(err);
    } else {
      return getUserById(page.user, res);
    }
  });
};

export function getUserDetailsForParentPage(req, res) {
  return Page.findOne({ id: req.params.pageId }, (err, page) => {
    if (err || !page) {
      const statusCode = err ? 500 : 404;
      return res.status(statusCode).send(err);
    }
    Page.findOne({ id: page.parentId}, (parentPageRetrieveError, parentPage) => {
      if (parentPageRetrieveError || !parentPage) {
        const statusCode = parentPageRetrieveError ? 500 : 404;
        return res.status(statusCode).send(parentPageRetrieveError);
      }
      return getUserById(parentPage.user, res);
    });
  });
};

function getUserById(userId, res) {
  return User.findById(userId, (err, user) => {
    if (err || !user) {
      const statusCode = err ? 500 : 404;
      return res.status(statusCode).send(err);
    }
    return res.status(200).send({
      name: user.name,
      type: user.type
    });
  });
}
